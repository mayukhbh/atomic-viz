import { describe, it, expect } from 'vitest';
import { addAtom, addBond, undo, canUndo, deleteAtom, breakBond, createSandboxState, bondMovedState, moveAtom } from '../sandbox';
import { assertSandboxFixture } from '../sandboxContract';
const fixtures = import.meta.glob('../../../fixtures/sandbox/*.json', { eager: true, import: 'default' });
const atom = (id, element = 'H', position = [0,0,0]) => ({ id, element, position });
const freeze = value => { Object.values(value).forEach(v => { if(v && typeof v === 'object') freeze(v); }); return Object.freeze(value); };
describe('sandbox contract and history', () => {
  for (const [path, fixture] of Object.entries(fixtures)) it(`validates ${path}`, () => expect(assertSandboxFixture(fixture)).toBe(fixture));
  it('rejects malformed references, history and unlabelled sample data', () => {
    const good = Object.values(fixtures).find(f => f.state.atoms.length);
    for (const bad of [{...good, source:'live'}, {...good,state:{...good.state,history:null}}, {...good,state:{...good.state,bonds:[{id:'x',a:'missing',b:'oxygen'}]}}]) expect(() => assertSandboxFixture(bad)).toThrow();
  });
  it('undoes add atom and bond without mutating prior states', () => {
    const empty = freeze(createSandboxState());
    const first = freeze(addAtom(empty, atom('a')));
    const second = freeze(addAtom(first, atom('b')));
    const bonded = freeze(addBond(second, {id:'ab',a:'a',b:'b'}));
    expect(undo(bonded)).toEqual(second);
    expect(undo(undo(bonded))).toEqual(first);
    expect(undo(undo(undo(bonded)))).toEqual(empty);
    expect(canUndo(bonded)).toBe(true);
    expect(undo(empty)).toBe(empty);
  });
  it('deletes incident bonds and restores both on undo', () => {
    const water = freeze(Object.values(fixtures).find(f => f.state.atoms.length).state);
    const next = deleteAtom(water, 'oxygen');
    expect(next.atoms).toHaveLength(2); expect(next.bonds).toEqual([]);
    expect(undo(next)).toEqual(water);
    expect(undo(breakBond(water,'oh-1'))).toEqual(water);
    expect(deleteAtom(water,'missing')).toBe(water);
    expect(breakBond(water,'missing')).toBe(water);
  });
  it('rejects invalid additions and makes duplicate bonds a no-op', () => {
    let state = addAtom(createSandboxState(), atom('a'));
    expect(() => addAtom(state,atom('a'))).toThrow();
    expect(() => addAtom(state,atom('z','He'))).toThrow();
    expect(() => addAtom(state,atom('z','H',[NaN,0,0]))).toThrow();
    expect(() => addBond(state,{id:'x',a:'a',b:'absent'})).toThrow();
    state = addAtom(state,atom('b')); state = addBond(state,{id:'ab',a:'a',b:'b'});
    expect(addBond(state,{id:'reverse',a:'b',b:'a'})).toBe(state);
    state = addAtom(state,atom('c'));
    expect(() => addBond(state,{id:'ac',a:'a',b:'c'})).toThrow();
  });
  it('checkpoints proximity bonding once and not each drag event', () => {
    let state = addAtom(createSandboxState(),atom('o','O'));
    state = addAtom(state,atom('h','H',[3,0,0]));
    const moved = moveAtom(state,'h',[0.5,0,0]);
    expect(moved.history).toBe(state.history);
    const bonded = bondMovedState(moved,'h');
    expect(bonded.bonds).toHaveLength(1); expect(undo(bonded)).toEqual(moved);
    expect(bondMovedState(bonded,'h')).toBe(bonded);
  });
  it('bounds history to 100 edits', () => {
    let state = createSandboxState();
    for(let i=0;i<105;i++) state = addAtom(state,atom(`h${i}`));
    expect(state.history).toHaveLength(100);
  });
});
