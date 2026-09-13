import { createContext, useContext } from 'react';
export const SceneExportContext=createContext(null);
export const useSceneExport=()=>useContext(SceneExportContext);
