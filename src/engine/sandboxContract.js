import { SANDBOX_ELEMENTS } from './sandbox';

/** Runtime validator for the documented fixture contract (throws on invalid data). */
export function assertSandboxFixture(value) {
  const assert = (condition, message) => { if (!condition) throw new TypeError(message); };
  const string = value => typeof value === 'string' && value.length > 0;
  const check = state => {
    assert(state && Array.isArray(state.atoms) && Array.isArray(state.bonds), 'Snapshot arrays required');
    const atoms = new Map();
    for (const atom of state.atoms) {
      assert(atom && string(atom.id) && !atoms.has(atom.id) && SANDBOX_ELEMENTS.includes(atom.element), 'Invalid or duplicate atom');
      assert(Array.isArray(atom.position) && atom.position.length === 3 && atom.position.every(Number.isFinite), 'Invalid position');
      assert(atom.bonds === undefined || (Array.isArray(atom.bonds) && atom.bonds.every(string)), 'Invalid legacy bonds');
      atoms.set(atom.id, atom);
    }
    const ids = new Set(), edges = new Set();
    for (const bond of state.bonds) {
      assert(bond && string(bond.id) && !ids.has(bond.id) && atoms.has(bond.a) && atoms.has(bond.b) && bond.a !== bond.b, 'Invalid bond');
      const edge = JSON.stringify([bond.a, bond.b].sort());
      assert(!edges.has(edge), 'Duplicate edge');
      ids.add(bond.id); edges.add(edge);
    }
  };
  assert(value?.source === 'sample', 'Fixture source must be sample');
  check(value.state);
  assert(Array.isArray(value.state.history) && value.state.history.length <= 100, 'Invalid history');
  value.state.history.forEach(check);
  assert(value.error === null || (value.error?.code === 'invalid_input' && string(value.error.message)), 'Invalid error');
  return value;
}
