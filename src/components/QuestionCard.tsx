import React from 'react';
import { motion } from 'motion/react';
import { Volume2, Star } from 'lucide-react';

interface QuestionCardProps {
  question: string;
  questionType: 'translate' | 'meaning';
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  onPlayAudio?: () => void;
}

export function QuestionCard({ question, questionType, category, difficulty, onPlayAudio }: QuestionCardProps) {
  const getDifficultyColor = (diff?: string) => {
    switch (diff) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyStars = (diff?: string) => {
    switch (diff) {
      case 'beginner': return 1;
      case 'intermediate': return 2;
      case 'advanced': return 3;
      default: return 1;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-black border border-gray-800 rounded-2xl p-6 shadow-lg mx-4 mb-6"
    >
      <div className="text-center">
        {/* Category and Difficulty */}
        {(category || difficulty) && (
          <div className="flex items-center justify-center gap-4 mb-3">
            {category && (
              <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                {category}
              </span>
            )}
            {difficulty && (
              <div className="flex items-center gap-1">
                {Array.from({ length: getDifficultyStars(difficulty) }, (_, i) => (
                  <Star key={i} className={`w-3 h-3 ${getDifficultyColor(difficulty)} fill-current`} />
                ))}
                <span className={`text-xs ${getDifficultyColor(difficulty)} ml-1 capitalize`}>
                  {difficulty}
                </span>
              </div>
            )}
          </div>
        )}
        
        <p className="text-sm text-gray-400 mb-2">
          {questionType === 'translate' ? 'Translate this word:' : 'What does this mean?'}
        </p>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-white">{question}</h2>
          {onPlayAudio && (
            <button
              onClick={onPlayAudio}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            >
              <Volume2 className="w-5 h-5 text-blue-400" />
            </button>
          )}
        </div>
        
        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
      </div>
    </motion.div>
  );
}