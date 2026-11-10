-- Design-only migration. Do not apply to production without the integration review.
-- Supabase Postgres roles are prerequisites. No runtime code connects to these tables.
begin;
create schema if not exists rebuild_private;
revoke all on schema rebuild_private from public, anon, authenticated;
grant usage on schema rebuild_private to service_role;
alter default privileges in schema rebuild_private revoke all on tables from public, anon, authenticated;
alter default privileges in schema rebuild_private revoke all on sequences from public, anon, authenticated;
alter default privileges in schema rebuild_private revoke execute on functions from public, anon, authenticated;

create table rebuild_private.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  website text check (char_length(website) <= 2048),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '90 days')
);
create table rebuild_private.enquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('research', 'campaign', 'contact', 'consultation')),
  organization_id uuid references rebuild_private.organizations on delete set null,
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  message text not null check (char_length(message) between 10 and 5000),
  status text not null default 'pending_review' check (status in ('pending_review', 'closed', 'rejected')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '90 days')
);
create table rebuild_private.service_interests (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references rebuild_private.enquiries on delete cascade,
  service text not null check (service in ('research', 'campaign', 'contact', 'consultation')),
  unique (enquiry_id, service)
);
create table rebuild_private.contact_requests (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null unique references rebuild_private.enquiries on delete cascade,
  requested_action text not null check (requested_action in ('reply', 'consultation_review', 'research_review', 'campaign_review')),
  created_at timestamptz not null default now()
);
create table rebuild_private.consent_events (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid references rebuild_private.enquiries on delete set null,
  purpose text not null check (purpose = 'respond_to_enquiry'),
  policy_version text not null check (char_length(policy_version) between 1 and 80),
  action text not null check (action in ('granted', 'withdrawn')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '365 days')
);
create table rebuild_private.contact_sources (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references rebuild_private.enquiries on delete cascade,
  source_type text not null check (source_type in ('first_party_form', 'owner_reviewed_import')),
  source_reference text check (char_length(source_reference) <= 200),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create table rebuild_private.suppressions (
  id uuid primary key default gen_random_uuid(),
  -- Keyed HMAC of normalized email, never an unsalted email hash.
  subject_digest text not null check (subject_digest ~ '^[0-9a-f]{64}$'),
  digest_key_version text not null check (char_length(digest_key_version) between 1 and 40),
  scope text not null check (scope in ('all_outreach', 'smartlead')),
  reason text not null check (reason in ('withdrawal', 'objection', 'bounce', 'manual')),
  created_at timestamptz not null default now(),
  review_at timestamptz not null default (now() + interval '365 days'),
  unique (subject_digest, digest_key_version, scope)
);
create table rebuild_private.approvals (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references rebuild_private.enquiries on delete cascade,
  purpose text not null check (purpose in ('crm_handoff', 'notification', 'smartlead_review')),
  decision text not null default 'pending' check (decision in ('pending', 'approved', 'rejected', 'revoked')),
  reviewer_id uuid,
  decided_at timestamptz,
  expires_at timestamptz not null default (now() + interval '30 days'),
  check (decision = 'pending' or (reviewer_id is not null and decided_at is not null))
);
create table rebuild_private.integration_events (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid references rebuild_private.enquiries on delete set null,
  adapter text not null check (adapter in ('crm', 'notification', 'smartlead')),
  state text not null default 'blocked' check (state in ('mock', 'blocked', 'pending_review', 'failed')),
  -- Enumerated technical outcomes only; no provider payloads or exception text.
  outcome_code text not null check (outcome_code in ('mock_noop', 'not_configured', 'review_required', 'provider_failure')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '30 days')
);
create table rebuild_private.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  enquiry_id uuid references rebuild_private.enquiries on delete set null,
  action text not null check (action in ('created', 'reviewed', 'deleted', 'consent_changed', 'suppressed')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '90 days')
);
create table rebuild_private.idempotency_records (
  key_digest text primary key check (key_digest ~ '^[0-9a-f]{64}$'),
  request_digest text not null check (request_digest ~ '^[0-9a-f]{64}$'),
  digest_key_version text not null check (char_length(digest_key_version) between 1 and 40),
  enquiry_id uuid references rebuild_private.enquiries on delete set null,
  state text not null check (state in ('reserved', 'completed')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours')
);

-- No public policies. Explicit service policies also work without BYPASSRLS.
-- Supabase service_role itself normally bypasses RLS; its key must remain server-only.
do $$
declare relation text;
begin
  foreach relation in array array['organizations', 'enquiries', 'service_interests',
    'contact_requests', 'consent_events', 'contact_sources', 'suppressions',
    'approvals', 'integration_events', 'audit_logs', 'idempotency_records']
  loop
    execute format('alter table rebuild_private.%I enable row level security', relation);
    execute format('alter table rebuild_private.%I force row level security', relation);
    execute format('revoke all on rebuild_private.%I from public, anon, authenticated', relation);
    execute format('grant select, insert, update, delete on rebuild_private.%I to service_role', relation);
    execute format('create policy service_access on rebuild_private.%I for all to service_role using (true) with check (true)', relation);
  end loop;
end $$;
create index enquiries_expiry on rebuild_private.enquiries (expires_at);
create index organizations_expiry on rebuild_private.organizations (expires_at);
create index consent_expiry on rebuild_private.consent_events (expires_at);
create index integrations_expiry on rebuild_private.integration_events (expires_at);
create index audit_expiry on rebuild_private.audit_logs (expires_at);
create index idempotency_expiry on rebuild_private.idempotency_records (expires_at);
create index approvals_expiry on rebuild_private.approvals (expires_at);
commit;
