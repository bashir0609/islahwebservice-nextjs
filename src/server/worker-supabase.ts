import {createHmac} from 'node:crypto';
import {z} from 'zod';
import {ProviderError} from './providers';
import type {Checkpoint, ProviderOutbox} from './providers';
import type {ClaimedJob, ErrorCategory, WorkerRepository} from './worker';

const configSchema = z.object({url: z.url(), serviceRoleKey: z.string().min(32).max(4096), contactHmacSecret: z.string().min(32).max(1024)}).strict();
const claimSchema = z.array(z.object({id:z.uuid(),enquiry_id:z.uuid(),job_type:z.enum(['crm','notification']),attempt_count:z.number().int().min(1).max(10),lease_token:z.uuid(),checkpoint:z.record(z.string(),z.unknown()).nullable(),name:z.string(),email:z.email(),company:z.string(),source_page:z.string(),kind:z.enum(['research','campaign','contact','consultation'])}).strict()).max(50);

export function createSupabaseWorkerRepository(input: z.input<typeof configSchema>, dependencies: {fetch: typeof fetch} = {fetch: globalThis.fetch}): WorkerRepository {
  const parsed = configSchema.safeParse(input);
  if (!parsed.success) throw new ProviderError('configuration');
  const config = parsed.data, base = new URL(config.url);
  if (base.protocol !== 'https:' || base.pathname !== '/' || base.search || base.hash || base.username || base.password) throw new ProviderError('configuration');
  const headers = {'Content-Type':'application/json',apikey:config.serviceRoleKey,Authorization:`Bearer ${config.serviceRoleKey}`};
  const checkpoints = new Map<string, Checkpoint>();
  async function rpc(name:string, body:object) {
    try {
      const response = await dependencies.fetch(new URL(`/rest/v1/rpc/${name}`, base), {method:'POST',headers,body:JSON.stringify(body),redirect:'error',cache:'no-store',signal:AbortSignal.timeout(5000)});
      if (!response.ok) throw new ProviderError('storage');
      return await response.json();
    } catch (error) { if (error instanceof ProviderError) throw error; throw new ProviderError('storage'); }
  }
  const contactId = (email:string) => createHmac('sha256',config.contactHmacSecret).update(email.trim().toLowerCase()).digest('hex');
  async function update(job:ClaimedJob,state:'pending'|'completed'|'failed',error:ErrorCategory|null,next:string|null,checkpoint:unknown) {
    const changed = await rpc('update_rebuild_enquiry_job',{p_id:job.id,p_lease:job.leaseToken,p_state:state,p_error:error,p_next:next,p_checkpoint:checkpoint});
    if (changed !== true) throw new ProviderError('storage');
  }
  const repository: WorkerRepository = {
    async claimDue({workerId,limit,leaseMs}) {
      const raw = await rpc('claim_rebuild_enquiry_jobs',{p_worker:workerId,p_limit:limit,p_lease_seconds:Math.ceil(leaseMs/1000)});
      const rows = claimSchema.safeParse(raw); if (!rows.success) throw new ProviderError('storage');
      return rows.data.map(row => { const checkpoint=(row.checkpoint??undefined) as Checkpoint|undefined; if(checkpoint)checkpoints.set(row.id,checkpoint); const serviceInterest = row.kind === 'research' ? 'prospect-research' as const : 'general-enquiry' as const; return ({id:row.id,type:row.job_type,attempt:row.attempt_count,leaseToken:row.lease_token,checkpoint,payload:{enquiryId:row.enquiry_id,contactExternalId:contactId(row.email),name:row.name,email:row.email,...(row.company?{company:row.company}:{}),serviceInterest,sourcePage:row.source_page}}); });
    },
    outbox(job) {
      let used=false;
      const outbox:ProviderOutbox={async withLease(_key,work){if(used)throw new ProviderError('storage');used=true;return work({checkpoint:checkpoints.get(job.id)??job.checkpoint,save:async checkpoint=>{const changed=await rpc('checkpoint_rebuild_enquiry_job',{p_id:job.id,p_lease:job.leaseToken,p_checkpoint:checkpoint});if(changed!==true)throw new ProviderError('storage');checkpoints.set(job.id,{...checkpoint});}});}};
      return outbox;
    },
    async complete(job,receipt,now){await update(job,'completed',null,null,{...(checkpoints.get(job.id)??job.checkpoint??{}),receipt,completedAt:now});checkpoints.delete(job.id);},
    async retry(job,{category,nextAttemptAt}){await update(job,'pending',category,new Date(nextAttemptAt).toISOString(),checkpoints.get(job.id)??job.checkpoint??{});checkpoints.delete(job.id);},
    async fail(job,{category}){await update(job,'failed',category,null,checkpoints.get(job.id)??job.checkpoint??{});checkpoints.delete(job.id);},
  };
  return Object.freeze(repository);
}
