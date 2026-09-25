// Single source of truth for element-category colours used by the periodic table
// tiles and its legend. Kept separate from the CPK colours in elements.js, which
// describe how an atom is drawn in 3D, not which family it belongs to.
export const CATEGORY_ORDER = [
  'Alkali Metal',
  'Alkaline Earth',
  'Transition Metal',
  'Post-transition Metal',
  'Metalloid',
  'Nonmetal',
  'Halogen',
  'Noble Gas',
  'Lanthanide',
  'Actinide',
];

export const CATEGORY_COLORS = {
  'Alkali Metal': '#f87171',
  'Alkaline Earth': '#fb923c',
  'Transition Metal': '#facc15',
  'Post-transition Metal': '#a3e635',
  Metalloid: '#34d399',
  Nonmetal: '#22d3ee',
  Halogen: '#60a5fa',
  'Noble Gas': '#818cf8',
  Lanthanide: '#f472b6',
  Actinide: '#e879f9',
};

export const categoryColor = (category) => CATEGORY_COLORS[category] || '#cbd5e1';
