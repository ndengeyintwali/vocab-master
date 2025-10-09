# Fix Gradle Download Timeout

## Problem
Gradle download times out due to slow/unstable internet connection.

## Solution 1: Manual Download (Fastest)

1. **Download Gradle manually**:
   - Go to: https://services.gradle.org/distributions/gradle-8.11.1-all.zip
   - Or use mirror: https://gradle.org/releases/
   - Save the file (it's about 150MB)

2. **Place in Gradle cache**:
   - Windows: `C:\Users\YourUsername\.gradle\wrapper\dists\gradle-8.11.1-all\`
   - Create folder if it doesn't exist
   - Copy the downloaded zip file there

3. **Retry in Android Studio**:
   - Click "Sync Project with Gradle Files"
   - It will use the local file instead of downloading

## Solution 2: Use Lower Gradle Version

Edit: `android/gradle/wrapper/gradle-wrapper.properties`

Change:
```
distributionUrl=https\://services.gradle.org/distributions/gradle-8.11.1-all.zip
```

To:
```
distributionUrl=https\://services.gradle.org/distributions/gradle-8.7-all.zip
```

Then sync again in Android Studio.

## Solution 3: Increase Timeout

Add to `android/gradle.properties`:
```
systemProp.org.gradle.internal.http.connectionTimeout=180000
systemProp.org.gradle.internal.http.socketTimeout=180000
```

## Solution 4: Use PWABuilder Instead (Easiest!)

Skip Android Studio completely:

1. Deploy your app to Netlify (already done)
2. Go to https://www.pwabuilder.com
3. Enter your Netlify URL
4. Click "Package for Stores"
5. Download Android package
6. Upload directly to Google Play Console

**This is the easiest way to get your app on Google Play!**

## Recommended: Use PWABuilder

Since you're having network issues, I recommend using PWABuilder:
- ✅ No Android Studio needed
- ✅ No Gradle downloads
- ✅ No local build required
- ✅ Just upload your Netlify URL
- ✅ Get store-ready APK in minutes

Your app is already a PWA, so PWABuilder will work perfectly!
