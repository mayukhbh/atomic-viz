// Display formatting helpers. Pure functions so they can be unit tested.

const SUPERSCRIPT = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const toSuperscript = (n) => String(n).split('').map((c) => SUPERSCRIPT[c] ?? c).join('');

/**
 * Format an energy in kJ/mol for display. Ordinary chemical values keep their digits
 * with grouping; nuclear-scale values (≥ 100,000) switch to scientific notation so the
 * panel shows "−2.0 × 10⁸" instead of an unreadable run of zeros. Uses a true minus sign.
 */
export function formatEnergy(value) {
  if (value == null || !Number.isFinite(value)) return '—';
  const sign = value < 0 ? '−' : value > 0 ? '+' : '';
  const abs = Math.abs(value);
  if (abs >= 1e5) {
    let exponent = Math.floor(Math.log10(abs));
    let mantissa = abs / 10 ** exponent;
    if (Number(mantissa.toFixed(1)) >= 10) { mantissa /= 10; exponent += 1; }
    return `${sign}${mantissa.toFixed(1)} × 10${toSuperscript(exponent)}`;
  }
  return `${sign}${abs.toLocaleString('en-US', { maximumFractionDigits: 1 })}`;
}
