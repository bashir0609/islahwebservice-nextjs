-- UNEXECUTED / UNACTIVATED. Requires 0001 and 0002. Review in disposable staging only.
begin;
alter table rebuild_private.enquiry_outbox drop constraint if exists enquiry_outbox_state_check;
alter table rebuild_private.enquiry_outbox alter column state drop default;
alter table rebuild_private.enquiry_outbox alter column state set default 'pending';
alter table rebuild_private.enquiry_outbox
  add column job_type text generated always as (destination) stored,
  add column attempt_count integer not null default 0,
  add column next_attempt_at timestamptz not null default now(),
  add column last_error_category text,
  add column updated_at timestamptz not null default now(),
  add column lease_token uuid,
  add column lease_owner text,
  add column lease_expires_at timestamptz,
  add column checkpoint jsonb,
  add column completed_at timestamptz,
  add constraint enquiry_outbox_state_check check (state in ('blocked','pending','processing','completed','failed')),
  add constraint enquiry_outbox_job_type_check check (job_type in ('crm','notification')),
  add constraint enquiry_outbox_attempt_check check (attempt_count between 0 and 10),
  add constraint enquiry_outbox_error_check check (last_error_category is null or last_error_category in ('configuration','invalid_job','conflict','schema','rejected','retry_later','uncertain','reconcile','storage','unexpected')),
  add constraint enquiry_outbox_lease_check check ((state = 'processing') = (lease_token is not null and lease_owner is not null and lease_expires_at is not null)),
  add constraint enquiry_outbox_completion_check check ((state = 'completed') = (completed_at is not null));
create index enquiry_outbox_due on rebuild_private.enquiry_outbox(next_attempt_at, created_at) where state in ('pending','processing');

-- Existing blocked rows remain blocked. Only enquiries created after this migration enqueue pending jobs.
create or replace function public.claim_rebuild_enquiry_jobs(p_worker text, p_limit integer, p_lease_seconds integer)
returns table(id uuid, enquiry_id uuid, job_type text, attempt_count integer, lease_token uuid, checkpoint jsonb,
  name text, email text, company text, source_page text, kind text)
language plpgsql security invoker set search_path = pg_catalog, rebuild_private
as $$
begin
  if p_worker !~ '^[a-zA-Z0-9_-]{8,80}$' or p_limit not between 1 and 50 or p_lease_seconds not between 5 and 300 then
    raise exception 'invalid_worker_configuration' using errcode = '22023';
  end if;
  return query
  with due as (
    select o.id from rebuild_private.enquiry_outbox o
    where (o.state = 'pending' and o.next_attempt_at <= clock_timestamp())
       or (o.state = 'processing' and o.lease_expires_at <= clock_timestamp())
    order by o.next_attempt_at, o.created_at
    for update skip locked limit p_limit
  ), claimed as (
    update rebuild_private.enquiry_outbox o set state='processing', attempt_count=o.attempt_count+1,
      lease_token=gen_random_uuid(), lease_owner=p_worker,
      lease_expires_at=clock_timestamp()+make_interval(secs=>p_lease_seconds), updated_at=clock_timestamp()
    from due where o.id=due.id
    returning o.id,o.enquiry_id,o.job_type,o.attempt_count,o.lease_token,o.checkpoint
  )
  select c.id,c.enquiry_id,c.job_type,c.attempt_count,c.lease_token,c.checkpoint,e.name,e.email,
    coalesce(org.name,''),src.source_reference,e.kind
  from claimed c join rebuild_private.enquiries e on e.id=c.enquiry_id
  left join rebuild_private.organizations org on org.id=e.organization_id
  join rebuild_private.contact_sources src on src.enquiry_id=e.id and src.source_type='first_party_form';
end $$;

create function public.update_rebuild_enquiry_job(p_id uuid,p_lease uuid,p_state text,p_error text,p_next timestamptz,p_checkpoint jsonb)
returns boolean language plpgsql security invoker set search_path = pg_catalog,rebuild_private as $$
declare changed integer;
begin
  if p_state not in ('pending','completed','failed') then raise exception 'invalid_state' using errcode='22023'; end if;
  update rebuild_private.enquiry_outbox set state=p_state,last_error_category=p_error,
    next_attempt_at=coalesce(p_next,next_attempt_at),checkpoint=coalesce(p_checkpoint,checkpoint),
    completed_at=case when p_state='completed' then clock_timestamp() else null end,
    lease_token=null,lease_owner=null,lease_expires_at=null,updated_at=clock_timestamp()
  where id=p_id and state='processing' and lease_token=p_lease and lease_expires_at>clock_timestamp();
  get diagnostics changed=row_count; return changed=1;
end $$;

create function public.checkpoint_rebuild_enquiry_job(p_id uuid,p_lease uuid,p_checkpoint jsonb)
returns boolean language plpgsql security invoker set search_path = pg_catalog,rebuild_private as $$
declare changed integer;
begin
  if p_checkpoint is null or jsonb_typeof(p_checkpoint) <> 'object' or pg_column_size(p_checkpoint) > 16384 then
    raise exception 'invalid_checkpoint' using errcode='22023';
  end if;
  update rebuild_private.enquiry_outbox set checkpoint=p_checkpoint,updated_at=clock_timestamp()
  where id=p_id and state='processing' and lease_token=p_lease and lease_expires_at>clock_timestamp();
  get diagnostics changed=row_count; return changed=1;
end $$;

revoke all on function public.claim_rebuild_enquiry_jobs(text,integer,integer) from public,anon,authenticated;
revoke all on function public.update_rebuild_enquiry_job(uuid,uuid,text,text,timestamptz,jsonb) from public,anon,authenticated;
revoke all on function public.checkpoint_rebuild_enquiry_job(uuid,uuid,jsonb) from public,anon,authenticated;
grant execute on function public.claim_rebuild_enquiry_jobs(text,integer,integer) to service_role;
grant execute on function public.update_rebuild_enquiry_job(uuid,uuid,text,text,timestamptz,jsonb) to service_role;
grant execute on function public.checkpoint_rebuild_enquiry_job(uuid,uuid,jsonb) to service_role;
commit;
