# Chemistry assumptions

## Grounded data and invariants

The element registry covers atomic numbers 1–118 with unique symbols. Tests check shell totals, molecule formulas, valid bond endpoints and finite coordinates. These checks catch structural corruption; they do not independently certify every authored physical constant or description.

## Educational geometry

Molecules use idealized tetrahedral, trigonal and linear construction, approximate bond lengths and display radii. They are not energy-minimized conformers. CPK colors, covalent radii and valence limits cover the encoded subset; fallback colors/radii are display choices. Terminal methyl geometry was repaired only after a regression test demonstrated incorrect bond directions.

## Artistic orbital and atom views

Bohr orbits are symbolic trajectories. Orbital lobes are stylized shapes, not sampled wavefunctions or electron paths. The parser currently omits bracketed noble-gas cores, sequential occupancy is not a complete Hund-rule implementation, and f-orbital shapes are illustrative. Distances and animation speed are not physical scales.

Atom Builder charge is proton count minus electron count. Its neutron/proton ratio is explicitly labeled a heuristic, not measured isotope stability or decay data. Visualize Atom shows a neutral reference element, not the constructed ion or isotope.

## Reaction animation

Authored stages interpolate positions and fade entering/leaving atoms. Some reactions are schematic fragments rather than atom-balanced simulations; nuclear scenes are symbolic. Displayed enthalpies retain the original authored data without new provenance verification. Energy profiles are illustrative curves, not calculated activation pathways. A zero enthalpy now produces a zero final offset. Playback speed and duration are presentation choices.

## Sandbox

Proximity creates additive single graph edges subject to encoded valence limits. Bond order and bond breaking are not simulated. Recognition uses element-labeled connectivity for six constrained recipes (water, methane, carbon dioxide, ammonia, oxygen and hydrogen), not a general chemical graph-isomorphism or reaction engine. Discoveries persist locally when storage is available.
