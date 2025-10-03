# 🚀 VocabMaster - Local Setup & GitHub Deployment Guide

## 📋 Prerequisites

Before you begin, make sure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **Git** installed ([Download here](https://git-scm.com/))
- A **GitHub account** ([Sign up here](https://github.com/))
- A **code editor** (VS Code recommended)

## 🏗️ Step 1: Set Up Local Project

### Option A: Download Project Files

1. **Download all files** from this conversation/project
2. **Create a new folder** on your computer called `vocabmaster`
3. **Copy all files** into this folder maintaining the directory structure

### Option B: Clone from Figma Make (if available)

```bash
# If you have access to export from Figma Make
# Follow the export instructions in the tool
```

## 📦 Step 2: Install Dependencies

Open your terminal/command prompt and navigate to the project folder:

```bash
# Navigate to your project directory
cd vocabmaster

# Install all dependencies
npm install
```

**Expected output:** You should see packages being installed and no error messages.

## 🔧 Step 3: Test Local Development

Start the development server:

```bash
npm run dev
```

**Expected output:**
```
VITE v5.0.8  ready in 1234 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.xxx:5173/
➜  press h to show help
```

**Test the app:**
1. Open http://localhost:5173 in your browser
2. You should see the VocabMaster home page
3. Try navigating through the app to ensure it works
4. Test admin access: Press `Ctrl+Shift+A` or go to `http://localhost:5173/?admin=true`

## 📱 Step 4: Test PWA Features

1. **Open in mobile browser** (or use browser dev tools to simulate mobile)
2. **Check offline functionality:**
   - Turn off wifi/data
   - Refresh the page - should still work
3. **Test install prompt:**
   - Look for "Install App" option in browser menu
   - Install and test the installed app

## 🐙 Step 5: Create GitHub Repository

### Create Repository on GitHub

1. **Go to GitHub.com** and sign in
2. **Click the "+" icon** in top right
3. **Select "New repository"**
4. **Repository settings:**
   - Repository name: `vocabmaster`
   - Description: `A mobile-first language learning game with PWA capabilities`
   - Set to **Public** (or Private if you prefer)
   - **Don't** initialize with README (we already have one)
5. **Click "Create repository"**

### Initialize Git in Your Project

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create first commit
git commit -m "Initial commit: VocabMaster language learning app"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/vocabmaster.git

# Push to GitHub
git push -u origin main
```

**If you get an error about "main" branch:**
```bash
git branch -M main
git push -u origin main
```

## 🌐 Step 6: Deploy to Production

### Option A: Vercel (Recommended - Easiest)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project? `N`
   - What's your project's name? `vocabmaster`
   - In which directory is your code located? `./`
   - Want to override settings? `N`

4. **Result:** Your app will be live at `https://vocabmaster-xxx.vercel.app`

### Option B: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Follow prompts** to link your site

### Option C: GitHub Pages

1. **Go to your GitHub repository**
2. **Click Settings tab**
3. **Scroll to "Pages" section**
4. **Source:** Select "GitHub Actions"
5. **Create workflow file** (create `.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## ✅ Step 7: Verify Deployment

1. **Visit your deployed URL**
2. **Test core features:**
   - Game works properly
   - Languages load correctly
   - PWA install works on mobile
   - Admin dashboard accessible
3. **Test on mobile device:**
   - Install as PWA
   - Play offline
   - Ensure touch interactions work

## 🔧 Step 8: Configure Admin Access

After deployment, you can access admin features:

1. **URL Method:** `https://your-app.com/?admin=true`
2. **Keyboard:** `Ctrl+Shift+A` (desktop)
3. **Mobile:** Tap logo 7 times on home screen

**Admin features:**
- Add/edit vocabulary
- Manage languages
- View statistics
- Export data

## 📊 Step 9: Ongoing Development

### Making Changes

```bash
# Make your changes to files
# Stage changes
git add .

# Commit changes  
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

**Auto-deployment:** If using Vercel/Netlify, your changes will auto-deploy when you push to GitHub.

### Adding Vocabulary

1. **Access admin dashboard**
2. **Go to Vocabulary tab**
3. **Click "Add Word"**
4. **Fill in details:**
   - English word
   - Translation
   - Category (food, travel, etc.)
   - Difficulty level
5. **Save**

## 🎯 Customization Ideas

### Easy Customizations:
- **Add your branding** in `/README.md`
- **Change app colors** in `/styles/globals.css`
- **Add more vocabulary** via admin dashboard
- **Modify language pairs** in `/data/languages.ts`

### Advanced Customizations:
- **Add new game modes** in `/components/`
- **Integrate external APIs** for translations
- **Add user authentication** with Supabase
- **Implement cloud sync** for progress

## 🐛 Troubleshooting

### Common Issues:

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Git push fails:**
```bash
git remote -v  # Check remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/vocabmaster.git
```

**PWA not installing:**
- Ensure HTTPS is enabled (automatic on Vercel/Netlify)
- Check browser console for service worker errors

**Admin access not working:**
- Try different access methods
- Clear browser cache
- Check browser console for errors

## 🎉 Success!

You now have:
- ✅ **Local development environment** working
- ✅ **Code on GitHub** with version control
- ✅ **Production deployment** live on the web
- ✅ **PWA capabilities** for mobile users
- ✅ **Admin dashboard** for content management

**Your VocabMaster language learning app is live and ready for users!** 🌟

## 📞 Need Help?

- **GitHub Issues:** Create issues in your repository
- **Documentation:** Check `/DEPLOYMENT_GUIDE.md` 
- **Community:** Share your app and get feedback!

**Happy language learning!** 🎮📚🌍