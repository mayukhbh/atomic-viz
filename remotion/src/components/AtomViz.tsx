import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors } from '../lib/colors';
import { springConfigs, orbit, pulse, glowPulse } from '../lib/animations';

type ElectronShell = {
  electrons: number;
  radius: number;
};

type AtomVizProps = {
  symbol: string;
  name: string;
  atomicNumber: number;
  color?: string;
  shells: ElectronShell[];
  size?: number;
  animate?: boolean;
  delay?: number;
  showLabel?: boolean;
  showNucleus?: boolean;
  glowIntensity?: number;
  electronSize?: number;
  nucleusGradient?: boolean;
};

export const AtomViz: React.FC<AtomVizProps> = ({
  symbol,
  name: _name,
  atomicNumber,
  color = colors.cyan,
  shells,
  size = 800,
  animate = true,
  delay = 0,
  showLabel = true,
  showNucleus = true,
  glowIntensity = 1.5,
  electronSize = 24,
  nucleusGradient = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const entranceProgress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  // Nucleus pulse
  const nucleusPulse = animate ? pulse(frame, 0.06, 0.04) : 1;

  // Glow effect
  const glowSize = animate ? glowPulse(frame, 50 * glowIntensity, 100 * glowIntensity, 0.04) : 60;

  const center = size / 2;
  const nucleusSize = Math.max(60, 50 + atomicNumber * 0.5);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        opacity: entranceProgress,
        transform: `scale(${interpolate(entranceProgress, [0, 1], [0.6, 1])})`,
      }}
    >
      {/* Outer glow aura */}
      <div
        style={{
          position: 'absolute',
          left: center,
          top: center,
          transform: 'translate(-50%, -50%)',
          width: size * 0.9,
          height: size * 0.9,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}15 0%, ${color}05 40%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />

      {/* Orbital rings with glow */}
      {shells.map((shell, shellIndex) => {
        const ringDelay = delay + shellIndex * 6;
        const ringProgress = spring({
          frame: frame - ringDelay,
          fps,
          config: springConfigs.smooth,
        });

        const ringPulse = animate ? 1 + Math.sin(frame * 0.03 + shellIndex) * 0.02 : 1;

        return (
          <React.Fragment key={shellIndex}>
            {/* Ring glow */}
            <div
              style={{
                position: 'absolute',
                left: center - shell.radius * ringPulse,
                top: center - shell.radius * ringPulse,
                width: shell.radius * 2 * ringPulse,
                height: shell.radius * 2 * ringPulse,
                borderRadius: '50%',
                border: `3px solid ${color}20`,
                boxShadow: `0 0 20px ${color}15, inset 0 0 20px ${color}08`,
                opacity: ringProgress * 0.8,
              }}
            />
            {/* Ring core */}
            <div
              style={{
                position: 'absolute',
                left: center - shell.radius * ringPulse,
                top: center - shell.radius * ringPulse,
                width: shell.radius * 2 * ringPulse,
                height: shell.radius * 2 * ringPulse,
                borderRadius: '50%',
                border: `2px solid ${color}40`,
                opacity: ringProgress,
              }}
            />
          </React.Fragment>
        );
      })}

      {/* Electrons with trails */}
      {shells.map((shell, shellIndex) =>
        Array.from({ length: shell.electrons }).map((_, electronIndex) => {
          const angleOffset = (electronIndex / shell.electrons) * Math.PI * 2;
          const speed = 1.8 - shellIndex * 0.25;
          const position = animate
            ? orbit(frame, shell.radius, speed, angleOffset)
            : {
                x: Math.cos(angleOffset) * shell.radius,
                y: Math.sin(angleOffset) * shell.radius,
              };

          const electronDelay = delay + shellIndex * 6 + electronIndex * 2;
          const electronProgress = spring({
            frame: frame - electronDelay,
            fps,
            config: springConfigs.bouncy,
          });

          // Trail positions
          const trailPositions = animate
            ? [
                orbit(frame - 2, shell.radius, speed, angleOffset),
                orbit(frame - 4, shell.radius, speed, angleOffset),
                orbit(frame - 6, shell.radius, speed, angleOffset),
              ]
            : [];

          return (
            <React.Fragment key={`${shellIndex}-${electronIndex}`}>
              {/* Electron trails */}
              {trailPositions.map((trailPos, trailIndex) => (
                <div
                  key={trailIndex}
                  style={{
                    position: 'absolute',
                    left: center + trailPos.x - electronSize / 4,
                    top: center + trailPos.y - electronSize / 4,
                    width: electronSize / 2,
                    height: electronSize / 2,
                    borderRadius: '50%',
                    backgroundColor: colors.cyan,
                    opacity: electronProgress * (0.3 - trailIndex * 0.1),
                    boxShadow: `0 0 ${electronSize}px ${colors.cyan}40`,
                  }}
                />
              ))}
              {/* Main electron */}
              <div
                style={{
                  position: 'absolute',
                  left: center + position.x - electronSize / 2,
                  top: center + position.y - electronSize / 2,
                  width: electronSize,
                  height: electronSize,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 30% 30%, ${colors.cyanBright}, ${colors.cyan})`,
                  boxShadow: `0 0 ${glowSize * 0.6}px ${colors.cyan}, 0 0 ${glowSize}px ${colors.cyanGlow}, 0 0 ${glowSize * 1.5}px ${colors.cyan}30`,
                  opacity: electronProgress,
                  transform: `scale(${interpolate(electronProgress, [0, 1], [0, 1])})`,
                }}
              />
            </React.Fragment>
          );
        })
      )}

      {/* Nucleus */}
      {showNucleus && (
        <>
          {/* Nucleus outer glow */}
          <div
            style={{
              position: 'absolute',
              left: center - nucleusSize,
              top: center - nucleusSize,
              width: nucleusSize * 2,
              height: nucleusSize * 2,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
              filter: 'blur(20px)',
              transform: `scale(${nucleusPulse * 1.2})`,
            }}
          />
          {/* Nucleus core */}
          <div
            style={{
              position: 'absolute',
              left: center - nucleusSize / 2,
              top: center - nucleusSize / 2,
              width: nucleusSize,
              height: nucleusSize,
              borderRadius: '50%',
              background: nucleusGradient
                ? `radial-gradient(circle at 35% 35%, ${colors.white}40, ${color} 40%, ${color}90 80%, ${color}60)`
                : `radial-gradient(circle at 30% 30%, ${color}, ${color}80)`,
              boxShadow: `0 0 ${glowSize}px ${color}80, 0 0 ${glowSize * 2}px ${color}40, inset 0 0 ${nucleusSize / 3}px ${colors.white}20`,
              transform: `scale(${nucleusPulse})`,
            }}
          />
        </>
      )}

      {/* Element symbol label */}
      {showLabel && (
        <div
          style={{
            position: 'absolute',
            left: center,
            top: center,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontSize: nucleusSize * 0.7,
              fontWeight: 900,
              color: colors.white,
              textShadow: `0 0 30px ${color}, 0 0 60px ${color}60`,
              letterSpacing: '-0.02em',
            }}
          >
            {symbol}
          </div>
        </div>
      )}
    </div>
  );
};

// Pre-configured atoms - with larger shell radii for 4K
export const atoms = {
  hydrogen: {
    symbol: 'H',
    name: 'Hydrogen',
    atomicNumber: 1,
    color: colors.white,
    shells: [{ electrons: 1, radius: 120 }],
  },
  helium: {
    symbol: 'He',
    name: 'Helium',
    atomicNumber: 2,
    color: colors.helium,
    shells: [{ electrons: 2, radius: 120 }],
  },
  lithium: {
    symbol: 'Li',
    name: 'Lithium',
    atomicNumber: 3,
    color: colors.electricPink,
    shells: [
      { electrons: 2, radius: 100 },
      { electrons: 1, radius: 180 },
    ],
  },
  carbon: {
    symbol: 'C',
    name: 'Carbon',
    atomicNumber: 6,
    color: colors.carbon,
    shells: [
      { electrons: 2, radius: 100 },
      { electrons: 4, radius: 180 },
    ],
  },
  nitrogen: {
    symbol: 'N',
    name: 'Nitrogen',
    atomicNumber: 7,
    color: colors.nitrogen,
    shells: [
      { electrons: 2, radius: 100 },
      { electrons: 5, radius: 180 },
    ],
  },
  oxygen: {
    symbol: 'O',
    name: 'Oxygen',
    atomicNumber: 8,
    color: colors.oxygen,
    shells: [
      { electrons: 2, radius: 100 },
      { electrons: 6, radius: 180 },
    ],
  },
  neon: {
    symbol: 'Ne',
    name: 'Neon',
    atomicNumber: 10,
    color: colors.neon,
    shells: [
      { electrons: 2, radius: 90 },
      { electrons: 8, radius: 170 },
    ],
  },
  iron: {
    symbol: 'Fe',
    name: 'Iron',
    atomicNumber: 26,
    color: colors.iron,
    shells: [
      { electrons: 2, radius: 70 },
      { electrons: 8, radius: 120 },
      { electrons: 14, radius: 180 },
      { electrons: 2, radius: 240 },
    ],
  },
  gold: {
    symbol: 'Au',
    name: 'Gold',
    atomicNumber: 79,
    color: colors.gold,
    shells: [
      { electrons: 2, radius: 60 },
      { electrons: 8, radius: 100 },
      { electrons: 18, radius: 150 },
      { electrons: 32, radius: 210 },
      { electrons: 18, radius: 280 },
      { electrons: 1, radius: 350 },
    ],
  },
};
