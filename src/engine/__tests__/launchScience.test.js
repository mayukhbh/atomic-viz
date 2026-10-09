import {expect,it} from 'vitest';
import {ELEMENTS} from '../../data/elements';
import {parseElectronConfiguration} from '../../utils/orbitalGeometry';
it('all 118 shell arrays agree with their declared configurations, including noble-gas cores',()=>{
 const expand=config=>config.replace(/\[([A-Za-z]+)\]/g,(_,symbol)=>expand(ELEMENTS[symbol].electronConfiguration));
 for(const e of Object.values(ELEMENTS)){
  const shells=[];
  for(const o of parseElectronConfiguration(expand(e.electronConfiguration)))shells[o.n-1]=(shells[o.n-1]||0)+o.count;
  expect(shells,e.symbol).toEqual(e.electrons);
 }
});
