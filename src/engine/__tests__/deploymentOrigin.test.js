import { it, expect } from 'vitest';
import { siteOrigin } from '../../../scripts/site-origin.mjs';
it('uses deployed production and preview hosts without manual configuration', () => {
  expect(siteOrigin({ VERCEL:'1', VERCEL_PROJECT_PRODUCTION_URL:'atomic.test' })).toBe('https://atomic.test');
  expect(siteOrigin({ VERCEL:'1', VERCEL_ENV:'preview', VERCEL_URL:'preview.test', VERCEL_PROJECT_PRODUCTION_URL:'atomic.test' })).toBe('https://preview.test');
  expect(siteOrigin({ VERCEL:'1', SITE_URL:'https://custom.test/', VERCEL_URL:'preview.test' })).toBe('https://custom.test');
});
it('keeps localhost local and rejects invalid production configuration', () => {
  expect(siteOrigin({})).toBe('http://localhost:4173');
  for (const env of [{VERCEL:'1'}, {NODE_ENV:'production'}, {VERCEL:'1',SITE_URL:'http://example.test'}, {SITE_URL:'https://user:pass@example.test'}, {SITE_URL:'https://example.test/path'}, {SITE_URL:'https://example.test?q=x'}]) expect(()=>siteOrigin(env)).toThrow();
});
