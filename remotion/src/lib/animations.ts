import { interpolate, spring, Easing } from 'remotion';

// Spring configurations
export const springConfigs = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  bouncy: { damping: 10, stiffness: 100 },
  gentle: { damping: 30, stiffness: 80 },
} as const;

// Fade animations
export const fadeIn = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const fadeOut = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// Slide animations
export const slideUp = (frame: number, fps: number, delay: number = 0) => {
  const progress = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
  return {
    opacity: progress,
    translateY: interpolate(progress, [0, 1], [60, 0]),
  };
};

export const slideDown = (frame: number, fps: number, delay: number = 0) => {
  const progress = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
  return {
    opacity: progress,
    translateY: interpolate(progress, [0, 1], [-60, 0]),
  };
};

export const slideLeft = (frame: number, fps: number, delay: number = 0) => {
  const progress = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
  return {
    opacity: progress,
    translateX: interpolate(progress, [0, 1], [80, 0]),
  };
};

export const slideRight = (frame: number, fps: number, delay: number = 0) => {
  const progress = spring({ frame: frame - delay, fps, config: springConfigs.smooth });
  return {
    opacity: progress,
    translateX: interpolate(progress, [0, 1], [-80, 0]),
  };
};

// Scale animations
export const scaleIn = (frame: number, fps: number, delay: number = 0) => {
  const progress = spring({ frame: frame - delay, fps, config: springConfigs.bouncy });
  return {
    opacity: progress,
    scale: interpolate(progress, [0, 1], [0.8, 1]),
  };
};

// Orbit animation (for electrons)
export const orbit = (
  frame: number,
  radius: number,
  speed: number = 1,
  offset: number = 0
) => {
  const angle = (frame * speed * 0.05) + offset;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

// Pulse animation
export const pulse = (frame: number, intensity: number = 0.05, speed: number = 0.1) => {
  return 1 + Math.sin(frame * speed) * intensity;
};

// Glow pulse
export const glowPulse = (frame: number, min: number = 20, max: number = 40, speed: number = 0.08) => {
  return min + ((max - min) * (0.5 + Math.sin(frame * speed) * 0.5));
};

// Counter animation
export const countTo = (
  frame: number,
  start: number,
  target: number,
  startFrame: number,
  duration: number
) => {
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );
  return Math.round(start + (target - start) * progress);
};

// Typewriter effect
export const typewriter = (
  text: string,
  frame: number,
  fps: number,
  charsPerSecond: number = 30,
  delay: number = 0
) => {
  const adjustedFrame = Math.max(0, frame - delay);
  const charsPerFrame = charsPerSecond / fps;
  const visibleChars = Math.floor(adjustedFrame * charsPerFrame);
  return text.slice(0, Math.min(visibleChars, text.length));
};

// Stagger delay calculator
export const stagger = (index: number, baseDelay: number = 5) => index * baseDelay;
