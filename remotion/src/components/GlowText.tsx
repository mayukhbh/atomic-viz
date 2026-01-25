import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors } from '../lib/colors';
import { springConfigs, typewriter } from '../lib/animations';

type GlowTextProps = {
  children: string;
  size?: number;
  color?: string;
  glowColor?: string;
  weight?: number;
  animate?: 'fadeIn' | 'slideUp' | 'typewriter' | 'scaleIn' | 'none';
  delay?: number;
  glowIntensity?: number;
  gradient?: boolean;
  gradientColors?: [string, string];
  letterSpacing?: string;
  textAlign?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
};

export const GlowText: React.FC<GlowTextProps> = ({
  children,
  size = 48,
  color = colors.white,
  glowColor = colors.cyan,
  weight = 700,
  animate = 'none',
  delay = 0,
  glowIntensity = 1,
  gradient = false,
  gradientColors = [colors.cyan, colors.purpleLight],
  letterSpacing = '-0.02em',
  textAlign = 'center',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let opacity = 1;
  let translateY = 0;
  let scale = 1;
  let displayText = children;

  if (animate === 'fadeIn') {
    opacity = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
  } else if (animate === 'slideUp') {
    const progress = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
    opacity = progress;
    translateY = interpolate(progress, [0, 1], [50, 0]);
  } else if (animate === 'scaleIn') {
    const progress = spring({ frame: frame - delay, fps, config: springConfigs.bouncy });
    opacity = progress;
    scale = interpolate(progress, [0, 1], [0.8, 1]);
  } else if (animate === 'typewriter') {
    displayText = typewriter(children, frame, fps, 40, delay);
    opacity = frame >= delay ? 1 : 0;
  }

  const glowSize = 30 * glowIntensity;

  return (
    <div
      style={{
        fontSize: size,
        fontWeight: weight,
        letterSpacing,
        textAlign,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        color: gradient ? 'transparent' : color,
        ...(gradient && {
          background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }),
        textShadow: gradient
          ? `0 0 ${glowSize}px ${gradientColors[0]}40`
          : `0 0 ${glowSize}px ${glowColor}60, 0 0 ${glowSize * 2}px ${glowColor}30`,
        ...style,
      }}
    >
      {displayText}
    </div>
  );
};

// Subtext component for smaller descriptions
export const SubText: React.FC<{
  children: string;
  size?: number;
  color?: string;
  animate?: 'fadeIn' | 'slideUp' | 'none';
  delay?: number;
  style?: React.CSSProperties;
}> = ({
  children,
  size = 24,
  color = colors.grayLight,
  animate = 'none',
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let opacity = 1;
  let translateY = 0;

  if (animate === 'fadeIn') {
    opacity = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
  } else if (animate === 'slideUp') {
    const progress = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
    opacity = progress;
    translateY = interpolate(progress, [0, 1], [30, 0]);
  }

  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 400,
        color,
        opacity,
        transform: `translateY(${translateY}px)`,
        letterSpacing: '0.01em',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
