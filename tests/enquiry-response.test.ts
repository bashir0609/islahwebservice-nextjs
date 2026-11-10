import test from 'node:test';
import assert from 'node:assert/strict';
import { parseEnquirySuccess } from '../src/components/enquiry-response';

test('accepts truthful mock and persistent success contracts', () => {
  assert.equal(parseEnquirySuccess(200, {ok: true, mode: 'mock', stored: false, delivered: false})?.mode, 'mock');
  assert.equal(parseEnquirySuccess(202, {ok: true, mode: 'persistence', accepted: true, stored: true, queued: true, delivered: false, sent: false})?.mode, 'persistence');
});

test('rejects incomplete, contradictory and unexpected responses', () => {
  for (const [status, body] of [
    [200, {ok: true, mode: 'persistence', stored: true}],
    [202, {ok: true, mode: 'persistence', accepted: true, stored: true, queued: true, delivered: true, sent: false}],
    [200, {ok: true, mode: 'mock', stored: true, delivered: false}],
    [500, {ok: true, mode: 'mock', stored: false, delivered: false}],
    [200, null],
  ] as const) assert.equal(parseEnquirySuccess(status, body), null);
});
