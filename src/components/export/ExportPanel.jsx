import {useState} from 'react';
import {motion} from 'framer-motion';
import {X,Camera,Box,FileDown} from 'lucide-react';
import {captureScreenshot,exportGLTF} from '../../utils/exportHelpers';
import {useSceneExport} from '../../features/export/sceneExport';
import {useDialog} from '../common/useDialog';
export function ExportPanel({onClose}){
 const sceneRef=useSceneExport(),dialog=useDialog(onClose);const [busy,setBusy]=useState(false),[message,setMessage]=useState('');
 const run=async action=>{setBusy(true);setMessage('Preparing export…');try{await action();setMessage('Download prepared.');}catch(error){setMessage(error.message||'Export failed. Reload this view and retry.');}finally{setBusy(false);}};
 return <motion.div ref={dialog} role="dialog" aria-modal="true" aria-label="Export options" tabIndex={-1} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}} className="absolute bottom-8 right-8 w-80 max-w-[90vw] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl text-white p-6 pointer-events-auto">
 <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-bold flex items-center gap-2"><FileDown size={20} className="text-green-400"/>Export Options</h3><button onClick={onClose} aria-label="Close export" className="p-2 hover:bg-white/10 rounded-full"><X size={18}/></button></div>
 <div className="space-y-3"><button disabled={busy} onClick={()=>run(()=>captureScreenshot(sceneRef?.current?.canvas))} className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center gap-3"><Camera className="text-cyan-400" size={20}/>Screenshot (PNG)</button><button disabled={busy} onClick={()=>run(()=>exportGLTF(sceneRef?.current?.scene))} className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center gap-3"><Box className="text-purple-400" size={20}/>3D Model (GLTF)</button><p className="text-xs text-white/60">GLTF saves an untextured static mesh snapshot. Labels, electron trails, stars, and lighting effects are available in PNG only.</p><p role="status" className="text-sm text-cyan-200">{message}</p></div></motion.div>;
}
