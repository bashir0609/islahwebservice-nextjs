import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createEnquiryHandler, enquirySchema, kinds, MAX_BODY_BYTES } from '../src/server/enquiries';
import { mockCrm, mockNotification, mockSmartlead } from '../src/server/integrations';

const input = { name: 'Example Person', email: 'person@example.test', company: 'Example', website: 'https://example.test', message: 'Please explain the research process.', consent: 'on', website_confirm: '' };
function request(body: unknown = input, headers: Record<string, string> = {}, key: string = randomUUID()) {
  return new Request('http://localhost:4321/api/research', { method: 'POST', headers: {
    origin: 'http://localhost:4321', 'content-type': 'application/json', 'idempotency-key': key, ...headers,
  }, body: JSON.stringify(body) });
}
const local = () => createEnquiryHandler({ environment: 'test' });

test('four separate kinds return truthful mock results without reflecting PII', async () => {
  const handler = local();
  for (const kind of kinds) {
    const res = await handler(request(), kind);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('cache-control'), 'no-store');
    const body = await res.json();
    assert.equal(body.kind, kind);
    assert.equal(body.mode, 'mock');
    assert.equal(body.stored, false);
    assert.equal(body.delivered, false);
    assert.ok(!JSON.stringify(body).includes(input.email));
  }
});
test('production, preview, unknown environment and live modes fail closed', async () => {
  for (const options of [{}, { environment: 'production' }, { environment: 'test', vercelEnvironment: 'preview' }, { environment: 'test', mode: 'live' }]) {
    assert.equal((await createEnquiryHandler(options)(request(), 'contact')).status, 503);
  }
});
test('method and strict same-origin checks', async () => {
  const handler = local();
  const get = await handler(new Request('http://localhost:4321/api/contact'), 'contact');
  assert.equal(get.status, 405);
  assert.equal(get.headers.get('allow'), 'POST');
  for (const headers of [{ origin: '' }, { origin: 'null' }, { origin: 'https://evil.test' }, { 'sec-fetch-site': 'cross-site' }] as Record<string, string>[]) {
    assert.equal((await handler(request(input, headers), 'contact')).status, 403);
  }
});
test('strict field validation, bounds, consent and honeypot', () => {
  for (const patch of [
    { name: '' }, { name: 'a'.repeat(121) }, { name: '\u0000' },
    { email: 'invalid' }, { email: 'a'.repeat(255) }, { company: 'a'.repeat(201) },
    { website: 'javascript:alert(1)' }, { website: 'https://user:pass@example.test' }, { website: 'a'.repeat(2049) },
    { message: 'short' }, { message: 'a'.repeat(5001) }, { consent: true }, { consent: 'off' },
    { consent: undefined }, { website_confirm: 'bot' }, { unexpected: 'field' },
  ]) assert.equal(enquirySchema.safeParse({ ...input, ...patch }).success, false);
  assert.equal(enquirySchema.safeParse({ ...input, company: '', website: '' }).success, true);
});
test('invalid requests return safe errors', async () => {
  const res = await local()(request({ ...input, email: 'secret-invalid-email' }), 'research');
  assert.equal(res.status, 422);
  assert.deepEqual(await res.json(), { error: 'invalid_fields' });
  assert.equal((await local()(request(input, {}, 'not-a-uuid'), 'research')).status, 400);
});
test('URL-encoded form supported, duplicates and multipart rejected', async () => {
  const handler = local();
  const form = (body: string) => new Request('http://localhost:4321/api/contact', { method: 'POST', headers: {
    origin: 'http://localhost:4321', 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'idempotency-key': randomUUID(),
  }, body });
  const encoded = new URLSearchParams(input).toString();
  assert.equal((await handler(form(encoded), 'contact')).status, 200);
  assert.equal((await handler(form(encoded + '&consent=off'), 'contact')).status, 400);
  assert.equal((await handler(request(input, { 'content-type': 'multipart/form-data' }), 'contact')).status, 415);
  assert.equal((await handler(request(input, { 'content-encoding': 'gzip' }), 'contact')).status, 415);
});
test('malformed JSON, declared and actual body limits', async () => {
  assert.equal((await local()(request(input, { 'content-length': String(MAX_BODY_BYTES + 1) }), 'contact')).status, 413);
  assert.equal((await local()(request({ ...input, message: 'x'.repeat(MAX_BODY_BYTES) }), 'contact')).status, 413);
  const malformed = request();
  const broken = new Request(malformed, { body: '{' });
  assert.equal((await local()(broken, 'contact')).status, 400);
});
test('concurrent retries match; changed payload or kind conflicts; expiry releases key', async () => {
  let time = 0;
  const handler = createEnquiryHandler({ environment: 'test', now: () => time });
  const key = randomUUID();
  const results = await Promise.all([handler(request(input, {}, key), 'research'), handler(request(input, {}, key), 'research')]);
  assert.deepEqual(await results[0].json(), await results[1].json());
  assert.equal((await handler(request({ ...input, name: 'Different' }, {}, key), 'research')).status, 409);
  assert.equal((await handler(request(input, {}, key), 'campaign')).status, 409);
  time = 600_001;
  assert.equal((await handler(request(input, {}, key), 'campaign')).status, 200);
});
test('local global limiter counts retries, ignores spoofed IP, resets window', async () => {
  let time = 0;
  const handler = createEnquiryHandler({ environment: 'test', now: () => time });
  const key = randomUUID();
  for (let i = 0; i < 30; i++) assert.equal((await handler(request(input, {}, key), 'contact')).status, 200);
  const limited = await handler(request(input, { 'x-forwarded-for': '1.2.3.4' }), 'contact');
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '60');
  time = 60_000;
  assert.equal((await handler(request(), 'contact')).status, 200);
});
test('unified endpoint accepts each explicit kind and rejects absent or invalid kinds', async () => {
  for (const kind of kinds) {
    const res = await local()(request({ ...input, kind }));
    assert.equal(res.status, 200);
    assert.equal((await res.json()).kind, kind);
  }
  for (const body of [input, { ...input, kind: 'sales' }, { ...input, kind: null }, [], null]) {
    assert.equal((await local()(request(body))).status, 422);
  }
});
test('route aliases allow matching kinds but reject conflicting and null kinds', async () => {
  assert.equal((await local()(request({ ...input, kind: 'contact' }), 'contact')).status, 200);
  for (const kind of ['research', null, '']) {
    const res = await local()(request({ ...input, kind }), 'contact');
    assert.equal(res.status, 422);
    assert.deepEqual(await res.json(), { error: 'invalid_kind' });
  }
});
test('unified URL-encoded submission supports frontend contract without multipart', async () => {
  const req = new Request('http://localhost:4321/api/enquiries', { method: 'POST', headers: {
    origin: 'http://localhost:4321', 'idempotency-key': randomUUID(),
  }, body: new URLSearchParams({ ...input, kind: 'research' }) });
  const res = await local()(req);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).kind, 'research');
});
test('native submissions without an idempotency header fail safely', async () => {
  const req = request({ ...input, kind: 'research' });
  req.headers.delete('idempotency-key');
  const res = await local()(req);
  assert.equal(res.status, 400);
  assert.deepEqual(await res.json(), { error: 'invalid_idempotency_key' });
});
test('unified and alias routes share idempotency reservations', async () => {
  const handler = local();
  const key = randomUUID();
  assert.equal((await handler(request({ ...input, kind: 'research' }, {}, key))).status, 200);
  assert.equal((await handler(request(input, {}, key), 'research')).status, 200);
  assert.equal((await handler(request({ ...input, kind: 'campaign' }, {}, key))).status, 409);
});
test('unified endpoint remains closed in nonlocal environments', async () => {
  for (const options of [{}, { environment: 'production', mode: 'mock' }, { environment: 'development', vercelEnvironment: 'preview' }, { environment: 'test', mode: 'disabled' }]) {
    const res = await createEnquiryHandler(options)(request({ ...input, kind: 'contact' }));
    assert.equal(res.status, 503);
    assert.deepEqual(await res.json(), { error: 'service_unavailable' });
  }
});
test('integration adapters are explicit no-ops', async () => {
  const context = { kind: 'campaign' as const, enquiry: enquirySchema.parse(input), correlationId: randomUUID() };
  for (const result of await Promise.all([mockCrm.recordEnquiry(context), mockNotification.notifyTeam(context), mockSmartlead.assessHandoff(context)])) {
    assert.deepEqual(result, { mode: 'mock', performed: false });
  }
});
