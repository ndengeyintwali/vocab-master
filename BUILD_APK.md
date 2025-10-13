# Build APK for Google Play

## Your Debug APK Location

You currently have a debug APK at:
```
android\app\build\intermediates\apk\debug\app-debug.apk
```

This works for testing but NOT for Google Play Store.

## Option 1: Build via Command Line (Easiest)

Open Command Prompt in your project folder and run:

```bash
cd android
gradlew bundleRelease
```

The AAB will be at: `android\app\build\outputs\bundle\release\app-release.aab`

## Option 2: Build in Android Studio (Signed)

1. **Build** → **Generate Signed Bundle / APK**
2. Choose **Android App Bundle**
3. **Create new keystore**:
   - Path: `C:\Users\TheGym\vocabmaster-keystore.jks`
   - Password: (create and save it!)
   - Alias: `vocabmaster`
4. Click **Next** → **release** → **Finish**

## Option 3: Use Debug APK for Testing

Your debug APK is ready at:
```
C:\Users\TheGym\Desktop\vocab master latest version\android\app\build\intermediates\apk\debug\app-debug.apk
```

You can:
- Install it on your phone to test
- Share with friends for testing
- But CANNOT upload to Google Play (needs signed release)

## Quick Test on Phone

1. Copy `app-debug.apk` to your phone
2. Open it on your phone
3. Allow "Install from unknown sources"
4. Install and test!

## For Google Play Store

You MUST use Option 1 or 2 to create a signed release build.
