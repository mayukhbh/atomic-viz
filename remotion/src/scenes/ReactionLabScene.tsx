import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { ParticleField, EnergyWave } from '../components/ParticleField';
import { GlassCard } from '../components/GlassCard';
import { colors } from '../lib/colors';
import { springConfigs } from '../lib/animations';

// Organic molecule component with 3D-ish appearance
const OrganicMolecule: React.FC<{
  atoms: { symbol: string; color: string; x: number; y: number; size?: number }[];
  bonds: { from: number; to: number; type?: 'single' | 'double' | 'triple' }[];
  scale?: number;
  animate?: boolean;
  frame: number;
  label?: string;
}> = ({ atoms, bonds, scale = 1, animate = true, frame, label }) => {
  const vibration = animate ? Math.sin(frame * 0.1) * 4 : 0;
  const breathe = animate ? 1 + Math.sin(frame * 0.05) * 0.02 : 1;

  return (
    <div
      style={{
        position: 'relative',
        transform: `scale(${scale * breathe})`,
      }}
    >
      {/* Bonds */}
      <svg
        width={500}
        height={400}
        style={{ position: 'absolute', left: -250, top: -200 }}
      >
        <defs>
          <linearGradient id="bondGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.grayLight} stopOpacity={0.6} />
            <stop offset="50%" stopColor={colors.white} stopOpacity={0.8} />
            <stop offset="100%" stopColor={colors.grayLight} stopOpacity={0.6} />
          </linearGradient>
          <filter id="bondGlow2">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {bonds.map((bond, i) => {
          const from = atoms[bond.from];
          const to = atoms[bond.to];
          const bondType = bond.type || 'single';
          const offset = bondType === 'double' ? 6 : bondType === 'triple' ? 8 : 0;

          return (
            <g key={i} filter="url(#bondGlow2)">
              <line
                x1={250 + from.x}
                y1={200 + from.y}
                x2={250 + to.x}
                y2={200 + to.y}
                stroke="url(#bondGrad)"
                strokeWidth={bondType === 'triple' ? 4 : 6}
                strokeLinecap="round"
              />
              {(bondType === 'double' || bondType === 'triple') && (
                <line
                  x1={250 + from.x + offset}
                  y1={200 + from.y + offset}
                  x2={250 + to.x + offset}
                  y2={200 + to.y + offset}
                  stroke="url(#bondGrad)"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              )}
              {bondType === 'triple' && (
                <line
                  x1={250 + from.x - offset}
                  y1={200 + from.y - offset}
                  x2={250 + to.x - offset}
                  y2={200 + to.y - offset}
                  stroke="url(#bondGrad)"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Atoms */}
      {atoms.map((atom, i) => {
        const atomSize = atom.size || (atom.symbol === 'H' ? 50 : 70);
        const vib = vibration * ((i % 2) * 2 - 1);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: atom.x + vib,
              top: atom.y + vib * 0.5,
              transform: 'translate(-50%, -50%)',
              width: atomSize,
              height: atomSize,
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, ${colors.white}50, ${atom.color} 50%, ${atom.color}90)`,
              boxShadow: `0 0 ${atomSize * 0.6}px ${atom.color}80, 0 0 ${atomSize}px ${atom.color}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: atomSize * 0.5,
              fontWeight: 800,
              color: colors.white,
              textShadow: `0 0 10px ${atom.color}`,
            }}
          >
            {atom.symbol}
          </div>
        );
      })}

      {/* Label */}
      {label && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: -60,
            transform: 'translateX(-50%)',
            fontSize: 28,
            fontWeight: 600,
            color: colors.grayLight,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// Ethanol molecule (C2H5OH)
const ethanolMolecule = {
  atoms: [
    { symbol: 'C', color: colors.carbon, x: -60, y: 0 },
    { symbol: 'C', color: colors.carbon, x: 60, y: 0 },
    { symbol: 'O', color: colors.oxygen, x: 140, y: 60 },
    { symbol: 'H', color: colors.white, x: -60, y: -70, size: 45 },
    { symbol: 'H', color: colors.white, x: -120, y: 40, size: 45 },
    { symbol: 'H', color: colors.white, x: -60, y: 70, size: 45 },
    { symbol: 'H', color: colors.white, x: 60, y: -70, size: 45 },
    { symbol: 'H', color: colors.white, x: 120, y: -40, size: 45 },
    { symbol: 'H', color: colors.white, x: 200, y: 60, size: 45 },
  ],
  bonds: [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 0, to: 3 },
    { from: 0, to: 4 },
    { from: 0, to: 5 },
    { from: 1, to: 6 },
    { from: 1, to: 7 },
    { from: 2, to: 8 },
  ],
};

// Oxygen molecule (O2)
const oxygenMolecule = {
  atoms: [
    { symbol: 'O', color: colors.oxygen, x: -45, y: 0 },
    { symbol: 'O', color: colors.oxygen, x: 45, y: 0 },
  ],
  bonds: [{ from: 0, to: 1, type: 'double' as const }],
};

// Carbon dioxide (CO2)
const co2Molecule = {
  atoms: [
    { symbol: 'O', color: colors.oxygen, x: -70, y: 0 },
    { symbol: 'C', color: colors.carbon, x: 0, y: 0 },
    { symbol: 'O', color: colors.oxygen, x: 70, y: 0 },
  ],
  bonds: [
    { from: 0, to: 1, type: 'double' as const },
    { from: 1, to: 2, type: 'double' as const },
  ],
};

// Water molecule (H2O)
const waterMolecule = {
  atoms: [
    { symbol: 'O', color: colors.oxygen, x: 0, y: 0 },
    { symbol: 'H', color: colors.white, x: -55, y: 45, size: 45 },
    { symbol: 'H', color: colors.white, x: 55, y: 45, size: 45 },
  ],
  bonds: [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
  ],
};

export const ReactionLabScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animation phases
  const titleProgress = spring({ frame, fps, config: springConfigs.smooth });
  const reactantsProgress = spring({ frame: frame - 25, fps, config: springConfigs.smooth });
  const arrowProgress = spring({ frame: frame - 100, fps, config: springConfigs.smooth });
  const productsProgress = spring({ frame: frame - 130, fps, config: springConfigs.bouncy });

  // Combustion energy burst effect
  const combustionFrame = frame - 130;
  const combustionActive = combustionFrame > 0 && combustionFrame < 80;
  const flameIntensity = combustionActive
    ? interpolate(combustionFrame, [0, 20, 50, 80], [0, 1, 0.8, 0])
    : 0;

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      <ParticleField count={180} fadeIn={false} intensity="medium" />

      {/* Combustion energy waves */}
      {combustionActive && (
        <>
          <EnergyWave
            x={width / 2}
            y={height * 0.5}
            color={colors.orange}
            delay={130}
            size={1200}
          />
          <EnergyWave
            x={width / 2}
            y={height * 0.5}
            color={colors.electricYellow}
            delay={145}
            size={900}
          />
        </>
      )}

      {/* Flame/heat glow effect */}
      {combustionActive && (
        <div
          style={{
            position: 'absolute',
            left: width / 2,
            top: height * 0.5,
            transform: 'translate(-50%, -50%)',
            width: 1000 * flameIntensity,
            height: 800 * flameIntensity,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${colors.electricYellow}50 0%, ${colors.orange}30 30%, ${colors.proton}15 60%, transparent 80%)`,
            filter: 'blur(60px)',
          }}
        />
      )}

      {/* Section header */}
      <div
        style={{
          position: 'absolute',
          left: 140,
          top: 100,
          opacity: titleProgress,
          transform: `translateX(${interpolate(titleProgress, [0, 1], [-60, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            background: colors.gradients.fire,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 40px ${colors.orange}40)`,
          }}
        >
          Reaction Lab
        </div>
        <div style={{ fontSize: 48, fontWeight: 500, color: colors.grayLight, marginTop: 16 }}>
          Organic Chemistry • Combustion Reactions
        </div>
      </div>

      {/* Reaction visualization */}
      <div
        style={{
          position: 'absolute',
          left: width / 2,
          top: height * 0.54,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Reactants */}
        <div
          style={{
            position: 'absolute',
            left: -650,
            top: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 60,
            opacity: reactantsProgress,
            transform: `translateX(${interpolate(reactantsProgress, [0, 1], [-80, 0])}px)`,
          }}
        >
          {/* Ethanol */}
          <OrganicMolecule
            {...ethanolMolecule}
            scale={0.9}
            frame={frame}
            label="Ethanol"
          />

          {/* Plus */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 300,
              color: colors.grayLight,
              textShadow: `0 0 20px ${colors.grayLight}40`,
            }}
          >
            +
          </div>

          {/* 3 O2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
            <div style={{ fontSize: 32, color: colors.oxygen, fontWeight: 600 }}>3×</div>
            <OrganicMolecule {...oxygenMolecule} scale={0.85} frame={frame} />
          </div>
        </div>

        {/* Reaction arrow */}
        <div
          style={{
            position: 'absolute',
            left: -80,
            top: 0,
            opacity: arrowProgress,
            transform: `scaleX(${arrowProgress}) translateY(-50%)`,
          }}
        >
          <svg width={200} height={120} viewBox="0 0 200 120">
            <defs>
              <linearGradient id="fireArrow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colors.cyan} />
                <stop offset="30%" stopColor={colors.electricYellow} />
                <stop offset="70%" stopColor={colors.orange} />
                <stop offset="100%" stopColor={colors.proton} />
              </linearGradient>
              <filter id="arrowFireGlow">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#arrowFireGlow)">
              <path
                d="M0 60 L130 60 M110 35 L155 60 L110 85"
                stroke="url(#fireArrow)"
                strokeWidth={12}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            {/* Flame icon */}
            <text
              x={80}
              y={45}
              fill={colors.electricYellow}
              fontSize={30}
              textAnchor="middle"
            >
              🔥
            </text>
          </svg>
        </div>

        {/* Products */}
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 50,
            opacity: productsProgress,
            transform: `scale(${interpolate(productsProgress, [0, 1], [0.6, 1])}) translateY(-50%)`,
          }}
        >
          {/* 2 CO2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 25, alignItems: 'center' }}>
            <div style={{ fontSize: 32, color: colors.gray, fontWeight: 600 }}>2×</div>
            <OrganicMolecule {...co2Molecule} scale={0.85} frame={frame} />
          </div>

          {/* Plus */}
          <div
            style={{
              fontSize: 60,
              fontWeight: 300,
              color: colors.grayLight,
            }}
          >
            +
          </div>

          {/* 3 H2O */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <div style={{ fontSize: 32, color: colors.cyan, fontWeight: 600 }}>3×</div>
            <OrganicMolecule {...waterMolecule} scale={0.9} frame={frame} />
          </div>
        </div>
      </div>

      {/* Equation card */}
      <Sequence from={60}>
        <div
          style={{
            position: 'absolute',
            bottom: 140,
            left: width / 2,
            transform: 'translateX(-50%)',
            opacity: spring({ frame: frame - 60, fps, config: springConfigs.smooth }),
          }}
        >
          <GlassCard padding={40} borderRadius={28} showGlow glowColor={colors.orange}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                fontFamily: 'monospace',
                color: colors.white,
                display: 'flex',
                alignItems: 'center',
                gap: 28,
              }}
            >
              <span style={{ color: colors.carbon }}>C₂H₅OH</span>
              <span style={{ color: colors.grayLight, fontSize: 44 }}>+</span>
              <span style={{ color: colors.oxygen }}>3O₂</span>
              <span
                style={{
                  background: colors.gradients.fire,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  padding: '0 8px',
                }}
              >
                →
              </span>
              <span style={{ color: colors.gray }}>2CO₂</span>
              <span style={{ color: colors.grayLight, fontSize: 44 }}>+</span>
              <span style={{ color: colors.cyan }}>3H₂O</span>
              <span
                style={{
                  fontSize: 40,
                  marginLeft: 32,
                  background: colors.gradients.fire,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                + Heat 🔥
              </span>
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 28,
                color: colors.grayLight,
                textAlign: 'center',
              }}
            >
              Ethanol Combustion • Exothermic Reaction • ΔH = -1367 kJ/mol
            </div>
          </GlassCard>
        </div>
      </Sequence>

      {/* Feature badges */}
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: height * 0.22,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {[
          { label: 'Organic Compounds', color: colors.carbon },
          { label: 'Energy Calculations', color: colors.electricYellow },
          { label: 'Reaction Mechanisms', color: colors.cyan },
          { label: 'Stoichiometry', color: colors.green },
        ].map((feature, i) => {
          const badgeProgress = spring({
            frame: frame - 160 - i * 12,
            fps,
            config: springConfigs.smooth,
          });
          return (
            <div
              key={feature.label}
              style={{
                padding: '20px 40px',
                borderRadius: 18,
                background: `${feature.color}12`,
                border: `2px solid ${feature.color}40`,
                fontSize: 28,
                fontWeight: 600,
                color: feature.color,
                opacity: badgeProgress,
                transform: `translateX(${interpolate(badgeProgress, [0, 1], [60, 0])}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span style={{ fontSize: 24 }}>✓</span> {feature.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
