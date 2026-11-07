import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import sharp from 'sharp';
import { ELEMENTS } from '../src/data/elements.js';
const symbols=Object.keys(ELEMENTS);
assert.equal((await readdir('dist/og')).length,symbols.length);
assert.equal((await readdir('dist/share')).length,symbols.length);
for(const symbol of symbols) {
  const html=await readFile(`dist/share/${symbol}.html`,'utf8');
  assert(html.includes(`/?el=${symbol}`));
  assert(html.includes(`property="og:image" content="${process.env.SITE_URL || 'http://localhost:4173'}/og/${symbol}.png"`));
  assert(html.includes('name="twitter:card" content="summary_large_image"'));
  const metadata=await sharp(`dist/og/${symbol}.png`).metadata();
  assert.equal(metadata.width,1200); assert.equal(metadata.height,630); assert.equal(metadata.format,'png');
}
console.log(`Verified ${symbols.length} share documents and 1200×630 PNGs`);
