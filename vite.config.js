import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('/node_modules/')) return;
          // Keep the interdependent rendering runtime together to avoid circular
          // chunk initialization; lazy application views remain separate.
          if (/\/(three|three-stdlib|@react-three|postprocessing|troika-[^/]+)\//.test(id)) return 'graphics';
          if (/\/(react|react-dom|scheduler)\//.test(id)) return 'react';
        },
      },
    },
  },
})
