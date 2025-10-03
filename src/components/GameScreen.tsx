import React, { useState, useEffect } from 'react';
import { GameHeader } from './GameHeader';
import { QuestionCard } from './QuestionCard';
import { AnswerOptions } from './AnswerOptions';
import { FeedbackModal } from './FeedbackModal';
import { LanguagePair } from '../data/languages';
import { Question, getQuestionsForLanguagePair } from '../data/vocabulary';

interface GameScreenProps {
  languagePair: LanguagePair;
  onBack: () => void;
}

export function GameScreen({ languagePair, onBack }: GameScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load questions for the selected language pair
  useEffect(() => {
    const loadedQuestions = getQuestionsForLanguagePair(languagePair.id);
    if (loadedQuestions.length > 0) {
      setQuestions(loadedQuestions);
      setCurrentQuestionIndex(0);
    }
  }, [languagePair.id]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((questionsAnswered % 5) / 5) * 100; // 5 questions per level

  // If no questions are loaded yet, show loading state
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-lg mb-2">Loading questions...</div>
          <div className="text-gray-400">
            Preparing {languagePair.name} vocabulary
          </div>
        </div>
      </div>
    );
  }

  const handleSelectAnswer = (optionId: string) => {
    if (selectedAnswer || showResults) return;
    
    setSelectedAnswer(optionId);
    setShowResults(true);
    
    // Show feedback after a brief delay
    setTimeout(() => {
      setShowFeedback(true);
    }, 1000);
  };

  const handleContinue = () => {
    const isCorrect = currentQuestion.options.find(opt => opt.id === selectedAnswer)?.isCorrect || false;
    
    if (isCorrect) {
      setScore(prev => prev + 10 + (streak * 2)); // Bonus points for streaks
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    setQuestionsAnswered(prev => prev + 1);
    
    // Level up every 5 questions
    if ((questionsAnswered + 1) % 5 === 0) {
      setLevel(prev => prev + 1);
    }
    
    // Reset for next question
    setSelectedAnswer(null);
    setShowResults(false);
    setShowFeedback(false);
    
    // Move to next question (cycle through questions)
    setCurrentQuestionIndex(prev => (prev + 1) % questions.length);
  };

  const playAudio = () => {
    // In a real app, this would play pronunciation audio
    console.log('Playing audio for:', currentQuestion.question);
  };

  return (
    <div className="min-h-screen bg-black">
      <GameHeader 
        score={score}
        streak={streak}
        level={level}
        progress={progress}
        languagePair={languagePair}
        onBack={onBack}
      />
      
      <div className="pt-6">
        <QuestionCard 
          question={currentQuestion.question}
          questionType={currentQuestion.type}
          category={currentQuestion.category}
          difficulty={currentQuestion.difficulty}
          onPlayAudio={playAudio}
        />
        
        <AnswerOptions
          options={currentQuestion.options}
          selectedAnswer={selectedAnswer}
          showResults={showResults}
          onSelectAnswer={handleSelectAnswer}
          disabled={showResults}
        />
      </div>
      
      <FeedbackModal
        isVisible={showFeedback}
        isCorrect={currentQuestion.options.find(opt => opt.id === selectedAnswer)?.isCorrect || false}
        correctAnswer={currentQuestion.correctAnswer}
        explanation={currentQuestion.explanation}
        onContinue={handleContinue}
        streakCount={streak}
      />
    </div>
  );
}