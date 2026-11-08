# Vercel deployment

Static Vite app, no API, database or secrets. Node >=22.12 (CI: 24).

1. Import this repository into Vercel; choose the intended branch yourself.
2. Vercel supplies the public host automatically: preview builds use `VERCEL_URL`, production builds prefer `VERCEL_PROJECT_PRODUCTION_URL`. Optionally set `SITE_URL` to override the origin. These are public metadata, not secrets. Builds fail if no HTTPS origin can be resolved in production. See [Vercel system variables](https://vercel.com/docs/environment-variables/system-environment-variables).
3. Build command `npm run build`, output `dist`; `vercel.json` supplies these.
4. Deploy manually. Verify `/`, `/?el=Au`, `/share/Au.html?el=Au`, `/og/Au.png`, hashed assets and the response headers.

Local verification:

```sh
npm ci
npm run lint -- --max-warnings=0
npm run test:run
SITE_URL=https://atomic-viz.vercel.app npm run build
npx playwright install --with-deps chromium
SOFTWARE_WEBGL=1 npm run smoke
```

There is no TypeScript project/typecheck command: this repository uses JavaScript. Contract fixtures receive runtime schema validation in Vitest. CI runs install, strict lint, tests, build and browser smoke, then uploads screenshots even when the smoke fails. Software WebGL is explicit; test real GPUs separately.

Hashed `/assets/` files are immutable for one year. Root, index and share HTML revalidate; unversioned OG images revalidate. The SPA rewrite excludes assets, OG and share paths, so nonexistent static files do not become HTML. Query strings survive the rewrite. No catch-all redirect drops `?el=`.

Static crawlers cannot get element-specific metadata from a query-only SPA URL. Share an Atom therefore emits `/share/<symbol>.html?el=<symbol>`: crawlers see static per-element metadata and absolute PNG URLs; a browser script redirects to `/?el=<symbol>` (with a link for JavaScript-disabled browsers). Existing query-only links still open the correct atom but retain generic preview behavior. All 118 stubs/PNGs are regenerated after Vite during each build.

Optional test-runner variables are documented in `.env.example`. None is a client secret. Local builds without `SITE_URL` generate localhost metadata and are not publish-ready.
