# AtomicViz: backend contract, sandbox history, deployment and performance controls

AtomicViz lacks reversible sandbox edits, per-element social previews and repeatable browser checks, and heavy atoms perform unnecessary per-frame work. This change adds a stable contract/fixtures, immutable sandbox operations, static element previews, Vercel configuration and browser CI; it reduces heavy-shell trails and groups quantum lobe updates while preserving default DPR/bloom.

Minimal UI wiring: the sandbox's existing add/drag/clear handlers use the state engine, and Share an Atom (including manual fallback) points at metadata-bearing static stubs. No new controls, layout, color, typography or user copy changes. WOFF replaces TTF because the installed Troika parser explicitly rejects WOFF2. The R3F/drei stack, scientific approximations, reaction math, preserveDrawingBuffer, Narration components and protected folders remain intact.

## Local verification

```sh
npm ci
npm run lint -- --max-warnings=0
npm run test:run
SITE_URL=https://atomic-viz.vercel.app npm run build
SITE_URL=https://atomic-viz.vercel.app npm run verify:og
npx playwright install --with-deps chromium
SOFTWARE_WEBGL=1 npm run smoke
```

Strict lint PASS; 120 tests / 8 files PASS; build PASS with graphics-size warning; all 118 metadata documents and 1200×630 PNGs verified. No TypeScript/typecheck script exists. See docs/backend-evidence for logs and docs/BACKEND_REVIEW.md for scope.

## Verification gaps

Local browser launch is blocked by `socket() failed: Operation not permitted`; downloaded Chromium archive was corrupt. No screenshots, before/after frame-time measurements or successful browser smoke are claimed. CI must run and browser acceptance must pass before completion. The performance table marks all five scenarios unmeasured. WOFF visual rendering, adaptive quality, chunked runtime, Vercel routing/headers and actual social crawler output remain unverified. Nothing has been merged or deployed.

## Category review / proposals

No data changes applied. Full all-118 inventory and sources: docs/CATEGORY_REVIEW.md. Zn/Cd/Hg/Cn use the existing broad d-block `Transition Metal` convention; the stricter [IUPAC definition](https://goldbook.iupac.org/terms/view/T06456) needs a deliberate classification policy. Po's metalloid boundary also needs an agreed source. [IUPAC group/range references](https://iupac.org/what-we-do/periodic-table-of-elements/) support retaining the named families and f-block ranges. These ambiguities are not silently turned into color changes.

## Open questions for Mayukh

- Confirm whether the existing broad d-block and Po category conventions should be retained or revisited with a science reviewer.
- Supply real-device performance acceptance (low-end laptop/mobile); software CI cannot establish real-GPU timing.

Housekeeping: no tracked Replit files found. docs/BRANCH_REPORT.md inventories every remote non-main branch. scripts/prune-branches.sh refreshes refs, rechecks ancestry and uses a lease; it has not been run.
