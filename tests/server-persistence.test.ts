import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createEnquiryHandler, enquirySchema, MAX_BODY_BYTES, sourcePages } from '../src/server/enquiries';
import { createSupabasePersistence, retentionSchema, PersistenceUnavailable, type PersistenceConfig } from '../src/server/persistence';
import { createRuntimeHandler } from '../src/server/runtime';

const config: PersistenceConfig = { url: 'https://database.example.test', serviceRoleKey: 's'.repeat(40),
  hmacSecret: 'h'.repeat(64), hmacKeyVersion: 'v1', policyVersion: 'privacy-reviewed-v1' };
const input = { name: 'Example Person', email: 'person@example.test', company: '', website: 'https://example.test',
  message: 'Please explain the research process.', consent: 'on', website_confirm: '', source_page: '/contact' };
const origin = 'https://www.example.test';
const approvals = { persistenceReviewed: true, migrationReviewed: true };
const env = { NODE_ENV: 'production', REBUILD_INTEGRATION_MODE: 'persistence', REBUILD_PERSISTENCE_ENABLED: 'true',
  REBUILD_CANONICAL_ORIGIN: origin, REBUILD_SUPABASE_URL: config.url, REBUILD_SUPABASE_SERVICE_ROLE_KEY: config.serviceRoleKey,
  REBUILD_ENQUIRY_HMAC_SECRET: config.hmacSecret, REBUILD_ENQUIRY_HMAC_KEY_VERSION: config.hmacKeyVersion,
  REBUILD_CONSENT_POLICY_VERSION: config.policyVersion };
function request(patch: Record<string, unknown> = {}, key: string = randomUUID(), headers: Record<string, string> = {}) {
  return new Request(`${origin}/api/enquiries`, { method: 'POST', headers: {
    origin, 'content-type': 'application/json', 'idempotency-key': key, ...headers,
  }, body: JSON.stringify({ ...input, kind: 'contact', ...patch }) });
}
function transport(run: (body: Record<string, unknown>, init: RequestInit, url: string) => Response | Promise<Response>): typeof fetch {
  return (async (url, init) => run(JSON.parse(String(init?.body)), init!, String(url))) as typeof fetch;
}
const result = (outcome: string) => Response.json({ outcome });

test('runtime remains unactivated even with complete environment; approvals and all configuration required', async () => {
  let calls = 0;
  const dependencies = { fetch: transport(() => { calls++; return result('accepted'); }) };
  for (const gate of [undefined, { persistenceReviewed: true, migrationReviewed: false },
    { persistenceReviewed: false, migrationReviewed: true }]) {
    assert.equal((await createRuntimeHandler(env, gate, dependencies)(request())).status, 503);
  }
  for (const patch of [{ REBUILD_PERSISTENCE_ENABLED: 'false' }, { REBUILD_SUPABASE_URL: '' },
    { REBUILD_ENQUIRY_HMAC_SECRET: 'short' }, { REBUILD_CONSENT_POLICY_VERSION: '' },
    { REBUILD_CANONICAL_ORIGIN: 'http://www.example.test' }, { REBUILD_RETENTION_ENQUIRY_DAYS: '366' },
    { REBUILD_RETENTION_IDEMPOTENCY_HOURS: 'NaN' }, { REBUILD_INTEGRATION_MODE: 'live' }]) {
    assert.equal((await createRuntimeHandler({ ...env, ...patch }, approvals, dependencies)(request())).status, 503);
  }
  assert.equal(calls, 0);
});

test('RPC transport is server-only, single atomic call with stable domain-separated HMACs and no raw key', async () => {
  const bodies: Record<string, unknown>[] = [];
  const key = randomUUID();
  const fetch = transport((body, init, url) => {
    bodies.push(body);
    assert.equal(url, `${config.url}/rest/v1/rpc/persist_rebuild_enquiry`);
    assert.equal(init.method, 'POST');
    assert.equal(init.redirect, 'error');
    assert.equal(init.cache, 'no-store');
    assert.ok(init.signal);
    assert.equal(new Headers(init.headers).get('authorization'), `Bearer ${config.serviceRoleKey}`);
    assert.ok(!JSON.stringify(body).includes(key));
    assert.ok(!JSON.stringify(body).includes(config.hmacSecret));
    assert.match(String(body.p_key_digest), /^[a-f0-9]{64}$/);
    assert.match(String(body.p_request_digest), /^[a-f0-9]{64}$/);
    assert.notEqual(body.p_key_digest, body.p_request_digest);
    return result('accepted');
  });
  for (let i = 0; i < 2; i++) {
    const adapter = createSupabasePersistence(config, { fetch });
    await adapter.persist({ kind: 'contact', enquiry: enquirySchema.parse(input), idempotencyKey: i ? key.toUpperCase() : key });
  }
  assert.deepEqual(bodies[0], bodies[1]);
  const body = bodies[0].p_payload as Record<string, unknown>;
  assert.equal(body.source_page, '/contact');
  assert.equal(body.website, input.website);
  assert.equal(body.consent, 'on');
  assert.ok(!('website_confirm' in body));
  assert.deepEqual(bodies[0].p_retention, retentionSchema.parse({}));
});

test('persistent accepted and duplicate contracts are identical, queued for review and not sent', async () => {
  for (const outcome of ['accepted', 'duplicate']) {
    const handler = createRuntimeHandler(env, approvals, { fetch: transport(() => result(outcome)) });
    const res = await handler(request());
    assert.equal(res.status, 202);
    assert.equal(res.headers.get('cache-control'), 'no-store');
    const body = await res.json();
    assert.deepEqual({ accepted: body.accepted, stored: body.stored, queued: body.queued,
      sent: body.sent, delivered: body.delivered }, { accepted: true, stored: true, queued: true, sent: false, delivered: false });
    assert.equal(body.mode, 'persistence');
    assert.equal(body.kind, 'contact');
    assert.ok(!JSON.stringify(body).includes(input.email));
  }
});

test('mocked transaction races across separate handlers produce one stored submission and conflicts', async () => {
  // This emulates an atomic database outcome; it does NOT execute or verify SQL locking.
  const records = new Map<unknown, unknown>();
  let inserts = 0;
  const fetch = transport(async (body) => {
    await new Promise((resolve) => setTimeout(resolve, 1));
    if (records.has(body.p_key_digest)) return result(records.get(body.p_key_digest) === body.p_request_digest ? 'duplicate' : 'conflict');
    records.set(body.p_key_digest, body.p_request_digest); inserts++;
    return result('accepted');
  });
  const a = createRuntimeHandler(env, approvals, { fetch });
  const b = createRuntimeHandler(env, approvals, { fetch });
  const key = randomUUID();
  const responses = await Promise.all([a(request({}, key)), b(request({}, key))]);
  assert.equal(inserts, 1);
  assert.deepEqual(await responses[0].json(), await responses[1].json());
  for (const patch of [{ message: 'Different enquiry message.' }, { kind: 'research' }, { source_page: '/services' }]) {
    const response = await b(request(patch, key));
    assert.equal(response.status, 409);
    assert.deepEqual(await response.json(), { error: 'idempotency_conflict' });
  }
  assert.equal(inserts, 1);
});

test('distributed limiter outcome maps to 429 with retry header; forwarded IP is not used', async () => {
  let calls = 0;
  const fetch = transport((body) => { calls++; assert.ok(!JSON.stringify(body).includes('192.0.2.1')); return result('rate_limited'); });
  const res = await createRuntimeHandler(env, approvals, { fetch })(request({}, randomUUID(), { 'x-forwarded-for': '192.0.2.1' }));
  assert.equal(res.status, 429);
  assert.equal(res.headers.get('retry-after'), '60');
  assert.equal(calls, 1);
});

test('persistent validation rejects missing/unallowlisted provenance, honeypot, consent and bounds before network', async () => {
  let calls = 0;
  const handler = createRuntimeHandler(env, approvals, { fetch: transport(() => { calls++; return result('accepted'); }) });
  for (const patch of [{ source_page: undefined }, { source_page: '/contact?email=private' },
    { source_page: 'https://www.example.test/contact' }, { website_confirm: 'bot' }, { consent: 'off' },
    { name: 'x'.repeat(121) }, { message: 'short' }, { unknown: 'field' }]) {
    assert.equal((await handler(request(patch))).status, 422);
  }
  for (const headers of [{ origin: 'https://evil.test' }, { 'sec-fetch-site': 'cross-site' }] as Record<string, string>[]) {
    assert.equal((await handler(request({}, randomUUID(), headers))).status, 403);
  }
  assert.equal((await handler(request({}, 'invalid'))).status, 400);
  assert.equal((await handler(request({ message: 'x'.repeat(MAX_BODY_BYTES) }))).status, 413);
  assert.equal(calls, 0);
  for (const source_page of sourcePages) assert.equal(enquirySchema.safeParse({ ...input, source_page }).success, true);
});

test('provider HTTP errors, network failures, timeout and malformed responses expose no PII or secrets', async () => {
  for (const failure of [() => new Response(input.email, { status: 401 }), () => new Response('private', { status: 429 }),
    () => new Response('private', { status: 500 }), () => new Response('not json'),
    () => Response.json({ outcome: 'sent' }), () => Response.json({ outcome: 'accepted', secret: input.email }),
    () => { throw new Error(input.email + config.serviceRoleKey); },
    () => { throw new DOMException(input.email, 'TimeoutError'); }]) {
    const logs: unknown[] = [];
    const handler = createRuntimeHandler(env, approvals, { fetch: transport(failure), log: (event) => logs.push(event) });
    const res = await handler(request());
    assert.equal(res.status, 503);
    assert.deepEqual(await res.json(), { error: 'service_unavailable' });
    assert.deepEqual(logs, [{ event: 'enquiry_persistence_failed', code: 'rpc_unavailable' }]);
  }
});

test('ambiguous commit response can be retried with the same HMAC and gets duplicate', async () => {
  let digest: unknown;
  const handler = createRuntimeHandler(env, approvals, { fetch: transport((body) => {
    if (!digest) { digest = body.p_key_digest; throw new Error('response lost after commit'); }
    assert.equal(body.p_key_digest, digest); return result('duplicate');
  }) });
  const key = randomUUID();
  assert.equal((await handler(request({}, key))).status, 503);
  assert.equal((await handler(request({}, key))).status, 202);
});

test('retention bounds and direct adapter validation fail closed without transport', async () => {
  for (const [field, max] of Object.entries({ enquiryDays: 365, consentDays: 730, auditDays: 365, outboxDays: 90, idempotencyHours: 168 })) {
    for (const value of [0, -1, max + 1, 1.5, NaN]) assert.equal(retentionSchema.safeParse({ [field]: value }).success, false);
    for (const value of [1, max]) assert.equal(retentionSchema.safeParse({ [field]: value }).success, true);
  }
  let calls = 0;
  const adapter = createSupabasePersistence(config, { fetch: transport(() => { calls++; return result('accepted'); }) });
  await assert.rejects(adapter.persist({ kind: 'contact', enquiry: enquirySchema.parse({ ...input, source_page: undefined }), idempotencyKey: randomUUID() }), PersistenceUnavailable);
  assert.equal(calls, 0);
});

test('SQL static contract only: private RLS, service-only invoker RPC, atomic records, blocked outbox', () => {
  const sql = readFileSync(new URL('../supabase/migrations/0002_enquiry_persistence.sql', import.meta.url), 'utf8');
  assert.match(sql, /security invoker set search_path = pg_catalog, rebuild_private/);
  assert.match(sql, /from public, anon, authenticated/);
  assert.match(sql, /grant execute on function public\.persist_rebuild_enquiry.*to service_role/);
  assert.match(sql, /force row level security/);
  assert.match(sql, /on conflict \(bucket\) do update/);
  assert.match(sql, /for update/);
  assert.match(sql, /check \(state = 'blocked'\)/);
  for (const table of ['organizations', 'enquiries', 'service_interests', 'contact_requests', 'consent_events',
    'contact_sources', 'audit_logs', 'approvals', 'integration_events', 'enquiry_outbox', 'idempotency_records']) {
    assert.ok(sql.includes(`insert into rebuild_private.${table}`));
  }
  for (const page of sourcePages) assert.ok(sql.includes(`'${page}'`));
  assert.ok(!/http_post|cron\.schedule|net\./i.test(sql));
});

test('an adapter capability without explicit mode cannot activate production', async () => {
  const handler = createEnquiryHandler({ environment: 'production', canonicalOrigin: origin,
    persistence: { persist: async () => { throw new Error('must not call'); } } });
  assert.equal((await handler(request())).status, 503);
});
