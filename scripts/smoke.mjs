import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const base = process.env.SMOKE_URL || 'http://127.0.0.1:4173';
const output = process.env.SMOKE_OUTPUT || 'artifacts/smoke';
const server = process.env.SMOKE_URL ? null : spawn(process.execPath, ['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173','--strictPort'], {stdio:'pipe'});
let browser;
try {
  for(let i=0;i<100;i++) { try { if((await fetch(base)).ok) break; } catch {} if(i===99) throw new Error('Preview did not start'); await delay(200); }
  await mkdir(output,{recursive:true});
  browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || undefined,args:process.env.SOFTWARE_WEBGL === '1' ? ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] : []});
  const measurements = [];
  for(const width of (process.env.PERF_ONLY ? [1440] : [1440,1024,390])) {
    const page = await browser.newPage({viewport:{width,height:width===390?844:900},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    const capture = async name => {
      await page.locator('canvas').waitFor({state:'visible'});
      await page.waitForTimeout(2500);
      if(await page.getByRole('alert').count()) throw new Error(await page.getByRole('alert').allTextContents());
      const metrics = await page.evaluate(async () => {
        const samples = []; let last;
        await new Promise(resolve => { const tick = now => { if(last!==undefined)samples.push(now-last); last=now; if(samples.length>=120)resolve();else requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
        const canvas=document.querySelector('canvas');
        const gl=canvas.getContext('webgl2');
        const debug=gl?.getExtension('WEBGL_debug_renderer_info');
        const sorted=[...samples].sort((a,b)=>a-b);
        return {meanMs:samples.reduce((a,b)=>a+b,0)/samples.length,p95Ms:sorted[Math.ceil(samples.length*.95)-1],samples:samples.length,renderer:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):'unavailable',canvas:[canvas.width,canvas.height]};
      });
      measurements.push({name,width,...metrics});
      await page.screenshot({path:`${output}/${width}-${name}.png`});
      if(errors.length)throw new Error(`${width}/${name}: ${errors.join('\n')}`);
    };
    await page.goto(`${base}/?el=C`); await capture('carbon-bohr');
    await page.goto(`${base}/?el=Og`); await capture('oganesson-bohr');
    await page.getByRole('button',{name:/Orbital model: Bohr/}).click(); await capture('oganesson-quantum');
    await page.getByRole('button',{name:'Organic',exact:true}).click();
    await page.getByRole('button',{name:'Aromatic',exact:true}).click();
    await page.getByRole('button',{name:/Toluene/}).click(); await capture('toluene');
    await page.getByRole('button',{name:'Reactions',exact:true}).click();
    await page.getByRole('button',{name:'Water Formation',exact:true}).click();
    await page.getByRole('button',{name:'Start Reaction',exact:true}).click(); await capture('water-formation');
    if(!process.env.PERF_ONLY) {
      await page.getByRole('button',{name:'Builder',exact:true}).click(); await capture('builder');
      await page.getByRole('button',{name:'Sandbox',exact:true}).click(); await capture('sandbox');
    }
    await page.close();
  }
  await writeFile(`${output}/frames.json`,JSON.stringify({browser:browser.version(),softwareRequested:process.env.SOFTWARE_WEBGL==='1',measurements},null,2));
  console.log(`Smoke passed; ${measurements.length} scenes captured in ${output}`);
} finally { await browser?.close(); server?.kill(); }
