# AtomicViz backend review

Status: local implementation prepared; **not done / not release-ready**. Branch: `codex/atomic-viz-backend`, based on main `9c264399f48edb98fd00218c366043b7a2e67eb0`. Contract and three fixtures were committed first (`ad295f9`). No deployment, merge or branch deletion occurred.

## Delivered locally

- Sandbox add/bond history, undo, delete and break functions; runtime fixture validation; current controls record state history. No new UI controls or visual redesign.
- Heavy-shell trail cap, grouped quantum pulses, reduced lobe subdivisions and sustained-FPS adaptive DPR/bloom. Original default visuals retained; browser comparison outstanding.
- Vendor chunks and bundled WOFF font. WOFF2 is rejected by the installed Troika renderer; no stack replacement introduced.
- Static Vercel config, absolute OG metadata and 118 generated 1200×630 PNGs, share URL adapter including manual-copy fallback.
- Playwright runner for all five views at 1440/1024/390; CI screenshot artifacts and metadata verification.
- Safe branch-pruning script (not executed), remote branch inventory, category review, deployment docs, env example.
- Removed unused `SCENE_SCALE`, `cycleSpeed`, `isAdvanced`, `isQuantumMode`, `LABEL_FONT`. `getMaxElectrons` is used by scientific invariants and retained. Narration components retained. No tracked Replit-only files were found. Protected folders untouched.

## Verified

Node 24.22.1; `npm ci` baseline install and added Playwright/sharp development dependencies.

| Check | Result |
| --- | --- |
| `npm run lint -- --max-warnings=0` | PASS |
| `npm run test:run` | PASS: 120 tests in 8 files |
| Typecheck | N/A: plain JS repo has no typecheck script |
| `SITE_URL=https://atomic-viz.vercel.app npm run build` | PASS; expected large graphics chunk warning |
| `SITE_URL=https://atomic-viz.vercel.app npm run verify:og` | PASS: 118 HTML/PNG pairs, all 1200×630 |
| `node --check scripts/smoke.mjs` | PASS |
| `bash -n scripts/prune-branches.sh` | PASS; no deletions performed |
| `git diff --check` | PASS |
| OG visual inspection | Gold PNG inspected; readable and unclipped |

Raw logs: [backend-evidence](backend-evidence/). The local build uses the actual public origin only as metadata; it was not deployed.

## Blocked / unverified

- Playwright download returned a corrupt archive. Existing system Chromium aborted on a prohibited socket operation before page creation. Smoke, actual 3D visuals, WOFF glyph rendering, navigation runtime and before/after frame times are unverified. `docs/PERFORMANCE.md` explicitly reports no measured frames, not invented estimates. Browser runner is prepared but not proven passing.
- Remote push was rejected by automatic approval review: publication to the public GitHub remote was treated as lacking explicit authorization for the disclosure/destination, despite the attached workflow brief. No alternate publication path was attempted. No PR exists and CI has not run on this branch.
- Vercel response headers, crawler previews and production routing need deployed verification by Mayukh; no deployment attempted.

## Remaining work in the supplied brief

Finish AtomicViz publication and browser/CI gates before treating its done criteria as met. ParentHQ, BankDealCC, RetireMe, TravelAPIMashup, HealthLogger, FocusFlow and abandoned-cart-engine have not been modified; the required repo order is preserved.
