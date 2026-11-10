-- UNEXECUTED / UNACTIVATED. Apply only after separate schema and persistence approval.
-- Requires 0001_enquiry_foundation.sql and Supabase roles. No scheduler or sender is created.
begin;
-- Preserve a supplied website even when the optional organization name is absent.
alter table rebuild_private.enquiries add column website text check (char_length(website) <= 2048);
create table rebuild_private.enquiry_rate_limits (
  bucket text primary key check (bucket = 'enquiries'),
  window_started_at timestamptz not null,
  requests integer not null check (requests between 1 and 31)
);
create table rebuild_private.enquiry_outbox (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references rebuild_private.enquiries on delete cascade,
  destination text not null check (destination in ('crm', 'notification')),
  state text not null default 'blocked' check (state = 'blocked'),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  unique (enquiry_id, destination)
);
create index enquiry_outbox_expiry on rebuild_private.enquiry_outbox(expires_at);
do $$
declare relation text;
begin
  foreach relation in array array['enquiry_rate_limits', 'enquiry_outbox'] loop
    execute format('alter table rebuild_private.%I enable row level security', relation);
    execute format('alter table rebuild_private.%I force row level security', relation);
    execute format('revoke all on rebuild_private.%I from public, anon, authenticated', relation);
    execute format('grant select, insert, update, delete on rebuild_private.%I to service_role', relation);
    execute format('create policy service_access on rebuild_private.%I for all to service_role using (true) with check (true)', relation);
  end loop;
end $$;

-- Exposed RPC, private tables; invoker privileges + service-only EXECUTE, not a definer bypass.
create function public.persist_rebuild_enquiry(
  p_payload jsonb, p_key_digest text, p_request_digest text,
  p_key_version text, p_policy_version text, p_retention jsonb
) returns jsonb
language plpgsql security invoker set search_path = pg_catalog, rebuild_private
as $$
declare
  existing rebuild_private.idempotency_records%rowtype;
  enquiry uuid;
  organization uuid;
  current_time_at timestamptz := clock_timestamp();
  expiry timestamptz;
  count_requests integer;
  enquiry_days integer := (p_retention->>'enquiryDays')::integer;
  consent_days integer := (p_retention->>'consentDays')::integer;
  audit_days integer := (p_retention->>'auditDays')::integer;
  outbox_days integer := (p_retention->>'outboxDays')::integer;
  idempotency_hours integer := (p_retention->>'idempotencyHours')::integer;
  field text;
begin
  if p_key_digest is null or p_key_digest !~ '^[0-9a-f]{64}$'
    or p_request_digest is null or p_request_digest !~ '^[0-9a-f]{64}$'
    or p_key_version is null or p_key_version !~ '^[a-zA-Z0-9_-]{1,40}$'
    or p_policy_version is null or p_policy_version !~ '^[a-zA-Z0-9._-]{1,80}$'
    or enquiry_days is null or enquiry_days not between 1 and 365
    or consent_days is null or consent_days not between 1 and 730
    or audit_days is null or audit_days not between 1 and 365
    or outbox_days is null or outbox_days not between 1 and 90
    or idempotency_hours is null or idempotency_hours not between 1 and 168
  then raise exception 'invalid_configuration' using errcode = '22023'; end if;
  if p_payload is null or jsonb_typeof(p_payload) <> 'object'
    or not (p_payload ?& array['kind','name','email','company','website','message','consent','source_page'])
    or p_payload - array['kind','name','email','company','website','message','consent','source_page'] <> '{}'::jsonb
  then raise exception 'invalid_payload' using errcode = '22023'; end if;
  foreach field in array array['kind','name','email','company','website','message','consent','source_page'] loop
    if jsonb_typeof(p_payload->field) <> 'string' then
      raise exception 'invalid_payload' using errcode = '22023';
    end if;
  end loop;
  if p_payload->>'kind' not in ('research','campaign','contact','consultation')
    or p_payload->>'consent' <> 'on'
    or p_payload->>'source_page' not in ('/','/contact','/request-sample','/free-consultation',
      '/b2b-prospect-research','/contact-enrichment','/services','/cold-email-marketing',
            '/email-infrastructure','/campaign-management','/appointment-setting')
    or char_length(p_payload->>'name') not between 1 and 120
    or char_length(p_payload->>'email') not between 3 and 254
    or char_length(p_payload->>'company') > 200
    or char_length(p_payload->>'website') > 2048
    or char_length(p_payload->>'message') not between 10 and 5000
  then raise exception 'invalid_payload' using errcode = '22023'; end if;

  -- A bounded singleton, not a client-controlled IP/key map. UPSERT holds the row lock
  -- until transaction end, serializing the budget AND idempotency check across workers.
  insert into rebuild_private.enquiry_rate_limits as limits values ('enquiries', current_time_at, 1)
  on conflict (bucket) do update set
    window_started_at = case when limits.window_started_at <= clock_timestamp() - interval '60 seconds'
      then clock_timestamp() else limits.window_started_at end,
    requests = case when limits.window_started_at <= clock_timestamp() - interval '60 seconds'
      then 1 else least(limits.requests + 1, 31) end
  returning requests into count_requests;
  if count_requests > 30 then return jsonb_build_object('outcome','rate_limited'); end if;
  current_time_at := clock_timestamp();
  delete from rebuild_private.idempotency_records where key_digest = p_key_digest and expires_at <= current_time_at;
  select * into existing from rebuild_private.idempotency_records where key_digest = p_key_digest for update;
  if found then
    if existing.request_digest <> p_request_digest or existing.digest_key_version <> p_key_version then
      return jsonb_build_object('outcome','conflict');
    end if;
    if existing.state <> 'completed' or existing.enquiry_id is null then
      raise exception 'incomplete_reservation' using errcode = '55000';
    end if;
    return jsonb_build_object('outcome','duplicate');
  end if;

  expiry := current_time_at + make_interval(days => enquiry_days);
  if p_payload->>'company' <> '' then
    insert into rebuild_private.organizations(name, website, expires_at)
      values (p_payload->>'company', nullif(p_payload->>'website',''), expiry) returning id into organization;
  end if;
  insert into rebuild_private.enquiries(kind, organization_id, name, email, message, website, expires_at)
    values(p_payload->>'kind', organization, p_payload->>'name', p_payload->>'email', p_payload->>'message', nullif(p_payload->>'website',''), expiry)
    returning id into enquiry;
  insert into rebuild_private.service_interests(enquiry_id, service) values(enquiry, p_payload->>'kind');
  insert into rebuild_private.contact_requests(enquiry_id, requested_action) values(enquiry,
    case p_payload->>'kind' when 'contact' then 'reply' when 'consultation' then 'consultation_review'
      when 'research' then 'research_review' else 'campaign_review' end);
  insert into rebuild_private.consent_events(enquiry_id, purpose, policy_version, action, expires_at)
    values(enquiry, 'respond_to_enquiry', p_policy_version, 'granted', current_time_at + make_interval(days => consent_days));
  insert into rebuild_private.contact_sources(enquiry_id, source_type, source_reference)
    values(enquiry, 'first_party_form', p_payload->>'source_page');
  insert into rebuild_private.audit_logs(enquiry_id, action, expires_at) values(enquiry, 'created', current_time_at + make_interval(days => audit_days));
  insert into rebuild_private.approvals(enquiry_id, purpose) values(enquiry, 'crm_handoff'), (enquiry, 'notification');
  insert into rebuild_private.integration_events(enquiry_id, adapter, state, outcome_code, expires_at)
    values(enquiry, 'crm', 'blocked', 'review_required', current_time_at + make_interval(days => outbox_days)),
      (enquiry, 'notification', 'blocked', 'review_required', current_time_at + make_interval(days => outbox_days));
  insert into rebuild_private.enquiry_outbox(enquiry_id, destination, expires_at)
    values(enquiry, 'crm', current_time_at + make_interval(days => outbox_days)),
      (enquiry, 'notification', current_time_at + make_interval(days => outbox_days));
  insert into rebuild_private.idempotency_records(key_digest, request_digest, digest_key_version, enquiry_id, state, expires_at)
    values(p_key_digest, p_request_digest, p_key_version, enquiry, 'completed',
      current_time_at + make_interval(hours => idempotency_hours));
  return jsonb_build_object('outcome','accepted');
end $$;
revoke all on function public.persist_rebuild_enquiry(jsonb,text,text,text,text,jsonb) from public, anon, authenticated;
grant execute on function public.persist_rebuild_enquiry(jsonb,text,text,text,text,jsonb) to service_role;
commit;
