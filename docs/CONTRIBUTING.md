# Contributing

Use Node 22.12+ and `npm ci`. Run lint, `test:run` and build before opening a pull request; GitHub Actions runs the same gates on Node 24. Use `test:coverage` when changing pure engine code.

Add a failing invariant or regression test before correcting chemistry calculations. Keep authored data, pure geometry, animation interpolation and scene rendering separate. Do not introduce pixel-perfect WebGL tests. React Testing Library covers accessible controls and recovery; manually inspect representative scenes after rendering changes.

Preserve AtomicViz's colors, lighting and visual personality. Measure before reducing geometry, postprocessing or resolution. Development `?profile` shows rough frame timing and resource counts; it is not a GPU benchmark.

Do not commit `dist`, coverage, dependencies or generated Remotion videos. The Remotion project and agent-tool adapters are intentional independent development tools. Never describe schematic orbital, isotope or reaction behavior as a physically complete simulation.

Before release, finish the unchecked manual matrix in CLEANUP_REPORT.md, including actual downloads, sandbox dragging/persistence, tablet layouts and WebGL recovery. Keep limitations explicit rather than inferring success from a production build.
