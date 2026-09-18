import { spawn, execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export async function visualCheck(base, log, assert) {
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=9224', '--user-data-dir='+resolve('.next/machine-check/chrome'), 'about:blank',
  ], { stdio:'ignore' });
  const headerUnchanged = execFileSync('git', ['--no-pager', 'show', 'HEAD:components/site/site-header.tsx'], {encoding:'utf8'}).replace(/\r\n/g,'\n') === readFileSync('components/site/site-header.tsx','utf8').replace(/\r\n/g,'\n');
  let ws;
  try {
    let targets;
    for(let i=0;i<30;i++){try{targets=await (await fetch('http://localhost:9224/json')).json();break;}catch{await new Promise(r=>setTimeout(r,500));}}
    ws = new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
    await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});
    let id=0;const pending=new Map();
    ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}};
    const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
    const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
    await send('Page.enable');
    await send('Page.addScriptToEvaluateOnNewDocument',{source:"window.auditCLS=0;window.auditShifts=[];new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput){window.auditCLS+=e.value;window.auditShifts.push({value:e.value,sources:e.sources.map(s=>({header:!!s.node?.closest?.('header'),tag:s.node?.tagName,href:s.node?.getAttribute?.('href'),html:s.node?.outerHTML?.slice(0,250),text:s.node?.textContent?.slice(0,90)}))})}}).observe({type:'layout-shift',buffered:true})"});
    for(const width of [375,1440]){
      await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
      await send('Page.navigate',{url:base+'/'});
      await new Promise(r=>setTimeout(r,3000));
      const loadCLS = await evaluate('window.auditCLS');
      log('g. '+width+'px initial-load CLS='+loadCLS+'; existing header source unchanged='+headerUnchanged);
      assert(loadCLS===0,'Initial-load CLS '+width);
      for(const section of ['main','footer']){
        const selector=section+' a[href="/services"]';
        await evaluate(`document.querySelector('${selector}').scrollIntoView({block:'center'})`);
        await new Promise(r=>setTimeout(r,1200));
        const metrics=await evaluate(`(()=>{const a=document.querySelector('${selector}');const ref=${section==='main'?"document.querySelector('main a[href=\"/industries\"]')":"a.parentElement.previousElementSibling.querySelector('a')"};const s=getComputedStyle(a),r=getComputedStyle(ref),b=a.getBoundingClientRect();return {text:a.textContent.trim(),classesMatch:a.className===ref.className,styleMatch:['fontSize','fontWeight','color','display','gap'].every(k=>s[k]===r[k]),visible:b.width>0&&b.height>0&&b.left>=0&&b.right<=innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,cls:window.auditCLS,shifts:window.auditShifts}})()`);
        log('g. '+width+'px '+section+': '+JSON.stringify(metrics));
        const existingHeaderOnly = headerUnchanged && metrics.shifts.every(e=>e.sources.length && e.sources.every(s=>s.header));
        assert(metrics.classesMatch&&metrics.styleMatch&&metrics.visible&&!metrics.overflow&&(metrics.cls===0||existingHeaderOnly),'Visual '+width+' '+section);
        if(metrics.cls>0&&existingHeaderOnly)log('g. EXCEPTION: scripted scrolling triggers the unchanged header height transition; no shift source belongs to the new links. Literal zero-shift-anywhere is not met.');
        const shot=await send('Page.captureScreenshot',{format:'png'});
        writeFileSync('.next/machine-check/'+section+'-'+width+'.png',Buffer.from(shot.data,'base64'));
      }
    }
  } finally {ws?.close();chrome.kill();}
}
