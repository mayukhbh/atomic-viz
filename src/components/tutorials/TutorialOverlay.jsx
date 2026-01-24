import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Play,
  Clock
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { TUTORIALS, getTutorialById, getBasicTutorials, getAdvancedTutorials } from '../../data/tutorials';

/**
 * Tutorial selection menu
 */
export const TutorialMenu = ({ onSelect, onClose }) => {
  const { complexity } = useSettings();
  const basicTutorials = getBasicTutorials();
  const advancedTutorials = getAdvancedTutorials();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-gray-900/95 border border-white/10 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Guided Tutorials</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Basic Tutorials */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">High School Level</h3>
          </div>
          <div className="grid gap-3">
            {basicTutorials.map(tutorial => (
              <TutorialCard
                key={tutorial.id}
                tutorial={tutorial}
                onSelect={() => onSelect(tutorial.id)}
              />
            ))}
          </div>
        </div>

        {/* Advanced Tutorials */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">University Level</h3>
          </div>
          <div className="grid gap-3">
            {advancedTutorials.map(tutorial => (
              <TutorialCard
                key={tutorial.id}
                tutorial={tutorial}
                onSelect={() => onSelect(tutorial.id)}
                advanced
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Individual tutorial card in the menu
 */
const TutorialCard = ({ tutorial, onSelect, advanced = false }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-xl border text-left transition-all hover:scale-[1.02] ${
        advanced
          ? 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50'
          : 'bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/50'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-white mb-1">{tutorial.title}</h4>
          <p className="text-sm text-white/60">{tutorial.description}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-white/40">
          <Clock className="w-3 h-3" />
          <span>{tutorial.duration} min</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className={`text-xs px-2 py-1 rounded-full ${
          advanced ? 'bg-purple-500/20 text-purple-300' : 'bg-cyan-500/20 text-cyan-300'
        }`}>
          {tutorial.steps.length} steps
        </span>
        <Play className="w-4 h-4 text-white/40 ml-auto" />
      </div>
    </button>
  );
};

/**
 * Active tutorial overlay with narration and navigation
 */
export const TutorialOverlay = ({
  onClose,
  onElementChange,
  onViewChange,
  onReactionChange,
  onStageChange,
  onOrbitalModeChange
}) => {
  const {
    tutorialActive,
    currentTutorial,
    tutorialStep,
    nextTutorialStep,
    prevTutorialStep,
    endTutorial
  } = useSettings();

  if (!tutorialActive || !currentTutorial) return null;

  const tutorial = getTutorialById(currentTutorial);
  if (!tutorial) return null;

  const step = tutorial.steps[tutorialStep];
  const isFirstStep = tutorialStep === 0;
  const isLastStep = tutorialStep === tutorial.steps.length - 1;

  // Apply step settings
  React.useEffect(() => {
    if (step) {
      if (step.element && onElementChange) {
        onElementChange(step.element);
      }
      if (step.view && onViewChange) {
        onViewChange(step.view);
      }
      if (step.reactionId && onReactionChange) {
        onReactionChange(step.reactionId);
      }
      if (typeof step.stage === 'number' && onStageChange) {
        onStageChange(step.stage);
      }
      if (step.orbitalMode && onOrbitalModeChange) {
        onOrbitalModeChange(step.orbitalMode);
      }
    }
  }, [step, tutorialStep]);

  const handleNext = () => {
    if (isLastStep) {
      endTutorial();
      if (onClose) onClose();
    } else {
      nextTutorialStep();
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      prevTutorialStep();
    }
  };

  const handleClose = () => {
    endTutorial();
    if (onClose) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 right-0 z-[150] p-4 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="px-6 py-3 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span className="font-semibold text-white">{tutorial.title}</span>
              <span className="text-xs text-white/40 px-2 py-1 bg-white/10 rounded-full">
                {tutorial.level === 'basic' ? 'High School' : 'University'}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-white/80 leading-relaxed">{step.narration}</p>
          </div>

          {/* Progress and Navigation */}
          <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
            {/* Progress bar */}
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sm text-white/40">
                Step {tutorialStep + 1} of {tutorial.steps.length}
              </span>
              <div className="flex-1 max-w-xs h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((tutorialStep + 1) / tutorial.steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={isFirstStep}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  isFirstStep
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-medium flex items-center gap-2 hover:bg-cyan-400 transition-all"
              >
                {isLastStep ? 'Finish' : 'Next'}
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Step indicators */}
          <div className="px-6 pb-4 flex justify-center gap-1.5">
            {tutorial.steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === tutorialStep
                    ? 'bg-cyan-400 scale-125'
                    : index < tutorialStep
                    ? 'bg-cyan-400/50'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialOverlay;
