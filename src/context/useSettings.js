import { createContext, useContext } from 'react';
export const SettingsContext = createContext(null);
export function useSettings(){ const value = useContext(SettingsContext); if(!value) throw Error('SettingsProvider is required'); return value; }
