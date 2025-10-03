# 🎮 VocabMaster - Language Learning Game

A mobile-first Progressive Web App (PWA) for learning languages through interactive games and daily challenges.

## ✨ Features

- 🎯 **Interactive Vocabulary Games** - Multiple choice questions with instant feedback
- 🌍 **Multi-Language Support** - 9 language pairs (English to Spanish, French, German, Japanese, etc.)
- 📱 **Mobile-First PWA** - Installable on mobile devices, works offline
- 🏆 **Daily Challenges** - Engaging challenges with rewards and achievements
- 📊 **Progress Tracking** - Points, streaks, and performance analytics
- 🎨 **Dark Theme** - Beautiful black theme optimized for mobile
- ⚡ **Offline Support** - Service worker with intelligent caching
- 🛠️ **Admin Dashboard** - Complete content management system
- 🔔 **Push Notifications** - Optional notifications for daily challenges
- 📲 **Native App Feel** - Haptic feedback, safe area support, and app shortcuts

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/yourusername/vocabmaster.git
   cd vocabmaster
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🏗️ Build & Deploy

### Development
\`\`\`bash
npm run dev          # Start development server
npm run type-check   # Check TypeScript types
npm run lint         # Run ESLint
\`\`\`

### Production Build
\`\`\`bash
npm run build        # Build for production
npm run preview      # Preview production build locally
\`\`\`

### Deploy Options

**Vercel (Recommended):**
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

**Netlify:**
\`\`\`bash
npm run build
netlify deploy --prod --dir=dist
\`\`\`

**GitHub Pages:**
- Push to GitHub
- Enable Pages in repository settings
- Set source to GitHub Actions

## 🛠️ Admin Dashboard

Access the admin dashboard to manage vocabulary and content:

### Access Methods:
- **URL Parameter:** \`your-app.com/?admin=true\`
- **Keyboard Shortcut:** \`Ctrl + Shift + A\`
- **Mobile:** Tap the logo 7 times on home screen

### Admin Features:
- ✅ Add/Edit/Delete vocabulary for all languages
- ✅ Organize words by category and difficulty
- ✅ View statistics and analytics
- ✅ Export/Import vocabulary data
- ✅ Manage language pairs and challenges

## 📱 PWA Installation

### iOS (Safari):
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

### Android (Chrome):
1. Open the app in Chrome
2. Tap the menu (⋮)
3. Select "Install App"

## 🎯 Game Features

### Core Gameplay:
- **Multiple Choice Questions** - Choose the correct translation
- **Instant Feedback** - Learn from explanations after each answer
- **Progress Tracking** - Earn points and maintain streaks
- **Difficulty Levels** - Easy, Medium, Hard questions

### Daily Challenges:
- **Speed Challenges** - Answer questions quickly
- **Streak Challenges** - Maintain correct answer streaks
- **Category Focus** - Master specific vocabulary categories
- **Volume Challenges** - Complete daily question targets

### Gamification:
- **XP System** - Earn experience points for correct answers
- **Achievement Badges** - Unlock badges for milestones
- **Leaderboards** - Compare progress with other learners
- **Streak Tracking** - Build and maintain learning streaks

## 🏗️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS v4 + Radix UI
- **Build Tool:** Vite
- **PWA:** Vite PWA Plugin + Workbox
- **Animations:** Motion (Framer Motion)
- **State Management:** React Hooks + LocalStorage
- **Deployment:** Vercel/Netlify/GitHub Pages

## 📊 Supported Languages

Current language pairs:
- 🇺🇸 English → 🇪🇸 Spanish
- 🇺🇸 English → 🇫🇷 French  
- 🇺🇸 English → 🇩🇪 German
- 🇺🇸 English → 🇯🇵 Japanese
- 🇺🇸 English → 🇮🇹 Italian
- 🇺🇸 English → 🇵🇹 Portuguese
- 🇺🇸 English → 🇷🇺 Russian
- 🇺🇸 English → 🇰🇷 Korean
- 🇺🇸 English → 🇨🇳 Chinese

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit changes: \`git commit -m 'Add amazing feature'\`
4. Push to branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## 📞 Support

- 📧 Email: support@vocabmaster.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/vocabmaster/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/vocabmaster/discussions)

---

**Made with ❤️ for language learners worldwide** 🌍