import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Star } from 'lucide-react';
import { Button } from './ui/button';

interface FeedbackModalProps {
  isVisible: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
  onContinue: () => void;
  streakCount: number;
}

export function FeedbackModal({ 
  isVisible, 
  isCorrect, 
  correctAnswer, 
  explanation, 
  onContinue,
  streakCount 
}: FeedbackModalProps) {
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
              {isCorrect ? (
                <div className="mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Excellent!</h3>
                  {streakCount > 1 && (
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">{streakCount} in a row!</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-red-400 mb-2">Not quite!</h3>
                  <p className="text-gray-300 mb-2">The correct answer is:</p>
                  <p className="font-bold text-white">{correctAnswer}</p>
                </div>
              )}
              
              {explanation && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-300">{explanation}</p>
                </div>
              )}
              
              <Button 
                onClick={onContinue}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}