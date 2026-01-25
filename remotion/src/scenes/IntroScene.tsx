import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { ParticleField, EnergyWave } from '../components/ParticleField';
import { AtomViz, atoms } from '../components/AtomViz';
import { colors } from '../lib/colors';
import { springConfigs } from '../lib/animations';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Central atom entrance - dramatic scale up
  const atomScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 80, mass: 1.2 },
  });

  // Logo text reveal with dramatic entrance
  const logoProgress = spring({
    frame: frame - 50,
    fps,
    config: springConfigs.smooth,
  });

  // Tagline reveal
  const taglineProgress = spring({
    frame: frame - 80,
    fps,
    config: springConfigs.smooth,
  });

  // Continuous slow rotation
  const rotation = frame * 0.2;

  // Dynamic glow intensity
  const glowIntensity = 1.5 + Math.sin(frame * 0.04) * 0.5;

  // Floating element symbols orbit
  const orbitSymbols = [
    { symbol: 'H', color: colors.white, offset: 0 },
    { symbol: 'C', color: colors.gray, offset: Math.PI * 0.5 },
    { symbol: 'O', color: colors.oxygen, offset: Math.PI },
    { symbol: 'N', color: colors.nitrogen, offset: Math.PI * 1.5 },
    { symbol: 'Au', color: colors.gold, offset: Math.PI * 0.25 },
    { symbol: 'Fe', color: colors.iron, offset: Math.PI * 1.25 },
  ];

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      <ParticleField count={300} fadeIn fadeInDuration={40} intensity="high" />

      {/* Central energy burst on entrance */}
      <EnergyWave x={width / 2} y={height * 0.42} color={colors.cyan} delay={20} size={1200} />

      {/* Massive central atom visualization */}
      <div
        style={{
          position: 'absolute',
          left: width / 2,
          top: height * 0.42,
          transform: `translate(-50%, -50%) scale(${atomScale * 1.1}) rotate(${rotation}deg)`,
        }}
      >
        <AtomViz
          {...atoms.carbon}
          size={1000}
          animate
          delay={20}
          glowIntensity={glowIntensity}
          showLabel={false}
          electronSize={32}
        />
      </div>

      {/* Orbiting element symbols - outer ring */}
      {orbitSymbols.map((el, index) => {
        const angle = el.offset + frame * 0.006;
        const radius = 700 + (index % 2) * 150;
        const x = width / 2 + Math.cos(angle) * radius;
        const y = height * 0.42 + Math.sin(angle) * radius * 0.35;

        const symbolProgress = spring({
          frame: frame - 100 - index * 8,
          fps,
          config: springConfigs.smooth,
        });

        return (
          <div
            key={el.symbol}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
              fontSize: 100,
              fontWeight: 800,
              color: el.color,
              opacity: symbolProgress * 0.5,
              textShadow: `0 0 50px ${el.color}, 0 0 100px ${el.color}50`,
              letterSpacing: '-0.02em',
            }}
          >
            {el.symbol}
          </div>
        );
      })}

      {/* Main logo - MASSIVE */}
      <Sequence from={45}>
        <div
          style={{
            position: 'absolute',
            left: width / 2,
            top: height * 0.72,
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              opacity: logoProgress,
              transform: `translateY(${interpolate(logoProgress, [0, 1], [80, 0])}px) scale(${interpolate(logoProgress, [0, 1], [0.9, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 220,
                fontWeight: 900,
                letterSpacing: '-0.04em',
                background: `linear-gradient(135deg, ${colors.cyan} 0%, ${colors.cyanLight} 30%, ${colors.white} 50%, ${colors.purpleLight} 70%, ${colors.electricPink} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 60px ${colors.cyan}60) drop-shadow(0 0 120px ${colors.purpleLight}40)`,
              }}
            >
              AtomicViz
            </div>
          </div>
        </div>
      </Sequence>

      {/* Tagline - bold and clear */}
      <Sequence from={75}>
        <div
          style={{
            position: 'absolute',
            left: width / 2,
            top: height * 0.88,
            textAlign: 'center',
            opacity: taglineProgress,
            transform: `translateX(-50%) translateY(${interpolate(taglineProgress, [0, 1], [40, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 500,
              color: colors.grayLight,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Explore the Universe at the Atomic Level
          </div>
        </div>
      </Sequence>

      {/* Decorative corner accents */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 60,
          width: 200,
          height: 200,
          borderLeft: `4px solid ${colors.cyan}40`,
          borderTop: `4px solid ${colors.cyan}40`,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 60,
          width: 200,
          height: 200,
          borderRight: `4px solid ${colors.purpleLight}40`,
          borderBottom: `4px solid ${colors.purpleLight}40`,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />
    </div>
  );
};
