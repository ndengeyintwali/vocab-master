import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, BellOff, Clock, Trophy } from 'lucide-react';
import { Button } from './ui/button';

interface NotificationManagerProps {
  onPermissionChange?: (granted: boolean) => void;
}

export function NotificationManager({ onPermissionChange }: NotificationManagerProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      
      // Show permission prompt after user has been active for a while
      if (Notification.permission === 'default') {
        const timer = setTimeout(() => {
          setShowPermissionPrompt(true);
        }, 30000); // Show after 30 seconds

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setShowPermissionPrompt(false);
      onPermissionChange?.(result === 'granted');

      if (result === 'granted') {
        // Show welcome notification
        showNotification(
          'VocabMaster Notifications Enabled! 🎉',
          'You\'ll now receive daily challenge reminders',
          '/icons/icon-96x96.png'
        );
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const showNotification = (title: string, body: string, icon?: string) => {
    if (permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: icon || '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: 'vocabmaster-notification',
        requireInteraction: false,
        silent: false,
        vibrate: [200, 100, 200],
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  };

  // Schedule daily challenge notifications
  const scheduleDailyReminders = () => {
    if (permission !== 'granted') return;

    // This would typically be handled by your backend or service worker
    // For demo purposes, we'll show how to schedule a notification
    const scheduleNotification = (hours: number, minutes: number) => {
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(hours, minutes, 0, 0);

      // If the scheduled time has passed today, schedule for tomorrow
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      const timeUntilNotification = scheduledTime.getTime() - now.getTime();

      setTimeout(() => {
        showNotification(
          'Daily Challenge Available! 🏆',
          'Complete today\'s vocabulary challenges to keep your streak alive',
          '/icons/icon-192x192.png'
        );

        // Schedule the next day's notification
        scheduleDailyReminders();
      }, timeUntilNotification);
    };

    // Schedule notifications for 9 AM, 2 PM, and 7 PM
    scheduleNotification(9, 0);   // 9:00 AM
    scheduleNotification(14, 0);  // 2:00 PM  
    scheduleNotification(19, 0);  // 7:00 PM
  };

  useEffect(() => {
    if (permission === 'granted') {
      scheduleDailyReminders();
    }
  }, [permission]);

  const dismissPrompt = () => {
    setShowPermissionPrompt(false);
    localStorage.setItem('notification-prompt-dismissed', 'true');
  };

  // Don't show prompt if already dismissed or not supported
  if (!('Notification' in window) || 
      localStorage.getItem('notification-prompt-dismissed') || 
      permission !== 'default') {
    return null;
  }

  return (
    <AnimatePresence>
      {showPermissionPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-4 right-4 z-40"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4 shadow-xl border border-gray-700">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-xl p-2 flex-shrink-0">
                <Bell className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">
                  Stay on Track! 📚
                </h3>
                <p className="text-purple-100 text-sm mb-3">
                  Get daily reminders for your vocabulary challenges and never miss a learning streak!
                </p>
                
                <div className="flex gap-2">
                  <Button
                    onClick={requestPermission}
                    size="sm"
                    className="bg-white text-purple-600 hover:bg-purple-50 border-0 font-semibold"
                  >
                    <Bell className="w-4 h-4 mr-1" />
                    Enable Notifications
                  </Button>
                  
                  <Button
                    onClick={dismissPrompt}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20 border-0"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const showNotification = (title: string, body: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      return new Notification(title, {
        body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        ...options,
      });
    }
    return null;
  };

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return 'denied';
  };

  // Preset notification types
  const notifications = {
    dailyChallenge: () => showNotification(
      'Daily Challenge Available! 🏆',
      'Complete today\'s vocabulary challenges to keep your streak alive'
    ),
    
    streakReminder: (days: number) => showNotification(
      `${days} Day Streak! 🔥`,
      'Keep it up! Complete today\'s challenges to maintain your streak.'
    ),
    
    levelUp: (level: number) => showNotification(
      `Level Up! 🎉`,
      `Congratulations! You've reached level ${level}!`
    ),
    
    badgeEarned: (badge: string) => showNotification(
      'New Badge Earned! 🏅',
      `You've earned the "${badge}" badge!`
    ),
  };

  return {
    permission,
    requestPermission,
    showNotification,
    notifications,
    isSupported: 'Notification' in window,
  };
}