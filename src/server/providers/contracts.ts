import { z } from 'zod';
import { ProviderError } from './core';

const id = z.string().regex(/^[a-zA-Z0-9_-]{8,128}$/);
const text = (max: number) => z.string().trim().min(1).max(max)
  .refine((s) => !/[\u0000-\u001f\u007f]/.test(s));
export const providerJobSchema = z.object({
  enquiryId: id,
  // Stable application contact identity, NOT a new ID per enquiry or a raw email.
  contactExternalId: id,
  name: text(120),
  email: z.string().trim().email().max(254),
  company: text(200).optional(),
  serviceInterest: z.enum(['prospect-research', 'database-enrichment', 'general-enquiry']),
  // Server-derived canonical path only: never query strings, fragments, or form URLs.
  sourcePage: z.string().max(200).regex(/^\/(?:[a-z0-9-]+\/?)*$/),
}).strict();
export type ProviderJob = z.infer<typeof providerJobSchema>;
export function validateJob(job: ProviderJob): ProviderJob {
  const parsed = providerJobSchema.safeParse(job);
  if (!parsed.success) throw new ProviderError('invalid_job');
  return parsed.data;
}
export interface CrmReceipt { contactId: string; dealId: string }
export interface NotificationReceipt { notificationId: string }
