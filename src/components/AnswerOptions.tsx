import React from 'react';
import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface AnswerOptionsProps {
  options: AnswerOption[];
  selectedAnswer: string | null;
  showResults: boolean;
  onSelectAnswer: (optionId: string) => void;
  disabled: boolean;
}

export function AnswerOptions({ 
  options, 
  selectedAnswer, 
  showResults, 
  onSelectAnswer, 
  disabled 
}: AnswerOptionsProps) {
  const getButtonStyle = (option: AnswerOption) => {
    if (!showResults) {
      return selectedAnswer === option.id 
        ? 'bg-blue-600 text-white border-blue-500' 
        : 'bg-black text-gray-200 border-gray-700 hover:border-blue-400 hover:bg-gray-900';
    }
    
    if (option.isCorrect) {
      return 'bg-green-600 text-white border-green-500';
    }
    
    if (selectedAnswer === option.id && !option.isCorrect) {
      return 'bg-red-600 text-white border-red-500';
    }
    
    return 'bg-black text-gray-600 border-gray-800';
  };

  const getIcon = (option: AnswerOption) => {
    if (!showResults) return null;
    
    if (option.isCorrect) {
      return <Check className="w-5 h-5" />;
    }
    
    if (selectedAnswer === option.id && !option.isCorrect) {
      return <X className="w-5 h-5" />;
    }
    
    return null;
  };

  return (
    <div className="px-4 space-y-3">
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => !disabled && onSelectAnswer(option.id)}
          disabled={disabled}
          className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${getButtonStyle(option)}`}
        >
          <span className="font-medium">{option.text}</span>
          {getIcon(option)}
        </motion.button>
      ))}
    </div>
  );
}