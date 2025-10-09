# Convert to Mobile App (iOS & Android)

## Option 1: Capacitor (Recommended - Native Apps)

### Setup Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios
npx cap init
```

When prompted:
- App name: `VocabMaster`
- App ID: `com.vocabmaster.app`
- Web directory: `dist`

### Build for Android

```bash
# Build web app
npm run build

# Add Android platform
npx cap add android

# Sync files
npx cap sync android

# Open in Android Studio
npx cap open android
```

In Android Studio:
1. Wait for Gradle sync
2. Click "Build" → "Generate Signed Bundle/APK"
3. Follow wizard to create keystore and sign APK
4. Upload APK to Google Play Console

### Build for iOS

```bash
# Build web app
npm run build

# Add iOS platform
npx cap add ios

# Sync files
npx cap sync ios

# Open in Xcode
npx cap open ios
```

In Xcode:
1. Select your development team
2. Configure signing & capabilities
3. Click "Product" → "Archive"
4. Upload to App Store Connect

## Option 2: PWA (Progressive Web App - Easier)

Your app is already a PWA! Users can install it directly from the browser:

### Android (Chrome)
1. Visit your website
2. Tap menu (⋮) → "Install app" or "Add to Home Screen"
3. App installs like a native app

### iOS (Safari)
1. Visit your website
2. Tap Share button
3. Tap "Add to Home Screen"
4. App appears on home screen

## Option 3: PWABuilder (Convert PWA to Store Apps)

1. Go to https://www.pwabuilder.com
2. Enter your deployed URL (Netlify/Vercel)
3. Click "Start"
4. Download Android Package (for Google Play)
5. Download iOS Package (for App Store)
6. Upload to respective stores

## Google Play Store Requirements

- **Developer Account**: $25 one-time fee
- **App Requirements**:
  - Privacy Policy URL
  - App icon (512x512px)
  - Screenshots (phone & tablet)
  - Feature graphic (1024x500px)
  - Short description (80 chars)
  - Full description (4000 chars)
  - Content rating questionnaire

## Apple App Store Requirements

- **Developer Account**: $99/year
- **App Requirements**:
  - Privacy Policy URL
  - App icon (1024x1024px)
  - Screenshots (various sizes)
  - App preview video (optional)
  - Description (4000 chars)
  - Keywords
  - Support URL
  - Marketing URL (optional)

## Recommended Approach

**For Quick Launch**: Use PWA (Option 2)
- ✅ No app store approval needed
- ✅ Instant updates
- ✅ Works on all platforms
- ✅ Already implemented in your app

**For Full Native Experience**: Use Capacitor (Option 1)
- ✅ Access to native device features
- ✅ Better performance
- ✅ App store presence
- ⚠️ Requires developer accounts
- ⚠️ App store review process (1-7 days)

**For Easiest Store Submission**: Use PWABuilder (Option 3)
- ✅ Converts PWA to store-ready packages
- ✅ No native code needed
- ✅ Automated process
- ⚠️ Still requires developer accounts

## Next Steps

1. **Deploy to Netlify/Vercel** (get a live URL)
2. **Test PWA installation** on your phone
3. **If satisfied with PWA**: Share the URL, users can install
4. **If want app stores**: Choose Capacitor or PWABuilder
5. **Register developer accounts** (Google Play & Apple)
6. **Prepare store assets** (icons, screenshots, descriptions)
7. **Submit for review**

## Important Notes

- **Privacy Policy**: Required for both stores. Create one at https://www.privacypolicygenerator.info
- **Testing**: Test thoroughly on real devices before submitting
- **Updates**: PWA updates instantly, native apps need store approval
- **Monetization**: Consider in-app purchases or ads if needed
