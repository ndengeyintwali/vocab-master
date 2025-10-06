import React from "react";
import { motion } from "motion/react";
import {
  ChevronRight,
  BookOpen,
  Globe,
  Calendar,
  Flame,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { PageHeader } from "./PageHeader";
import {
  popularLanguagePairs,
  LanguagePair,
} from "../data/languages";

interface LanguageSelectorProps {
  onSelectLanguagePair: (languagePair: LanguagePair) => void;
  onViewDailyChallenges: () => void;
  onBack?: () => void;
}

export function LanguageSelector({
  onSelectLanguagePair,
  onViewDailyChallenges,
  onBack,
}: LanguageSelectorProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <PageHeader 
        title="Choose Language"
        onBack={onBack}
        showBackButton={!!onBack}
      />
      
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2">
            Language Learning
          </h2>
          <p className="text-gray-400 text-sm">
            Choose your language pair to start learning
          </p>
        </div>

        {/* Daily Challenges Section */}
        <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            onClick={onViewDailyChallenges}
            variant="outline"
            className="w-full h-auto p-0 bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 hover:from-purple-500 hover:to-blue-500 transition-all duration-200"
          >
            <div className="flex items-center justify-between w-full p-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🏆</div>
                <div className="text-left">
                  <div className="text-white font-medium flex items-center gap-2">
                    Daily Challenges
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      3 NEW
                    </span>
                  </div>
                  <div className="text-purple-200 text-sm">
                    Complete today's challenges for bonus XP
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-purple-200" />
                <span className="text-purple-200 font-bold">
                  7
                </span>
                <ChevronRight className="w-4 h-4 text-purple-200" />
              </div>
            </div>
          </Button>
        </motion.div>
        </div>

        {/* Language Pairs */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Choose Language Pair
          </h2>
        <div className="space-y-3">
          {popularLanguagePairs.map((pair, index) => (
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
            >
              <Button
                onClick={() => onSelectLanguagePair(pair)}
                variant="outline"
                className="w-full h-auto p-0 bg-black border-gray-800 hover:bg-gray-900 hover:border-blue-400 transition-all duration-200"
              >
                <div className="flex items-center justify-between w-full p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {pair.from.flag}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                      <span className="text-2xl">
                        {pair.to.flag}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium">
                        {pair.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {pair.from.nativeName} →{" "}
                        {pair.to.nativeName}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay:
              (popularLanguagePairs.length + 1) * 0.1 + 0.2,
          }}
          className="mt-8 p-4 bg-gray-900 border border-gray-800 rounded-2xl"
        >
          <div className="text-center">
            <h3 className="text-white font-medium mb-2">
              More Languages Coming Soon!
            </h3>
            <p className="text-gray-400 text-sm">
              We're working on adding more language pairs and
              advanced features
            </p>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}