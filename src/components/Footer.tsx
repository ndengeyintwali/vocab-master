import React from 'react';
import { Heart, Code } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto py-2 px-4 bg-black/10 backdrop-blur-sm">
      <div className="text-center text-gray-600 text-xs opacity-60 flex items-center justify-center gap-2 flex-wrap max-w-2xl mx-auto">
        <div className="flex items-center gap-1">
          <span>Made with</span>
          <Heart className="w-2.5 h-2.5 text-red-500/60" />
          <span>by</span>
          <span className="font-medium text-gray-500">Ndengeyintwali Fils Canisius</span>
        </div>
        <span className="text-gray-700">•</span>
        <a 
          href="mailto:ndengeyintwalifils@gmail.com" 
          className="text-blue-400/60 hover:text-blue-300/80 transition-colors duration-200"
        >
          ndengeyintwalifils@gmail.com
        </a>
        <span className="text-gray-700">•</span>
        <span>VocabMaster © 2025</span>
      </div>
    </footer>
  );
}