/**
 * Resend Email Delivery Service for Islah Web Service Enquiries
 * Secure, server-side only. Sends notification to hello@islahwebservice.com
 * with visitor Reply-To and complete project context.
 */

export interface EnquiryNotificationInput {
  name: string;
  email: string;
  company?: string;
  website?: string;
  message: string;
  source_page?: string;
}

export interface EnquiryNotificationPayload {
  kind: string;
  enquiry: EnquiryNotificationInput;
  idempotencyKey?: string;
}

export interface ResendServiceOptions {
  apiKey?: string;
  fromEmail?: string;
  toEmail?: string;
  fetch?: typeof fetch;
}

export interface SendResult {
  ok: boolean;
  id?: string;
  error?: string;
}

const KIND_LABELS: Record<string, string> = {
  setup: 'One-Time Outbound Setup',
  management: 'Ongoing Campaign Management',
  research: 'B2B Prospect Research & Enrichment',
  consultation: 'Outbound Consultation Request',
  campaign: 'Managed Campaign Consultation',
  contact: 'General Website Enquiry',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return char;
    }
  });
}

function safeUrl(raw: string | undefined): string | null {
  if (!raw || !raw.trim()) return null;
  try {
    const parsed = new URL(raw.trim());
    if (['http:', 'https:'].includes(parsed.protocol)) {
      return parsed.href;
    }
  } catch {}
  return null;
}

export async function sendEnquiryNotification(
  payload: EnquiryNotificationPayload,
  options?: ResendServiceOptions,
): Promise<SendResult> {
  const apiKey = options?.apiKey || process.env.RESEND_API_KEY;
  if (!apiKey || !apiKey.startsWith('re_')) {
    // Return structured failure rather than crashing or leaking details
    return { ok: false, error: 'missing_resend_api_key' };
  }

  const fetchFn = options?.fetch || globalThis.fetch;

  // Verified domain on Resend is islahwebservice.com
  // Senders must use @islahwebservice.com
  const from = options?.fromEmail?.includes('@islahwebservice.com')
    ? options.fromEmail
    : 'Islah Web Service <noreply@islahwebservice.com>';

  // Primary recipient required by specification: hello@islahwebservice.com
  // Include TO_EMAIL if distinctly set in environment
  const recipients = new Set<string>(['hello@islahwebservice.com']);
  const envTo = (options?.toEmail || process.env.TO_EMAIL)?.trim();
  if (envTo && envTo.includes('@') && envTo.length <= 254) {
    recipients.add(envTo);
  }
  const to = Array.from(recipients);

  const { kind, enquiry, idempotencyKey } = payload;
  const kindLabel = KIND_LABELS[kind] ?? kind;
  const companyClean = enquiry.company?.trim() ?? '';
  const websiteClean = safeUrl(enquiry.website);
  const sourceClean = enquiry.source_page?.trim() ?? '/contact';
  const timeString = new Date().toUTCString();

  const subject = `New Website Enquiry: ${kindLabel} from ${enquiry.name}${companyClean ? ` (${companyClean})` : ''}`;

  const textBody = [
    `NEW WEBSITE ENQUIRY - ISLAH WEB SERVICE`,
    `========================================`,
    `Engagement Model: ${kindLabel}`,
    `Contact Name:     ${enquiry.name}`,
    `Business Email:   ${enquiry.email}`,
    `Company:          ${companyClean || 'Not provided'}`,
    `Website:          ${websiteClean || 'Not provided'}`,
    `Source Page:      ${sourceClean}`,
    `Reference Key:    ${idempotencyKey || 'N/A'}`,
    `Timestamp:        ${timeString}`,
    ``,
    `PROJECT MESSAGE / REQUIREMENTS:`,
    `----------------------------------------`,
    enquiry.message,
    `----------------------------------------`,
    ``,
    `Reply directly to this email to respond to the visitor (${enquiry.email}).`,
    `Sent from https://www.islahwebservice.com production enquiry service.`,
  ].join('\n');

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8f8f6; color: #111111;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
    <tr>
      <td style="padding: 28px 32px; background: #111111; color: #ffffff;">
        <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #ff4d1c; text-transform: uppercase;">Islah Web Service</span>
        <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 700; color: #ffffff;">New Commercial Enquiry</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #aaaaaa;">${escapeHtml(kindLabel)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 1.6; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 140px; font-weight: 600; color: #666666;">Engagement</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 700; color: #a72b09;">${escapeHtml(kindLabel)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #666666;">Contact Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #111111; font-weight: 600;">${escapeHtml(enquiry.name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #666666;">Business Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${escapeHtml(enquiry.email)}" style="color: #ff4d1c; text-decoration: none; font-weight: 600;">${escapeHtml(enquiry.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #666666;">Company</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #111111;">${companyClean ? escapeHtml(companyClean) : '<em style="color:#888;">Not provided</em>'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #666666;">Website</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${websiteClean ? `<a href="${websiteClean}" target="_blank" rel="noopener noreferrer" style="color: #ff4d1c; text-decoration: none;">${escapeHtml(websiteClean)}</a>` : '<em style="color:#888;">Not provided</em>'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #666666;">Source Page</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555555; font-family: monospace; font-size: 12px;">${escapeHtml(sourceClean)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #666666;">Reference Key</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888888; font-family: monospace; font-size: 11px;">${escapeHtml(idempotencyKey || 'N/A')}</td>
          </tr>
        </table>

        <div style="margin-top: 28px; padding: 20px; background: #fbfbfb; border: 1px solid #e5e5e5; border-radius: 10px;">
          <h2 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #111111; letter-spacing: 0.05em; text-transform: uppercase;">Project Requirements</h2>
          <div style="font-size: 14px; line-height: 1.7; color: #222222; white-space: pre-wrap; font-family: inherit;">${escapeHtml(enquiry.message)}</div>
        </div>

        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #777777; text-align: center;">
          <p style="margin: 0;">Hit <strong>Reply</strong> to email <a href="mailto:${escapeHtml(enquiry.email)}" style="color: #ff4d1c;">${escapeHtml(enquiry.email)}</a> directly.</p>
          <p style="margin: 6px 0 0; color: #999999;">Submitted on ${escapeHtml(timeString)} via islahwebservice.com</p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetchFn('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: enquiry.email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      console.error('[Resend Service Error]', response.status, errJson);
      return { ok: false, error: 'resend_api_rejected' };
    }

    const result = await response.json().catch(() => ({}));
    return { ok: true, id: result.id };
  } catch (error) {
    console.error('[Resend Service Network Error]', error instanceof Error ? error.message : error);
    return { ok: false, error: 'resend_network_failure' };
  }
}
