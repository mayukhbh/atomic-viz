import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors } from '../lib/colors';
import { springConfigs } from '../lib/animations';

type OrbitalType = 's' | 'p' | 'd';

type QuantumOrbital = {
  type: OrbitalType;
  n: number; // principal quantum number
  electrons: number;
};

type QuantumAtomProps = {
  symbol: string;
  name: string;
  atomicNumber: number;
  color?: string;
  orbitals: QuantumOrbital[];
  size?: number;
  animate?: boolean;
  delay?: number;
  showLabel?: boolean;
};

// S orbital - spherical probability cloud
const SOrbital: React.FC<{
  radius: number;
  color: string;
  frame: number;
  delay: number;
  fps: number;
}> = ({ radius, color, frame, delay, fps }) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const pulse = 1 + Math.sin(frame * 0.05) * 0.08;
  const opacity = 0.3 + Math.sin(frame * 0.03) * 0.1;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) scale(${progress * pulse})`,
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')} 0%, ${color}20 40%, transparent 70%)`,
        boxShadow: `0 0 ${radius * 0.5}px ${color}40, inset 0 0 ${radius * 0.3}px ${color}30`,
        opacity: progress,
      }}
    />
  );
};

// P orbital - dumbbell/figure-8 shape
const POrbital: React.FC<{
  radius: number;
  color: string;
  rotation: number;
  frame: number;
  delay: number;
  fps: number;
}> = ({ radius, color, rotation, frame, delay, fps }) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const pulse = 1 + Math.sin(frame * 0.04 + rotation) * 0.1;
  const lobeSize = radius * 0.6;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${progress})`,
        opacity: progress,
      }}
    >
      {/* Upper lobe */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: -radius * 0.8 * pulse,
          transform: 'translateX(-50%)',
          width: lobeSize,
          height: lobeSize * 1.4,
          borderRadius: '50% 50% 40% 40%',
          background: `radial-gradient(ellipse at 50% 70%, ${color}50 0%, ${color}25 50%, transparent 80%)`,
          boxShadow: `0 0 ${lobeSize * 0.4}px ${color}40`,
        }}
      />
      {/* Lower lobe */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: radius * 0.3 * pulse,
          transform: 'translateX(-50%)',
          width: lobeSize,
          height: lobeSize * 1.4,
          borderRadius: '40% 40% 50% 50%',
          background: `radial-gradient(ellipse at 50% 30%, ${color}50 0%, ${color}25 50%, transparent 80%)`,
          boxShadow: `0 0 ${lobeSize * 0.4}px ${color}40`,
        }}
      />
    </div>
  );
};

// D orbital - cloverleaf pattern
const DOrbital: React.FC<{
  radius: number;
  color: string;
  rotation: number;
  frame: number;
  delay: number;
  fps: number;
}> = ({ radius, color, rotation, frame, delay, fps }) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const pulse = 1 + Math.sin(frame * 0.035 + rotation) * 0.08;
  const lobeSize = radius * 0.4;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${progress})`,
        opacity: progress * 0.8,
      }}
    >
      {/* Four lobes in cloverleaf pattern */}
      {[0, 90, 180, 270].map((angle) => (
        <div
          key={angle}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${-radius * 0.5 * pulse}px)`,
            width: lobeSize,
            height: lobeSize * 1.2,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${color}45 0%, ${color}20 60%, transparent 90%)`,
            boxShadow: `0 0 ${lobeSize * 0.3}px ${color}30`,
          }}
        />
      ))}
    </div>
  );
};

export const QuantumAtom: React.FC<QuantumAtomProps> = ({
  symbol,
  name: _name,
  atomicNumber,
  color = colors.cyan,
  orbitals,
  size = 800,
  animate = true,
  delay = 0,
  showLabel = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entranceProgress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const nucleusSize = Math.max(50, 40 + atomicNumber * 0.4);
  const nucleusPulse = animate ? 1 + Math.sin(frame * 0.06) * 0.05 : 1;

  // Calculate orbital sizes based on principal quantum number
  const getOrbitalRadius = (n: number, type: OrbitalType) => {
    const baseRadius = size * 0.12;
    const nFactor = n * 0.8;
    const typeFactor = type === 's' ? 1 : type === 'p' ? 1.3 : 1.6;
    return baseRadius * nFactor * typeFactor;
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        opacity: entranceProgress,
        transform: `scale(${interpolate(entranceProgress, [0, 1], [0.7, 1])})`,
      }}
    >
      {/* Probability cloud background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle, ${color}08 0%, transparent 60%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Render orbitals */}
      {orbitals.map((orbital, index) => {
        const radius = getOrbitalRadius(orbital.n, orbital.type);
        const orbitalDelay = delay + index * 8;

        if (orbital.type === 's') {
          return (
            <SOrbital
              key={`${orbital.n}s-${index}`}
              radius={radius}
              color={color}
              frame={frame}
              delay={orbitalDelay}
              fps={fps}
            />
          );
        } else if (orbital.type === 'p') {
          // P orbitals come in 3 orientations (px, py, pz)
          return (
            <React.Fragment key={`${orbital.n}p-${index}`}>
              {[0, 60, 120].slice(0, Math.min(3, orbital.electrons)).map((rotation, i) => (
                <POrbital
                  key={`${orbital.n}p-${i}`}
                  radius={radius}
                  color={color}
                  rotation={rotation}
                  frame={frame}
                  delay={orbitalDelay + i * 5}
                  fps={fps}
                />
              ))}
            </React.Fragment>
          );
        } else if (orbital.type === 'd') {
          return (
            <React.Fragment key={`${orbital.n}d-${index}`}>
              {[0, 45].slice(0, Math.min(2, Math.ceil(orbital.electrons / 2))).map((rotation, i) => (
                <DOrbital
                  key={`${orbital.n}d-${i}`}
                  radius={radius}
                  color={color}
                  rotation={rotation}
                  frame={frame}
                  delay={orbitalDelay + i * 6}
                  fps={fps}
                />
              ))}
            </React.Fragment>
          );
        }
        return null;
      })}

      {/* Nucleus */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${nucleusPulse})`,
          width: nucleusSize,
          height: nucleusSize,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${colors.white}40, ${color} 45%, ${color}80)`,
          boxShadow: `0 0 ${nucleusSize}px ${color}80, 0 0 ${nucleusSize * 2}px ${color}40`,
        }}
      />

      {/* Label */}
      {showLabel && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: nucleusSize * 0.6,
            fontWeight: 900,
            color: colors.white,
            textShadow: `0 0 20px ${color}`,
          }}
        >
          {symbol}
        </div>
      )}

      {/* Quantum numbers label */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 24,
          color: colors.grayLight,
          opacity: 0.7,
        }}
      >
        Electron Probability Cloud
      </div>
    </div>
  );
};

// Pre-configured quantum atoms
export const quantumAtoms = {
  lithium: {
    symbol: 'Li',
    name: 'Lithium',
    atomicNumber: 3,
    color: colors.electricPink,
    orbitals: [
      { type: 's' as OrbitalType, n: 1, electrons: 2 },
      { type: 's' as OrbitalType, n: 2, electrons: 1 },
    ],
  },
  neon: {
    symbol: 'Ne',
    name: 'Neon',
    atomicNumber: 10,
    color: colors.neon,
    orbitals: [
      { type: 's' as OrbitalType, n: 1, electrons: 2 },
      { type: 's' as OrbitalType, n: 2, electrons: 2 },
      { type: 'p' as OrbitalType, n: 2, electrons: 6 },
    ],
  },
  iron: {
    symbol: 'Fe',
    name: 'Iron',
    atomicNumber: 26,
    color: colors.iron,
    orbitals: [
      { type: 's' as OrbitalType, n: 1, electrons: 2 },
      { type: 's' as OrbitalType, n: 2, electrons: 2 },
      { type: 'p' as OrbitalType, n: 2, electrons: 6 },
      { type: 's' as OrbitalType, n: 3, electrons: 2 },
      { type: 'p' as OrbitalType, n: 3, electrons: 6 },
      { type: 'd' as OrbitalType, n: 3, electrons: 6 },
      { type: 's' as OrbitalType, n: 4, electrons: 2 },
    ],
  },
};
