import { useRef, useState, type FormEvent } from 'react';
import FormFeedback from './FormFeedback';
import { parseEnquirySuccess } from './enquiry-response';
type Kind = 'research' | 'campaign' | 'contact' | 'consultation';
export default function EnquiryForm({ kind = 'contact' }: { kind?: Kind }) {
  const [state, setState] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [selectedKind, setSelectedKind] = useState<Kind>(kind);
  const request = useRef<{ payload: string; key: string } | null>(null);
  const busy = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const body = new FormData(form);
    const payload = new URLSearchParams(Array.from(body.entries(), ([key, value]) => [key, String(value)])).toString();
    const identity = `${selectedKind}:${payload}`;
    busy.current = true;
    setState('pending'); setMessage('Submitting your preview enquiry…');
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      if (!request.current || request.current.payload !== identity) request.current = { payload: identity, key: crypto.randomUUID() };
      const response = await fetch(`/api/${selectedKind}`, { method: 'POST', body: payload, headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Idempotency-Key': request.current.key, Accept: 'application/json' }, signal: controller.signal });
      const result = await response.json();
      if (response.status === 503) {
        setState('error'); setMessage('Preview submissions are disabled in this deployed environment. Nothing has been sent or stored by the enquiry service. Your entries remain here.');
        return;
      }
      if (response.status === 429) {
        setState('error'); setMessage('The preview request limit has been reached. Wait a minute before retrying. Your entries remain here.');
        return;
      }
      const success = parseEnquirySuccess(response.status, result);
      if (!response.ok || !success) throw new Error('Unexpected response');
      setState('success');
      setMessage(success.message);
      form.reset(); request.current = null;
    } catch {
      setState('error'); setMessage('We could not confirm your preview enquiry. Your entries are still here. Please try again; a retry of the same enquiry uses the same request key.');
    } finally { window.clearTimeout(timer); busy.current = false; }
  }
  return <form action={`/api/${selectedKind}`} method="post" onSubmit={submit} className="enquiry-form" aria-busy={state === 'pending'}>
    <p className="notice" id="form-preview">Local test form only. Do not include confidential records, passwords or sensitive personal information. No outbound campaign is connected.</p>
    {kind === 'contact' ? <label>What would you like to discuss?<select value={selectedKind} onChange={(event) => setSelectedKind(event.target.value as Kind)} disabled={state === 'pending'}><option value="contact">General enquiry</option><option value="research">Prospect research or enrichment</option><option value="campaign">Managed campaign consultation</option><option value="consultation">Consultation</option></select></label> : null}
    <div className="form-grid"><label>Name <span>(required)</span><input name="name" autoComplete="name" required maxLength={120} /></label><label>Business email <span>(required)</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label><label>Company <span>(optional)</span><input name="company" autoComplete="organization" maxLength={200} /></label><label>Website <span>(optional, include https://)</span><input name="website" type="url" autoComplete="url" placeholder="https://example.com" maxLength={2048} /></label></div>
    <label>Tell us about your project <span>(required)</span><textarea name="message" rows={6} required minLength={10} maxLength={5000} aria-describedby="form-preview" /></label>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website_confirm" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="checkbox"><input type="checkbox" name="consent" value="on" required /><span>I agree to submit these details for this enquiry and have read the <a href="/privacy-policy">draft privacy notice</a>. This is not consent to marketing.</span></label>
    <button className="button primary" type="submit" disabled={state === 'pending'}>{state === 'pending' ? 'Submitting…' : 'Submit test enquiry'}<span aria-hidden="true">↗</span></button>
    <FormFeedback state={state} message={message} />
    <noscript><p>This local test form requires JavaScript to attach a secure request key. Without JavaScript, submissions will be rejected; no enquiry will be sent.</p></noscript>
  </form>;
}
