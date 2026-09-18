import { spawn, execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { parseDocument } from 'htmlparser2';
import { visualCheck } from './machine-visual.mjs';
const base = 'http://localhost:3100';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3100'], { stdio: ['ignore','pipe','pipe'] });
let serverLog = '';
server.stdout.on('data', d => { serverLog += d; });
server.stderr.on('data', d => { serverLog += d; });
const lines = [], failures = [];
const log = s => { lines.push(s); console.log(s); };
const assert = (ok,s) => { if(!ok) failures.push(s); };
const norm = p => p.replace(/\/$/,'') || '/';
function all(node, test) { return [...(test(node) ? [node] : []), ...(node.children || []).flatMap(n=>all(n,test))]; }
function text(n, sep='') { return n.type === 'text' ? n.data : (n.children || []).map(c=>text(c,sep)).join(sep); }
const count = (s,re) => [...s.matchAll(re)].length;
async function get(path, accept='text/html') { const r=await fetch(base+path,{headers:{Accept:accept,'User-Agent':'Mozilla/5.0'},signal:AbortSignal.timeout(30000)}); return {r, body:await r.text()}; }
try {
  for(let i=0;i<90;i++){try{await get('/robots.txt');break;}catch{await new Promise(r=>setTimeout(r,1000));}}
  const sitemap = await get('/sitemap.xml');
  const paths = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>norm(new URL(m[1]).pathname));
  assert(paths.length>=52, `Expected at least 52 sitemap URLs, got ${paths.length}`);
  const names=['Sarah Chen','Marcus Webb','David Okafor','Emily Turner','Apex Manufacturing','Harborview Properties','Brightline SaaS','Cascade Dental Group'];
  const hits=Object.fromEntries(names.map(n=>[n,0]));
  const stats={static:{pages:0,adjacent:0,pattern:0,links:0,entities:0},dynamic:{pages:0,adjacent:0,pattern:0,links:0,entities:0}};
  const graph=new Map(), headings=[], htmlErrors=[], mdErrors=[], varyErrors=[];
  let inbound=0, titlesLong=0, descriptionsGood=0;
  mkdirSync('.next/machine-check',{recursive:true});
  log('b. Markdown quality: route | longest line | adjacent links | )]( | ]( | entities');
  for(const path of paths){
    const md=await get(path,'text/markdown');
    if(md.r.status!==200 || !md.r.headers.get('content-type')?.includes('text/markdown'))mdErrors.push(path+': '+md.r.status);
    assert(md.body.includes('url: https://www.islahwebservice.com'+(path==='/'?'/':path)+'\n'), 'Markdown canonical '+path);
    names.forEach(n=>{if(md.body.includes(n))hits[n]++;});
    const group=/^\/(blog|portfolio)\//.test(path)?'dynamic':'static';
    const metrics={adjacent:count(md.body,/\)\[/g),pattern:count(md.body,/\)\]\(/g),links:count(md.body,/\]\(/g),entities:count(md.body,/&(amp|lt|gt|quot|nbsp);|&#39;/g)};
    stats[group].pages++;
    Object.keys(metrics).forEach(k=>stats[group][k]+=metrics[k]);
    log(`${path} | ${Math.max(...md.body.split('\n').map(l=>l.length))} | ${metrics.adjacent} | ${metrics.pattern} | ${metrics.links} | ${metrics.entities}`);
    if(path==='/' || path==='/services')writeFileSync('.next/machine-check/'+(path==='/'?'home':'services')+'.md',md.body);
    const html=await get(path);
    const doc=parseDocument(html.body); const tags=name=>all(doc,n=>n.name===name);
    const title=text(tags('title')[0]||{}); const desc=tags('meta').find(n=>n.attribs.name==='description')?.attribs.content||'';
    titlesLong+=title.length>60?1:0; descriptionsGood+=desc.length>=120&&desc.length<=165?1:0;
    const canonical=tags('link').find(n=>n.attribs.rel==='canonical')?.attribs.href;
    const bodyPart=html.body.slice(html.body.indexOf('<body'));
    if(html.r.status!==200||tags('h1').length!==1||canonical?.replace(/\/$/,'')!==('https://www.islahwebservice.com'+(path==='/'?'':path))||/<meta\b/i.test(bodyPart))htmlErrors.push(path+': status='+html.r.status+' h1='+tags('h1').length+' canonical='+canonical+' bodyMeta='+/<meta\b/i.test(bodyPart));
    if(!md.r.headers.get('vary')?.toLowerCase().includes('accept')||!html.r.headers.get('vary')?.toLowerCase().includes('accept'))varyErrors.push(path);
    const links=tags('a').map(n=>{try{const u=new URL(n.attribs.href,'https://www.islahwebservice.com'+path);return u.origin==='https://www.islahwebservice.com'?norm(u.pathname):null;}catch{return null;}}).filter(Boolean);
    inbound+=links.filter(p=>p==='/services').length; graph.set(path,links);
    for(const h of all(doc,n=>/^h[1-6]$/.test(n.name||''))){const a=text(h).trim().split(/\s+/).length,b=text(h,' ').trim().split(/\s+/).length;if(a!==b)headings.push(`${path} ${h.name}: ${text(h)} (${a} vs ${b})`);}
  }
  log('a. Demo name files: '+JSON.stringify(hits)); assert(Object.values(hits).every(v=>v===0),'Demo leakage');
  log('Markdown coverage: '+(paths.length-mdErrors.length)+'/'+paths.length+'; failures: '+JSON.stringify(mdErrors)); assert(!mdErrors.length,'Markdown HTTP failures');
  log('b. Static/dynamic totals: '+JSON.stringify(stats));assert(Object.values(stats).every(s=>s.entities===0&&s.adjacent===0),'Markdown entities/fusions');
  const dates=[...sitemap.body.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(m=>m[1]);
  log(`c. Sitemap URLs=${paths.length}; lastmod=${dates.length}; distinct=${JSON.stringify([...new Set(dates)])}; oldest=${dates.sort()[0]||'none'}; omitted by approved policy`);assert(!dates.length,'Unreliable lastmod remains');
  const llms=await get('/llms.txt');const urls=[...llms.body.matchAll(/https:\/\/www\.islahwebservice\.com[^\s)]*/g)].map(m=>norm(new URL(m[0]).pathname));
  const notes=['## Notes','- Research is scoped per project. Pricing is criteria-dependent; request a quote.','- We do not run outreach or deliver booked meetings.','- Contact: hello@islahwebservice.com'];
  const notesOk=notes.every(n=>llms.body.includes(n));
  const detailPaths=paths.filter(p=>/^\/(blog|portfolio)\//.test(p)&&!/^\/blog\/page\/\d+$/.test(p));
  const annotated=detailPaths.every(p=>llms.body.split('\n').some(l=>l.includes('https://www.islahwebservice.com'+p+' — ')&&l.split(' — ').at(-1).trim()));
  const old=execFileSync('git',['--no-pager','show','HEAD:app/llms.txt/route.ts'],{encoding:'utf8'});
  const oldUrls=[...old.matchAll(/https:\/\/www\.islahwebservice\.com[^\s)]*/g)].map(m=>norm(new URL(m[0]).pathname));
  log(`d. llms.txt bytes=${Buffer.byteLength(llms.body)}; distinct URLs=${new Set(urls).size}; Notes=${notesOk}; detail annotations=${annotated}; previous URLs=${new Set(oldUrls).size}`);
  log('Added: '+paths.filter(p=>!oldUrls.includes(p)).join(', '));
  assert(notesOk&&annotated&&new Set(urls).size===paths.length&&paths.every(p=>urls.includes(p)),'llms index');
  const full=await get('/llms-full.txt');log(`llms-full status=${full.r.status}; bytes=${Buffer.byteLength(full.body)}`);assert(full.r.status===200&&Buffer.byteLength(full.body)<=1048576&&!names.some(n=>full.body.includes(n)),'llms full');
  const depths=new Map([['/',0]]),queue=['/'];for(let i=0;i<queue.length;i++)for(const p of graph.get(queue[i])||[])if(paths.includes(p)&&!depths.has(p)){depths.set(p,depths.get(queue[i])+1);queue.push(p);}
  const dist={};for(const d of depths.values())dist[d]=(dist[d]||0)+1;
  log(`e. services inbound anchors=${inbound}; BFS=${depths.size}/${paths.length}; depth distribution=${JSON.stringify(dist)}`);assert(inbound>=2&&depths.size===paths.length,'Reachability');
  log(`f. HTML valid=${paths.length-htmlErrors.length}/${paths.length}; failures=${JSON.stringify(htmlErrors)}; titles >60=${titlesLong}; descriptions 120–165=${descriptionsGood}/${paths.length}`);assert(!htmlErrors.length&&titlesLong===0&&descriptionsGood===paths.length,'HTML/metadata');
  log('Vary Accept failures: '+JSON.stringify(varyErrors));assert(!varyErrors.length,'Vary Accept');
  await visualCheck(base, log, assert);
  log('h. Heading junction differences:\n'+headings.join('\n'));
  log('Automated failures: '+JSON.stringify(failures));
  writeFileSync('.next/machine-check/report.txt',lines.join('\n'));
  process.exitCode=failures.length?1:0;
} catch(e){console.error(e);process.exitCode=1;} finally {server.kill();writeFileSync('.next/machine-check-server.log',serverLog);}
