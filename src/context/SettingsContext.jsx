import React, { createContext, useContext, useState, useCallback } from 'react';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  // Complexity toggle: 'basic' for high school, 'advanced' for university
  const [complexity, setComplexity] = useState('basic');

  // Orbital visualization mode: 'bohr' or 'quantum'
  const [orbitalMode, setOrbitalMode] = useState('bohr');

  // Animation playback speed: 0.25x to 4x
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Tutorial state
  const [tutorialActive, setTutorialActive] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Toggle complexity between basic and advanced
  const toggleComplexity = useCallback(() => {
    setComplexity(prev => prev === 'basic' ? 'advanced' : 'basic');
  }, []);

  // Toggle orbital mode between bohr and quantum
  const toggleOrbitalMode = useCallback(() => {
    setOrbitalMode(prev => prev === 'bohr' ? 'quantum' : 'bohr');
  }, []);

  // Speed presets
  const speedPresets = [0.25, 0.5, 1.0, 2.0, 4.0];

  // Cycle through speed presets
  const cycleSpeed = useCallback(() => {
    setPlaybackSpeed(prev => {
      const currentIndex = speedPresets.indexOf(prev);
      const nextIndex = (currentIndex + 1) % speedPresets.length;
      return speedPresets[nextIndex];
    });
  }, []);

  // Tutorial controls
  const startTutorial = useCallback((tutorialId) => {
    setCurrentTutorial(tutorialId);
    setTutorialStep(0);
    setTutorialActive(true);
  }, []);

  const nextTutorialStep = useCallback(() => {
    setTutorialStep(prev => prev + 1);
  }, []);

  const prevTutorialStep = useCallback(() => {
    setTutorialStep(prev => Math.max(0, prev - 1));
  }, []);

  const endTutorial = useCallback(() => {
    setTutorialActive(false);
    setCurrentTutorial(null);
    setTutorialStep(0);
  }, []);

  const value = {
    // Complexity
    complexity,
    setComplexity,
    toggleComplexity,
    isAdvanced: complexity === 'advanced',

    // Orbital mode
    orbitalMode,
    setOrbitalMode,
    toggleOrbitalMode,
    isQuantumMode: orbitalMode === 'quantum',

    // Playback speed
    playbackSpeed,
    setPlaybackSpeed,
    speedPresets,
    cycleSpeed,

    // Tutorial
    tutorialActive,
    currentTutorial,
    tutorialStep,
    startTutorial,
    nextTutorialStep,
    prevTutorialStep,
    endTutorial,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;
