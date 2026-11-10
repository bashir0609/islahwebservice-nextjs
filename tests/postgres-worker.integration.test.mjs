import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const connection = process.env.LOCAL_TEST_DATABASE_URL;
const allowed = (() => {
  if (!connection) return false;
  try { const url=new URL(connection); return ['127.0.0.1','localhost'].includes(url.hostname) && /(?:test|disposable)/i.test(url.pathname); }
  catch { return false; }
})();

async function setup() {
  if (!allowed) throw new Error('LOCAL_TEST_DATABASE_URL must target localhost and a database name containing test or disposable');
  const {default:pg}=await import('pg');
  const admin=new pg.Client({connectionString:connection,application_name:'rebuild-disposable-worker-test'}); await admin.connect();
  await admin.query("do $$ begin create role anon; exception when duplicate_object then null; end $$; do $$ begin create role authenticated; exception when duplicate_object then null; end $$; do $$ begin create role service_role; exception when duplicate_object then null; end $$;");
  for(const signature of ['persist_rebuild_enquiry(jsonb,text,text,text,text,jsonb)','claim_rebuild_enquiry_jobs(text,integer,integer)','update_rebuild_enquiry_job(uuid,uuid,text,text,timestamptz,jsonb)','checkpoint_rebuild_enquiry_job(uuid,uuid,jsonb)']) await admin.query(`drop function if exists public.${signature} cascade`);
  await admin.query('drop schema if exists rebuild_private cascade');
  const migrations=await Promise.all([1,2,3].map(async n=>readFile(new URL(`../supabase/migrations/000${n}_${['enquiry_foundation','enquiry_persistence','durable_outbox'][n-1]}.sql`,import.meta.url),'utf8')));
  await admin.query(migrations[0]); await admin.query(migrations[1]);
  const payload={kind:'contact',name:'Fictional Person',email:'fictional@example.test',company:'Example Test Ltd',website:'https://example.test',message:'Fictional local database integration request.',consent:'on',source_page:'/contact'};
  const retention={enquiryDays:30,consentDays:30,auditDays:30,outboxDays:7,idempotencyHours:24};
  const persist=async(client,key,request,p=payload)=>client.query('select public.persist_rebuild_enquiry($1,$2,$3,$4,$5,$6) result',[p,key,request,'v1','test-policy',retention]);
  await persist(admin,'a'.repeat(64),'b'.repeat(64));
  await admin.query(migrations[2]);
  return {pg,admin,payload,retention,persist};
}

test('PostgreSQL transactional outbox, claims, fencing and recovery', {skip:!allowed}, async()=>{
  const {pg,admin,payload,persist}=await setup();
  const workerA=new pg.Client({connectionString:connection}); const workerB=new pg.Client({connectionString:connection});
  try {
    const legacy=await admin.query("select state,count(*)::int count from rebuild_private.enquiry_outbox group by state");
    assert.deepEqual(legacy.rows,[{state:'blocked',count:2}]);
    const accepted=await persist(admin,'c'.repeat(64),'d'.repeat(64),payload);
    assert.equal(accepted.rows[0].result.outcome,'accepted');
    const duplicate=await persist(admin,'c'.repeat(64),'d'.repeat(64),payload);
    assert.equal(duplicate.rows[0].result.outcome,'duplicate');
    assert.equal(Number((await admin.query("select count(*) from rebuild_private.enquiries where email='fictional@example.test'")).rows[0].count),2);
    assert.equal(Number((await admin.query("select count(*) from rebuild_private.enquiry_outbox where state='pending'")).rows[0].count),2);
    await workerA.connect(); await workerB.connect(); await workerA.query('set role service_role'); await workerB.query('set role service_role');
    const [a,b]=await Promise.all([workerA.query("select * from public.claim_rebuild_enquiry_jobs('worker-aaa',1,60)"),workerB.query("select * from public.claim_rebuild_enquiry_jobs('worker-bbb',1,60)")]);
    assert.equal(a.rowCount,1); assert.equal(b.rowCount,1); assert.notEqual(a.rows[0].id,b.rows[0].id);
    const job=a.rows[0];
    const fenced=await workerA.query("select public.update_rebuild_enquiry_job($1,gen_random_uuid(),'completed',null,null,'{}') changed",[job.id]); assert.equal(fenced.rows[0].changed,false);
    await admin.query("update rebuild_private.enquiry_outbox set lease_expires_at=clock_timestamp()-interval '1 second' where id=$1",[job.id]);
    const recovered=await workerA.query("select * from public.claim_rebuild_enquiry_jobs('worker-aaa',1,60)"); assert.equal(recovered.rows[0].id,job.id); assert.equal(recovered.rows[0].attempt_count,2);
    const retry=await workerA.query("select public.update_rebuild_enquiry_job($1,$2,'pending','retry_later',clock_timestamp()+interval '1 hour','{}') changed",[recovered.rows[0].id,recovered.rows[0].lease_token]); assert.equal(retry.rows[0].changed,true);
    assert.equal((await workerA.query("select count(*)::int count from public.claim_rebuild_enquiry_jobs('worker-aaa',10,60)")).rows[0].count,0);
    const other=b.rows[0]; const failed=await workerB.query("select public.update_rebuild_enquiry_job($1,$2,'failed','rejected',null,'{}') changed",[other.id,other.lease_token]); assert.equal(failed.rows[0].changed,true);
    assert.equal((await admin.query("select state from rebuild_private.enquiry_outbox where id=$1",[other.id])).rows[0].state,'failed');
  } finally {await workerA.end().catch(()=>{});await workerB.end().catch(()=>{});await admin.end();}
});

test('PostgreSQL migration permissions and RLS deny public roles', {skip:!allowed}, async()=>{
  const {admin}=await setup();
  try {
    const functions=await admin.query("select routine_name from information_schema.routines where routine_schema='public' and routine_name like '%rebuild_enquiry%'"); assert.ok(functions.rowCount>=3);
    await admin.query('set role anon'); await assert.rejects(admin.query('select * from rebuild_private.enquiries')); await admin.query('reset role');
    const forced=await admin.query("select relname,relforcerowsecurity from pg_class join pg_namespace on pg_namespace.oid=relnamespace where nspname='rebuild_private'"); assert.ok(forced.rows.every(row=>row.relforcerowsecurity));
  } finally {await admin.end();}
});
