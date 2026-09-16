# AtomicViz Cleanup Report

## 1. What was wrong

The baseline built but lint reported 39 errors and 3 warnings. There was no automated test layer, a 1.67 MB initial JS bundle, mixed application/feature state, broken sandbox recognition, invalid tutorial references, misleading export placeholders and geometry/interpolation edge cases. The initial dependency audit reported four advisories.

## 2. What changed

Added invariant and DOM tests; isolated feature state; repaired tested terminal geometry and stage interpolation; extracted sandbox recognition/storage helpers; added actual scene PNG/GLTF export, scene recovery and accessible dialogs. Scientific heuristics now have explicit labels. Added lazy loading, CI and documentation while retaining the existing visual style.

## 3. Significant reorganization

App delegates atom information and reaction ownership to features. Engine helpers cover sandbox, atom-builder calculations and molecule validation. SafeCanvas and ExperienceBoundary centralize recovery; scene export uses a shared registry. Settings consumers use a separate hook module. Existing cohesive feature folders remain intact.

## 4. Dependencies added

Vitest and V8 coverage, React Testing Library, user-event, jsdom and eslint-plugin-react. Matching Vitest 5 packages avoid the older test-server security advisory. Targeted transitive security updates were applied; the recorded follow-up audit reported zero advisories. This is a dated result, not a future guarantee.

## 5. Dependencies and artifacts removed

Removed the unused direct @react-spring/three dependency (it may still occur transitively), unreachable renderers, stale scaffold assets/config and generated Remotion video tracking. Kept Remotion source and useful agent-tool adapters.

## 6. Tests

77 tests across three files pass: element coverage, molecule formulas/valences/coordinates, geometry, all reaction progress/energy paths, tutorials, connectivity/storage/input regressions, modal keyboard behavior, tutorial navigation, recovery and real mesh GLTF serialization. Engine/utils coverage: 96.86% statements, 82.01% branches, 93.84% functions and 98% lines. This is not application-wide coverage. Lint and production build are separate gates.

## 7. Performance

Feature-local animation, memoized energy paths, deterministic sandbox helpers, reused pointer math and cleanup of dead rendering code. Existing lighting/bloom remain. Development frame/resource samples and caveats are in PERFORMANCE.md; complete comparative GPU profiling remains open.

## 8. Bundle size

Initial JS: 1674.49 → 1441.84 kB; gzip 488.67 → 418.91 kB (about 14% less). Feature chunks defer their cost. The large initial chunk warning remains.

## 9. Scientific approximations

Idealized molecular geometry, stylized orbitals with incomplete core/occupancy handling, heuristic neutron/proton feedback, schematic reaction stages and energy curves, constrained single-edge sandbox chemistry. See CHEMISTRY_ASSUMPTIONS.md.

## 10. Remaining debt and manual verification

Verified in browser: original Carbon appearance; Hydrogen/Oganesson switching; periodic-table selection and Escape/focus restoration; complexity and orbital-mode switching; methane and Toluene rendering; organic selection and display controls; reaction start/pause/scrub/speed/filter/replay and retained selection; builder particle controls, Hydrogen recognition and cation feedback; sandbox H₂ dragging/bonding/recognition and discovery persistence after reload; tutorial start/next/keyboard Back/exit and reaction context.

Manual export testing exposed an invalid texture image in GLTF export. A regression test reproduced it; exports now clone untextured materials without modifying the live scene. The refreshed browser reports “Download prepared.” PNG also reaches that state, but the in-app browser download event timed out, so delivery of saved files is not confirmed.

At 1024×768, reaction controls remain accessible but side panels obscure parts of the scene. More tablet layouts and prolonged GPU/context-loss behavior remain release checks. Tutorial camera choreography and scene annotations remain unsupported. Complex organic and reaction samples were collected; these are uncontrolled observations, not comparative GPU benchmarks.

The draft PR should remain unmerged until download delivery and remaining tablet/recovery checks pass. Account usage-limit interruptions delayed verification; unchecked items are not claimed as passing.

## 11. Recommended next five tasks

1. Complete the release smoke matrix and tablet fixes exposed by it.
2. Establish repeatable GPU/startup profiling across representative hardware.
3. Correct and source orbital occupancy/core representation with science review.
4. Add provenance and conservation checks appropriate to each authored reaction.
5. Finish tutorial camera/annotation behavior and broaden accessible scene descriptions.

## 12. Recommendation

**NOT READY for production release yet.** The foundation is substantially improved and reviewable, but required manual verification and broader performance checks remain incomplete. Keep this as a draft PR; do not infer release readiness from the passing unit suite.
