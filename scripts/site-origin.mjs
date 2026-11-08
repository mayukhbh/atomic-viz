/** Public metadata only. Use Vercel's supplied host without requiring a new secret. */
export function siteOrigin(env = process.env) {
  const host = env.VERCEL_ENV === 'preview'
    ? env.VERCEL_URL || env.VERCEL_PROJECT_PRODUCTION_URL
    : env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  const configured = env.SITE_URL || (host ? `https://${host}` : null);
  const url = new URL(configured || 'http://localhost:4173');
  if (url.pathname !== '/' || url.search || url.hash || url.username || url.password || !['http:', 'https:'].includes(url.protocol)) {
    throw new Error('SITE_URL must be a plain HTTP(S) origin');
  }
  if ((env.VERCEL === '1' || env.NODE_ENV === 'production') && (!configured || url.protocol !== 'https:')) {
    throw new Error('Set SITE_URL to the public HTTPS origin or expose Vercel system URL variables');
  }
  return url.origin;
}
