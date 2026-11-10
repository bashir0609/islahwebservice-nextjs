export type EnquirySuccess = { mode: 'mock' | 'persistence' | 'delivered'; message: string };

export function parseEnquirySuccess(status: number, value: unknown): EnquirySuccess | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  if (status === 200 && body.ok === true && (body.delivered === true || body.mode === 'delivered')) {
    return {
      mode: 'delivered',
      message: typeof body.message === 'string'
        ? body.message
        : 'Thank you! Your enquiry has been sent to our team at hello@islahwebservice.com. We will review your requirements and respond within one business day.',
    };
  }
  if (status === 200 && body.ok === true && body.mode === 'mock' && body.stored === false && body.delivered === false) {
    return {mode: 'mock', message: 'Mock validation complete. Your enquiry has not been stored or sent. No email, appointment or service delivery was created.'};
  }
  if (status === 202 && body.ok === true && body.mode === 'persistence' && body.accepted === true && body.stored === true && body.queued === true && body.delivered === false && body.sent === false) {
    return {mode: 'persistence', message: 'Your enquiry was securely received and queued for review. No notification, appointment or campaign delivery has been confirmed.'};
  }
  return null;
}
