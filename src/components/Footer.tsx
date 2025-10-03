import React from 'react';
import { Heart, Code } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto py-6 px-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="text-center text-gray-400 text-sm flex flex-col gap-2 max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          <span>by</span>
          <Code className="w-4 h-4 text-blue-500" />
        </div>
        
        <div className="font-medium text-gray-300">
          Ndengeyintwali Fils Canisius
        </div>
        
        <a 
          href="mailto:ndengeyintwalifils@gmail.com" 
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-dotted underline-offset-2"
        >
          ndengeyintwalifils@gmail.com
        </a>
        
        <div className="text-xs text-gray-500 mt-2">
          VocabMaster © 2024 - Language Learning Game
        </div>
      </div>
    </footer>
  );
}