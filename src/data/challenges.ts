export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'speed' | 'streak' | 'category' | 'accuracy' | 'volume' | 'multi-language';
  difficulty: 'easy' | 'medium' | 'hard';
  target: number;
  progress: number;
  completed: boolean;
  reward: {
    xp: number;
    badge?: string;
    title?: string;
  };
  icon: string;
  color: string;
  timeLimit?: number; // in seconds
  category?: string;
  languagePairs?: string[];
  expiresAt: Date;
}

export interface DailyChallengeSet {
  date: string;
  challenges: Challenge[];
  streakDay: number;
  completed: boolean;
}

// Generate daily challenges based on the current date
export function generateDailyChallenges(date: Date): Challenge[] {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const seed = dayOfYear % 21; // 21 different challenge combinations
  
  const challengeTemplates: Omit<Challenge, 'id' | 'progress' | 'completed' | 'expiresAt'>[] = [
    // Easy Challenges
    {
      title: "Quick Fire",
      description: "Answer 5 questions correctly in under 30 seconds",
      type: 'speed',
      difficulty: 'easy',
      target: 5,
      reward: { xp: 50, badge: "⚡" },
      icon: "⚡",
      color: "from-yellow-500 to-orange-500",
      timeLimit: 30
    },
    {
      title: "Perfect Start",
      description: "Get your first 3 answers correct",
      type: 'streak',
      difficulty: 'easy',
      target: 3,
      reward: { xp: 30, badge: "🎯" },
      icon: "🎯",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Animal Lover",
      description: "Complete 4 questions from the Animals category",
      type: 'category',
      difficulty: 'easy',
      target: 4,
      reward: { xp: 40, badge: "🐾" },
      icon: "🐾",
      color: "from-blue-500 to-cyan-500",
      category: "Animals"
    },
    
    // Medium Challenges
    {
      title: "Speed Demon",
      description: "Answer 10 questions correctly in under 60 seconds",
      type: 'speed',
      difficulty: 'medium',
      target: 10,
      reward: { xp: 100, badge: "🏃", title: "Speed Demon" },
      icon: "🏃",
      color: "from-purple-500 to-pink-500",
      timeLimit: 60
    },
    {
      title: "Streak Master",
      description: "Get 8 correct answers in a row",
      type: 'streak',
      difficulty: 'medium',
      target: 8,
      reward: { xp: 80, badge: "🔥" },
      icon: "🔥",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Ace Student",
      description: "Achieve 100% accuracy on 6 questions",
      type: 'accuracy',
      difficulty: 'medium',
      target: 6,
      reward: { xp: 90, badge: "💯", title: "Perfectionist" },
      icon: "💯",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Daily Grind",
      description: "Complete 15 questions today",
      type: 'volume',
      difficulty: 'medium',
      target: 15,
      reward: { xp: 70, badge: "📚" },
      icon: "📚",
      color: "from-teal-500 to-green-500"
    },
    
    // Hard Challenges
    {
      title: "Lightning Round",
      description: "Answer 15 questions correctly in under 90 seconds",
      type: 'speed',
      difficulty: 'hard',
      target: 15,
      reward: { xp: 200, badge: "⚡", title: "Lightning Master" },
      icon: "⚡",
      color: "from-yellow-400 to-red-500",
      timeLimit: 90
    },
    {
      title: "Unstoppable",
      description: "Get 15 correct answers in a row",
      type: 'streak',
      difficulty: 'hard',
      target: 15,
      reward: { xp: 150, badge: "🚀", title: "Unstoppable" },
      icon: "🚀",
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Polyglot Practice",
      description: "Complete questions from 3 different language pairs",
      type: 'multi-language',
      difficulty: 'hard',
      target: 3,
      reward: { xp: 120, badge: "🌍", title: "Polyglot" },
      icon: "🌍",
      color: "from-blue-600 to-purple-600",
      languagePairs: ['en-es', 'en-fr', 'en-de']
    },
    {
      title: "Marathon",
      description: "Complete 25 questions today",
      type: 'volume',
      difficulty: 'hard',
      target: 25,
      reward: { xp: 180, badge: "🏃‍♂️", title: "Marathon Runner" },
      icon: "🏃‍♂️",
      color: "from-orange-500 to-red-600"
    }
  ];

  // Select 3 challenges for the day based on the seed
  const selectedChallenges: Challenge[] = [];
  const easyIndex = seed % 3;
  const mediumIndex = (seed + 1) % 4;
  const hardIndex = (seed + 2) % 4;
  
  // Always include one easy, one medium, and one hard challenge
  const easyTemplates = challengeTemplates.filter(c => c.difficulty === 'easy');
  const mediumTemplates = challengeTemplates.filter(c => c.difficulty === 'medium');
  const hardTemplates = challengeTemplates.filter(c => c.difficulty === 'hard');
  
  [
    easyTemplates[easyIndex],
    mediumTemplates[mediumIndex],
    hardTemplates[hardIndex]
  ].forEach((template, index) => {
    selectedChallenges.push({
      ...template,
      id: `daily-${date.toDateString()}-${index}`,
      progress: 0,
      completed: false,
      expiresAt: new Date(date.getTime() + 24 * 60 * 60 * 1000) // 24 hours from now
    });
  });

  return selectedChallenges;
}

export function getTodaysChallenges(): Challenge[] {
  const today = new Date();
  return generateDailyChallenges(today);
}

export function updateChallengeProgress(
  challenges: Challenge[],
  challengeId: string,
  progress: number
): Challenge[] {
  return challenges.map(challenge => {
    if (challenge.id === challengeId) {
      const newProgress = Math.min(progress, challenge.target);
      return {
        ...challenge,
        progress: newProgress,
        completed: newProgress >= challenge.target
      };
    }
    return challenge;
  });
}

export function checkChallengeCompletion(challenge: Challenge, gameData: {
  questionsAnswered: number;
  correctAnswers: number;
  currentStreak: number;
  timeSpent: number;
  categoriesPlayed: string[];
  languagePairsPlayed: string[];
}): number {
  switch (challenge.type) {
    case 'speed':
      if (challenge.timeLimit && gameData.timeSpent <= challenge.timeLimit) {
        return gameData.correctAnswers;
      }
      return 0;
      
    case 'streak':
      return gameData.currentStreak;
      
    case 'category':
      if (challenge.category && gameData.categoriesPlayed.includes(challenge.category)) {
        return gameData.correctAnswers;
      }
      return 0;
      
    case 'accuracy':
      if (gameData.questionsAnswered > 0) {
        const accuracy = gameData.correctAnswers / gameData.questionsAnswered;
        return accuracy === 1 ? gameData.correctAnswers : 0;
      }
      return 0;
      
    case 'volume':
      return gameData.questionsAnswered;
      
    case 'multi-language':
      return gameData.languagePairsPlayed.length;
      
    default:
      return 0;
  }
}