import { useRef } from 'react';
import { SceneExportContext } from './sceneExport';
export function SceneExportProvider({children}){const sceneRef=useRef(null);return <SceneExportContext.Provider value={sceneRef}>{children}</SceneExportContext.Provider>;}
