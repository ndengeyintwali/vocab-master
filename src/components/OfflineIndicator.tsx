import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      setShowOfflineMessage(true);
    }
  }, [isOnline]);

  return (
    <AnimatePresence>
      {showOfflineMessage && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className={`p-3 text-center text-white ${
            isOnline 
              ? 'bg-green-600' 
              : 'bg-red-600'
          }`}>
            <div className="flex items-center justify-center gap-2">
              {isOnline ? (
                <Wifi className="w-4 h-4" />
              ) : (
                <WifiOff className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {isOnline 
                  ? 'Back online! Your progress has been saved.' 
                  : 'You\'re offline. Some features may be limited, but you can still play!'
                }
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}