# 📱 Capacitor Setup for App Store Distribution

Capacitor allows you to deploy your VocabMaster PWA to iOS and Android app stores while maintaining your existing web codebase.

## 🚀 Quick Setup

### 1. Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
```

### 2. Initialize Capacitor

```bash
npx cap init VocabMaster com.yourcompany.vocabmaster --web-dir=build
```

### 3. Add Platforms

```bash
npx cap add ios
npx cap add android
```

### 4. Build and Sync

```bash
# Build your React app
npm run build

# Copy web assets to native projects
npx cap sync

# Open in native IDEs
npx cap open ios      # Requires Xcode (macOS only)
npx cap open android  # Requires Android Studio
```

## 📋 Configuration Files

### capacitor.config.ts
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.vocabmaster',
  appName: 'VocabMaster',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#3b82f6",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#000000",
    },
    Keyboard: {
      resize: "body",
      style: "DARK",
      resizeOnFullScreen: true,
    },
    Haptics: {},
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    }
  }
};

export default config;
```

## 📱 Platform-Specific Features

### Install Additional Plugins

```bash
# For notifications
npm install @capacitor/local-notifications @capacitor/push-notifications

# For device features
npm install @capacitor/haptics @capacitor/status-bar @capacitor/splash-screen

# For app info
npm install @capacitor/app @capacitor/device

# For storage
npm install @capacitor/preferences
```

### Update App with Native Features

```typescript
// Add to your React components
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

// Haptic feedback
const triggerHaptic = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};

// Local notifications
const scheduleNotification = async () => {
  await LocalNotifications.schedule({
    notifications: [
      {
        title: "Daily Challenge",
        body: "Complete today's vocabulary challenge!",
        id: 1,
        schedule: { at: new Date(Date.now() + 1000 * 5) },
        sound: null,
        attachments: null,
        actionTypeId: "",
        extra: null
      }
    ]
  });
};

// Status bar
const setStatusBar = async () => {
  await StatusBar.setStyle({ style: Style.Dark });
  await StatusBar.setBackgroundColor({ color: '#000000' });
};
```

## 🍎 iOS App Store Preparation

### 1. Xcode Configuration
- Open `ios/App/App.xcworkspace` in Xcode
- Set your development team
- Configure app icons and launch screens
- Set deployment target (iOS 13.0+)

### 2. App Store Connect
- Create app listing in App Store Connect
- Upload screenshots (required sizes)
- Set app metadata and description
- Configure pricing and availability

### 3. Privacy Configuration
Add to `ios/App/App/Info.plist`:
```xml
<key>NSUserTrackingUsageDescription</key>
<string>This app uses tracking to provide personalized learning experiences.</string>
<key>NSCameraUsageDescription</key>
<string>Camera access is used for profile pictures.</string>
```

## 🤖 Android Play Store Preparation

### 1. Android Studio Configuration
- Open `android` folder in Android Studio
- Set signing configuration
- Update `android/app/build.gradle`
- Generate signed APK/AAB

### 2. Play Console
- Create app in Google Play Console
- Upload APK/AAB file
- Set app details and description
- Configure content rating

### 3. Permissions
Update `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

## 🔄 Build Commands

### Development
```bash
# Live reload for development
npx cap run ios --livereload --external
npx cap run android --livereload --external
```

### Production
```bash
# Build for production
npm run build
npx cap sync

# iOS
npx cap build ios

# Android  
npx cap build android --prod
```

## 📊 Store Assets Required

### Icons (iOS)
- 1024x1024 (App Store)
- 180x180 (iPhone)
- 167x167 (iPad Pro)
- 152x152 (iPad)
- 120x120 (iPhone)
- 87x87 (iPhone)
- 80x80 (iPad)
- 76x76 (iPad)
- 60x60 (iPhone)
- 58x58 (iPhone)
- 40x40 (iPad)
- 29x29 (iPhone/iPad)
- 20x20 (iPad)

### Icons (Android)
- 512x512 (Play Store)
- 192x192 (xxxhdpi)
- 144x144 (xxhdpi)
- 96x96 (xhdpi)
- 72x72 (hdpi)
- 48x48 (mdpi)

### Screenshots
- iPhone: 6.7", 6.5", 5.5"
- iPad: 12.9", 11"
- Android Phone: Various sizes
- Android Tablet: 10" screens

## 🎯 Performance Tips

### 1. Optimize Bundle Size
```bash
# Analyze bundle
npm install --save-dev webpack-bundle-analyzer
npm run build -- --analyze
```

### 2. Enable Tree Shaking
- Remove unused imports
- Use dynamic imports for large features
- Optimize images and assets

### 3. Native Performance
- Use native UI components where possible
- Implement lazy loading
- Cache critical resources

## 🔧 Troubleshooting

### Common iOS Issues
- Code signing errors: Check development team
- Build failures: Clean derived data
- Simulator issues: Reset simulator

### Common Android Issues
- Gradle sync failures: Update Gradle version
- Build errors: Check SDK versions
- Emulator issues: Wipe emulator data

## 📈 Analytics & Monitoring

### Add Crash Reporting
```bash
npm install @capacitor-community/firebase-crashlytics
```

### Add Analytics
```bash
npm install @capacitor-community/firebase-analytics
```

## 🚀 Ready to Deploy!

Your VocabMaster app is now ready for app store distribution with:
- ✅ Native mobile app wrapper
- ✅ Platform-specific optimizations  
- ✅ App store requirements met
- ✅ Native device features integrated
- ✅ Performance optimized

Run the setup commands and your language learning game will be available on both iOS and Android app stores!