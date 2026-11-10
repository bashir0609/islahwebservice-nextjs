import test from 'node:test';
import assert from 'node:assert/strict';
import { createHubSpotAdapter, createResendAdapter, ProviderError, NOTIFICATION_RETRY_WINDOW_MS } from '../src/server/providers';
import type { Checkpoint, ProviderJob, ProviderOutbox, Transport } from '../src/server/providers';
import { createHttp, retryDelay } from '../src/server/providers/core';

const job: ProviderJob = { enquiryId: 'enquiry-00000001', contactExternalId: 'contact-00000001', name: 'Private Person',
  email: 'private@example.test', serviceInterest: 'prospect-research', sourcePage: '/contact' };
const crmConfig = { enabled: true, environment: 'production', token: 'test-secret-token', pipeline: 'default', stage: 'new' };
const mailConfig = { ...crmConfig, provider: 'resend' as const, from: 'website@example.test', teamRecipients: ['team@example.test'] };
function store() {
  const records = new Map<string, Checkpoint>();
  let chain = Promise.resolve();
  const outbox: ProviderOutbox = {
    async withLease(key, work) {
      const previous = chain;
      let release!: () => void;
      chain = new Promise<void>((resolve) => { release = resolve; });
      await previous;
      try { return await work({ checkpoint: records.get(key), async save(state) { records.set(key, { ...state }); } }); }
      finally { release(); }
    },
  };
  return { records, outbox };
}
const json = (value: unknown, status = 200, headers = {}) => new Response(JSON.stringify(value), { status, headers });
function hubspotMock() {
  const calls: { url: string; init: RequestInit }[] = [];
  const transport: Transport = async (url, init) => {
    calls.push({ url, init });
    if (url.includes('/properties/')) return json({ name: url.split('/').at(-1), type: 'string', hasUniqueValue: true,
      modificationMetadata: { readOnlyValue: false } });
    if (init.method === 'PUT') return new Response(null, { status: 204 });
    return json({ status: 'COMPLETE', results: [{ id: url.includes('/contacts/') ? '101' : '202' }] });
  };
  return { calls, transport };
}
const code = (expected: string) => (error: unknown) => error instanceof ProviderError && error.code === expected;

test('factories are inert, opt-in production-only, fail closed and snapshot config', async () => {
  let calls = 0;
  const transport: Transport = async () => { calls++; return json({ id: 'email-12345678' }); };
  for (const config of [{ ...crmConfig, enabled: false }, { ...crmConfig, environment: 'preview' },
    { ...crmConfig, token: '' }, { ...crmConfig, token: 'secret\r\nheader' }]) {
    assert.throws(() => createHubSpotAdapter(config, { transport }), code('configuration'));
    assert.throws(() => createResendAdapter({ ...mailConfig, ...config }, { transport }), code('configuration'));
  }
  createHubSpotAdapter(crmConfig, { transport });
  createResendAdapter(mailConfig, { transport });
  assert.equal(calls, 0);
  assert.throws(() => createResendAdapter({ ...mailConfig, teamRecipients: [] }), code('configuration'));
});

test('HubSpot verifies unique schema, upserts by stable IDs and checkpoints each step', async () => {
  const mock = hubspotMock();
  const db = store();
  const adapter = createHubSpotAdapter(crmConfig, { transport: mock.transport });
  const results = await Promise.all([adapter.recordEnquiry(job, db.outbox), adapter.recordEnquiry(job, db.outbox)]);
  assert.deepEqual(results, [{ contactId: '101', dealId: '202' }, { contactId: '101', dealId: '202' }]);
  assert.equal(mock.calls.length, 7);
  const writes = mock.calls.filter((c) => c.init.method === 'POST');
  assert.equal(writes.length, 2);
  const contact = JSON.parse(String(writes[0].init.body)).inputs[0];
  const deal = JSON.parse(String(writes[1].init.body)).inputs[0];
  assert.equal(contact.id, job.contactExternalId);
  assert.equal(contact.idProperty, 'islah_contact_external_id');
  assert.equal(deal.idProperty, 'islah_enquiry_external_id');
  assert.equal(deal.properties.islah_source_page, '/contact');
  assert.equal(deal.properties.islah_service_interest, 'prospect-research');
  assert.ok(mock.calls.every((c) => c.url.startsWith('https://api.hubapi.com/') && c.init.redirect === 'error'));
  assert.ok(!JSON.stringify(writes).match(/marketing|consent|enroll|lifecyclestage/i));
  await assert.rejects(adapter.recordEnquiry({ ...job, sourcePage: '/services' }, db.outbox), code('conflict'));
  assert.equal(mock.calls.length, 7);
});

test('missing uniqueness prevents all writes', async () => {
  let writes = 0;
  const adapter = createHubSpotAdapter(crmConfig, { transport: async (url, init) => {
    if (init.method !== 'GET') writes++;
    return json({ name: url.split('/').at(-1), type: 'string', hasUniqueValue: false, modificationMetadata: { readOnlyValue: false } });
  } });
  await assert.rejects(adapter.recordEnquiry(job, store().outbox), code('schema'));
  assert.equal(writes, 0);
});

test('ambiguous deal outcome resumes same unique upsert, never repeats contact or plain create', async () => {
  const mock = hubspotMock();
  const db = store();
  let fail = true;
  const transport: Transport = async (url, init) => {
    if (url.includes('/deals/batch/upsert') && fail) { fail = false; throw new Error(job.email); }
    return mock.transport(url, init);
  };
  const adapter = createHubSpotAdapter(crmConfig, { transport });
  await assert.rejects(adapter.recordEnquiry(job, db.outbox), code('uncertain'));
  assert.equal(db.records.get(`hubspot/${job.enquiryId}`)?.contactId, '101');
  await adapter.recordEnquiry(job, db.outbox);
  assert.equal(mock.calls.filter((c) => c.url.includes('/contacts/batch/upsert')).length, 1);
  assert.ok(mock.calls.filter((c) => c.init.method === 'POST').every((c) => c.url.endsWith('/batch/upsert')));
});

test('batch partial, pending and malformed success never checkpoint completion', async () => {
  for (const response of [{ status: 'PENDING', results: [{ id: '101' }] }, { status: 'COMPLETE', results: [], numErrors: 1 },
    { status: 'COMPLETE', results: [{ id: job.email }] }]) {
    const mock = hubspotMock();
    const db = store();
    const adapter = createHubSpotAdapter(crmConfig, { transport: async (url, init) => init.method === 'POST' ? json(response) : mock.transport(url, init) });
    await assert.rejects(adapter.recordEnquiry(job, db.outbox), code('uncertain'));
    assert.equal(db.records.get(`hubspot/${job.enquiryId}`)?.contactId, undefined);
  }
});

test('bounded 429/5xx retries preserve body and key, honor Retry-After seconds/date', async () => {
  const delays: number[] = [];
  const bodies: unknown[] = [];
  let count = 0;
  const now = Date.parse('2026-01-01T00:00:00Z');
  const http = createHttp({ now: () => now, sleep: async (ms) => { delays.push(ms); }, transport: async (_, init) => {
    bodies.push([init.body, new Headers(init.headers).get('idempotency-key')]);
    count++;
    return count === 1 ? json({}, 429, { 'retry-after': '2' }) : count === 2 ? json({}, 503, { 'retry-after': new Date(now + 3000).toUTCString() }) : json({ ok: true });
  } });
  await http('https://api.resend.com/emails', 'test-token', 'POST', { a: 1 }, 'same-key');
  assert.deepEqual(delays, [2000, 3000]);
  assert.deepEqual(bodies, Array(3).fill(['{"a":1}', 'same-key']));
  assert.equal(retryDelay('garbage', now, 0), Infinity);
});

test('large delays defer rather than cap; exhausted retries and permanent errors are bounded', async () => {
  for (const [status, retryAfter, expectedCalls, expectedCode] of [
    [429, '3600', 1, 'retry_later'], [503, '0', 3, 'retry_later'], [401, '0', 1, 'rejected'],
    [409, '0', 1, 'conflict'], [302, '0', 1, 'rejected'], [207, '0', 1, 'rejected'],
  ] as const) {
    let calls = 0;
    const http = createHttp({ sleep: async () => {}, transport: async () => { calls++; return json({ error: job.email }, status, { 'retry-after': retryAfter }); } });
    await assert.rejects(http('https://api.resend.com/emails', 'test-token', 'POST', {}, 'same-key'), code(expectedCode));
    assert.equal(calls, expectedCalls);
  }
});

test('network, timeout, stalled body, malformed and oversized body return sanitized uncertain errors without retry', async () => {
  const transports: Transport[] = [async () => { throw new Error(job.email); }, async () => new Promise(() => {}),
    async () => new Response(new ReadableStream({ start() {} })), async () => new Response('bad-json'),
    async () => new Response('x'.repeat(262_145))];
  for (const transport of transports) {
    let calls = 0;
    const http = createHttp({ timeoutMs: 10, transport: async (url, init) => { calls++; return transport(url, init); } });
    await assert.rejects(http('https://api.resend.com/emails', 'secret-token', 'POST', {}, 'key'), (error: unknown) => {
      assert.ok(error instanceof ProviderError);
      assert.equal(error.message, 'provider_uncertain');
      assert.ok(!JSON.stringify(error).includes(job.email));
      return true;
    });
    assert.equal(calls, 1);
  }
});

test('static allowed hosts reject SSRF, credentials and alternate ports before transport', async () => {
  const http = createHttp({ transport: async () => { assert.fail('network prohibited'); } });
  for (const url of ['http://api.resend.com/emails', 'https://evil.test/emails', 'https://api.resend.com.evil.test/',
    'https://user:password@api.resend.com/', 'https://api.resend.com:8443/']) {
    await assert.rejects(http(url, 'test-token', 'POST'), code('configuration'));
  }
});

test('Resend checkpoints before send; concurrent/repeated delivery uses one request without PII', async () => {
  const db = store();
  let calls = 0;
  const adapter = createResendAdapter(mailConfig, { transport: async (url, init) => {
    calls++;
    assert.equal(url, 'https://api.resend.com/emails');
    assert.equal(init.redirect, 'error');
    assert.ok(db.records.get(`resend/${job.enquiryId}`)?.notificationStartedAt);
    assert.equal(new Headers(init.headers).get('idempotency-key'), `enquiry-team-v1/${job.enquiryId}`);
    assert.ok(!String(init.body).includes(job.email));
    assert.ok(!String(init.body).includes(job.name));
    assert.deepEqual(JSON.parse(String(init.body)).to, mailConfig.teamRecipients);
    return json({ id: 'email-12345678' });
  } });
  await Promise.all([adapter.notifyTeam(job, db.outbox), adapter.notifyTeam(job, db.outbox)]);
  assert.equal(calls, 1);
  await assert.rejects(adapter.notifyTeam({ ...job, name: 'Changed' }, db.outbox), code('conflict'));
});

test('uncertain notification retains key and timestamp; refuses replay after safe window', async () => {
  const db = store();
  let time = 1000;
  const keys: string[] = [];
  const adapter = createResendAdapter(mailConfig, { now: () => time, transport: async (_, init) => {
    keys.push(new Headers(init.headers).get('idempotency-key')!);
    throw new Error('private upstream failure');
  } });
  await assert.rejects(adapter.notifyTeam(job, db.outbox), code('uncertain'));
  time += 100;
  await assert.rejects(adapter.notifyTeam(job, db.outbox), code('uncertain'));
  assert.equal(keys[0], keys[1]);
  assert.equal(db.records.get(`resend/${job.enquiryId}`)?.notificationStartedAt, 1000);
  time = 1000 + NOTIFICATION_RETRY_WINDOW_MS;
  await assert.rejects(adapter.notifyTeam(job, db.outbox), code('reconcile'));
  assert.equal(keys.length, 2);
});

test('retry delay cannot cross notification window; recipient config drift conflicts', async () => {
  const db = store();
  let time = 0;
  let calls = 0;
  const transport: Transport = async () => { calls++; return json({}, 429, { 'retry-after': '1' }); };
  const adapter = createResendAdapter(mailConfig, { now: () => time, sleep: async () => { time = NOTIFICATION_RETRY_WINDOW_MS; }, transport });
  await assert.rejects(adapter.notifyTeam(job, db.outbox), code('reconcile'));
  assert.equal(calls, 1);
  const changed = createResendAdapter({ ...mailConfig, teamRecipients: ['other@example.test'] }, { transport });
  await assert.rejects(changed.notifyTeam(job, db.outbox), code('conflict'));
  assert.equal(calls, 1);
});

test('storage failure prevents sending and does not reflect database error contents', async () => {
  const outbox: ProviderOutbox = { async withLease(_, work) { return work({ async save() { throw new Error(job.email); } }); } };
  const adapter = createResendAdapter(mailConfig, { transport: async () => { assert.fail('must persist first'); } });
  await assert.rejects(adapter.notifyTeam(job, outbox), code('storage'));
});

test('send success followed by checkpoint loss replays original key; saved receipt survives expiry', async () => {
  let checkpoint: Checkpoint | undefined;
  let failReceipt = true;
  let time = 1000;
  const requests: string[] = [];
  const outbox: ProviderOutbox = { async withLease(_, work) {
    return work({ checkpoint, async save(state) {
      if (state.notificationId && failReceipt) { failReceipt = false; throw new Error('database unavailable'); }
      checkpoint = { ...state };
    } });
  } };
  const config = { ...mailConfig, teamRecipients: [...mailConfig.teamRecipients] };
  const adapter = createResendAdapter(config, { now: () => time, transport: async (_, init) => {
    requests.push(JSON.stringify([init.body, new Headers(init.headers).get('idempotency-key')]));
    assert.deepEqual(JSON.parse(String(init.body)).to, mailConfig.teamRecipients);
    return json({ id: 'email-12345678' });
  } });
  config.teamRecipients[0] = 'changed@example.test';
  await assert.rejects(adapter.notifyTeam(job, outbox), code('storage'));
  assert.equal(checkpoint?.notificationStartedAt, 1000);
  assert.equal(checkpoint?.notificationId, undefined);
  await adapter.notifyTeam(job, outbox);
  assert.equal(requests.length, 2);
  assert.equal(requests[0], requests[1]);
  time += NOTIFICATION_RETRY_WINDOW_MS * 2;
  assert.deepEqual(await adapter.notifyTeam(job, outbox), { notificationId: 'email-12345678' });
  assert.equal(requests.length, 2);
});

test('invalid jobs fail before outbox or network; no inferred campaign or marketing consent', async () => {
  const adapter = createHubSpotAdapter(crmConfig, { transport: async () => { assert.fail('network prohibited'); } });
  for (const patch of [{ sourcePage: '/contact?email=private' }, { sourcePage: '//evil.test' },
    { contactExternalId: job.email }, { serviceInterest: 'campaign' }, { consent: true }]) {
    await assert.rejects(adapter.recordEnquiry({ ...job, ...patch } as ProviderJob, store().outbox), code('invalid_job'));
  }
});
