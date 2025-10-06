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
}

export function HomePage({ onGetStarted }: HomePageProps) {
  const { user, logout } = useAuth();
  const [adminTaps, setAdminTaps] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogoTap = () => {
    setAdminTaps(prev => prev + 1);
    if (adminTaps >= 6) {
      // Admin access after 7 taps on logo
      window.location.href = '/?admin=true';
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
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      {/* User Menu */}
      <div className="absolute top-4 right-4 z-20">
        <div className="relative">
          <Button
            onClick={() => setShowUserMenu(!showUserMenu)}
            variant="ghost"
            size="sm"
            className="p-2 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-800/70"
          >
            <User className="w-4 h-4 text-gray-300" />
          </Button>
          
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg"
            >
              <div className="p-3 border-b border-gray-700">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-400 truncate">
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
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
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
            className="text-xl text-gray-300 mb-8 leading-relaxed max-w-sm mx-auto"
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
          className="text-2xl font-bold text-center mb-8"
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
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2 flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
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
          className="text-2xl font-bold text-center mb-8"
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
              className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-4"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-2 flex-shrink-0">
                <rule.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{rule.title}</h3>
                <p className="text-gray-400 text-sm">{rule.description}</p>
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
          className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-6 max-w-md mx-auto"
        >
          <h3 className="text-xl font-bold text-center mb-6">Track Your Progress</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-3 mb-2 inline-block">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-white">Score</div>
              <div className="text-sm text-gray-400">Earn points</div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3 mb-2 inline-block">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-white">Streak</div>
              <div className="text-sm text-gray-400">Stay consistent</div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-3 mb-2 inline-block">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-white">Level</div>
              <div className="text-sm text-gray-400">Progress up</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">Ready to start your language learning journey?</p>
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