import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';
import { colors } from '../lib/colors';

type Particle = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  offset: number;
};

type ParticleFieldProps = {
  count?: number;
  fadeIn?: boolean;
  fadeInDuration?: number;
  colors?: string[];
  intensity?: 'low' | 'medium' | 'high' | 'ultra';
};

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 200,
  fadeIn = true,
  fadeInDuration = 30,
  colors: particleColors = [
    colors.cyan,
    colors.cyanLight,
    colors.purpleLight,
    colors.electricPink,
    colors.white,
  ],
  intensity = 'medium',
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const intensityMultiplier = {
    low: 0.5,
    medium: 1,
    high: 1.5,
    ultra: 2,
  }[intensity];

  const particles = useMemo(() => {
    const generated: Particle[] = [];
    const actualCount = Math.floor(count * intensityMultiplier);
    for (let i = 0; i < actualCount; i++) {
      const seed = i * 9301 + 49297;
      const rand = () => ((seed * (i + 1)) % 233280) / 233280;

      generated.push({
        x: rand() * width,
        y: rand() * height,
        size: 2 + rand() * 6,
        opacity: 0.3 + rand() * 0.7,
        speed: 0.15 + rand() * 0.5,
        color: particleColors[Math.floor(rand() * particleColors.length)],
        offset: rand() * 100,
      });
    }
    return generated;
  }, [count, width, height, particleColors, intensityMultiplier]);

  const containerOpacity = fadeIn
    ? interpolate(frame, [0, fadeInDuration], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.backgroundDeep, opacity: containerOpacity }}>
      {/* Deep space gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${colors.purpleDark}15 0%, transparent 50%),
                       radial-gradient(ellipse at 80% 80%, ${colors.cyan}08 0%, transparent 40%),
                       radial-gradient(ellipse at 20% 70%, ${colors.electricPink}06 0%, transparent 35%)`,
        }}
      />

      {/* Particles */}
      {particles.map((particle, index) => {
        const twinkle = 0.4 + Math.sin(frame * 0.1 + particle.offset) * 0.6;
        const drift = Math.sin(frame * 0.025 + particle.offset) * 30;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: particle.x + drift,
              top: (particle.y + frame * particle.speed) % height,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: particle.color,
              opacity: particle.opacity * twinkle,
              boxShadow:
                particle.size > 3
                  ? `0 0 ${particle.size * 4}px ${particle.color}, 0 0 ${particle.size * 8}px ${particle.color}50`
                  : 'none',
            }}
          />
        );
      })}

      {/* Large ambient glow orbs */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: 1200,
          height: 1200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.cyan}12 0%, transparent 50%)`,
          filter: 'blur(100px)',
          transform: `scale(${1 + Math.sin(frame * 0.02) * 0.1})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          width: 1000,
          height: 1000,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.purpleLight}10 0%, transparent 50%)`,
          filter: 'blur(80px)',
          transform: `scale(${1 + Math.cos(frame * 0.025) * 0.1})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '30%',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.electricPink}08 0%, transparent 50%)`,
          filter: 'blur(60px)',
          transform: `scale(${1 + Math.sin(frame * 0.03) * 0.15})`,
        }}
      />
    </AbsoluteFill>
  );
};

// Energy wave effect component
export const EnergyWave: React.FC<{
  x: number;
  y: number;
  color?: string;
  delay?: number;
  size?: number;
}> = ({ x, y, color = colors.cyan, delay = 0, size = 600 }) => {
  const frame = useCurrentFrame();
  const activeFrame = frame - delay;

  if (activeFrame < 0) return null;

  const waves = [0, 15, 30];

  return (
    <>
      {waves.map((waveDelay, i) => {
        const waveFrame = activeFrame - waveDelay;
        if (waveFrame < 0) return null;

        const progress = Math.min(waveFrame / 45, 1);
        const scale = interpolate(progress, [0, 1], [0.2, 1]);
        const opacity = interpolate(progress, [0, 0.3, 1], [0.8, 0.5, 0]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              transform: `translate(-50%, -50%) scale(${scale})`,
              borderRadius: '50%',
              border: `4px solid ${color}`,
              opacity,
              boxShadow: `0 0 40px ${color}60, inset 0 0 40px ${color}20`,
            }}
          />
        );
      })}
    </>
  );
};
