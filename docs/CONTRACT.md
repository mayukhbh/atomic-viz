# AtomicViz backend contract

Plain JavaScript; no HTTP API or secrets. Example payloads are explicitly samples.

```ts
type Atom = { id: string; element: 'H'|'C'|'O'|'N'; position: [number,number,number]; bonds?: string[] };
type Bond = { id: string; a: string; b: string };
type Snapshot = { atoms: Atom[]; bonds: Bond[] };
type State = Snapshot & { history: Snapshot[] };
type Fixture = { source: 'sample'; state: State; error: null | { code: 'invalid_input'; message: string } };
```

`src/engine/sandbox.js` exports pure functions:

- `createSandboxState()`: fresh empty State.
- `addAtom(state, atom)`: add a unique supported atom and checkpoint.
- `addBond(state, bond)`: add a unique non-self edge between existing atoms within valence and checkpoint.
- `deleteAtom(state, atomId)`: remove the atom and all incident bonds; checkpoint.
- `breakBond(state, bondId)`: remove a bond; checkpoint.
- `undo(state)`: restore the latest snapshot and pop history.
- `canUndo(state)`: whether history is nonempty.
- `moveAtom(state, atomId, position)`: update position without checkpointing each pointer event.
- `bondMovedState(state, atomId)`: apply existing proximity bonding as one checkpoint, including snapped position.

All functions preserve input objects. Invalid additions throw `TypeError`; missing delete/break/move targets and empty undo return the same state. Duplicate bonds (including reversed endpoints) are no-ops. History is limited to 100 snapshots, oldest first. Clear All creates a fresh state; discoveries are independent and are not undone. Existing array-based `bondMovedAtom` remains compatible.

Sample files: empty, typical water, and rejected unsupported atom with unchanged state. `assertSandboxFixture` is the executable shape/reference validator. Fixtures are never persisted as user data.

## Element share URLs

Existing `/?el=Au` app URLs remain supported. Shares use `/share/Au.html?el=Au` with static Open Graph/Twitter metadata and a redirect to `/?el=Au`. Static HTML and 1200×630 PNGs are generated for all 118 elements during build. `SITE_URL` is the public HTTPS origin used for absolute metadata URLs; local builds may use localhost and must not be mistaken for production previews.
