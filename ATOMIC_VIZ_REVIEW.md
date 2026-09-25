# Atomic Viz: Final Review and Polish Pass

Review date: 25 September 2026. Branch: `review/final-polish-pass`, based on `main` at `3a13bec`.

Scope: a release-readiness review, not a rewrite. The concept, visual identity, stack and scientific framing were kept. Every change below is small, local and covered by the existing quality gates (lint with zero warnings, 85 unit/DOM tests, production build).

How this review was done: full read of the application source (about 5,900 lines excluding data), the existing docs, a production build, and a scripted headless-Chromium walkthrough of every view at 1440×900, 1024×768 and 390×844, captured before and after the fixes. Headless rendering used SwiftShader (software WebGL), so screenshots confirm layout and correctness, not frame rate.

Companion documents: [PERFORMANCE_AUDIT.md](PERFORMANCE_AUDIT.md) and [POLISH_BACKLOG.md](POLISH_BACKLOG.md).

---

## 1. What Atomic Viz is

An interactive, static, client-side chemistry explorer with five views behind a single top navigation:

| View | What the user does | Main files |
|---|---|---|
| Atom | Pick any of the 118 elements from a periodic table; see a Bohr model with orbiting electrons or a stylised s/p/d/f orbital view; read a basic or university-level description | `App.jsx`, `components/Atom.jsx`, `components/atoms/*`, `features/atom-explorer/AtomInfo.jsx`, `components/PeriodicTable.jsx` |
| Reactions | Choose one of 20 authored reactions (inorganic, organic, nuclear, advanced); play, pause, scrub or step through it; watch a live energy profile | `features/reaction-lab/ReactionLab.jsx`, `components/reaction/*`, `engine/reactionEngine.js`, `data/reactions.js` |
| Organic | Browse functional-group classes and molecules; switch ball-and-stick, space-filling or wireframe; highlight the functional group | `components/organic/OrganicLab.jsx`, `components/viewer/MoleculeView.jsx`, `engine/molecules.js`, `engine/builders.js` |
| Builder | Add protons, neutrons and electrons; see element identity, charge and a rough stability hint; visualise the resulting atom | `components/AtomBuilder.jsx`, `engine/atomBuilder.js` |
| Sandbox | Drop H, C, O, N atoms, drag them together to bond, discover small molecules (persisted in local storage) | `components/MoleculeSandbox.jsx`, `engine/sandbox.js` |

Cross-cutting: guided tutorials (`components/tutorials`, `data/tutorials`), a High School / University complexity toggle, PNG and GLTF export (`components/export`, `utils/exportHelpers.js`), and scene recovery (`SafeCanvas`, `ExperienceBoundary`).

**Primary workflow.** Land on Carbon in the Atom view, rotate it, switch element via the periodic table, flip between Bohr and Quantum, then move to Reactions and press Start. Tutorials drive the same views step by step.

**How visualisations are produced.** Everything is declarative React Three Fiber. Authored data (elements, reactions, molecules built procedurally from ideal sp3/sp2 geometry) goes through pure engine functions (geometry, interpolation, validation) and is rendered as meshes. Per-frame motion (electron orbits, pulses, auto-rotate) lives in `useFrame` callbacks. Reaction playback is a `requestAnimationFrame` loop that advances a single `progress` value in React state, and `interpolateReaction(reaction, progress)` returns eased atom positions, scale/opacity fades and bond fades. The energy profile is a hand-built SVG.

**Major dependencies.** React 19, Vite 7, three 0.181, @react-three/fiber 9, drei 10 (Text/troika, Trail, Billboard, Environment, Stars, OrbitControls), @react-three/postprocessing 3 (bloom, vignette), framer-motion 11, Tailwind 4, lucide-react. Vitest 5 with jsdom and Testing Library.

**Where complexity lives.**
- `data/elements.js` (1,107 lines) and `data/reactions.js` (922 lines): hand-authored data. This is where correctness risk actually sits.
- `utils/orbitalGeometry.js` and `components/atoms/QuantumOrbitals.jsx`: the most "invented" visual logic and the heaviest mesh counts.
- `features/reaction-lab/ReactionLab.jsx`: playback, session restore and UI in one component.
- `components/common/useDialog.js`: compact but dense focus-trap and inert logic.

The architecture is sensible for its size: pure engine functions, data separated from rendering, lazy-loaded views, a shared studio canvas, and error boundaries around WebGL.

---

## 2. Visualisation quality audit

What was already good: a coherent dark "studio" look (shared lighting rig, local Lightformer environment, restrained bloom and vignette), bundled label font so text never depends on a CDN, deterministic Bohr shell tilts, auto-fit scaling for molecules, eased reaction interpolation, and honest labelling of scientific approximations.

What made it feel technically correct but visually amateur, before this pass:

| Finding | Seen where | Status |
|---|---|---|
| 3D labels were offset in model space, so they drifted off their atoms and slid behind them as molecules rotated or the camera orbited. In the tablet capture the "C" label floated beside the carbon, "H" labels hung in space | Organic, Reactions, Atom nucleus, Sandbox | **Fixed** |
| Periodic table tiles were coloured with per-element CPK colours while the legend claimed category colours. The legend listed 8 categories, the data has 10 (no Lanthanide or Actinide), and it sat below the fold at 1440×900 | Periodic table | **Fixed** |
| Nuclear reactions drew neutrons and electrons as "H" and fission/alpha products as "Fe" and "Ar", contradicting the equation shown right above the scene | Reactions: fission, fusion, alpha, beta | **Fixed** |
| ΔH for nuclear reactions printed as "ΔH = -200000000 kJ/mol" | Reactions (University level) | **Fixed**: "−2.0 × 10⁸ kJ/mol" |
| Energy diagram: in-SVG "Reaction progress" axis title overlapped the HTML stage labels; on phones "Reactants" and "Transition state" ran together | Reactions | **Fixed**: stage labels moved into the SVG as the x-axis |
| Energy diagram showed an exothermic/endothermic colour and ΔH bracket even when no enthalpy exists | Reactions | **Fixed**: neutral colour, bracket omitted |
| Reaction type and domain rendered as "NUCLEAR • NUCLEAR" | Reactions | **Fixed** |
| Sandbox discovery toast bounced forever and never dismissed | Sandbox | **Fixed**: static, auto-dismiss after 4.5 s |
| Builder charge badges ("+1", "0", "-1") read like counters next to particle names | Builder | **Fixed**: labelled as charge in title and accessible name |
| Electron trails turn into jagged polygons when frame rate drops (drei `Trail` samples once per frame) | Atom view, most visible on heavy elements and slow GPUs | Backlog B |
| Energy curve is always the same shape; activation energy is synthesised, not authored | Reactions | Documented approximation. Do not touch without science review |
| Builder and Sandbox use a plainer lighting setup than the other three views | Builder, Sandbox | Backlog B |

Responsiveness and scaling: desktop was solid. At 1024×768 the organic info card overlapped the library; at 390 px the Builder's two panels stacked on top of each other (the add-particle controls were hidden behind the stats panel), the Organic panels overlapped completely, and the Reactions view was two cramped columns covering the scene. All four now have explicit tablet and phone layouts (section 7).

Export: PNG captures the post-processed canvas; GLTF exports an untextured static mesh snapshot with clear in-panel copy about what is excluded. Error states are explicit. This is honest and adequate. The only gap found is that export buttons show no disabled styling while busy (Backlog C).

---

## 3. UX audit

**Time to understand.** Good. The app opens on a rendered atom with a large element name, one obvious "Select Element" call to action and a five-item navigation. Tutorials are one click away.

**Steps.** Changing element is two clicks. Playing a reaction is one click. Reaching a specific organic molecule is two. These are appropriately short.

**Defaults.** Sensible: Carbon, Bohr, High School, Water Formation, Methane in ball-and-stick with labels and highlighting on. Organic auto-rotate now defaults off when the OS requests reduced motion.

**Feedback and empty states.** Builder and Sandbox opened to an empty black canvas with no instruction. Both now show a short hint that disappears once the user starts. The Sandbox has no per-atom delete or undo, only "Clear All" (Backlog B).

**Undo and reset.** Reset exists in Reactions, Builder (per-particle remove plus reset) and Sandbox (clear). No undo for sandbox bonds.

**Loading and errors.** Suspense fallbacks, a WebGL fallback message, context-loss banner, and per-view retry boundaries are all in place and good.

**Tutorials.** The tutorial card covered the bottom-left element info and the reaction controls. The card now publishes its height and those panels lift above it.

**Accessibility.** Dialogs trap focus, restore focus and handle Escape; canvases have text alternatives. Gaps fixed in this pass: toggles lacked `aria-pressed` / `aria-expanded`, the complexity and orbital toggles had no accessible name describing their state, the element name was a second `<h1>`, periodic tiles did not announce their category, the reset icon button had only a `title`. Remaining gaps: 3D content is not keyboard-operable (expected, documented), Sandbox cannot be used without a pointer (Backlog C).

**Mobile and tablet.** See section 7. Phone is now usable for every view, but it is a compressed desktop layout, not a designed mobile experience. The top nav scrolls horizontally on phones, so Tutorials and Export sit off-screen until scrolled (Backlog B).

---

## 4. Engineering quality audit

Overall: tidy for its size. Pure, tested engine code; a single canvas abstraction; lazy loading; boundaries; CI running lint, tests and build.

| Area | Observation |
|---|---|
| Duplicated rendering logic | Atom sphere and bond cylinder code exists in three flavours (`MoleculeView`, `ReactionScene`, `MoleculeSandbox`) with slightly different materials. Acceptable now; worth one shared `AtomSphere` / `BondCylinder` later (Backlog C) |
| Oversized components | None extreme. `ReactionLab` mixes playback, session snapshot and UI; the library list was split out and memoised in this pass |
| Rerenders | Reaction playback sets React state every animation frame, rerendering the lab panel. The library list no longer rerenders; the rest is cheap. See PERFORMANCE_AUDIT.md |
| Per-frame cost | Heavy elements create one `useFrame` and one `Trail` per electron (118 for Oganesson) and up to 78 transparent double-sided lobes in Quantum mode, each with its own `useFrame`. The biggest remaining performance risk |
| Memory | Effects clean up timers, listeners and RAF. GLTF export clones materials and disposes them. No leaks found by reading; a long-session GPU memory test is still outstanding |
| State management | Simple and appropriate (one settings context, local feature state). The settings context value object is not memoised, which is harmless at current scale |
| Layout calculations | Panels were absolutely positioned with fixed widths and no small-screen rules. Now handled in CSS via class hooks; still a manual system rather than a layout grid |
| Types | Plain JavaScript in the app (TypeScript only in the separate Remotion project). Data shape is guarded by tests rather than types |
| Dead code | `NarrationPoint(s)` (intended for future scene annotations), `SCENE_SCALE`, `getMaxElectrons`, `cycleSpeed`, `isAdvanced`, `isQuantumMode`, exported `LABEL_FONT` are unused. Left in place; listed in Backlog C |
| Robustness | `crypto.randomUUID` would throw on any non-HTTPS, non-localhost origin (the README says HTTP(S) hosting). **Fixed** with a fallback. An unknown reaction id from a stale session or tutorial would crash the scene. **Fixed** with a safe fallback |
| Tests | 77 existing tests plus 8 added: energy formatting (including rounding at exponent boundaries and invalid input), category colour coverage and uniqueness, nuclear particle labels, energy-profile bounds for extreme and missing enthalpy. No rendering tests for 3D components, which is normal; the browser smoke script used for this review is a good candidate for CI (Backlog B) |

---

## 5. Conceptual stress test

| Scenario | Behaviour before | Now |
|---|---|---|
| Very small data: Hydrogen, empty Builder, empty Sandbox, one-stage reaction | Rendered correctly; empty Builder/Sandbox gave no guidance | Hints added. One-stage reactions are handled by the engine |
| Very large data: Oganesson (118 electrons, 7 shells), Quantum mode for At/Rn/Ts/Og (78 lobes) | Renders, but heaviest frame cost in the app; trails degrade at low frame rate | Unchanged by design. Backlog A/B has a bounded fix |
| Long labels: "Ammonia Synthesis (Haber Process)", "Rutherfordium", "Beta Decay (Carbon-14)" | Library wraps fine; element names truncate in tiles with ellipsis; 6xl element names overflowed on phones | Phone title size reduced; tiles now expose full names via `title` and accessible name |
| Missing values: element without electronegativity, reaction without enthalpy | EN chip hidden correctly; energy diagram painted a misleading endothermic colour and ΔH bracket | Neutral rendering when enthalpy is absent |
| Negative values: exothermic reactions, anions in Builder | Correct | Correct; minus signs are now true minus signs in ΔH |
| Extreme outliers: ΔH of −2×10⁸ kJ/mol | Energy curve bounded by `tanh` (good), text unreadable | Scientific notation; tested that profiles stay finite and bounded |
| Narrow/mobile screens | Builder, Organic and Reactions unusable at 390 px; tablet overlaps | Dedicated layouts; verified in screenshots |
| Rapid interactions: spam "Add proton", rapid reaction switching, speed changes mid-play | Unbounded particle count; reaction switching safe (RAF cancelled on change) | Particles capped (118 protons, 180 neutrons, 118 electrons) with disabled buttons |
| Malformed input: unknown element symbol, invalid molecule, corrupt local storage, unknown reaction id | Element falls back to H; molecules validated; storage parse guarded | Unknown reaction id now falls back instead of crashing |
| Insecure origin (plain HTTP on a LAN or school server) | Sandbox threw on first atom | Fallback id generator |
| Pointer on a sandbox atom's label | The label mesh swallowed the pointer, so grabbing an atom by its centre did nothing | Label ignores raycasts |

---

## 6. Findings by priority

Effort: XS < 1 h, S ≈ half a day, M ≈ 1–2 days, L > 2 days.

### A. Must fix before shipping

| # | Issue | User impact | Recommended change | Effort | Risk | Files | Status |
|---|---|---|---|---|---|---|---|
| A1 | 3D labels offset in model space | Labels detach from atoms and hide behind them while rotating; reads as broken | Offset inside `Billboard` so the offset always points at the camera | XS | Low | `viewer/MoleculeView.jsx`, `reaction/ReactionScene.jsx`, `Atom.jsx`, `MoleculeSandbox.jsx` | Done |
| A2 | Periodic legend contradicts tile colours; 2 categories missing | Teaches the wrong thing; looks careless | One category colour map drives tiles and legend; legend above the grid | S | Low | `PeriodicTable.jsx`, new `data/categories.js` | Done, tested |
| A3 | Nuclear reactions show H/Fe/Ar where equation says n, e⁻, Ba, Kr, Th | Scientifically wrong labels in an educational product | Real elements where they exist, `label`/`color` overrides for particles, carried through the engine | S | Low | `data/reactions.js`, `engine/reactionEngine.js`, `ReactionScene.jsx` | Done, tested |
| A4 | Sandbox crashes on non-secure origins | Feature dead on plain HTTP hosting | `randomUUID` fallback | XS | Low | `MoleculeSandbox.jsx` | Done |
| A5 | Builder, Organic and Reactions unusable at phone width; Organic overlaps at tablet | Controls unreachable or covered | Class hooks plus CSS layouts at 1150 px and 700 px | M | Low–Med (CSS only) | `index.css`, the three view components | Done, screenshot-verified |
| A6 | Tutorial card covers element info and reaction controls | The thing the tutorial is talking about is hidden | Card publishes `--overlay-bottom`; panels lift | S | Low | `TutorialOverlay.jsx`, `index.css` | Done |
| A7 | Complete manual release checks carried over from the previous cleanup: real-GPU frame timing on a low-end laptop and a mid-range phone, file download delivery in Safari and Firefox, prolonged context-loss recovery | Unknown failures on real hardware | Run the smoke matrix; the headless script from this review covers layout only | S | n/a | n/a | **Open** |

### B. High-value polish

| # | Issue | User impact | Recommended change | Effort | Risk | Files | Status |
|---|---|---|---|---|---|---|---|
| B1 | Unreadable nuclear ΔH | Hard to read at University level | `formatEnergy` with scientific notation | XS | Low | `engine/format.js`, `ReactionLab.jsx` | Done, tested |
| B2 | Energy diagram label collision, misleading colour without enthalpy, generic alt text | Chart looks amateur; screen readers get no conclusion | In-SVG stage labels, neutral state, descriptive `aria-label` | XS | Low | `reaction/EnergyDiagram.jsx` | Done |
| B3 | Library list rerenders each playback frame | Wasted work during playback | Memoised `ReactionLibrary` | XS | Low | `ReactionLab.jsx` | Done |
| B4 | Reaction labels popped in late | Labels flicker in after atoms appear | Keep mounted, fade with atom | XS | Low | `ReactionScene.jsx` | Done |
| B5 | Empty Builder and Sandbox | User does not know what to do | One-line hints | XS | Low | `AtomBuilder.jsx`, `MoleculeSandbox.jsx` | Done |
| B6 | Endless bouncing toast | Distracting | Static, auto-dismiss | XS | Low | `MoleculeSandbox.jsx` | Done |
| B7 | Missing ARIA state on toggles; duplicate `h1`; tiles without category | Screen-reader users cannot tell state | Added | XS | Low | `App.jsx`, `AtomInfo.jsx`, `OrganicLab.jsx`, `PeriodicTable.jsx` | Done |
| B8 | No reduced-motion support | Motion-sensitive users get auto-rotate and animations | Global reduced-motion CSS; auto-rotate default honours the OS | XS | Low | `index.css`, `OrganicLab.jsx` | Done |
| B9 | Favicon 404 on every load | Console error, blank tab icon | Inline SVG favicon, description, theme colour | XS | None | `index.html` | Done |
| B10 | Heavy-element per-frame cost | Possible jank on low-end devices | See PERFORMANCE_AUDIT.md P1/P2 | S–M | Med | `atoms/BohrModel.jsx`, `atoms/QuantumOrbitals.jsx` | Backlog |
| B11 | Nav actions off-screen on phones | Tutorials and Export hard to find | Compact overflow menu for the right-hand actions under 700 px | S | Low | `App.jsx`, `index.css` | Backlog |
| B12 | Browser smoke test not in CI | Layout regressions go unnoticed | Commit the Playwright script used here as `npm run smoke` | S | Low | new `scripts/` | Backlog |

### C. Nice-to-have

Sandbox undo and per-atom delete; keyboard shortcuts for reaction play/pause and stepping; export button busy styling; shared atom/bond primitives; removing the listed dead exports; unified studio lighting for Builder and Sandbox; a designed (not compressed) phone layout. Details in POLISH_BACKLOG.md.

### D. Do not touch

| Area | Why |
|---|---|
| Visual identity: dark studio canvas, cyan accent, bloom level, typography | It is coherent and distinctive. Tuning it now is taste churn with regression risk |
| React Three Fiber / drei stack and the lazy-loaded view structure | Not blocking quality or performance; a framework change would be a rewrite |
| Scientific approximations (stylised orbitals, synthetic energy curves, N/Z heuristic, connectivity-only sandbox) | They are clearly labelled. Changing them needs a science review, not a UI pass (see `docs/CHEMISTRY_ASSUMPTIONS.md`) |
| `useDialog` focus management | Dense but correct and tested |
| `preserveDrawingBuffer: true` | Reliable PNG export depends on it; only revisit with measurements |
| Engine interpolation and energy profile math | Well tested; bounded under extreme input |
| The Remotion project and agent-tool folders | Separate concerns, not shipped with the app |

---

## 7. What was implemented in this pass

All on branch `review/final-polish-pass` (one commit on top of `main`).

- **Label anchoring** (A1): Billboard-relative offsets in four renderers; sandbox labels ignore raycasts so grabbing an atom works.
- **Periodic table** (A2): `data/categories.js` is the single source; category-tinted tiles, symbol colour and hover; legend of all 10 categories above the grid; tiles announce category.
- **Nuclear reactions** (A3): Ba, Kr and Th rendered as themselves; neutrons (n), electron (e⁻), deuterium (²H) and tritium (³H) labelled correctly with distinct colours; engine carries `label` and `color`.
- **Reaction panel** (B1–B4): scientific notation for large ΔH with non-wrapping value, neutral diagram when enthalpy is absent, collision-free axis labels, descriptive chart alt text, deduplicated type/domain chip, memoised library, stable bond keys, labels fade instead of popping, unknown-id fallback, labelled reset button.
- **Sandbox** (A4, B5, B6): secure-context fallback, auto-dismissing toast, empty-state hint, labelled add buttons.
- **Builder** (B5): particle caps with disabled states, charge labelling, empty-state hint, stats panel scrolls instead of overflowing short screens.
- **Responsive layouts** (A5): tablet rules for Organic and Builder widths; phone layouts for Atom, Reactions (library strip plus bottom sheet), Organic (library, compact controls, info), Builder (particle row plus stats sheet) and Sandbox.
- **Tutorial overlap** (A6): `--overlay-bottom` published by the tutorial card.
- **Accessibility and motion** (B7, B8): ARIA state on toggles and lists, one `h1`, reduced-motion support.
- **Housekeeping** (B9): favicon and meta tags.
- **Tests**: new `src/engine/__tests__/polish.test.js` (8 tests).

Gate results after the pass: `eslint --max-warnings=0` clean, 85/85 tests passing, production build succeeds. Initial JS entry 1,442.85 kB (419.27 kB gzip), within 1 kB of the baseline.

---

## 8. Final assessment

**Overall maturity: late beta.** The foundation (architecture, tests, recovery paths, scientific honesty) was already production-grade. The product layer had a handful of visible correctness and layout faults that an educator or reviewer would notice in the first five minutes; those are now fixed. What stands between this and a confident public release is verification on real hardware (A7) and a bounded performance fix for the heaviest atoms.

**Top 5 remaining improvements**
1. Run the real-device release matrix (A7): low-end laptop GPU, mid-range Android, iPad Safari, download delivery in Safari and Firefox.
2. Bound per-frame cost for heavy elements: disable or thin electron trails above a shell-size threshold and pulse orbital lobes once per group (PERFORMANCE_AUDIT P1, P2).
3. Add the headless browser smoke script to CI so layout regressions at three widths fail the build (B12).
4. Phone navigation: move Tutorials, Export and the toggles into a compact menu so nothing sits off-screen (B11).
5. Sandbox undo and per-atom delete; it is the only view where a mistake forces a full reset.

**Biggest technical risk:** frame time on low-end and mobile GPUs for heavy elements and Quantum mode, compounded by full-screen bloom and `preserveDrawingBuffer`. Nothing has been measured on real mid-range hardware yet.

**Biggest UX risk:** the phone experience. It now works, but it is a compressed desktop: the 3D scene gets a narrow band between panels, and key actions live in a horizontally scrolling nav. If a meaningful share of students arrive on phones, this is where they will bounce.

**Strongest part of the product:** the reaction lab. Continuous eased interpolation between authored stages, a scrubber, speed control, stage dots and a live energy profile make an abstract concept tangible, and it is backed by the best-tested engine code in the repo.

**Leave deliberately alone:** the visual identity, the R3F stack, the scientific approximation layer (without a science reviewer), the dialog focus logic, `preserveDrawingBuffer`, and the interpolation math. See section 6D.
