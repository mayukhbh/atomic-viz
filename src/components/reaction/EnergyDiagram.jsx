import React, { useMemo } from 'react';
import { energyProfile } from '../../engine/reactionEngine';

// Reaction-coordinate energy diagram. Renders the reactant → transition-state → product
// curve and a live marker that rides the curve as the reaction plays.
export function EnergyDiagram({ reaction, progress }) {
  const W = 300;
  const H = 150;
  const pad = { l: 34, r: 14, t: 16, b: 26 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;

  const profile = useMemo(() => energyProfile(reaction, 140), [reaction]);
  const { points, exothermic, barrier, productLevel } = profile;

  // domain of y across all points (with headroom)
  const ys = points.map((p) => p.y);
  const minY = Math.min(...ys, -0.1);
  const maxY = Math.max(...ys, 0.1);
  const yToPx = (y) => pad.t + plotH - ((y - minY) / (maxY - minY)) * plotH;
  const xToPx = (x) => pad.l + x * plotW;

  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xToPx(p.x).toFixed(1)} ${yToPx(p.y).toFixed(1)}`)
    .join(' ');

  // marker position along curve
  const clamped = Math.max(0, Math.min(1, progress));
  const idx = Math.min(points.length - 1, Math.round(clamped * (points.length - 1)));
  const marker = points[idx];
  const mx = xToPx(marker.x);
  const my = yToPx(marker.y);

  const reactantY = yToPx(0);
  const productY = yToPx(productLevel);
  const peakY = yToPx(barrier);
  const accent = exothermic ? '#ff7a59' : '#59a6ff';

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <linearGradient id="ediag-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* axes */}
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={pad.t + plotH} stroke="#ffffff20" />
        <line x1={pad.l} y1={pad.t + plotH} x2={pad.l + plotW} y2={pad.t + plotH} stroke="#ffffff20" />
        <text x={4} y={pad.t + plotH / 2} fill="#ffffff55" fontSize="8" transform={`rotate(-90 10 ${pad.t + plotH / 2})`}>Energy</text>
        <text x={pad.l + plotW / 2} y={H - 4} fill="#ffffff55" fontSize="8" textAnchor="middle">Reaction progress</text>

        {/* reactant / product level guides */}
        <line x1={pad.l} y1={reactantY} x2={xToPx(0.25)} y2={reactantY} stroke="#ffffff30" strokeDasharray="2 2" />
        <line x1={xToPx(0.75)} y1={productY} x2={pad.l + plotW} y2={productY} stroke="#ffffff30" strokeDasharray="2 2" />

        {/* ΔH bracket */}
        <line x1={pad.l + plotW - 4} y1={reactantY} x2={pad.l + plotW - 4} y2={productY} stroke={accent} strokeWidth="1" />
        <text x={pad.l + plotW - 8} y={(reactantY + productY) / 2} fill={accent} fontSize="8" textAnchor="end">ΔH</text>

        {/* activation energy marker */}
        <line x1={xToPx(0.5)} y1={peakY} x2={xToPx(0.5)} y2={reactantY} stroke="#ffffff35" strokeDasharray="2 2" />
        <text x={xToPx(0.5) + 3} y={peakY + 10} fill="#ffffff88" fontSize="8">Eₐ</text>

        {/* area + curve */}
        <path d={`${path} L ${xToPx(1)} ${pad.t + plotH} L ${pad.l} ${pad.t + plotH} Z`} fill="url(#ediag-fill)" />
        <path d={path} fill="none" stroke={accent} strokeWidth="2" />

        {/* progress marker */}
        <circle cx={mx} cy={my} r="4.5" fill="#ffffff" />
        <circle cx={mx} cy={my} r="8" fill={accent} opacity="0.3" />
      </svg>

      <div className="flex justify-between text-[10px] text-white/50 px-1 -mt-1">
        <span>Reactants</span>
        <span>Transition state</span>
        <span>Products</span>
      </div>
    </div>
  );
}
