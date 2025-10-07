import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { GameScreen } from './components/GameScreen';
import { LanguageSelector } from './components/LanguageSelector';
import { DailyChallenges } from './components/DailyChallenges';
import { ChallengeGameScreen } from './components/ChallengeGameScreen';
import { PWAInstallPrompt, usePWA } from './components/PWAInstallPrompt';
import { OfflineIndicator } from './components/OfflineIndicator';
import { NotificationManager } from './components/NotificationManager';
import { SafeAreaProvider, OrientationManager, useAppShortcuts } from './components/MobileEnhancements';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginPage } from './components/LoginPage';
import { AuthProvider, useAuth } from './components/AuthContext';
import { Footer } from './components/Footer';
import { LanguagePair } from './data/languages';
import { Challenge } from './data/challenges';

type AppScreen = 'home' | 'language-selector' | 'game' | 'daily-challenges' | 'challenge-game' | 'admin';

function AppContent() {
  const { isAuthenticated, login, signup, loginAsGuest, logout, user, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [selectedLanguagePair, setSelectedLanguagePair] = useState<LanguagePair | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [adminMode, setAdminMode] = useState(false);

  // Initialize PWA functionality
  usePWA();
  useAppShortcuts();

  // Handle URL shortcuts from PWA and app shortcuts
  useEffect(() => {
    const handleAppShortcut = (event: CustomEvent) => {
      const shortcut = event.detail;
      if (shortcut === 'quick-game') {
        setCurrentScreen('language-selector');
      } else if (shortcut === 'challenges') {
        setCurrentScreen('daily-challenges');
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const shortcut = urlParams.get('shortcut');
    const admin = urlParams.get('admin');
    
    if (shortcut === 'quick-game') {
      setCurrentScreen('language-selector');
    } else if (shortcut === 'challenges') {
      setCurrentScreen('daily-challenges');
    } else if (admin === 'true') {
      setCurrentScreen('admin');
      setAdminMode(true);
    }

    // Admin access via keyboard shortcut (Ctrl+Shift+A)
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setCurrentScreen('admin');
        setAdminMode(true);
      }
    };

    // Listen for app shortcut events
    window.addEventListener('app-shortcut', handleAppShortcut as EventListener);
    window.addEventListener('keydown', handleKeyboard);
    
    return () => {
      window.removeEventListener('app-shortcut', handleAppShortcut as EventListener);
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, []);

  // Check URL params after auth completes
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const urlParams = new URLSearchParams(window.location.search);
      const admin = urlParams.get('admin');
      if (admin === 'true') {
        setCurrentScreen('admin');
        setAdminMode(true);
      } else {
        // Reset to home screen after login
        setCurrentScreen('home');
      }
    }
  }, [isAuthenticated, isLoading]);

  const handleGetStarted = () => {
    setCurrentScreen('language-selector');
  };

  const handleSelectLanguagePair = (languagePair: LanguagePair) => {
    setSelectedLanguagePair(languagePair);
    setCurrentScreen('game');
  };

  const handleViewDailyChallenges = () => {
    setCurrentScreen('daily-challenges');
  };

  const handleStartChallenge = (challenge: Challenge) => {
    setActiveChallenge(challenge);
    // For challenges, we'll use English-Spanish by default, but this could be made configurable
    const defaultLanguagePair = {
      id: 'en-es',
      from: { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
      to: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
      name: 'English → Spanish'
    };
    setSelectedLanguagePair(defaultLanguagePair);
    setCurrentScreen('challenge-game');
  };

  const handleChallengeComplete = (challenge: Challenge) => {
    // Here you would typically save the challenge completion to local storage or backend
    console.log('Challenge completed:', challenge);
    setCurrentScreen('daily-challenges');
  };

  const handleBackToMain = () => {
    setCurrentScreen('home');
    setSelectedLanguagePair(null);
    setActiveChallenge(null);
    setAdminMode(false);
  };

  const handleAdminAccess = () => {
    setCurrentScreen('admin');
    setAdminMode(true);
  };

  const handleBackFromAdmin = () => {
    setCurrentScreen('home');
    setAdminMode(false);
  };

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    await signup(email, password, name);
  };

  const handleGuestAccess = async () => {
    try {
      await loginAsGuest();
    } catch (error) {
      console.error('Guest login failed:', error);
    }
  };

  const handleBackFromChallenges = () => {
    setCurrentScreen('language-selector');
  };

  const handleBackFromGame = () => {
    setCurrentScreen('language-selector');
    setSelectedLanguagePair(null);
  };

  const handleBackFromChallengeGame = () => {
    setCurrentScreen('daily-challenges');
    setActiveChallenge(null);
  };

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <SafeAreaProvider>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading VocabMaster...</p>
          </div>
        </div>
      </SafeAreaProvider>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <SafeAreaProvider>
        <div className="min-h-screen flex flex-col dark">
          <OrientationManager />
          <PWAInstallPrompt />
          <OfflineIndicator />
          <NotificationManager />
          
          <div className="flex-1">
            <LoginPage 
              onLogin={handleLogin} 
              onSignup={handleSignup}
              onGuestAccess={handleGuestAccess} 
            />
          </div>
          <Footer />
        </div>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <div className="min-h-screen flex flex-col dark">
        {/* Mobile orientation and device management */}
        <OrientationManager />
        
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
        
        {/* Offline Indicator */}
        <OfflineIndicator />
        
        {/* Notification Manager */}
        <NotificationManager />
        
        <div className="flex-1">
      
      {currentScreen === 'home' && (
        <HomePage onGetStarted={handleGetStarted} onAdminAccess={handleAdminAccess} />
      )}
      
      {currentScreen === 'language-selector' && (
        <LanguageSelector 
          onSelectLanguagePair={handleSelectLanguagePair}
          onViewDailyChallenges={handleViewDailyChallenges}
          onBack={handleBackToMain}
        />
      )}
      
      {currentScreen === 'game' && selectedLanguagePair && (
        <GameScreen 
          languagePair={selectedLanguagePair}
          onBack={handleBackFromGame}
        />
      )}
      
      {currentScreen === 'daily-challenges' && (
        <DailyChallenges
          onBack={handleBackFromChallenges}
          onStartChallenge={handleStartChallenge}
        />
      )}
      
      {currentScreen === 'challenge-game' && activeChallenge && selectedLanguagePair && (
        <ChallengeGameScreen
          challenge={activeChallenge}
          languagePair={selectedLanguagePair}
          onBack={handleBackFromChallengeGame}
          onChallengeComplete={handleChallengeComplete}
        />
      )}

        {currentScreen === 'admin' && (
          <AdminDashboard onBack={handleBackFromAdmin} />
        )}
        </div>
        
        {/* Footer on all pages */}
        <Footer />
      </div>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
