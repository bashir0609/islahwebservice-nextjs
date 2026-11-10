// This is an editorial gate, not a replacement for dataset permissions.
export const DOCUMENT_TYPES = ['page', 'service', 'industry', 'blogPost', 'caseStudy', 'faq', 'testimonial', 'package', 'navigation', 'siteSettings'];
export const CLAIM_KINDS = ['serviceCapability', 'testimonial', 'metric', 'price'];

export function validTimestamp(value) {
  if (typeof value !== 'string') return false;
  const match = value.match(/^(\d{4}-\d{2}-\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2}))?$/);
  if (!match) return false;
  const day = new Date(`${match[1]}T00:00:00Z`);
  if (!Number.isFinite(day.getTime()) || day.toISOString().slice(0, 10) !== match[1]) return false;
  if (match[2] && (Number(match[2]) > 23 || Number(match[3]) > 59 || Number(match[4]) > 59)) return false;
  return Number.isFinite(Date.parse(value));
}

export function approvalErrors(approval, label = 'Content') {
  const errors = [];
  if (approval?.state !== 'approved') errors.push(`${label}: owner approval required`);
  if (!approval?.evidenceReference?.trim()) errors.push(`${label}: evidence reference required (no customer records or secrets)`);
  if (!approval?.reviewer?.trim()) errors.push(`${label}: reviewer required`);
  if (!validTimestamp(approval?.reviewedAt)) errors.push(`${label}: valid review date required`);
  return errors;
}

export function claimErrors(claim) {
  if (!CLAIM_KINDS.includes(claim?.kind)) return ['Unknown claim kind'];
  const errors = approvalErrors(claim.approval, claim.kind);
  if (!claim.statement?.trim()) errors.push('Claim statement required');
  if (claim.kind === 'price' && claim.statement !== 'Request a quote') {
    errors.push('Prices may only say "Request a quote"; numerical prices must not be published');
  }
  return errors;
}

function containsNumericalPrice(value) {
  if (typeof value === 'string') return /(?:[$€£¥]\s*\d|\b(?:USD|EUR|GBP|CAD|AUD|BDT)\s*\d|\d[\d,.]*\s*(?:USD|EUR|GBP|CAD|AUD|BDT|dollars|euros|pounds)\b)/i.test(value);
  if (Array.isArray(value)) return value.some(containsNumericalPrice);
  if (value && typeof value === 'object') return Object.entries(value).some(([key, child]) => !['migration', 'approval'].includes(key) && containsNumericalPrice(child));
  return false;
}

export function publicationErrors(document) {
  const errors = approvalErrors(document?.approval);
  if (document?.editorialStatus !== 'approved') errors.push('Editorial status must be approved');
  if (document?.migration && document.migration.reconciliation !== 'verified') errors.push('DB vs file reconciliation required');
  if (!document?.approval?.bodyReviewed) errors.push('Review all prose, links and metadata for claims, prices and sensitive data');
  for (const claim of document?.claims ?? []) errors.push(...claimErrors(claim));
  if (document?._type === 'service' && !(document.claims ?? []).some(c => c.kind === 'serviceCapability')) errors.push('Service capabilities need explicit evidence and approval');
  if (document?._type === 'testimonial') {
    if (!document.consentConfirmed) errors.push('Testimonial publication consent required');
    if (!(document.claims ?? []).some(c => c.kind === 'testimonial')) errors.push('Testimonial evidence claim required');
  }
  if (document?._type === 'package') {
    if (document.priceLabel !== 'Request a quote') errors.push('Only Request a quote is allowed; no numerical prices');
    if (!(document.claims ?? []).some(c => c.kind === 'price')) errors.push('Pricing policy evidence and approval required');
  }
  if (containsNumericalPrice(document)) errors.push('Numerical monetary amounts in public content are prohibited; request a quote instead');
  // Reject legacy numeric price fields even when injected outside the schema.
  if (['price', 'amount', 'minPrice', 'maxPrice', 'priceRange', 'currency'].some(key => document?.[key] !== undefined)) errors.push('Structured price fields are forbidden');
  return errors;
}

// Intentionally no publish/schedule/custom actions until a reviewed release workflow exists.
export function foundationActions(actions) {
  return actions.filter(action => ['delete', 'discardChanges', 'restore'].includes(action.action));
}
