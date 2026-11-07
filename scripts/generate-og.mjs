import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { ELEMENTS } from '../src/data/elements.js';
const origin = process.env.SITE_URL || 'http://localhost:4173';
const url = new URL(origin);
if (url.pathname !== '/' || url.search || url.hash || url.username || url.password || !['http:','https:'].includes(url.protocol)) throw new Error('SITE_URL must be a plain HTTP(S) origin');
if ((process.env.VERCEL || process.env.NODE_ENV === 'production') && (!process.env.SITE_URL || url.protocol !== 'https:')) throw new Error('SITE_URL must be set to the public HTTPS origin for production');
const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
await mkdir('dist/share',{recursive:true}); await mkdir('dist/og',{recursive:true});
for (const element of Object.values(ELEMENTS)) {
  const { symbol, name, atomicNumber } = element;
  const title = `${name} · AtomicViz`;
  const description = `Explore ${name}, atomic number ${atomicNumber}, in interactive 3D.`;
  const target = `/?el=${symbol}`;
  const canonical = `${url.origin}/share/${symbol}.html?el=${symbol}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#04060a"/><g font-family="sans-serif"><text x="80" y="100" font-size="32" fill="#5ff2ff">ATOMICVIZ</text><text x="80" y="215" font-size="36" fill="#9fd8ff">${atomicNumber}</text><text x="70" y="430" font-size="240" font-weight="700" fill="#ffffff">${escape(symbol)}</text><text x="80" y="540" font-size="56" fill="#ffffff">${escape(name)}</text></g></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`dist/og/${symbol}.png`);
  await writeFile(`dist/share/${symbol}.html`,`<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${escape(canonical)}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${escape(canonical)}"><meta property="og:image" content="${escape(url.origin)}/og/${symbol}.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:image" content="${escape(url.origin)}/og/${symbol}.png"></head><body><a href="${target}">Explore ${escape(name)} in AtomicViz</a><script>location.replace(${JSON.stringify(target)})</script></body></html>`);
}
console.log(`Generated ${Object.keys(ELEMENTS).length} element previews for ${url.origin}`);
