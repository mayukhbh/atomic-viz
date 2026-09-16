import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],test:{include:['src/**/*.test.{js,jsx}'],environment:'node',coverage:{provider:'v8',include:['src/engine/**/*.js','src/utils/*.js'],exclude:['**/__tests__/**'],reporter:['text','html']}}});
