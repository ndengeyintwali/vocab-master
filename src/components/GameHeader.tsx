import React from 'react';
import { Trophy, Zap, Target, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { LanguagePair } from '../data/languages';

interface GameHeaderProps {
  score: number;
  streak: number;
  level: number;
  progress: number;
  languagePair?: LanguagePair;
  onBack?: () => void;
}

export function GameHeader({ score, streak, level, progress, languagePair, onBack }: GameHeaderProps) {
  return (
    <div className="w-full bg-black p-4 text-white border-b border-gray-800">
      {/* Language Info and Back Button */}
      {languagePair && (
        <div className="flex items-center justify-between mb-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-auto"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-lg">{languagePair.from.flag}</span>
            <span className="text-gray-400">→</span>
            <span className="text-lg">{languagePair.to.flag}</span>
            <span className="text-sm text-gray-300 ml-2">{languagePair.name}</span>
          </div>
          <div className="w-8" /> {/* Spacer for symmetry */}
        </div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="font-medium">{score}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-400" />
          <span className="font-medium">{streak}</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-green-400" />
          <span className="font-medium">Level {level}</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">Progress to next level</p>
    </div>
  );
}