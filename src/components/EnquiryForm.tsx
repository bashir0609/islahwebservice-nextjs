import { useRef, useState, type FormEvent } from 'react';
import FormFeedback from './FormFeedback';
import { parseEnquirySuccess } from './enquiry-response';

export type EnquiryKind = 'research' | 'campaign' | 'contact' | 'consultation' | 'setup' | 'management';

interface EnquiryFormProps {
  kind?: EnquiryKind;
  sourcePage?: string;
}

const VALID_SOURCE_PAGES = new Set([
  '/', '/contact', '/request-sample', '/free-consultation',
  '/b2b-prospect-research', '/contact-enrichment', '/services', '/cold-email-marketing',
  '/email-infrastructure', '/campaign-management', '/appointment-setting',
]);

function resolveSourcePage(provided?: string, fallbackKind?: EnquiryKind): string {
  if (provided && VALID_SOURCE_PAGES.has(provided)) return provided;
  if (typeof window !== 'undefined' && VALID_SOURCE_PAGES.has(window.location.pathname)) {
    return window.location.pathname;
  }
  switch (fallbackKind) {
    case 'setup': return '/services';
    case 'management': return '/campaign-management';
    case 'research': return '/request-sample';
    case 'consultation': return '/free-consultation';
    default: return '/contact';
  }
}

export default function EnquiryForm({ kind = 'contact', sourcePage }: EnquiryFormProps) {
  const [state, setState] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [selectedKind, setSelectedKind] = useState<EnquiryKind>(kind);
  const request = useRef<{ payload: string; key: string } | null>(null);
  const busy = useRef(false);

  const effectiveSource = resolveSourcePage(sourcePage, selectedKind);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const body = new FormData(form);
    const payload = new URLSearchParams(Array.from(body.entries(), ([k, value]) => [k, String(value)])).toString();
    const identity = `${selectedKind}:${payload}`;
    busy.current = true;
    setState('pending');
    setMessage('Submitting your enquiry…');
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      if (!request.current || request.current.payload !== identity) {
        request.current = { payload: identity, key: crypto.randomUUID() };
      }
      const response = await fetch(`/api/${selectedKind}`, {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Idempotency-Key': request.current.key,
          Accept: 'application/json',
        },
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (response.status === 503) {
        setState('error');
        setMessage('Our online enquiry service is temporarily unavailable. Please email us directly at hello@islahwebservice.com. Your entries remain preserved below.');
        return;
      }
      if (response.status === 429) {
        setState('error');
        setMessage('The enquiry submission limit has been reached. Please wait a minute before retrying, or email hello@islahwebservice.com directly.');
        return;
      }
      const success = parseEnquirySuccess(response.status, result);
      if (!response.ok || !success) {
        const errorDetail = (result as { error?: string })?.error;
        throw new Error(errorDetail || 'Unexpected response');
      }
      setState('success');
      setMessage(success.message);
      form.reset();
      request.current = null;
    } catch {
      setState('error');
      setMessage('We could not confirm your enquiry. Your entries are preserved. Please try again, or email us directly at hello@islahwebservice.com.');
    } finally {
      window.clearTimeout(timer);
      busy.current = false;
    }
  }

  const getButtonText = () => {
    if (state === 'pending') return 'Sending enquiry…';
    if (selectedKind === 'setup') return 'Request One-Time Setup';
    if (selectedKind === 'management') return 'Request Ongoing Management';
    if (selectedKind === 'research') return 'Request Prospect Sample';
    if (selectedKind === 'consultation') return 'Request Consultation';
    return 'Send enquiry';
  };

  return (
    <form action={`/api/${selectedKind}`} method="post" onSubmit={submit} className="enquiry-form" aria-busy={state === 'pending'}>
      <p className="notice" id="form-notice">
        Please share your verified business details. We respect your privacy and will never share your information. No marketing emails or automated outreach are sent from this form.
      </p>

      <input type="hidden" name="source_page" value={effectiveSource} />

      {kind === 'contact' ? (
        <label>
          What would you like to discuss?
          <select value={selectedKind} onChange={(event) => setSelectedKind(event.target.value as EnquiryKind)} disabled={state === 'pending'}>
            <option value="contact">General enquiry</option>
            <option value="setup">One-Time Outbound Setup</option>
            <option value="management">Ongoing Campaign Management</option>
            <option value="research">Prospect research & enrichment sample</option>
            <option value="consultation">Outbound strategy consultation</option>
          </select>
        </label>
      ) : null}

      <div className="form-grid">
        <label>
          Name <span>(required)</span>
          <input name="name" autoComplete="name" required maxLength={120} disabled={state === 'pending'} />
        </label>
        <label>
          Business email <span>(required)</span>
          <input name="email" type="email" autoComplete="email" required maxLength={254} disabled={state === 'pending'} />
        </label>
        <label>
          Company <span>(optional)</span>
          <input name="company" autoComplete="organization" maxLength={200} disabled={state === 'pending'} />
        </label>
        <label>
          Website <span>(optional, include https://)</span>
          <input name="website" type="url" autoComplete="url" placeholder="https://example.com" maxLength={2048} disabled={state === 'pending'} />
        </label>
      </div>

      <label>
        Tell us about your project <span>(required)</span>
        <textarea
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={5000}
          aria-describedby="form-notice"
          placeholder={
            selectedKind === 'setup'
              ? 'Tell us about your offer, target market, current email domain setup, and team timeline…'
              : selectedKind === 'management'
              ? 'Tell us about your target accounts, required volume, and sales team capacity for handling leads…'
              : selectedKind === 'research'
              ? 'Describe your ideal customer profile: target industry, geography, company size, and decision-maker job titles…'
              : 'Share your business context, current outbound challenges, or project goals…'
          }
          disabled={state === 'pending'}
        />
      </label>

      <div className="honeypot" aria-hidden="true" style={{ display: 'none' }}>
        <label>
          Leave this field empty
          <input name="website_confirm" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="checkbox">
        <input type="checkbox" name="consent" value="on" required disabled={state === 'pending'} />
        <span>
          I agree to submit these details for this enquiry and have read the <a href="/privacy-policy">privacy notice</a>. This is not consent to marketing.
        </span>
      </label>

      <button className="button primary" type="submit" disabled={state === 'pending'}>
        {getButtonText()}
        <span aria-hidden="true">↗</span>
      </button>

      <FormFeedback state={state} message={message} />

      <noscript>
        <p>
          This contact form requires JavaScript for spam protection. You can also email our team directly at{' '}
          <a href="mailto:hello@islahwebservice.com">hello@islahwebservice.com</a>.
        </p>
      </noscript>
    </form>
  );
}
