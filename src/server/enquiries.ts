import { createHmac, randomBytes } from 'node:crypto';
import { z } from 'zod';
import { PersistenceUnavailable, type EnquiryPersistence } from './persistence';

export const kinds = ['research', 'campaign', 'contact', 'consultation'] as const;
export type EnquiryKind = (typeof kinds)[number];
const text = (min: number, max: number) => z.string().trim().min(min).max(max)
  .refine((value) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value));
// CRM provenance is a bounded page path, never an arbitrary URL/referrer/query string.
export const sourcePages = ['/', '/contact', '/request-sample', '/free-consultation',
  '/b2b-prospect-research', '/contact-enrichment', '/services', '/cold-email-marketing',
  '/email-infrastructure', '/campaign-management', '/appointment-setting'] as const;
export const enquirySchema = z.object({
  source_page: z.enum(sourcePages).optional(),
  name: text(1, 120),
  email: z.string().trim().max(254).email(),
  company: text(0, 200).default(''),
  website: z.string().trim().max(2048).refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
    } catch { return false; }
  }).default(''),
  message: text(10, 5000),
  consent: z.literal('on'),
  website_confirm: z.string().max(0).default(''),
}).strict();
export type EnquiryInput = z.infer<typeof enquirySchema>;
export const MAX_BODY_BYTES = 32_768;
const TTL = 10 * 60_000;
const MAX_ENTRIES = 1000;
const MAX_REQUESTS = 30;
const WINDOW = 60_000;

class HttpError extends Error {
  constructor(readonly status: number, readonly code: string) { super(code); }
}
function response(status: number, body: object, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers: {
    'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff', ...extra,
  } });
}
async function readInput(request: Request): Promise<unknown> {
  const encoding = request.headers.get('content-encoding');
  if (encoding && encoding !== 'identity') throw new HttpError(415, 'unsupported_encoding');
  const type = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  if (type !== 'application/json' && type !== 'application/x-www-form-urlencoded') {
    throw new HttpError(415, 'unsupported_media_type');
  }
  const declared = request.headers.get('content-length');
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > MAX_BODY_BYTES)) {
    throw new HttpError(413, 'body_too_large');
  }
  if (!request.body) throw new HttpError(400, 'invalid_body');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  // Bound both stalled reads and chunked payloads, independently of Content-Length.
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new HttpError(408, 'body_timeout'));
      void reader.cancel().catch(() => {});
    }, 5000);
  });
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        void reader.cancel().catch(() => {});
        throw new HttpError(413, 'body_too_large');
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    let raw: string;
    try { raw = new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
    catch { throw new HttpError(400, 'invalid_body'); }
    if (type === 'application/json') {
      try { return JSON.parse(raw); } catch { throw new HttpError(400, 'invalid_body'); }
    }
    const fields: Record<string, string> = Object.create(null);
    for (const [key, value] of new URLSearchParams(raw)) {
      if (Object.hasOwn(fields, key)) throw new HttpError(400, 'duplicate_field');
      fields[key] = value;
    }
    return fields;
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}

export interface HandlerOptions {
  environment?: string;
  vercelEnvironment?: string;
  mode?: string;
  now?: () => number;
  /** Explicit server capability; runtime only supplies this after its separate approval gates. */
  persistence?: EnquiryPersistence;
  canonicalOrigin?: string;
}

/** Defaults to local mock. Persistent operation requires an explicitly supplied server capability. */
export function createEnquiryHandler(options: HandlerOptions = {}) {
  const now = options.now ?? Date.now;
  const secret = randomBytes(32);
  const digest = (value: string) => createHmac('sha256', secret).update(value).digest('hex');
  const entries = new Map<string, { fingerprint: string; expires: number }>();
  let windowStart = now();
  let requests = 0;
  return async (request: Request, routeKind?: EnquiryKind): Promise<Response> => {
    try {
      if (request.method !== 'POST') return response(405, { error: 'method_not_allowed' }, { Allow: 'POST' });
      // Unknown environments are closed too. Vercel previews are not local mocks.
      const persistent = options.mode === 'persistence' && options.persistence && options.canonicalOrigin;
      if (!persistent && (!['development', 'test'].includes(options.environment ?? '') || options.vercelEnvironment ||
          (options.mode !== undefined && options.mode !== 'mock'))) {
        throw new HttpError(503, 'service_unavailable');
      }
      if (routeKind !== undefined && !kinds.includes(routeKind)) throw new HttpError(404, 'not_found');
      const origin = request.headers.get('origin');
      if (!origin || origin !== new URL(request.url).origin ||
          (persistent && origin !== options.canonicalOrigin) ||
          ![null, 'same-origin'].includes(request.headers.get('sec-fetch-site'))) {
        throw new HttpError(403, 'origin_not_allowed');
      }
      const time = now();
      if (time - windowStart >= WINDOW) { windowStart = time; requests = 0; }
      // One global process-local budget: no spoofable forwarded IP and no unbounded IP map.
      if (!persistent && ++requests > MAX_REQUESTS) return response(429, { error: 'rate_limited' }, { 'Retry-After': '60' });
      const key = request.headers.get('idempotency-key');
      if (!key || !z.string().uuid().safeParse(key).success) throw new HttpError(400, 'invalid_idempotency_key');
      const raw = await readInput(request);
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new HttpError(422, 'invalid_fields');
      const { kind: bodyKind, ...fields } = raw as Record<string, unknown>;
      const selectedKind = z.enum(kinds).safeParse(Object.hasOwn(raw, 'kind') ? bodyKind : routeKind);
      if (!selectedKind.success || (routeKind !== undefined && selectedKind.data !== routeKind)) {
        throw new HttpError(422, 'invalid_kind');
      }
      const kind = selectedKind.data;
      const parsed = enquirySchema.safeParse(fields);
      if (!parsed.success) throw new HttpError(422, 'invalid_fields');
      if (persistent) {
        if (!parsed.data.source_page) throw new HttpError(422, 'invalid_fields');
        const outcome = await options.persistence!.persist({ kind, enquiry: parsed.data, idempotencyKey: key });
        if (outcome === 'conflict') throw new HttpError(409, 'idempotency_conflict');
        if (outcome === 'rate_limited') return response(429, { error: 'rate_limited' }, { 'Retry-After': '60' });
        return response(202, {
          ok: true, mode: 'persistence', kind, accepted: true, stored: true,
          queued: true, delivered: false, sent: false,
          message: 'Your enquiry has been stored and queued for review. No notification, outreach or consultation booking has been sent or created.',
        });
      }
      const fingerprint = digest(JSON.stringify([kind, parsed.data]));
      const keyHash = digest(key.toLowerCase());
      for (const [storedKey, entry] of entries) if (entry.expires <= time) entries.delete(storedKey);
      const existing = entries.get(keyHash);
      if (existing && existing.fingerprint !== fingerprint) throw new HttpError(409, 'idempotency_conflict');
      if (!existing) {
        if (entries.size >= MAX_ENTRIES) throw new HttpError(503, 'mock_capacity_reached');
        // No await between lookup and insertion: concurrent calls cannot overwrite a reservation.
        entries.set(keyHash, { fingerprint, expires: time + TTL });
      }
      return response(200, {
        ok: true, mode: 'mock', kind, stored: false, delivered: false,
        message: 'Mock validation only. Your enquiry has not been stored or sent. No email or consultation booking was created.',
      });
    } catch (error) {
      // Never serialize validation details, input, exceptions, email addresses or keys.
      if (error instanceof HttpError) return response(error.status, { error: error.code });
      if (error instanceof PersistenceUnavailable) return response(503, { error: 'service_unavailable' });
      return response(500, { error: 'internal_error' });
    }
  };
}
