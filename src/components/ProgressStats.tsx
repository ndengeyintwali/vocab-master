import React from 'react';
import { motion } from 'motion/react';
import { Award, Brain, Clock, Target } from 'lucide-react';

interface ProgressStatsProps {
  languagePairName: string;
  stats: {
    questionsAnswered: number;
    correctAnswers: number;
    longestStreak: number;
    averageTime: number;
    categoriesLearned: string[];
  };
}

export function ProgressStats({ languagePairName, stats }: ProgressStatsProps) {
  const accuracy = stats.questionsAnswered > 0 
    ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black border border-gray-800 rounded-2xl p-6 mx-4 mb-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">
          {languagePairName} Progress
        </h3>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">{accuracy}% Accuracy</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">{stats.questionsAnswered} Answered</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{stats.longestStreak}</div>
          <div className="text-xs text-gray-400">Best Streak</div>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{stats.averageTime}s</div>
          <div className="text-xs text-gray-400">Avg. Time</div>
        </div>
      </div>

      {stats.categoriesLearned.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Categories Practiced</h4>
          <div className="flex flex-wrap gap-2">
            {stats.categoriesLearned.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}