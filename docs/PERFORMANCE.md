# Performance

## Measured build

Same local Node 24 toolchain, production Vite build. Sizes are decimal kB as reported by Vite, not network timings.

| JavaScript | Baseline | Cleanup |
|---|---:|---:|
| Initial entry | 1674.49 kB | 1441.84 kB |
| Initial entry gzip | 488.67 kB | 418.91 kB |

The manifest confirms the entry has no other static JS chunk imports: initial JS is reduced about 13.9%, gzip 14.3%. This does not mean total application code shrank by that amount. Features now load on demand, including a shared approximately 110.92 kB motion chunk and a 35.27 kB GLTF exporter. CSS grew from 42.55 to approximately 43.60 kB for accessibility/recovery layouts. A large-entry warning remains: Three.js and the atom experience still dominate startup.

## Rendering work

Reaction animation updates remain within ReactionLab; App no longer rerenders on every playback frame. Animation cancels on unmount, caps long frame deltas and preserves paused selection/progress across navigation. The energy curve and its SVG path are memoized independently of the moving progress marker. Molecule validation and geometry are computed outside frame loops. Dead random electron code and duplicate rendering code were removed. Sandbox pointer math reuses objects and disables camera controls while dragging. Canvas DPR is capped at 2; lighting, bloom and visual geometry are preserved.

`?profile` in development displays mean frame intervals and renderer resource counts. Local 1280×720 samples: Carbon approximately 17.2–18 ms (33 geometries/22 textures), Hydrogen 17.8–18.5 ms (27/22), Oganesson Bohr approximately 19 ms (267/22), methane approximately 18.2–18.8 ms (31/24). These uncontrolled samples are neither before/after comparisons nor GPU benchmarks. Last-pass draw calls from postprocessing do not represent total frame draw calls. Additional samples: Toluene 19–26 ms (56 geometries/24 textures), Water Formation 19–23 ms (34/22), and the two-H sandbox 16.7 ms (5/2). No controlled before/after or cross-device GPU comparison was performed.

## Remaining risks

Heavy atoms create many meshes and labels. Bloom, text, shadows and continuously animated scenes remain expensive. `preserveDrawingBuffer` supports dependable PNG capture but can cost GPU bandwidth; measure a render-on-demand capture alternative before changing it. GLTF export clones supported mesh state and can briefly allocate significant memory. Test sustained navigation/context loss on multiple GPUs; a unit test cannot prove GPU resource recovery. Avoid claiming a universal 60 fps target from these samples.

## Backend pass — 2026-11-06

Before: main `9c264399f48edb98fd00218c366043b7a2e67eb0`. After: `codex/atomic-viz-backend`.

### Frame-time evidence

| Scene (1440×900) | Before mean / p95 ms | After mean / p95 ms | Status |
| --- | --- | --- | --- |
| Carbon Bohr | not measured | not measured | Browser blocked |
| Oganesson Bohr | not measured | not measured | Browser blocked |
| Oganesson Quantum | not measured | not measured | Browser blocked |
| Toluene | not measured | not measured | Browser blocked |
| Water Formation | not measured | not measured | Browser blocked |

No FPS improvement is claimed. Playwright Chromium download failed with a truncated archive. Existing `/usr/bin/chromium` then aborted before opening a page: `socket() failed: Operation not permitted`. No successful frame samples or screenshots were produced. Physical low-end laptop/mobile GPU measurements remain required; CI software WebGL cannot substitute for them.

Repeat on the baseline and this branch with identical viewport, hardware and build mode:

```sh
npm run build
PERF_ONLY=1 SMOKE_OUTPUT=artifacts/performance npm run smoke
```

The runner records browser version, WebGL renderer, canvas resolution, 120 RAF intervals (mean/p95), after a 2.5-second warmup. These measure presentation cadence, not GPU execution time. Record whether adaptive quality changed canvas resolution. On software runners explicitly set `SOFTWARE_WEBGL=1`; use `CHROMIUM_PATH` only for an already installed compatible browser. Water Formation samples can include completion on slow hardware; inspect the saved screenshot and run a dedicated playback trace for animation-only timings.

### Verified work reductions and build output

- Shells above eight electrons now have one trail each. Carbon retains all six; Oganesson trails fall from 118 to 22 (2+8+1+1+1+1+8). Electron positions/loops remain unchanged.
- p/d/f lobe pulse uses one callback per set, updating scales without moving lobe centers; 24×24 spheres become 16×16. S-shell pulse is unchanged.
- Shared canvases start at their original DPR/bloom. Ten 250ms samples below 35 FPS lower quality a step; sustained readings above 55 FPS restore it. DPR caps: 2 → 1.5 → 1; bloom factors: 1 → 0.6 → 0. Hysteresis avoids a single-frame reaction. SafeCanvas now honors the supplied DPR instead of overwriting it.
- Label font: 68,080-byte TTF → 35,972-byte WOFF (47.2% smaller). Installed Troika explicitly rejects WOFF2 (`src/FontParser.js`), so WOFF is used; glyph design is unchanged.
- Before entry: 1,448.40 kB / 421.44 kB gzip. After app entry: about 96.75 kB / 31.03 kB gzip, React: 192.53 kB / 60.37 kB gzip, graphics: 1,215.79 kB / 346.32 kB gzip. This improves cache separation, not initial download size. The graphics chunk still triggers Vite's size warning; no first-load reduction is claimed.
