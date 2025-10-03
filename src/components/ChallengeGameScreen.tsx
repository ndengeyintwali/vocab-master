import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Timer, Target, Zap, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { QuestionCard } from './QuestionCard';
import { AnswerOptions } from './AnswerOptions';
import { FeedbackModal } from './FeedbackModal';
import { ChallengeCompleteModal } from './ChallengeCompleteModal';
import { Challenge, updateChallengeProgress, checkChallengeCompletion } from '../data/challenges';
import { LanguagePair } from '../data/languages';
import { Question, getQuestionsForLanguagePair } from '../data/vocabulary';

interface ChallengeGameScreenProps {
  challenge: Challenge;
  languagePair: LanguagePair;
  onBack: () => void;
  onChallengeComplete: (challenge: Challenge) => void;
}

export function ChallengeGameScreen({ 
  challenge, 
  languagePair, 
  onBack, 
  onChallengeComplete 
}: ChallengeGameScreenProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(challenge.timeLimit || 0);
  const [gameStarted, setGameStarted] = useState(false);
  const [challengeProgress, setChallengeProgress] = useState(challenge.progress);
  const [showChallengeComplete, setShowChallengeComplete] = useState(false);
  
  // Game stats for challenge tracking
  const [gameStats, setGameStats] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    currentStreak: 0,
    longestStreak: 0,
    timeSpent: 0,
    categoriesPlayed: [] as string[],
    languagePairsPlayed: [languagePair.id]
  });

  // Load questions for the selected language pair
  useEffect(() => {
    let loadedQuestions = getQuestionsForLanguagePair(languagePair.id);
    
    // Filter by category if challenge specifies one
    if (challenge.category) {
      loadedQuestions = loadedQuestions.filter(q => q.category === challenge.category);
    }
    
    // Shuffle questions for variety
    const shuffled = [...loadedQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, [languagePair.id, challenge.category]);

  // Timer effect
  useEffect(() => {
    if (challenge.timeLimit && gameStarted && timeRemaining > 0 && !showFeedback) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up - end challenge
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, timeRemaining, showFeedback, challenge.timeLimit]);

  // Update challenge progress
  useEffect(() => {
    const newProgress = checkChallengeCompletion(challenge, gameStats);
    setChallengeProgress(newProgress);
    
    // Check if challenge is completed
    if (newProgress >= challenge.target && !challenge.completed) {
      const updatedChallenge = { ...challenge, progress: newProgress, completed: true };
      setShowChallengeComplete(true);
      // Don't call onChallengeComplete immediately - wait for user to see the modal
    }
  }, [gameStats, challenge]);

  const currentQuestion = questions[currentQuestionIndex];

  const startChallenge = () => {
    setGameStarted(true);
    if (challenge.timeLimit) {
      setTimeRemaining(challenge.timeLimit);
    }
  };

  const handleTimeUp = () => {
    // Challenge failed due to time limit
    console.log('Time up! Challenge failed.');
  };

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
    
    // Update game stats
    setGameStats(prev => {
      const newStats = {
        ...prev,
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        currentStreak: isCorrect ? prev.currentStreak + 1 : 0,
        longestStreak: Math.max(prev.longestStreak, isCorrect ? prev.currentStreak + 1 : 0),
        timeSpent: challenge.timeLimit ? (challenge.timeLimit - timeRemaining) : prev.timeSpent,
        categoriesPlayed: prev.categoriesPlayed.includes(currentQuestion.category) 
          ? prev.categoriesPlayed 
          : [...prev.categoriesPlayed, currentQuestion.category]
      };
      return newStats;
    });
    
    // Reset for next question
    setSelectedAnswer(null);
    setShowResults(false);
    setShowFeedback(false);
    
    // Move to next question (cycle through questions)
    setCurrentQuestionIndex(prev => (prev + 1) % questions.length);
  };

  const handleChallengeCompleteModalContinue = () => {
    setShowChallengeComplete(false);
    const updatedChallenge = { ...challenge, progress: challengeProgress, completed: true };
    onChallengeComplete(updatedChallenge);
  };

  const playAudio = () => {
    console.log('Playing audio for:', currentQuestion.question);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-lg mb-2">Loading challenge...</div>
          <div className="text-gray-400">
            Preparing {challenge.title}
          </div>
        </div>
      </div>
    );
  }

  // Pre-game screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Header */}
        <div className="bg-black border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-auto"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-bold text-white">Challenge Mode</h1>
            <div className="w-8" />
          </div>
        </div>

        {/* Challenge Info */}
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-gradient-to-br ${challenge.color} p-[1px] rounded-3xl max-w-sm w-full`}
          >
            <div className="bg-black rounded-3xl p-8 text-center">
              <div className="text-6xl mb-4">{challenge.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{challenge.title}</h2>
              <p className="text-gray-400 mb-6">{challenge.description}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Goal: {challenge.target}</span>
                </div>
                
                {challenge.timeLimit && (
                  <div className="flex items-center justify-center gap-2">
                    <Timer className="w-5 h-5 text-blue-400" />
                    <span className="text-white">Time limit: {formatTime(challenge.timeLimit)}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Reward: {challenge.reward.xp} XP</span>
                </div>
              </div>
              
              <Button
                onClick={startChallenge}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0"
              >
                Start Challenge
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Challenge Header */}
      <div className="bg-black border-b border-gray-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-auto"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-white">{challenge.title}</h1>
            <p className="text-sm text-gray-400">{languagePair.name}</p>
          </div>
          <div className="w-8" />
        </div>

        {/* Challenge Progress */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{challengeProgress}</div>
              <div className="text-xs text-gray-400">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">{gameStats.correctAnswers}</div>
              <div className="text-xs text-gray-400">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">{gameStats.currentStreak}</div>
              <div className="text-xs text-gray-400">Streak</div>
            </div>
          </div>
          
          {challenge.timeLimit && (
            <div className="text-center">
              <div className={`text-lg font-bold ${timeRemaining <= 10 ? 'text-red-400' : 'text-blue-400'}`}>
                {formatTime(timeRemaining)}
              </div>
              <div className="text-xs text-gray-400">Time Left</div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <Progress 
          value={(challengeProgress / challenge.target) * 100} 
          className="h-2 bg-gray-800"
        />
      </div>

      {/* Game Content */}
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
        streakCount={gameStats.currentStreak}
      />
      
      <ChallengeCompleteModal
        isVisible={showChallengeComplete}
        challenge={{ ...challenge, progress: challengeProgress, completed: true }}
        onContinue={handleChallengeCompleteModalContinue}
      />
    </div>
  );
}