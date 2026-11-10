import { activate, createHttp, digest, object, ProviderError, withCheckpoint } from './core';
import type { Activation, Dependencies, ProviderOutbox } from './core';
import { validateJob } from './contracts';
import type { CrmReceipt, ProviderJob } from './contracts';

export const HUBSPOT_PROPERTIES = Object.freeze({
  contactExternalId: 'islah_contact_external_id',
  enquiryExternalId: 'islah_enquiry_external_id',
  serviceInterest: 'islah_service_interest',
  sourcePage: 'islah_source_page',
});
export interface HubSpotConfig extends Activation { pipeline: string; stage: string }
const BASE = 'https://api.hubapi.com';
function recordId(value: unknown): string {
  if (typeof value !== 'string' || !/^\d{1,30}$/.test(value)) throw new ProviderError('uncertain');
  return value;
}
function upsertId(value: unknown): string {
  const result = object(value);
  if (result.status !== 'COMPLETE' || (result.numErrors !== undefined && result.numErrors !== 0) ||
      (Array.isArray(result.errors) && result.errors.length) || !Array.isArray(result.results) || result.results.length !== 1) {
    throw new ProviderError('uncertain');
  }
  return recordId(object(result.results[0]).id);
}
export function createHubSpotAdapter(config: HubSpotConfig, deps: Dependencies = {}) {
  activate(config);
  const { token, pipeline, stage } = config;
  if (![pipeline, stage].every((v) => typeof v === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(v))) {
    throw new ProviderError('configuration');
  }
  const request = createHttp(deps);
  const p = HUBSPOT_PROPERTIES;
  async function verifySchema(): Promise<void> {
    for (const [type, name, unique] of [
      ['contacts', p.contactExternalId, true], ['deals', p.enquiryExternalId, true],
      ['deals', p.serviceInterest, false], ['deals', p.sourcePage, false],
    ] as const) {
      const property = object(await request(`${BASE}/crm/v3/properties/${type}/${name}`, token, 'GET'));
      if (property.name !== name || property.type !== 'string' || property.archived === true ||
          (unique && property.hasUniqueValue !== true) ||
          object(property.modificationMetadata).readOnlyValue !== false) throw new ProviderError('schema');
    }
  }
  async function upsert(type: 'contacts' | 'deals', idProperty: string, id: string, properties: Record<string, string>) {
    return upsertId(await request(`${BASE}/crm/v3/objects/${type}/batch/upsert`, token, 'POST', {
      inputs: [{ id, idProperty, properties: { ...properties, [idProperty]: id } }],
    }));
  }
  return Object.freeze({
    verifySchema,
    async recordEnquiry(input: ProviderJob, outbox: ProviderOutbox): Promise<CrmReceipt> {
      const job = validateJob(input);
      return withCheckpoint(outbox, `hubspot/${job.enquiryId}`, digest({ version: 1, job, pipeline, stage }), async (state, save) => {
        if (state.contactId && state.dealId && state.associated) {
          return { contactId: recordId(state.contactId), dealId: recordId(state.dealId) };
        }
        // Check actual uniqueness before any write; no search-then-create race or unsafe fallback.
        await verifySchema();
        if (!state.contactId) {
          state.contactId = await upsert('contacts', p.contactExternalId, job.contactExternalId, {
            email: job.email, firstname: job.name, ...(job.company ? { company: job.company } : {}),
          });
          await save();
        }
        if (!state.dealId) {
          state.dealId = await upsert('deals', p.enquiryExternalId, job.enquiryId, {
            dealname: `Website enquiry ${job.enquiryId}`, pipeline, dealstage: stage,
            [p.serviceInterest]: job.serviceInterest, [p.sourcePage]: job.sourcePage,
          });
          await save();
        }
        if (!state.associated) {
          await request(`${BASE}/crm/v3/objects/deals/${recordId(state.dealId)}/associations/contacts/${recordId(state.contactId)}/3`, token, 'PUT');
          state.associated = true;
          await save();
        }
        return { contactId: state.contactId, dealId: state.dealId };
      });
    },
  });
}
