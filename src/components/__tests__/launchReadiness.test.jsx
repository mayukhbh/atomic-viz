// @vitest-environment jsdom
// DOM integration coverage only: deliberately does not certify WebGL or layout.
import React from 'react';
import {afterEach, beforeAll, afterAll, expect, it, vi} from 'vitest';
import {render, screen, cleanup, fireEvent, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import {REACTIONS} from '../../data/reactions';
import {TUTORIALS} from '../../data/tutorials';
import {getOrganicByClass} from '../../engine/molecules';
vi.mock('../Scene',()=>({Scene:()=>null}));
vi.mock('../viewer/SafeCanvas',()=>({SafeCanvas:()=>null}));
vi.mock('../viewer/ViewerCanvas',()=>({ViewerCanvas:()=>null}));
beforeAll(()=>vi.stubGlobal('PointerEvent', MouseEvent));
afterAll(()=>vi.unstubAllGlobals());
afterEach(()=>{cleanup();window.history.replaceState(null,'','/');vi.restoreAllMocks();});
const click=async(name)=>fireEvent.click(await screen.findByRole('button',{name,exact:true}));

it('all reactions select, scrub, reset, filter and preserve progress across module navigation',async()=>{
 render(<App/>);await click('Reactions');
 for(const r of REACTIONS){await click(r.name);expect(screen.getByRole('heading',{name:r.name})).toBeTruthy();fireEvent.change(screen.getByRole('slider'),{target:{value:'1'}});expect(screen.getByRole('button',{name:'Replay Reaction'})).toBeTruthy();await click('Reset reaction');expect(screen.getByRole('slider').value).toBe('0');}
 await click('Water Formation');fireEvent.change(screen.getByRole('slider'),{target:{value:'0.5'}});await click('Atom');await click('Reactions');expect(screen.getByRole('slider').value).toBe('0.5');
 await click('Nuclear');expect(screen.queryByRole('button',{name:'Water Formation'})).toBeNull();await click('All');expect(screen.getByRole('button',{name:'Water Formation'})).toBeTruthy();
 await click('4x');expect(screen.getByRole('button',{name:'4x'}).getAttribute('aria-pressed')).toBe('true');
 await click('Start Reaction');await waitFor(()=>expect(Number(screen.getByRole('slider').value)).toBeGreaterThan(0.5));await click('Pause');
});
it('every organic molecule selects and render controls respond',async()=>{
 render(<App/>);await click('Organic');
 for(const [category,molecules] of Object.entries(getOrganicByClass())){await click(category);for(const m of molecules){await click(`${m.name} ${m.formula}`);await waitFor(()=>expect(screen.getByRole('heading',{name:m.name})).toBeTruthy());}}
 for(const name of ['Space-filling','Wireframe','Ball & Stick']){await click(name);expect(screen.getByRole('button',{name}).getAttribute('aria-pressed')).toBe('true');}
 for(const name of ['Atom labels','Highlight group','Auto-rotate']){const b=screen.getByRole('button',{name});const before=b.getAttribute('aria-pressed');fireEvent.click(b);expect(b.getAttribute('aria-pressed')).not.toBe(before);}
},20000);
it('builder supports particle changes, reference view and reset; sandbox supports adding and clearing',async()=>{
 render(<App/>);await click('Builder');await click('Add proton (charge +1)');await click('Add neutron (charge 0)');await click('Add electron (charge -1)');expect(screen.getByText('Hydrogen')).toBeTruthy();await click('Visualize Atom');await click('Back to Builder');await click('Remove proton');expect(screen.getByText('Unknown Element')).toBeTruthy();await click('Reset All Particles');expect(screen.getByRole('button',{name:'Remove electron'}).disabled).toBe(true);
 await click('Sandbox');await click('Add O atom');expect(screen.getByText('Add another atom and drag them together.')).toBeTruthy();await click('Add H atom');expect(screen.queryByText('Add another atom and drag them together.')).toBeNull();await click('Clear All');expect(screen.getByText(/Add atoms from the panel/)).toBeTruthy();
});
it('all tutorials can traverse every step and finish',async()=>{
 render(<App/>);
 for(const t of TUTORIALS){await click('Tutorials');const menu=await screen.findByRole('dialog',{name:'Guided tutorials'});fireEvent.click(within(menu).getByRole('button',{name:new RegExp(t.title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}));
 for(let i=0;i<t.steps.length;i++){await screen.findByRole('heading',{name:t.steps[i].title,level:3});if(screen.queryByRole('dialog',{name:'Periodic table'}))await click('Close periodic table');await click(i===t.steps.length-1?'Finish':'Next');}
 await waitFor(()=>expect(screen.queryByRole('button',{name:'Exit tutorial'})).toBeNull());}
},20000);
it('gold link selects iron via keyboard and refresh state derives from URL',async()=>{
 window.history.replaceState(null,'','/?el=Au');const v=render(<App/>);expect(screen.getByRole('heading',{name:'Gold'})).toBeTruthy();await click('Au Select Element');const iron=await screen.findByRole('button',{name:/^Iron, Fe,/});iron.focus();await userEvent.keyboard('{Enter}');await waitFor(()=>expect(screen.getByRole('heading',{name:'Iron'})).toBeTruthy());expect(window.location.search).toBe('?el=Fe');v.unmount();render(<App/>);expect(screen.getByRole('heading',{name:'Iron'})).toBeTruthy();
});
it('nuclear and free energies are not presented as enthalpy or chemical activation curves',async()=>{
 render(<App/>);await click('Explanation level: High School. Switch to University');await click('Reactions');
 await click('Hydrogen Fusion');expect(screen.getByText(/17.6 MeV per event/)).toBeTruthy();expect(screen.queryByRole('img',{name:/energy profile/i})).toBeNull();
 await click('ATP Synthesis');expect(screen.getByText(/ΔG°′ = \+30.5 kJ\/mol/)).toBeTruthy();expect(screen.queryByRole('img',{name:/energy profile/i})).toBeNull();
 await click('Zinc-Copper Electrochemistry');expect(screen.getByText(/ΔG° = −212 kJ\/mol/)).toBeTruthy();
});
it('atom model limitations are visible to sighted visitors',async()=>{
 render(<App/>);expect(screen.getByText(/not physical electron paths/)).toBeTruthy();await click('Orbital model: Bohr. Switch to Quantum Orbitals');expect(screen.getByText(/Noble-gas core orbitals are omitted/)).toBeTruthy();
});
