// @vitest-environment jsdom
import React from 'react';
import {afterEach,expect,it,vi} from 'vitest';
import {render,screen,within,cleanup,fireEvent,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SettingsProvider} from '../../context/SettingsContext';
import {useSettings} from '../../context/useSettings';
import {TutorialOverlay} from '../tutorials/TutorialOverlay';
import {PeriodicTable} from '../PeriodicTable';
import {ExperienceBoundary} from '../common/ExperienceBoundary';
import {captureScreenshot,exportGLTF} from '../../utils/exportHelpers';
import {Scene,Mesh,BoxGeometry,MeshStandardMaterial} from 'three';

afterEach(()=>{cleanup();vi.restoreAllMocks();});
it('periodic dialog traps focus, handles Escape, and restores its opener',async()=>{
 const user=userEvent.setup(),close=vi.fn();
 const opener=document.createElement('button');document.body.appendChild(opener);opener.focus();
 const view=render(<SettingsProvider><PeriodicTable activeElement="C" onSelect={()=>{}} onClose={close}/></SettingsProvider>);
 expect(within(screen.getByRole('dialog')).getAllByRole('button')).toHaveLength(119);
 expect(document.activeElement).toBe(screen.getByRole('button',{name:'Close periodic table'}));
 await user.tab({shift:true});expect(document.activeElement.getAttribute('aria-label')).toContain('Oganesson');
 await user.keyboard('{Escape}');expect(close).toHaveBeenCalledOnce();view.unmount();expect(document.activeElement).toBe(opener);opener.remove();
});
function TutorialHarness({apply}){const s=useSettings();return <><button onClick={()=>s.startTutorial('simple-reactions')}>Begin</button><TutorialOverlay onApplyStep={apply}/></>;}
it('tutorial can start, advance, go back and exit without hook-order errors',async()=>{
 const apply=vi.fn(),user=userEvent.setup();render(<SettingsProvider><TutorialHarness apply={apply}/></SettingsProvider>);
 await user.click(screen.getByText('Begin'));expect(apply).toHaveBeenLastCalledWith(expect.objectContaining({reactionId:'water-formation',stage:0}));
 await user.click(screen.getByRole('button',{name:'Next'}));expect(screen.getByRole('heading',{name:'Reactants'})).toBeTruthy();
 await user.click(screen.getByRole('button',{name:'Back'}));expect(screen.getByRole('heading',{name:'What is a Reaction?'})).toBeTruthy();
 await user.click(screen.getByRole('button',{name:'Exit tutorial'}));await waitFor(()=>expect(screen.queryByRole('button',{name:'Next'})).toBeNull());
});
it('view errors show a retry action and recover after the cause is removed',()=>{
 vi.spyOn(console,'error').mockImplementation(()=>{});let broken=true;
 function Child(){if(broken)throw Error('scene failed');return <p>Recovered</p>;}
 render(<ExperienceBoundary><Child/></ExperienceBoundary>);expect(screen.getByRole('alert')).toBeTruthy();broken=false;fireEvent.click(screen.getByText('Try again'));expect(screen.getByText('Recovered')).toBeTruthy();
});
it('screenshot uses the explicit canvas and reports unavailable views',()=>{
 expect(()=>captureScreenshot(null)).toThrow('No active');
 const click=vi.spyOn(HTMLAnchorElement.prototype,'click').mockImplementation(()=>{}),toDataURL=vi.fn(()=> 'data:image/png;base64,AA');
 captureScreenshot({width:100,height:100,toDataURL});expect(toDataURL).toHaveBeenCalledWith('image/png');expect(click).toHaveBeenCalledOnce();
});
it('exports actual GLTF mesh data with no WebGL context and rejects empty scenes',async()=>{
 vi.spyOn(HTMLAnchorElement.prototype,'click').mockImplementation(()=>{});
 URL.createObjectURL=vi.fn(()=> 'blob:test');URL.revokeObjectURL=vi.fn();
 const scene=new Scene(),geometry=new BoxGeometry(),material=new MeshStandardMaterial();scene.add(new Mesh(geometry,material));
 const data=await exportGLTF(scene);expect(data.asset.version).toBe('2.0');expect(data.meshes).toHaveLength(1);expect(scene.children).toHaveLength(1);
 await expect(exportGLTF(new Scene())).rejects.toThrow('no supported meshes');geometry.dispose();material.dispose();
});
