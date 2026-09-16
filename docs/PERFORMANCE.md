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
