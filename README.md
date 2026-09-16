# AtomicViz

Interactive educational chemistry built with React 19, Vite, Three.js, React Three Fiber, Drei, postprocessing, Framer Motion and Tailwind. Explore all 118 elements, Bohr and stylized orbital views, organic molecules, reaction animations and energy profiles, an atom builder, a molecule sandbox, and guided tutorials.

## Run locally

Use Node 22.12 or newer (CI uses Node 24).

```sh
npm ci
npm run dev
```

```sh
npm run lint -- --max-warnings=0
npm run test:run
npm run test:coverage
npm run build
npm run preview
```

The application is a static client-side site; no backend or account is required. Serve the generated `dist` directory over HTTP(S). WebGL and hardware acceleration are needed for 3D. Desktop is the primary experience; tablet and narrow layouts require the remaining manual checks listed below.

PNG exports capture the active canvas, excluding HTML controls. GLTF exports are static supported-mesh snapshots, excluding shader effects, text, trails and animations. Sandbox discoveries use browser local storage, with a session-only fallback when storage is unavailable.

These are educational illustrations, not quantum chemistry or isotope-stability predictions. Tutorial text and view changes work; authored camera choreography and scene annotations are not fully implemented.

## Engineering documentation

- [Baseline audit](docs/TECHNICAL_AUDIT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Scientific assumptions](docs/CHEMISTRY_ASSUMPTIONS.md)
- [Performance measurements](docs/PERFORMANCE.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Cleanup report and remaining verification](docs/CLEANUP_REPORT.md)

The separate `remotion` project contains video-production source and its own dependencies. Generated videos are ignored. Existing agent-tool adapters are retained as development tooling.
