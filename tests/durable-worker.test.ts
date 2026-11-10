import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {createEnquiryWorker, retryAt, type ClaimedJob, type WorkerRepository} from '../src/server/worker';
import {ProviderError, type Checkpoint, type ProviderOutbox} from '../src/server/providers';
import {readFileSync} from 'node:fs';
import {createSupabaseWorkerRepository} from '../src/server/worker-supabase';

const payload={enquiryId:'enquiry-00000001',contactExternalId:'contact-00000001',name:'Fictional Person',email:'fictional@example.test',serviceInterest:'general-enquiry' as const,sourcePage:'/contact'};
function memory(types:('crm'|'notification')[]=['crm','notification']){
  let now=0; const checkpoints=new Map<string,Checkpoint>();
  const jobs=types.map((type,index)=>({id:`job-0000000${index}`,type,state:'pending',attempt:0,next:0,leaseUntil:0,leaseToken:'',payload,lastError:''}));
  const repo:WorkerRepository={
    async claimDue({limit,leaseMs,now:time}){now=time;const due=jobs.filter(j=>(j.state==='pending'&&j.next<=time)||(j.state==='processing'&&j.leaseUntil<=time)).slice(0,limit);return due.map(j=>{j.state='processing';j.attempt++;j.leaseUntil=time+leaseMs;j.leaseToken=randomUUID();return {id:j.id,type:j.type,attempt:j.attempt,leaseToken:j.leaseToken,checkpoint:checkpoints.get(j.id),payload} as ClaimedJob;});},
    outbox(job){const outbox:ProviderOutbox={async withLease(_key,work){return work({checkpoint:checkpoints.get(job.id),save:async value=>{checkpoints.set(job.id,{...value});}});}};return outbox;},
    async complete(job){const j=jobs.find(x=>x.id===job.id)!;assert.equal(j.leaseToken,job.leaseToken);j.state='completed';},
    async retry(job,input){const j=jobs.find(x=>x.id===job.id)!;assert.equal(j.leaseToken,job.leaseToken);j.state='pending';j.next=input.nextAttemptAt;j.lastError=input.category;},
    async fail(job,input){const j=jobs.find(x=>x.id===job.id)!;assert.equal(j.leaseToken,job.leaseToken);j.state='failed';j.lastError=input.category;},
  };
  return {repo,jobs,setNow(value:number){now=value;},getNow(){return now;}};
}
const success={crm:{recordEnquiry:async()=>({contactId:'101',dealId:'202'})},notification:{notifyTeam:async()=>({notificationId:'mail-0001'})}};

test('successful jobs complete independently and concurrent claims do not overlap',async()=>{const db=memory();const [a,b]=await Promise.all([db.repo.claimDue({workerId:'worker-001',limit:10,leaseMs:5000,now:0}),db.repo.claimDue({workerId:'worker-002',limit:10,leaseMs:5000,now:0})]);assert.equal(a.length+b.length,2);assert.equal(new Set([...a,...b].map(j=>j.id)).size,2);const db2=memory();const result=await createEnquiryWorker(db2.repo,success,{enabled:true,workerId:'worker-001',now:()=>0}).runOnce();assert.deepEqual(result,{claimed:2,completed:2,retried:0,failed:0});});

test('rate limits retry with bounded backoff while timeout ambiguity requires review',async()=>{const retryDb=memory(['crm']);const retryAdapters={...success,crm:{recordEnquiry:async()=>{throw new ProviderError('retry_later',5000);}}};const result=await createEnquiryWorker(retryDb.repo,retryAdapters,{enabled:true,workerId:'worker-001',now:()=>1000}).runOnce();assert.equal(result.retried,1);assert.equal(retryDb.jobs[0].next,6000);const timeoutDb=memory(['notification']);const timeoutAdapters={...success,notification:{notifyTeam:async()=>{throw new ProviderError('uncertain');}}};const failed=await createEnquiryWorker(timeoutDb.repo,timeoutAdapters,{enabled:true,workerId:'worker-001',now:()=>1000}).runOnce();assert.equal(failed.failed,1);assert.equal(timeoutDb.jobs[0].lastError,'uncertain');});

test('permanent failures and max attempts become reviewable failed jobs',async()=>{const db=memory(['crm']);db.jobs[0].attempt=4;const adapters={...success,crm:{recordEnquiry:async()=>{throw new ProviderError('rejected');}}};const result=await createEnquiryWorker(db.repo,adapters,{enabled:true,workerId:'worker-001',maxAttempts:5,now:()=>0}).runOnce();assert.equal(result.failed,1);assert.equal(db.jobs[0].state,'failed');});

test('expired processing lease recovers after interruption',async()=>{const db=memory(['crm']);const first=await db.repo.claimDue({workerId:'worker-001',limit:1,leaseMs:5000,now:0});assert.equal(first.length,1);assert.equal((await db.repo.claimDue({workerId:'worker-002',limit:1,leaseMs:5000,now:1000})).length,0);const recovered=await db.repo.claimDue({workerId:'worker-002',limit:1,leaseMs:5000,now:5001});assert.equal(recovered.length,1);assert.equal(recovered[0].attempt,2);});

test('Supabase repository composes through RPCs without exposing secrets',async()=>{const calls:{url:string,body:string}[]=[];const fetchMock=async(url:URL|RequestInfo,init?:RequestInit)=>{const body=String(init?.body);calls.push({url:String(url),body});if(String(url).endsWith('/claim_rebuild_enquiry_jobs'))return Response.json([{id:'11111111-1111-4111-8111-111111111111',enquiry_id:'22222222-2222-4222-8222-222222222222',job_type:'crm',attempt_count:1,lease_token:'33333333-3333-4333-8333-333333333333',checkpoint:null,name:'Fictional Person',email:'fictional@example.test',company:'Example Test Ltd',source_page:'/contact',kind:'contact'}]);return Response.json(true);};const repo=createSupabaseWorkerRepository({url:'https://database.example.test',serviceRoleKey:'s'.repeat(40),contactHmacSecret:'h'.repeat(64)},{fetch:fetchMock as typeof fetch});const adapters={...success,crm:{recordEnquiry:async(input:typeof payload,outbox:ProviderOutbox)=>{assert.notEqual(input.contactExternalId,input.email);await outbox.withLease('crm/test',async lease=>{await lease.save({fingerprint:'a'.repeat(64)});return undefined;});return {contactId:'101',dealId:'202'};}}};const result=await createEnquiryWorker(repo,adapters,{enabled:true,workerId:'worker-001',now:()=>0}).runOnce();assert.equal(result.completed,1);assert.equal(calls.length,3);assert.ok(calls.every(call=>!call.body.includes('h'.repeat(64))&&!call.body.includes('s'.repeat(40))));});

test('worker is disabled by default and migration enforces atomic durable contracts',()=>{assert.throws(()=>createEnquiryWorker(memory().repo,success,{workerId:'worker-001'}),error=>error instanceof ProviderError&&error.code==='configuration');assert.equal(retryAt(0,20),3600000);const sql=readFileSync(new URL('../supabase/migrations/0003_durable_outbox.sql',import.meta.url),'utf8');for(const token of ['for update skip locked','lease_expires_at','attempt_count','next_attempt_at','last_error_category','checkpoint_rebuild_enquiry_job'])assert.ok(sql.toLowerCase().includes(token));assert.ok(!/http_post|cron\.schedule|net\./i.test(sql));});
