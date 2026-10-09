# Atomic Viz: Polish Backlog

Remaining work after the final review pass (25 September 2026). Items already shipped on `review/final-polish-pass` are listed at the end for traceability. Effort: XS < 1 h, S ≈ half a day, M ≈ 1–2 days, L > 2 days.

## A. Must fix before shipping

| ID | Issue | User impact | Recommended change | Effort | Risk | Files |
|---|---|---|---|---|---|---|
| A7 | Real-hardware release checks never completed (carried over from `docs/CLEANUP_REPORT.md`) | Unknown jank or failures on the devices students actually use | Run the matrix: low-end laptop GPU, mid-range Android Chrome, iPad Safari, desktop Safari and Firefox. Check frame time for Carbon, Oganesson (Bohr and Quantum), Toluene, Water Formation; PNG and GLTF download delivery; context-loss recovery after 10+ view switches | S | n/a | n/a |

## B. High-value polish

| ID | Issue | User impact | Recommended change | Effort | Risk | Files |
|---|---|---|---|---|---|---|
| B10a | 118 electron trails rebuilt every frame on heavy atoms; trails turn jagged at low frame rates | Jank and a visibly rough look on weaker devices | Disable trails above ~8 electrons per shell, or keep one trail per shell (PERFORMANCE_AUDIT P1) | S | Low | `components/atoms/BohrModel.jsx` |
| B10b | Up to 78 orbital lobes each with its own `useFrame` and heavy transparent material | GPU fill cost in Quantum mode | Group-level pulse, 16×16 lobe segments (PERFORMANCE_AUDIT P2) | S | Low | `components/atoms/QuantumOrbitals.jsx` |
| B10c | No adaptive quality | Weak GPUs get the full bloom pipeline | drei `PerformanceMonitor` stepping DPR and bloom (PERFORMANCE_AUDIT P5) | S | Low | `viewer/ViewerCanvas.jsx`, `Scene.jsx` |
| B11 | On phones, Tutorials, Export and the level/orbital toggles sit in a horizontally scrolling nav, off-screen by default | Key actions are hard to discover on mobile | Under 700 px, collapse the right-hand actions into one "More" menu (reuse `useDialog` for focus handling) | S | Low | `App.jsx`, `index.css` |
| B12 | No automated browser check | Layout regressions at tablet/phone widths go unnoticed (several existed before this pass) | Commit a Playwright script that opens each view at 1440, 1024 and 390 px, asserts no page errors and saves screenshots as CI artifacts | S | Low | new `scripts/smoke.mjs`, `.github/workflows/quality.yml` |
| B13 | Sandbox has no undo, per-atom delete or bond break | A misplaced atom or bond forces "Clear All" | Undo stack for add/bond (state is already immutable), plus delete via double-click or a selected-atom button | M | Low | `MoleculeSandbox.jsx`, `engine/sandbox.js` |
| B14 | Builder and Sandbox use a plain lighting setup and a flat black background | These two views feel less finished than Atom, Reactions and Organic | Reuse the `ViewerCanvas` studio lighting and background (keep stars) | S | Low–Med (visual) | `AtomBuilder.jsx`, `MoleculeSandbox.jsx` |
| B15 | Category assignments in `elements.js` were not reviewed in this pass (only their colours) | Any misclassification now shows prominently in the category legend | Check each element's `category` against IUPAC/common periodic-table groupings | S | Low | `data/elements.js` |

## C. Nice-to-have

| ID | Issue | User impact | Recommended change | Effort | Risk | Files |
|---|---|---|---|---|---|---|
| C1 | Export buttons have no busy styling | Unclear that a click registered | `disabled:opacity-50` and a spinner on the active button | XS | None | `export/ExportPanel.jsx` |
| C2 | No keyboard shortcuts in Reactions | Slower for teachers presenting | Space play/pause, ←/→ step, R reset (ignore when focus is in inputs) | S | Low | `ReactionLab.jsx` |
| C3 | Sandbox is pointer-only | Keyboard users cannot bond atoms | "Bond with…" action on a selected atom | M | Low | `MoleculeSandbox.jsx` |
| C4 | Three separate atom/bond implementations | Style drift between views | Shared `AtomSphere` and `BondCylinder` primitives with shared geometry (PERFORMANCE_AUDIT P3) | M | Med | `viewer/MoleculeView.jsx`, `reaction/ReactionScene.jsx`, `MoleculeSandbox.jsx` |
| C5 | Unused exports: `SCENE_SCALE`, `getMaxElectrons`, `cycleSpeed`, `isAdvanced`, `isQuantumMode`, exported `LABEL_FONT` | Noise for contributors | Remove, or use them. Keep `NarrationPoint(s)` until tutorial annotations are decided | XS | None | `engine/cpk.js`, `utils/orbitalGeometry.js`, `context/SettingsContext.jsx`, `viewer/Label3D.jsx` |
| C6 | Tutorial `camera` and `highlights` fields are authored but not used | Tutorials cannot point at things | Implement camera moves and `NarrationPoint` annotations (already designed) | L | Med | `tutorials/*`, `data/tutorials` |
| C7 | Phone layout is a compressed desktop | Small 3D area on phones | Designed mobile layout: collapsible bottom sheet per view, full-width scene | L | Med | Views, `index.css` |
| C8 | Vendor chunking and WOFF2 font | Faster repeat visits | PERFORMANCE_AUDIT P6 | S | Low | `vite.config.js`, `Label3D.jsx` |
| C9 | `ReactionLab` holds playback, session snapshot and UI together | Harder to change safely | Extract a `useReactionPlayback` hook | S | Low | `ReactionLab.jsx` |
| C10 | Reaction panel scrolls on short tablets, so the stage dots can sit below the fold | Minor | Collapse the description under University level into a disclosure | XS | Low | `ReactionLab.jsx` |

## D. Do not touch

Visual identity and bloom level; the R3F/drei stack and lazy view structure; the labelled scientific approximations (orbitals, energy curves, N/Z hint, connectivity-only sandbox) without a science reviewer; `useDialog`; `preserveDrawingBuffer`; the reaction interpolation and energy-profile math; the Remotion project and agent-tooling folders. Reasons are in ATOMIC_VIZ_REVIEW.md section 6D.

## Done in this pass

| ID | Item |
|---|---|
| A1 | 3D labels anchored via Billboard in Organic, Reactions, Atom and Sandbox |
| A2 | Periodic table coloured by category from one map; legend covers all 10 categories |
| A3 | Nuclear particles and products labelled to match their equations |
| A4 | Sandbox works on non-secure origins |
| A5 | Tablet and phone layouts for Atom, Reactions, Organic, Builder, Sandbox |
| A6 | Bottom panels lift above the tutorial card |
| B1 | Scientific notation for nuclear-scale ΔH |
| B2 | Energy diagram labels, neutral state and alt text |
| B3 | Reaction library memoised during playback |
| B4 | Reaction labels fade with atoms instead of popping |
| B5 | Empty-state hints in Builder and Sandbox; Builder particle caps |
| B6 | Sandbox toast auto-dismisses |
| B7 | ARIA state on toggles, single `h1`, category in tile names |
| B8 | Reduced-motion support |
| B9 | Favicon and meta tags |
