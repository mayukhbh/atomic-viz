import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { ParticleField } from '../components/ParticleField';
import { colors } from '../lib/colors';

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Logo animation
  const logoProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 80, mass: 1.2 },
  });

  // Subtle glow pulse
  const glowPulse = 40 + Math.sin(frame * 0.04) * 20;

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      <ParticleField count={250} fadeIn fadeInDuration={30} intensity="high" />

      {/* Central glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          height: 1000,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.cyan}12 0%, ${colors.purpleLight}06 40%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Logo only */}
      <Sequence from={15}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            opacity: logoProgress,
          }}
        >
          <div
            style={{
              fontSize: 280,
              fontWeight: 900,
              letterSpacing: '-0.04em',
              background: `linear-gradient(135deg, ${colors.cyan} 0%, ${colors.cyanLight} 40%, ${colors.white} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 ${glowPulse}px ${colors.cyan}50)`,
              transform: `scale(${interpolate(logoProgress, [0, 1], [0.8, 1])})`,
            }}
          >
            AtomicViz
          </div>
        </div>
      </Sequence>
    </div>
  );
};
