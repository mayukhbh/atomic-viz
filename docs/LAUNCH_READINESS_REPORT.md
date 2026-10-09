# Atomic Viz — Launch Readiness Report

Independent review: 2026-10-09 UTC / 2026-10-08 America/New_York.

## 1. Executive verdict: NOT READY

**I would not confidently release this candidate to 100 unfamiliar users tomorrow.** Verified scientific errors have been corrected, and automated checks pass. However, real-browser UAT could not execute in this environment. Rendering, mobile layout, touch, graphics recovery, actual downloads and sustained performance remain unverified. This is a release hold for missing acceptance evidence, not a claim that those workflows have failed.

- Final clean lockfile install: `npm ci --ignore-scripts`; no manifest or lockfile changes.
- **111 tests in seven files pass**, strict lint (`--max-warnings=0`) passes, production build passes with the existing large-chunk warning.
- Eight new tests cover DOM workflows and scientific consistency. Canvas wrappers are explicitly mocked out in DOM integration tests. Automated success is **not** successful 3D UAT.
- Three P1 scientific findings corrected at source/DOM level; their visual retests remain blocked.
- No P0 found in inspected code/tests. Absence of P0/P1 defects cannot be certified without browser UAT.
- Previous reviews/screenshots are not counted as evidence. After receiving this verdict, the user explicitly requested merging the reviewed changes and will perform browser checks. The merge does not change the NOT READY launch verdict; no deployment was requested.

### Actual release candidate

Remote references were fetched and checked again using `git ls-remote`.

| Reference | SHA | Assessment |
| --- | --- | --- |
| Latest `origin/main` | `3a13bec538fc30d4ef9f8ff582c1400b3145ce94` | Does not contain polish or Share an Atom |
| Polish implementation | `28e487f` | Unmerged into main; included in candidate |
| Previous review docs | `7113dc2` | Included as documentation, not accepted as test evidence |
| Share an Atom | `a1ce636` | Unmerged into main; included in candidate |
| Latest `origin/review/final-polish-pass` | `6bcfa8f592a6a1287bdd91e76749f0b7186840a0` | Includes camera/ring correction; candidate base |
| Separate expansion branch | `7c28c47` | Unmerged feature expansion: palette, molecules and reactions; excluded |
| Previous local review checkout | `60ff4eb` | Same file tree as `6bcfa8f`; left untouched |

Branch: **`release/launch-readiness-20261009`**. Created from latest main, fast-forwarded to the existing review branch, then given the corrections below. The commit containing this report identifies the candidate. Main alone would omit the intended experiment. The separate `claude/chemistry-app-review-expand-2k5v94` commit needs its own review and is not silently included.

## 2. Product inventory and UAT coverage matrix

One SPA entry point. Modules are component state, not separate routes. `?el=` selects a neutral reference element. Element choices use `replaceState`; module choices create no history entries. Refresh restores the URL element, not module/settings/construction/tutorial state. Reaction selection/progress survive module changes within the mounted app, returning paused. Sandbox discoveries persist locally where storage is available.

Actual modules:

- Atom Explorer: 118 elements, Bohr and stylized quantum models, basic/advanced text, shell counts, picker, camera gestures and sharing.
- Periodic table: modal with 118 element buttons, category legend and selected-element details; 900px minimum grid width with overflow scrolling.
- Organic: 18 molecules across 10 classes; ball-and-stick, space-filling, wireframe, labels, group highlighting and auto-rotation. Seven additional inorganic molecules exist in the registry, not as a separate library view.
- Reactions: 19 reactions, four category filters plus All, play/pause/replay/reset, stages, scrubber, five speeds, equations/descriptions and illustrative energy diagrams.
- Atom Builder: add/remove/cap particles, charge/mass/heuristic stability, neutral reference visualization and reset.
- Sandbox: H/O/C/N placement, pointer dragging, additive proximity bonds, six discovery recipes, saved discovery IDs and Clear All.
- Supporting UI: navigation/settings, seven tutorials/41 steps, PNG/GLTF export, focus-managed dialogs, error boundary, WebGL fallback/recovery messages.

A PASS applies only to the exact scenario and environment stated. `LR` = `src/components/__tests__/launchReadiness.test.jsx`; `LS` = `src/engine/__tests__/launchScience.test.js`. Final results: [test log](uat-evidence/final-tests.txt).

| Scenario | Expected | Actual | Status | Evidence |
| --- | --- | --- | --- | --- |
| Element registry | Unique symbols, Z=1–118, complete electron totals | Existing invariants pass | PASS | `invariants.test.js` |
| Configurations vs shells, all 118 | Internally consistent models | Ds/Rg corrected; all agree after core expansion | PASS | LS; [before](uat-evidence/science-before.txt) |
| C/Fe/Au/U/Og science spot-check | Reference configurations agree | RSC spot-check agrees; not all prose independently certified | PASS | Section 4 references |
| Periodic keyboard/focus/Escape | Selection, focus containment and restoration | Gold-to-Iron selection and existing dialog tests pass in DOM | PASS | LR; `reliability.test.jsx` |
| Periodic touch scrolling and edge columns | All elements reachable | No browser rendering/swiping | BLOCKED | Section 5 |
| Bohr C/Fe/Au/U/Og at five sizes | Complete attractive atoms and labels | No scene rendered | BLOCKED | Section 5 |
| Framing mathematics | Fit sphere and preserve height-only zoom | Existing mathematical scenarios pass | PASS | `deepLink.test.jsx`; not visual evidence |
| Quantum toggle/explanation | State changes; model limits visible | DOM toggle/copy pass | PASS | LR |
| Quantum appearance/transparency/framing | Meaningful visible orbital illustration | No WebGL run | BLOCKED | Section 5 |
| Every Organic class/molecule | Selection changes displayed molecule | All 18 selections pass in DOM | PASS | LR |
| Organic modes/toggles | Expected selected states | Three modes/three toggles pass | PASS | LR |
| Molecule data | Valid formula/endpoints/coordinates/valence | Existing 25 registry-molecule checks pass | PASS | `invariants.test.js` |
| Molecules and bonds rendered | Correct visible geometry and readable framing | Not rendered | BLOCKED | Section 5 |
| All reactions select/scrub/reset | Correct title, replay at end, reset to zero | All 19 pass in DOM | PASS | LR |
| Reaction playback/speed/filter/return | Advances, pauses, filters and restores | DOM workflow passes | PASS | LR |
| Reaction interpolation | Finite positions/opacity at stages | Existing engine checks pass; not proof of physical mechanism | PASS | `invariants.test.js` |
| Reaction animations/labels/transitions | Stable and visually understandable | No browser evaluation | BLOCKED | Section 5 |
| Energy quantities | Correct nuclear/free-energy labels | Corrected text; no inappropriate enthalpy chart | PASS | LR |
| Builder controls/reference/reset | Correct element and enabled states | DOM controls and charge engine tests pass | PASS | LR; `regressions.test.js` |
| Builder heavy scenes | Usable at particle limits | No graphics/performance evidence | BLOCKED | Section 5 |
| Sandbox add/clear/instructions | Construction state updates | Pass in DOM | PASS | LR |
| Sandbox bonding/recipes/storage engine | Correct encoded recognition and storage fallback | Existing regressions pass | PASS | `regressions.test.js` |
| Sandbox drag/discover/reload | Pointer raycast and persistence work together | No browser drag or actual reload | BLOCKED | Section 5 |
| Valid/invalid/malformed deep links | Canonical symbol or clean Carbon fallback | Parsing/hook tests pass | PASS | `deepLink.test.jsx` |
| Gold → Iron → remount | URL restores selected element | Pass in DOM | PASS | LR |
| Share/cancel/clipboard/failure logic | Appropriate graceful result | Mocked capability tests pass only | PASS | `deepLink.test.jsx` |
| Real native share and clipboard | Working sheet/copy/manual fallback | Not exercised in real browser | BLOCKED | Section 5 |
| Browser Back/Forward/bfcache | Predictable restored state | No actual browser history run | BLOCKED | Section 5 |
| All tutorials | Correct step content and Finish exit | All seven/41 steps traversed; picker closed when present | PASS | LR |
| Tutorials on small screens | Scene, narration and Next accessible | No layout inspection | BLOCKED | Section 5 |
| Export helpers | Explicit canvas; actual static GLTF meshes | Existing PNG stub and CPU Three.js GLTF tests pass | PASS | `reliability.test.jsx` |
| Real PNG/GLTF downloads | Nonblank usable artifacts | No browser artifacts inspected | BLOCKED | Section 5 |
| Error boundary retry | Recovers after cause removed | Existing DOM test passes | PASS | `reliability.test.jsx` |
| Missing WebGL/context recovery | Safe fallback/recovery | Source inspected; no fault injection | BLOCKED | Section 5 |
| Rapid navigation/resize/animation interruption | Stable scenes and no leaks | No browser stress test | BLOCKED | Section 5 |
| Automated gates | Tests/lint/build pass | 111 tests and strict lint/build pass | PASS | `final-*.txt` |
| Production deployment | Correct HTTPS, assets, query links and headers | No verified deployed candidate tested | NOT TESTED | No deployment performed |

### First-time-user journeys — heuristic, no human participants

| Journey | Expected | Actual assessment | Status | Evidence |
| --- | --- | --- | --- | --- |
| A: Curious visitor | Discover element, manipulate it, navigate | DOM selection works; visible drag/zoom guidance is missing (instructions are sr-only); manipulation untested | BLOCKED | LR, `App.jsx` |
| B: Science learner | Learn without misleading claims | Verified content errors fixed; model qualifications visible; scenes uninspected | BLOCKED | LR/LS, section 4 |
| C: Explorer | Repeated scene changes/manipulation stay stable | DOM selections pass; no GPU/gesture/stress result | BLOCKED | LR |
| D: Shared mobile visitor | Gold opens, interacts, shares another element | Parsing/selection/mocked sharing pass; mobile rendering and native sheet untested | BLOCKED | LR, deep-link tests |
| E: Returning visitor | Predictable refresh/history behavior | URL remount restores element; construction/settings reset; actual history untested | BLOCKED | LR, state ownership |

Potential abandonment points inferred from implementation: horizontally scrolling mobile navbar hides controls; periodic grid requires sideways browsing; dense tutorial overlays; unsignaled construction loss when changing modules; continuous scene motion. These are heuristics, not observed participant or mobile-layout failures.

## 3. Defect register

| ID / severity | Reproduction and cause | Impact | Status / remaining risk |
| --- | --- | --- | --- |
| S1 / P1 | University → nuclear reactions: eV magnitudes printed as kJ/mol; ATP +30.5 and Daniell −212 printed as ΔH | Wrong quantities/units and invented chemical activation interpretation | Fixed quantity-specific notes; removed ΔH diagram for these cases; ATP equation includes water. DOM regression passes; browser text fit blocked |
| S2 / P1 | Select Ds/Rg and compare shells with expanded displayed configuration | Incompatible representations of one atom | Fixed shells to match existing theoretical configurations; label superheavy predictions. All-118 invariant passes; not a claim of experimentally established configurations |
| S3 / P1 | Quantum/Reactions: documented omitted cores/particles and artificial curves lack visible visitor qualification | Partial/artificial depiction can appear physically complete | Visible model/diagram qualifications added; DOM regression passes; mobile fit unverified |
| U1 / P2 | Build particles or sandbox atoms → another module → return: component-local state is discarded | Construction lost without warning; Organic selection also resets | Open; no persistence feature added |
| A1 / P2 | Reduced-motion preference: Bohr/quantum frame loops continue | Motion-sensitive users cannot pause all motion | Open; CSS and Organic default only partly honor preference |
| A2 / P2 | Keyboard-only sandbox: pointer raycast is required for dragging | Discovery workflow not keyboard-operable | Open |
| U2 / P2 | Mobile nav scrolls horizontally; table grid is minimum 900px | Hidden controls/sideways navigation may confuse | Open heuristic; touch UAT needed |
| PERF1 / P2 | Main JS ~1.45MB; continuous scene loops and preserveDrawingBuffer | Startup and GPU cost risk | Open; no measured runtime regression or speculative quality downgrade |
| SEC1 / P2 | Full audit flags brace-expansion/source-map-js DoS advisories | Toolchain/input-processing exposure | Open; production-only audit zero; no demonstrated public-app exploit |
| D1 / P2 | index.html lacks Open Graph/Twitter preview metadata | Weak link previews | Open; title/description/favicon exist |
| SCI1 / P2 | Remaining chemical enthalpies lack phases/conditions/provenance; advanced prose contains time-sensitive facts | Not every value/claim independently certified | Open; targeted central errors fixed |
| SCI2 / P2 | Stylized orbital lobes, omitted cores, nonphysical opacity/grouping | Limited educational depth | Now explicit; quantum renderer redesign out of scope |
| U3 / P3 | Sighted first visit has no visible drag/zoom instructions | Direct manipulation may be missed | Open heuristic |
| U4 / P3 | Module changes create no history entries; elements replace entry | Back does not undo selections | Existing semantics; actual browser acceptance pending |

Environment restrictions are coverage blockers, not product defects. S1–S3 are corrected in source/DOM tests but browser retests are BLOCKED. No unconditional P0/P1 clearance is issued.

## 4. Scientific accuracy findings

Confirmed errors: nuclear electron-volts per event are not kJ/mol; ATP's standard biochemical +30.5 kJ/mol and Daniell's approximately −212 kJ/mol are Gibbs free energies, not enthalpies; Ds/Rg shell arrays contradicted their declared configurations. Existing total-count tests missed the latter. A new invariant expands noble-gas cores for every element.

Retained simplifications: Bohr paths/radii/speeds are symbolic; quantum omits bracketed cores and does not represent spin occupancy or calculated density; molecules use ideal geometry, not energy minimization; aromatic alternating bonds are schematic; sandbox models connectivity without bond order; builder stability is a heuristic and reference visualization is neutral; reaction scenes may omit particles and are not balanced mechanisms; energy curves do not calculate activation pathways. User-facing qualifications were added where absent.

C, Fe, Au, U and Og configurations agree with the RSC spot-check. All 118 prose descriptions/constants were not independently certified. RSC lists different predicted Ds/Rg assignments from the existing app. We retained the app's theoretical choice, made shells internally consistent and labeled predictions, rather than claiming experimentally resolved assignments.

References consulted for this review:

- [RSC Carbon](https://periodic-table.rsc.org/element/6/carbon), [Iron](https://periodic-table.rsc.org/element/26/iron), [Gold](https://periodic-table.rsc.org/element/79/Gold), [Uranium](https://periodic-table.rsc.org/element/92/Uranium), [Oganesson](https://periodic-table.rsc.org/element/118/oganesson).
- [RSC Darmstadtium](https://periodic-table.rsc.org/element/110/darmstadtium), [Roentgenium](https://periodic-table.rsc.org/element/111/Roentgenium): theoretical-assignment uncertainty.
- [NIST electron volt](https://physics.nist.gov/cgi-bin/cuu/Value?evj): 1.602176634×10⁻¹⁹ J per eV; molar conversion also requires Avogadro's number.
- [ATP/GTP research article](https://pmc.ncbi.nlm.nih.gov/articles/PMC5473427/): standard Gibbs energy of hydrolysis; synthesis reverses the sign.
- [ACS battery electrochemistry](https://pubs.acs.org/doi/suppl/10.1021/acs.jchemed.8b00479/suppl_file/ed8b00479_si_001.pdf): Gibbs-energy relationship; ΔG° = −nFE° gives approximately −212 kJ/mol for n=2, E°=1.10V.
- [DOE deuterium-tritium fusion](https://www.energy.gov/science/doe-explainsdeuterium-tritium-fusion-fuel): helium and neutron products.

## 5. Cross-device and nonfunctional results

Actual successful execution: Ubuntu 24.04 container, Node 24.19.0, Vitest/jsdom, CPU Three.js export tests and Vite production build. Initial baseline used the old checkout's dependencies; final gates used a fresh lockfile install with lifecycle scripts disabled. Ordinary CI `npm ci` remains a separate gate.

| Environment | Result | Limitation |
| --- | --- | --- |
| Chromium desktop 1440×900 | BLOCKED | Downloaded build 1169; launch failed on socket creation (`Operation not permitted`) before opening page |
| Laptop 1280×800 | BLOCKED | No usable browser session |
| Tablet 768×1024 | BLOCKED | No usable browser session |
| Mobile 390×844 | BLOCKED | Intended smoke context never opened; no actual touch emulation |
| Mobile 375×667 | BLOCKED | Not rendered |
| Firefox 153 | BLOCKED | Downloaded; no usable page/result obtained from launch attempt |
| WebKit 26.5 | BLOCKED | Missing host libraries; launch rejected |
| Cloud Chrome fallback | BLOCKED | Local preview returned `ERR_CONNECTION_REFUSED` in separate browser environment |
| Native iOS Safari/Android/physical GPU | NOT TESTED | No devices or GPU session |

[Chromium launch log](uat-evidence/chromium-launch.txt), [WebKit launch log](uat-evidence/webkit-launch.txt). **No successful GPU or software-rendered browser session occurred. No screenshots, touch gestures, real share sheet or FPS results are claimed.** Specifying SwiftShader launch flags does not establish software-rendered coverage.

- Accessibility: DOM focus trapping/Escape/restoration and control names tested. Contrast, screen reader, actual spatial keyboard manipulation and visual focus not verified. Reduced-motion and sandbox gaps are open.
- Performance: main JS **1,448.40 kB / 421.44 kB gzip**; large-chunk warning. Feature chunks are lazy loaded. No runtime load-time, frame pacing, CPU/GPU or memory/leak measurements.
- Security: element allowlist and regex reject malformed input; React text rendering; no eval/dangerouslySetInnerHTML found in application source. No server/auth/database or identified embedded secret in inspected source. Not a penetration test or full-history secret scan.
- Dependencies: [full audit](uat-evidence/dependency-audit.json) has two high tooling advisories; [production audit](uat-evidence/production-dependency-audit.json) has zero. Severity is not demonstrated public exploitability.
- Privacy: analytics dispatch local DOM CustomEvents; no provider/network collection found in source. Sandbox saves discovery IDs locally. Hosting logs/injected analytics unverified; no claim of legal compliance.
- Reliability: automated recovery/parser/share/engine tests pass. Actual browser console, context recovery, network errors and downloads blocked.
- Production/discoverability: static root-base Vite build passes; title, description, theme color and inline favicon present; social previews absent. No live deployment, HTTPS/headers/caching or public asset loading verified. Existing GitHub workflow specifies Node 24 install/lint/test/build; remote CI result not yet established by this review.

## 6. Changes implemented

| File | Change | Validation |
| --- | --- | --- |
| `src/data/reactions.js` | Quantity-specific energy notes; ATP equation | LR energy scenario |
| `src/features/reaction-lab/ReactionLab.jsx` | Correct energy presentation, conditional chart, visible schematic/curve limits | LR |
| `src/data/elements.js` | Ds/Rg shells match declared configurations | LS |
| `src/features/atom-explorer/AtomInfo.jsx` | Visible model limits and predicted-configuration labels | LR |
| `src/components/__tests__/launchReadiness.test.jsx` | Seven DOM product-workflow scenarios, canvases explicitly excluded | Seven pass |
| `src/engine/__tests__/launchScience.test.js` | All-118 core-expanding consistency invariant | One pass |
| `docs/CHEMISTRY_ASSUMPTIONS.md` | Updated science contract | Source review |
| This report and `docs/uat-evidence/*` | Evidence and coverage limitations | Reviewed |

[Initial integration failures](uat-evidence/initial-integration.txt) include the missing science presentation assertions and initial harness issues (timeout, ambiguous heading, missing jsdom PointerEvent); harness failures are not product defects. After harness correction and science fixes, [all seven integration tests pass](uat-evidence/integration-after.txt). [Shell failure](uat-evidence/science-before.txt) precedes shell correction.

Final checks: [111 tests](uat-evidence/final-tests.txt), [strict lint](uat-evidence/final-lint.txt), [build](uat-evidence/final-build.txt), git diff whitespace check. Browser scenarios could not be rerun. No new dependencies, features, broad redesign or unrelated refactoring.

## 7. Outstanding launch risks

1. Blocking browser evidence gap across every requested size and core 3D journey, including new explanatory text fitting mobile panels.
2. Real sharing, clipboard permissions/manual fallback, actual PNG/GLTF output, Back/Forward, WebGL fallback/recovery unverified.
3. Heavy-element/animation performance and memory behavior unknown.
4. Pointer-only sandbox and incomplete reduced-motion support; do not claim full accessibility.
5. Construction loss, hidden mobile controls, remaining scientific provenance and social-preview quality require explicit acceptance or follow-up.
6. At review start main excluded the intended experiment; the user subsequently requested merging this candidate. The separate feature-expansion branch is not covered.

## 8. Launch recommendation

**Hold public launch.** Completed: merge assessment, inventory, source/science review, targeted fixes and automated regression. Incomplete: real-browser UAT and release certification.

Exit criteria:

1. Run this release branch's production build in a browser-capable environment. Complete all BLOCKED matrix rows and journeys A–E, recording screenshots and console/network evidence.
2. Cover all five requested sizes and C/Fe/Au/U/Og; test touch/scroll/overlays and Chromium/Firefox/WebKit where available. Distinguish emulation/software rendering from real-device/GPU testing.
3. Inspect every molecule/reaction scene, sandbox drag/discovery/persistence, real exports/share and actual history. Stress module changes during playback; inspect performance and context recovery.
4. Reproduce and safely fix any P0/P1, rerun affected journeys and automated gates, then update this report with exact tested SHA and results.
5. Confirm remote CI and production commit before an explicit release decision. Do not silently add the expansion branch.

Only then upgrade the verdict to READY or READY WITH CAVEATS. Nothing in this report authorizes automatic merge or deployment.
