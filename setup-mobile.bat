@echo off
echo ========================================
echo VocabMaster Mobile App Setup
echo ========================================
echo.

echo Step 1: Building web app...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Please fix errors and try again.
    pause
    exit /b %errorlevel%
)
echo ✓ Build complete!
echo.

echo Step 2: Initializing Capacitor...
call npx cap init "VocabMaster" "com.vocabmaster.app" --web-dir=dist
echo ✓ Capacitor initialized!
echo.

echo Step 3: Adding Android platform...
call npx cap add android
if %errorlevel% neq 0 (
    echo Android platform already added or error occurred.
)
echo ✓ Android platform ready!
echo.

echo Step 4: Syncing files to Android...
call npx cap sync android
echo ✓ Files synced!
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Open Android Studio: npx cap open android
echo 2. Wait for Gradle sync
echo 3. Click Run to test on device/emulator
echo.
echo For iOS (Mac only):
echo 1. Run: npx cap add ios
echo 2. Run: npx cap open ios
echo.
pause
