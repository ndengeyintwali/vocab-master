import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface MobileEnhancementsProps {
  children: React.ReactNode;
}

// Hook for detecting mobile device and capabilities
export function useMobileCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isStandalone: false,
    hasNotificationSupport: false,
    hasVibrationSupport: false,
    hasOrientationSupport: false,
    networkStatus: 'unknown' as 'online' | 'offline' | 'unknown',
  });

  useEffect(() => {
    const checkCapabilities = () => {
      setCapabilities({
        isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isStandalone: window.matchMedia('(display-mode: standalone)').matches || 
                     (window.navigator as any).standalone === true,
        hasNotificationSupport: 'Notification' in window,
        hasVibrationSupport: 'vibrate' in navigator,
        hasOrientationSupport: 'orientation' in window,
        networkStatus: navigator.onLine ? 'online' : 'offline',
      });
    };

    checkCapabilities();

    // Listen for network changes
    window.addEventListener('online', checkCapabilities);
    window.addEventListener('offline', checkCapabilities);

    return () => {
      window.removeEventListener('online', checkCapabilities);
      window.removeEventListener('offline', checkCapabilities);
    };
  }, []);

  return capabilities;
}

// Hook for haptic feedback
export function useHapticFeedback() {
  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const success = () => vibrate([50, 30, 50]);
  const error = () => vibrate([100, 50, 100, 50, 100]);
  const tap = () => vibrate(20);
  const notification = () => vibrate([200, 100, 200]);

  return { vibrate, success, error, tap, notification };
}

// Safe area provider for devices with notches
export function SafeAreaProvider({ children }: MobileEnhancementsProps) {
  useEffect(() => {
    // Set CSS custom properties for safe area insets
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Inject safe area CSS if not already injected
    const injectSafeAreaCSS = () => {
      const existingStyle = document.getElementById('safe-area-styles');
      if (!existingStyle) {
        const style = document.createElement('style');
        style.id = 'safe-area-styles';
        style.textContent = `
          .safe-area-container {
            min-height: 100vh;
            min-height: calc(var(--vh, 1vh) * 100);
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        `;
        document.head.appendChild(style);
      }
    };

    setVh();
    injectSafeAreaCSS();
    
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  return (
    <div className="safe-area-container">
      {children}
    </div>
  );
}

// Orientation lock component
export function OrientationManager() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.innerHeight > window.innerWidth) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };

    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Lock to portrait for mobile game
  useEffect(() => {
    if ('screen' in window && 'orientation' in window.screen) {
      const screenOrientation = window.screen.orientation;
      if (screenOrientation && 'lock' in screenOrientation) {
        screenOrientation.lock('portrait').catch(() => {
          // Silently fail - not all browsers/devices support this
        });
      }
    }
  }, []);

  return null;
}

// Pull-to-refresh component
export function PullToRefresh({ onRefresh, children }: { 
  onRefresh: () => Promise<void>; 
  children: React.ReactNode; 
}) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === 0) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;

    if (distance > 0 && window.scrollY === 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance, 120));
      setIsPulling(distance > 60);
    }
  };

  const handleTouchEnd = async () => {
    if (isPulling && pullDistance > 60) {
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      }
    }
    
    setStartY(0);
    setPullDistance(0);
    setIsPulling(false);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden"
    >
      {pullDistance > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 to-purple-600 text-white text-center py-2 z-10"
          style={{
            transform: `translateY(${pullDistance - 60}px)`,
          }}
        >
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: isPulling ? 180 : 0 }}
              className="mr-2"
            >
              ↓
            </motion.div>
            {isPulling ? 'Release to refresh' : 'Pull to refresh'}
          </div>
        </motion.div>
      )}
      <div style={{ transform: `translateY(${Math.min(pullDistance * 0.5, 30)}px)` }}>
        {children}
      </div>
    </div>
  );
}

// App shortcuts handler
export function useAppShortcuts() {
  useEffect(() => {
    // Handle PWA shortcuts
    const handleShortcut = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const shortcut = urlParams.get('shortcut');
      
      if (shortcut) {
        // Clear the URL parameter
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Return the shortcut for the app to handle
        return shortcut;
      }
    };

    const shortcut = handleShortcut();
    if (shortcut) {
      // Dispatch custom event for app to handle
      window.dispatchEvent(new CustomEvent('app-shortcut', { detail: shortcut }));
    }
  }, []);
}

// Mobile-optimized button with haptic feedback
export function MobileButton({ 
  children, 
  onClick, 
  haptic = 'tap',
  className = '',
  ...props 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  haptic?: 'tap' | 'success' | 'error' | 'none';
  className?: string;
  [key: string]: any;
}) {
  const { tap, success, error } = useHapticFeedback();

  const handleClick = () => {
    // Provide haptic feedback
    switch (haptic) {
      case 'tap':
        tap();
        break;
      case 'success':
        success();
        break;
      case 'error':
        error();
        break;
    }

    onClick?.();
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`active:scale-95 transition-transform ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}