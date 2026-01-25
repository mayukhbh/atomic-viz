import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors } from '../lib/colors';
import { springConfigs } from '../lib/animations';

type GlassCardProps = {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  padding?: number;
  borderRadius?: number;
  animate?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scaleIn' | 'none';
  delay?: number;
  borderColor?: string;
  glowColor?: string;
  showGlow?: boolean;
  style?: React.CSSProperties;
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  width = 'auto',
  height = 'auto',
  padding = 32,
  borderRadius = 24,
  animate = 'none',
  delay = 0,
  borderColor = 'rgba(0, 255, 255, 0.2)',
  glowColor = colors.cyan,
  showGlow = false,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let opacity = 1;
  let translateX = 0;
  let translateY = 0;
  let scale = 1;

  if (animate === 'fadeIn') {
    opacity = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
  } else if (animate === 'slideUp') {
    const progress = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
    opacity = progress;
    translateY = interpolate(progress, [0, 1], [60, 0]);
  } else if (animate === 'slideLeft') {
    const progress = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
    opacity = progress;
    translateX = interpolate(progress, [0, 1], [80, 0]);
  } else if (animate === 'scaleIn') {
    const progress = spring({ frame: frame - delay, fps, config: springConfigs.bouncy });
    opacity = progress;
    scale = interpolate(progress, [0, 1], [0.9, 1]);
  }

  return (
    <div
      style={{
        width,
        height,
        padding,
        borderRadius,
        background: 'rgba(10, 10, 20, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${borderColor}`,
        opacity,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        ...(showGlow && {
          boxShadow: `0 0 40px ${glowColor}20, 0 0 80px ${glowColor}10`,
        }),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Feature card with icon
type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor?: string;
  animate?: boolean;
  delay?: number;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  accentColor = colors.cyan,
  animate = true,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = animate
    ? spring({ frame: frame - delay, fps, config: springConfigs.smooth })
    : 1;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: `${accentColor}15`,
          border: `2px solid ${accentColor}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          color: accentColor,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: colors.white,
          marginBottom: 12,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 400,
          color: colors.grayLight,
          maxWidth: 280,
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </div>
  );
};
