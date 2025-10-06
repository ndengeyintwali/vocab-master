import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, User, ArrowLeft, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from './AuthContext';

interface PageHeaderProps {
  title?: string;
  onBack?: () => void;
  showBackButton?: boolean;
  className?: string;
}

export function PageHeader({ title, onBack, showBackButton = false, className = '' }: PageHeaderProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleAdminAccess = () => {
    window.location.href = '/?admin=true';
    setShowUserMenu(false);
  };

  return (
    <header className={`flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm border-b border-gray-800/50 ${className}`}>
      {/* Left Side - Back Button and Title */}
      <div className="flex items-center gap-3">
        {showBackButton && onBack && (
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="p-2 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-800/70"
          >
            <ArrowLeft className="w-4 h-4 text-gray-300" />
          </Button>
        )}
        
        {title && (
          <h1 className="text-lg font-semibold text-white">
            {title}
          </h1>
        )}
      </div>

      {/* Right Side - User Menu */}
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
            className="absolute right-0 mt-2 w-52 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-50"
          >
            {/* User Info */}
            <div className="p-3 border-b border-gray-700">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email}
              </p>
              {user?.isGuest && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-yellow-600/20 text-yellow-400 rounded">
                  Guest Account
                </span>
              )}
            </div>
            
            {/* Menu Items */}
            <div className="p-2">
              <button
                onClick={handleAdminAccess}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
              
              <div className="border-t border-gray-700 my-2"></div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}