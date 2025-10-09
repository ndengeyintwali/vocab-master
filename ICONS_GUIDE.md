# App Icons & Splash Screens Guide

## Quick Icon Generator

Use this free tool to generate all required icon sizes:
👉 **https://www.appicon.co**

1. Upload a 1024x1024px PNG image (your app logo)
2. Select "Android" and "iOS"
3. Download the generated files
4. Extract and place in the correct folders

## Required Icon Sizes

### Android Icons
Place in: `android/app/src/main/res/`

- `mipmap-mdpi/ic_launcher.png` (48x48)
- `mipmap-hdpi/ic_launcher.png` (72x72)
- `mipmap-xhdpi/ic_launcher.png` (96x96)
- `mipmap-xxhdpi/ic_launcher.png` (144x144)
- `mipmap-xxxhdpi/ic_launcher.png` (192x192)

### iOS Icons
Place in: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

Multiple sizes from 20x20 to 1024x1024

## Splash Screen

### Android
Place in: `android/app/src/main/res/drawable/`
- `splash.png` (2732x2732px, centered logo on colored background)

### iOS
Place in: `ios/App/App/Assets.xcassets/Splash.imageset/`
- `splash.png` (2732x2732px)

## Design Tips

✅ Use simple, recognizable logo
✅ Avoid text (hard to read at small sizes)
✅ Use solid background color
✅ Center your logo
✅ Leave padding around edges
✅ Test on different screen sizes

## Recommended Design

For VocabMaster:
- Background: Purple gradient (#8B5CF6 to #6366F1)
- Icon: Globe 🌐 or Book 📚 symbol
- Style: Flat, modern, colorful
- Format: PNG with transparency

## Free Design Tools

- **Canva**: https://www.canva.com (easy templates)
- **Figma**: https://www.figma.com (professional)
- **GIMP**: https://www.gimp.org (free Photoshop alternative)

## After Adding Icons

Run these commands to update the apps:
```bash
npm run build
npx cap sync
```

Then rebuild in Android Studio or Xcode.
