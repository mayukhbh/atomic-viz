import {useEffect,useState,useRef} from 'react';
import {Canvas,useThree,useFrame} from '@react-three/fiber';
import {useSceneExport} from '../../features/export/sceneExport';
import {ExperienceBoundary} from '../common/ExperienceBoundary';

function SceneBridge({targetRef,onLost,onMetrics,profile}){
 const {scene,gl}=useThree();
 useEffect(()=>{
  const entry={scene,canvas:gl.domElement};targetRef.current=entry;
  const lost=e=>{e.preventDefault();targetRef.current=null;onLost(true);};
  const restored=()=>{targetRef.current=entry;onLost(false);};
  gl.domElement.addEventListener('webglcontextlost',lost);gl.domElement.addEventListener('webglcontextrestored',restored);
  return ()=>{if(targetRef.current===entry)targetRef.current=null;gl.domElement.removeEventListener('webglcontextlost',lost);gl.domElement.removeEventListener('webglcontextrestored',restored);};
 },[scene,gl,targetRef,onLost]);
 useEffect(()=>{
  if(!profile)return;
  const timer=setInterval(()=>{onMetrics(`Geometries: ${gl.info.memory.geometries} · textures: ${gl.info.memory.textures} · last pass calls: ${gl.info.render.calls}`);},1000);
  return ()=>clearInterval(timer);
 },[profile,gl,onMetrics]);
 return null;
}
function FrameProbe({report}){
 // Per-mounted-scene sample accumulator is owned by an effect, not global state.
 const sampleRef=useRef({frames:0,total:0});
 useFrame((_,delta)=>{const sample=sampleRef.current;sample.frames++;sample.total+=delta;if(sample.frames===120){report(`Mean frame: ${(sample.total*1000/120).toFixed(1)} ms`);sample.frames=0;sample.total=0;}});
 return null;
}
export function SafeCanvas({children,gl,...props}){
 const targetRef=useSceneExport(),[lost,setLost]=useState(false),[metrics,setMetrics]=useState(''),[frames,setFrames]=useState('');
 const profile=import.meta.env.DEV&&new URLSearchParams(window.location.search).has('profile');
 return <ExperienceBoundary><Canvas {...props} dpr={[1,2]} gl={{...gl,preserveDrawingBuffer:true}} fallback={<div role="alert" className="p-8 text-white">3D requires WebGL. Try a browser with hardware acceleration; navigation and element information remain available.</div>}>
 {targetRef&&<SceneBridge targetRef={targetRef} onLost={setLost} onMetrics={setMetrics} profile={profile}/>}{profile&&<FrameProbe report={setFrames}/>}{children}
 </Canvas>{lost&&<div role="alert" className="absolute inset-x-8 top-40 bg-slate-950 p-6 text-white">The graphics context was lost. Wait for recovery or <button onClick={()=>window.location.reload()} className="underline">reload this view</button>.</div>}{profile&&<div role="status" className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-black/90 p-2 text-xs text-white">{frames} · {metrics}</div>}</ExperienceBoundary>;
}
