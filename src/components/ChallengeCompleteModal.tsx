import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Gift, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Challenge } from '../data/challenges';

interface ChallengeCompleteModalProps {
  isVisible: boolean;
  challenge: Challenge;
  onContinue: () => void;
}

export function ChallengeCompleteModal({ 
  isVisible, 
  challenge, 
  onContinue 
}: ChallengeCompleteModalProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="bg-black border border-gray-800 rounded-2xl p-6 max-w-sm w-full"
          >
            <div className="text-center">
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-4"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${challenge.color} flex items-center justify-center mx-auto mb-4`}>
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  Challenge Complete! 🎉
                </h3>
                <h4 className="text-lg text-gray-300 mb-4">{challenge.title}</h4>
                
                {/* Rewards Display */}
                <div className="bg-gray-900 rounded-xl p-4 mb-6">
                  <h5 className="text-white font-medium mb-3">Rewards Earned:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-bold">+{challenge.reward.xp} XP</span>
                    </div>
                    
                    {challenge.reward.badge && (
                      <div className="flex items-center justify-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400">Badge: {challenge.reward.badge}</span>
                      </div>
                    )}
                    
                    {challenge.reward.title && (
                      <div className="flex items-center justify-center gap-2">
                        <Gift className="w-5 h-5 text-purple-400" />
                        <span className="text-purple-400">Title: {challenge.reward.title}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Celebration Elements */}
                <div className="flex justify-center space-x-2 mb-6">
                  {['🎉', '⭐', '🏆', '⭐', '🎉'].map((emoji, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.6 + index * 0.1,
                        type: "spring",
                        stiffness: 300 
                      }}
                      className="text-2xl"
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>

                <Button
                  onClick={onContinue}
                  size="lg"
                  className={`w-full bg-gradient-to-r ${challenge.color} hover:opacity-90 text-white border-0`}
                >
                  Continue
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}