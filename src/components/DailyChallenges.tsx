import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Trophy, Star, Gift, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Challenge, getTodaysChallenges } from '../data/challenges';

interface DailyChallengesProps {
  onBack: () => void;
  onStartChallenge: (challenge: Challenge) => void;
}

export function DailyChallenges({ onBack, onStartChallenge }: DailyChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    const todaysChallenges = getTodaysChallenges();
    setChallenges(todaysChallenges);
  }, []);

  const completedChallenges = challenges.filter(c => c.completed).length;
  const totalXP = challenges.reduce((sum, c) => sum + (c.completed ? c.reward.xp : 0), 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatTimeRemaining = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeLeft = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b border-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-auto"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold text-white">Daily Challenges</h1>
          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Challenge Summary */}
        <div className="flex items-center justify-between bg-gray-900 rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{completedChallenges}/3</div>
              <div className="text-xs text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{totalXP}</div>
              <div className="text-xs text-gray-400">XP Earned</div>
            </div>
          </div>
          <div className="text-center">
            <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-sm text-white">{formatTimeRemaining()}</div>
            <div className="text-xs text-gray-400">Remaining</div>
          </div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="p-4 space-y-4">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden"
          >
            <div 
              className={`bg-gradient-to-r ${challenge.color} p-[1px] rounded-2xl`}
            >
              <div className="bg-black rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{challenge.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
                      <p className="text-sm text-gray-400">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    {challenge.completed && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">
                      {challenge.progress} / {challenge.target}
                    </span>
                    <span className="text-sm text-gray-300">
                      {Math.round((challenge.progress / challenge.target) * 100)}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={(challenge.progress / challenge.target) * 100} 
                      className="h-2 bg-gray-800"
                    />
                    {challenge.progress / challenge.target > 0.8 && !challenge.completed && (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-30"
                      />
                    )}
                  </div>
                </div>

                {/* Reward */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-white">{challenge.reward.xp} XP</span>
                    </div>
                    {challenge.reward.badge && (
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-white">{challenge.reward.badge}</span>
                      </div>
                    )}
                    {challenge.reward.title && (
                      <div className="flex items-center gap-1">
                        <Gift className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-white">{challenge.reward.title}</span>
                      </div>
                    )}
                  </div>
                  
                  {!challenge.completed && (
                    <Button
                      onClick={() => onStartChallenge(challenge)}
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0"
                    >
                      Start
                    </Button>
                  )}
                </div>

                {/* Additional Info */}
                {challenge.timeLimit && (
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">
                        Time limit: {challenge.timeLimit} seconds
                      </span>
                    </div>
                  </div>
                )}
                
                {challenge.category && (
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300">
                        Focus: <span className="text-blue-400">{challenge.category}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Daily Streak Info */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-4"
        >
          <div className="text-center">
            <h3 className="text-white font-medium mb-2">Daily Challenge Streak</h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="text-2xl">🔥</div>
              <span className="text-2xl font-bold text-blue-400">7</span>
              <span className="text-gray-400">days</span>
            </div>
            <p className="text-sm text-gray-400">
              Complete all daily challenges to maintain your streak!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}