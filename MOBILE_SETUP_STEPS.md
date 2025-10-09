# Mobile App Setup - Step by Step

## Prerequisites

### For Android:
- Install [Android Studio](https://developer.android.com/studio)
- Install Java JDK 17 or higher

### For iOS (Mac only):
- Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) from Mac App Store
- Install Xcode Command Line Tools: `xcode-select --install`

## Step 1: Install Capacitor Dependencies

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios
```

## Step 2: Initialize Capacitor

```bash
npx cap init
```

When prompted, enter:
- **App name**: `VocabMaster`
- **App ID**: `com.vocabmaster.app`
- **Web directory**: `dist`

## Step 3: Build Your Web App

```bash
npm run build
```

## Step 4: Add Android Platform

```bash
npx cap add android
npx cap sync android
```

## Step 5: Open in Android Studio

```bash
npx cap open android
```

### In Android Studio:
1. Wait for Gradle sync to complete (first time takes 5-10 minutes)
2. Click "Build" → "Build Bundle(s) / APK(s)" → "Build APK(s)"
3. APK will be in: `android/app/build/outputs/apk/debug/app-debug.apk`
4. Install on your phone or upload to Google Play Console

## Step 6: Add iOS Platform (Mac only)

```bash
npx cap add ios
npx cap sync ios
```

## Step 7: Open in Xcode (Mac only)

```bash
npx cap open ios
```

### In Xcode:
1. Select your development team in "Signing & Capabilities"
2. Connect your iPhone or use simulator
3. Click the Play button to run
4. For App Store: Product → Archive → Distribute App

## Quick Commands Reference

```bash
# After making changes to web code
npm run build
npx cap sync

# Open Android Studio
npx cap open android

# Open Xcode (Mac only)
npx cap open ios

# Update native projects
npx cap sync
```

## Testing on Real Device

### Android:
1. Enable Developer Options on your phone
2. Enable USB Debugging
3. Connect phone via USB
4. In Android Studio, select your device and click Run

### iOS:
1. Connect iPhone via USB
2. Trust computer on iPhone
3. In Xcode, select your device and click Run

## App Icons & Splash Screens

Place your icons in:
- `android/app/src/main/res/` (various sizes)
- `ios/App/App/Assets.xcassets/` (various sizes)

Or use: https://www.appicon.co to generate all sizes

## Next Steps

1. ✅ Build web app: `npm run build`
2. ✅ Add platforms: `npx cap add android` and `npx cap add ios`
3. ✅ Open in IDE: `npx cap open android` or `npx cap open ios`
4. ✅ Test on device
5. ✅ Generate signed APK/IPA for stores
