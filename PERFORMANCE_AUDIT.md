# Atomic Viz: Performance Audit

Date: 25 September 2026. Complements `docs/PERFORMANCE.md`, which holds earlier development frame samples. Numbers below are from a production build and from counting the work each scene does per frame. No real-GPU profiling was possible in this review (headless Chromium runs WebGL in software), so frame-time claims are deliberately avoided.

## 1. Bundle

| Chunk | Size | Gzip | Loaded |
|---|---:|---:|---|
| Entry (`index-*.js`): React, three, R3F, drei, postprocessing, element data, Atom view | 1,442.85 kB | 419.27 kB | Always |
| Framer Motion runtime (`proxy-*.js`) | 110.92 kB | 36.48 kB | First overlay or lazy view |
| Reaction Lab | ~40 kB | ~11 kB | On demand |
| GLTF exporter | 35.27 kB | 10.53 kB | On first GLTF export |
| Sandbox, Tutorials, Organic, Builder, Periodic table, Export | 4 to 25 kB each | 1.5 to 8.5 kB | On demand |
| CSS | 43.6 kB | 7.9 kB | Always |
| Label font (Instrument Sans Bold, TTF) | 68 kB | n/a | First 3D label |

This pass changed the entry by +1 kB (category map, formatter). The large-chunk warning is expected: the Atom view is the landing page and needs three, R3F, drei and postprocessing immediately.

Opportunities, in order of value:
1. **Split vendor code with `build.rollupOptions.output.manualChunks`** (three, R3F/drei, postprocessing). Does not reduce first-load bytes but makes app-only deploys re-download ~100 kB instead of ~420 kB gzip. Effort S, risk low.
2. **Serve the label font as WOFF2** (roughly 40–50% smaller than TTF). Effort XS, risk low; troika supports WOFF.
3. **Move `data/elements.js` descriptions out of the entry** (they are long prose strings for 118 elements). Only worth it if first load becomes a measured problem.

## 2. Per-frame work by scene

"Callbacks" means `useFrame` subscribers; each runs JavaScript every frame.

| Scene | Meshes (approx.) | Per-frame callbacks | Other per-frame work | Assessment |
|---|---:|---:|---|---|
| Atom, Carbon, Bohr | ~12 + 4,000 star points | 6 | 6 drei `Trail` geometries rebuilt | Light |
| Atom, Oganesson, Bohr (worst case) | ~130 | 118 | **118 `Trail` MeshLine geometries updated and re-uploaded every frame** | Heaviest CPU and upload cost in the app |
| Atom, Quantum mode, At/Rn/Ts/Og (worst case) | 78 transparent, double-sided `MeshPhysicalMaterial` spheres at 24×24 segments | 78 | Heavy fragment overdraw from stacked transparent lobes, plus bloom | Heaviest GPU fill cost |
| Reactions, typical | 5–25 atoms and bonds | ~N atoms + 1 | React rerender of the lab panel and scene every frame; `interpolateReaction` allocates new arrays per frame | Fine at current sizes |
| Organic, largest molecules | ~20–30 atoms at 48×48 segments + bonds | 1 per atom + 1 | Every `AtomMesh` runs a callback even when not highlighted | Fine |
| Builder, capped maximum | up to 416 `Float`-wrapped spheres at 32×32 segments | ~416 | 5,000 star points | Acceptable after the new caps; unbounded before |
| Sandbox | small | 0 | Pointer raycasts | Light |

54 of the 118 elements use a full (non noble-gas-core) configuration string, so Quantum mode mesh counts vary a lot between neighbours.

## 3. Rerenders

- **Reaction playback** sets React state once per animation frame. Before this pass that rerendered the whole lab, including the 20-item library list. The library is now a memoised component with stable props, so it skips those renders. The panel, energy diagram and 3D scene still rerender, which is by design (the scrubber, marker and atoms must move). The energy curve path itself is memoised.
- **Settings context** builds a new value object on each provider render. Consumers rerender only when a setting actually changes, so this is harmless today.
- **App shell** does not rerender during playback (the previous cleanup moved progress into the feature).

## 4. Memory and lifecycle

- RAF loops, timers, listeners and scene-export registrations are all cleaned up on unmount (checked by reading every effect). The new sandbox toast timer and tutorial `ResizeObserver` also clean up.
- R3F disposes declaratively created geometries and materials on unmount. `MoleculeView` and `ReactionScene` create geometry per atom rather than sharing; the extra GPU memory is small at current molecule sizes.
- GLTF export clones materials and disposes the clones; it briefly holds a second copy of the mesh list.
- `preserveDrawingBuffer: true` keeps PNG export reliable at some GPU bandwidth cost. Leave it until measured.
- Not verified: GPU memory over a long session of rapid view switching, and recovery after repeated context loss. Needs a real device.

## 5. Scaling behaviour

| Input grows | What scales | Current guard |
|---|---|---|
| Electrons per atom | Trails and callbacks linearly | None beyond the 118-element data |
| Orbital subshells | Transparent lobes | None |
| Builder particles | Meshes and callbacks | **New caps**: 118 / 180 / 118 |
| Reaction atoms and stages | Per-frame interpolation O(atoms + bonds) | Authored data is small |
| Molecule size | Meshes; auto-fit keeps framing | Library is curated |
| Sandbox atoms | O(n) per drag end for bonding, O(n) components for recognition | User-driven; fine to a few dozen atoms |

## 6. Recommendations

| # | Change | Expected effect | Effort | Risk | Files |
|---|---|---|---|---|---|
| P1 | Turn trails off (or show one trail per shell) when a shell has more than ~8 electrons, or when `AdaptiveDpr`/`PerformanceMonitor` reports degradation | Removes most per-frame geometry uploads on heavy atoms; also removes the jagged-trail artefact at low frame rates | S | Low; visual change limited to heavy atoms | `components/atoms/BohrModel.jsx` |
| P2 | Drive orbital pulse from one callback per orbital group instead of one per lobe (scale each lobe from a shared value), and lower lobe sphere segments to 16×16 | 78 callbacks become at most ~10; fewer vertices with no visible change at this size | S | Low | `components/atoms/QuantumOrbitals.jsx` |
| P3 | Share one sphere geometry and one cylinder geometry across atoms and bonds in `MoleculeView` and `ReactionScene` | Less GPU memory and faster mounts when switching molecules | S | Low | `viewer/MoleculeView.jsx`, `reaction/ReactionScene.jsx` |
| P4 | Skip `useFrame` work in non-highlighted `AtomMesh` (early return instead of resetting scale every frame) | Minor CPU saving | XS | None | `viewer/MoleculeView.jsx` |
| P5 | Add drei `PerformanceMonitor` to the shared canvases to step bloom off and DPR down on sustained low frame rates | Graceful degradation on weak GPUs | S | Low | `viewer/ViewerCanvas.jsx`, `Scene.jsx` |
| P6 | Vendor chunk split and WOFF2 font (section 1) | Faster repeat visits, smaller font | S | Low | `vite.config.js`, `viewer/Label3D.jsx` |
| P7 | Real-device profiling: Chrome performance panel on a low-end laptop and a mid-range Android for Carbon, Oganesson Bohr, Oganesson Quantum, Toluene, Water Formation | Replaces estimates with numbers; decides whether P1/P2/P5 are urgent | S | None | n/a |

Suggested order: P7 first (an hour of measuring), then P1 and P2, which together address the worst case the app can show.

## 7. Not recommended

- Replacing R3F or drei, or moving rendering to a custom WebGL layer.
- Instancing every atom globally. Scene sizes are small; the complexity is not justified.
- Removing bloom or the studio environment by default. They are part of the identity; degrade them adaptively instead (P5).
