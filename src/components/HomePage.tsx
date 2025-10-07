import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  BookOpen,
  Target,
  Trophy,
  Zap,
  Clock,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Brain,
  GamepadIcon,
  TrendingUp,
  LogOut,
  User,
} from 'lucide-react';
import { Button } from './ui/button';
import { MobileButton } from './MobileEnhancements';
import { useAuth } from './AuthContext';

interface HomePageProps {
  onGetStarted: () => void;
  onAdminAccess?: () => void;
}

export function HomePage({ onGetStarted, onAdminAccess }: HomePageProps) {
  const { user, logout } = useAuth();
  const [adminTaps, setAdminTaps] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogoTap = () => {
    setAdminTaps(prev => prev + 1);
    if (adminTaps >= 6) {
      // Admin access after 7 taps on logo
      if (onAdminAccess) {
        onAdminAccess();
      }
    }
    // Reset after 3 seconds
    setTimeout(() => setAdminTaps(0), 3000);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };
  const features = [
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'AI-powered vocabulary practice with adaptive difficulty',
    },
    {
      icon: GamepadIcon,
      title: 'Gamified Experience',
      description: 'Earn points, maintain streaks, and level up as you learn',
    },
    {
      icon: Globe,
      title: 'Multiple Languages',
      description: '9 language pairs to choose from with more coming soon',
    },
    {
      icon: Target,
      title: 'Daily Challenges',
      description: 'Complete unique challenges for bonus XP and rewards',
    },
  ];

  const rules = [
    {
      icon: CheckCircle,
      title: 'Choose the correct translation',
      description: 'Select the right answer from multiple choice options',
    },
    {
      icon: Zap,
      title: 'Build your streak',
      description: 'Correct answers increase your streak multiplier',
    },
    {
      icon: Trophy,
      title: 'Earn points and level up',
      description: 'Score points based on speed and accuracy',
    },
    {
      icon: TrendingUp,
      title: 'Track your progress',
      description: 'Monitor your learning journey with detailed stats',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 text-white overflow-y-auto relative">
      {/* Animated Emoji Stickers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">⭐</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse">🎈</div>
        <div className="absolute top-40 left-1/4 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🚀</div>
        <div className="absolute top-60 right-1/3 text-4xl animate-pulse" style={{animationDelay: '1s'}}>🦄</div>
        <div className="absolute bottom-40 left-20 text-5xl animate-bounce" style={{animationDelay: '1.5s'}}>🌈</div>
        <div className="absolute bottom-60 right-10 text-3xl animate-pulse" style={{animationDelay: '2s'}}>✨</div>
        <div className="absolute top-1/3 right-10 text-4xl animate-bounce" style={{animationDelay: '0.8s'}}>🎨</div>
        <div className="absolute bottom-1/4 left-1/3 text-5xl animate-pulse" style={{animationDelay: '1.2s'}}>🎯</div>
        <div className="absolute top-1/2 left-5 text-4xl animate-bounce" style={{animationDelay: '0.3s'}}>🌟</div>
        <div className="absolute top-3/4 right-5 text-4xl animate-pulse" style={{animationDelay: '1.8s'}}>🎪</div>
      </div>
      
      {/* Moving Kid Emojis on Sides */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .float-animation { animation: float 3s ease-in-out infinite; }
      `}</style>
      <div className="absolute left-0 top-1/4 text-6xl float-animation pointer-events-none" style={{animationDelay: '0s'}}>👧</div>
      <div className="absolute left-0 top-1/2 text-6xl float-animation pointer-events-none" style={{animationDelay: '1s'}}>👦</div>
      <div className="absolute left-0 top-3/4 text-6xl float-animation pointer-events-none" style={{animationDelay: '0.5s'}}>🧒</div>
      <div className="absolute right-0 top-1/3 text-6xl float-animation pointer-events-none" style={{animationDelay: '1.5s'}}>👶</div>
      <div className="absolute right-0 top-2/3 text-6xl float-animation pointer-events-none" style={{animationDelay: '0.8s'}}>👧</div>
      {/* User Menu */}
      <div className="absolute top-4 right-4 z-20">
        <div className="relative">
          <Button
            onClick={() => setShowUserMenu(!showUserMenu)}
            variant="ghost"
            size="sm"
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm border border-white hover:bg-white shadow-lg"
          >
            <User className="w-4 h-4 text-purple-600" />
          </Button>
          
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm border border-purple-200 rounded-lg shadow-xl"
            >
              <div className="p-3 border-b border-purple-200">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {user?.email}
                </p>
                {user?.isGuest && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-yellow-600/20 text-yellow-400 rounded">
                    Guest
                  </span>
                )}
              </div>
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-purple-100 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative px-4 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-4 cursor-pointer"
              onClick={handleLogoTap}
            >
              <Globe className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            VocabMaster
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white drop-shadow-lg mb-8 leading-relaxed max-w-sm mx-auto"
          >
            Master vocabulary through interactive games and daily challenges
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <MobileButton
              onClick={onGetStarted}
              haptic="success"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8 py-6 text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Learning
            </MobileButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-center mb-8 text-white drop-shadow-lg"
        >
          Why Choose VocabMaster?
        </motion.h2>
        
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm border border-white shadow-lg rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2 flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How to Play Section */}
      <div className="px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-2xl font-bold text-center mb-8 text-white drop-shadow-lg"
        >
          How to Play
        </motion.h2>
        
        <div className="space-y-4 max-w-md mx-auto">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-start gap-4 bg-white/90 backdrop-blur-sm border border-white shadow-lg rounded-2xl p-4"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-2 flex-shrink-0">
                <rule.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{rule.title}</h3>
                <p className="text-gray-600 text-sm">{rule.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Preview */}
      <div className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white/90 backdrop-blur-sm border border-white shadow-xl rounded-3xl p-6 max-w-md mx-auto"
        >
          <h3 className="text-xl font-bold text-center mb-6 text-gray-800">Track Your Progress</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-3 mb-2 inline-block">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-800">Score</div>
              <div className="text-sm text-gray-600">Earn points</div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3 mb-2 inline-block">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-800">Streak</div>
              <div className="text-sm text-gray-600">Stay consistent</div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-3 mb-2 inline-block">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-800">Level</div>
              <div className="text-sm text-gray-600">Progress up</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* YouTube Videos Section */}
      <div className="px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="text-2xl font-bold text-center mb-8 text-white drop-shadow-lg"
        >
          Learn with Fun Videos! 🎥
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ABC Song for Kids 🎵</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/hq3yfQnllfQ"
                title="ABC Song for Kids"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Numbers Song 🔢</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/D0Ajq682yrA"
                title="Numbers Song for Kids"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <p className="text-white drop-shadow-lg mb-6">Ready to start your language learning journey?</p>
          <MobileButton
            onClick={onGetStarted}
            haptic="success"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 px-8 py-6 text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </MobileButton>
        </motion.div>
      </div>
    </div>
  );
}