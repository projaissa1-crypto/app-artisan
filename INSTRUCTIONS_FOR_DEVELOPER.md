# 👨‍💻 Instructions for Developer - Mobile App Conversion

## Project Overview

This is a **Moroccan Artisan Platform** built with:
- **Frontend:** Next.js 14 + TypeScript + TailwindCSS
- **Backend:** Express.js + LowDB
- **Mobile:** Capacitor (already configured!)

**Goal:** Convert to native Android/iOS apps and publish to app stores.

---

## ✅ What's Already Done

- ✅ Capacitor installed and configured
- ✅ `capacitor.config.ts` created
- ✅ `next.config.js` modified for static export
- ✅ Package scripts added
- ✅ All dependencies installed

**The project is 90% ready!** You just need to build and publish.

---

## 🚀 Quick Start

### 1. Clone/Download the Project

```bash
git clone [repository-url]
cd "app electre"
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Test the Web App

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Open: http://localhost:3000

**Test credentials:**
- Admin: `admin@artisan.ma` / `admin123`
- Artisan: `artisan@artisan.ma` / `artisan123`

---

## 📱 Build Mobile Apps

### Android

#### Step 1: Build and Add Android Platform

```bash
cd frontend

# Build the project
npm run build

# Add Android platform
npm run cap:add:android

# Sync files
npm run cap:sync
```

#### Step 2: Open in Android Studio

```bash
npm run cap:open:android
```

Wait for Gradle sync to complete.

#### Step 3: Build APK

In Android Studio:
1. Build > Generate Signed Bundle / APK
2. Choose APK
3. Create new keystore (save it securely!)
4. Build release APK

Or via command line:
```bash
cd android
./gradlew assembleRelease
```

**Output:** `android/app/build/outputs/apk/release/app-release.apk`

#### Step 4: Test on Device

1. Enable USB Debugging on phone
2. Connect phone via USB
3. Click Run (▶️) in Android Studio
4. Test all features

---

### iOS (Mac only)

#### Step 1: Build and Add iOS Platform

```bash
cd frontend

# Build the project
npm run build

# Add iOS platform
npm run cap:add:ios

# Sync files
npm run cap:sync
```

#### Step 2: Open in Xcode

```bash
npm run cap:open:ios
```

#### Step 3: Configure Signing

1. Select project in Xcode
2. Go to Signing & Capabilities
3. Select your Team
4. Xcode will handle provisioning

#### Step 4: Build for App Store

1. Product > Archive
2. Distribute App
3. App Store Connect
4. Upload

---

## 🎨 Customization

### App Icon

Replace icons in:
```
android/app/src/main/res/
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
└── mipmap-xxxhdpi/ic_launcher.png (192x192)

ios/App/App/Assets.xcassets/AppIcon.appiconset/
```

Use: https://icon.kitchen/ to generate all sizes

### App Name

**Android:** `android/app/src/main/res/values/strings.xml`
```xml
<string name="app_name">منصة الحرفيين</string>
```

**iOS:** In Xcode, select project > General > Display Name

### Colors

**Android:** `android/app/src/main/res/values/styles.xml`
```xml
<item name="colorPrimary">#3b82f6</item>
```

**iOS:** In Xcode, Assets.xcassets > Colors

---

## 📦 Publishing

### Google Play Store

#### Requirements:
- Google Play Developer account ($25 one-time)
- Signed APK
- App icon (512x512)
- Screenshots (at least 2)
- Feature graphic (1024x500)

#### Steps:
1. Go to: https://play.google.com/console
2. Create App
3. Fill Store Listing:
   - **Name:** منصة الحرفيين المغاربة
   - **Category:** Business
   - **Description:** See below
4. Upload APK to Production
5. Submit for review (1-3 days)

**App Description:**
```
منصة الحرفيين المغاربة - تطبيق شامل لإدارة المشاريع والمواد

✨ الميزات:
• إدارة المشاريع بسهولة
• إضافة وتتبع المواد
• حساب التكاليف تلقائياً
• تصدير لوائح المواد (JSON/CSV)
• دعم كامل للعربية والفرنسية

مثالي للكهربائيين، السباكين، والحرفيين من جميع التخصصات!
```

---

### Apple App Store

#### Requirements:
- Apple Developer account ($99/year)
- Mac with Xcode
- App Store Connect access

#### Steps:
1. Go to: https://appstoreconnect.apple.com
2. Create new app
3. Fill app information
4. Upload build from Xcode
5. Submit for review (1-7 days)

---

## 🔧 Configuration Files

### capacitor.config.ts
```typescript
{
  appId: 'com.artisan.platform',
  appName: 'منصة الحرفيين',
  webDir: 'out',
}
```

### next.config.js
```javascript
{
  output: 'export',  // Static export
  images: { unoptimized: true },
  trailingSlash: true,
}
```

---

## 🧪 Testing Checklist

Before publishing, test:
- [ ] Login/Logout
- [ ] Create project
- [ ] Add materials
- [ ] Edit quantities/prices
- [ ] Export data (JSON/CSV)
- [ ] Language switching (AR/FR)
- [ ] Admin dashboard
- [ ] All CRUD operations

---

## 🐛 Common Issues

### Issue: White screen on app launch
**Solution:** Check that `webDir: 'out'` in capacitor.config.ts

### Issue: Can't connect to backend
**Solution:** Update API URL in `frontend/lib/api/client.ts`

For production, use your deployed backend URL:
```typescript
const API_URL = 'https://your-backend-url.com/api';
```

### Issue: Gradle build fails
**Solution:**
```bash
cd android
./gradlew clean
./gradlew build
```

---

## 📊 Project Structure

```
app electre/
├── backend/          # Express.js API
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── models/   # Data models
│   │   └── server.js
│   └── data/db.json  # LowDB database
│
└── frontend/         # Next.js app
    ├── app/          # Pages
    ├── components/   # UI components
    ├── lib/          # API clients & i18n
    ├── capacitor.config.ts
    ├── android/      # (generated)
    └── ios/          # (generated)
```

---

## 🔐 Security Notes

1. **Change JWT_SECRET** in production (`backend/.env`)
2. **Use HTTPS** for production backend
3. **Secure the keystore** file (never commit to git)
4. **Update default passwords** before publishing

---

## 📞 Support

### Documentation Files:
- `ANDROID_APP_GUIDE.md` - Detailed Android guide
- `MOBILE_APP_GUIDE.md` - All mobile options
- `DEPLOYMENT.md` - Backend deployment
- `README.md` - Full project documentation

### Useful Links:
- Capacitor Docs: https://capacitorjs.com/docs
- Android Studio: https://developer.android.com/studio
- Xcode: https://developer.apple.com/xcode/

---

## 💰 Estimated Time & Cost

### Time:
- **Setup & Build:** 2-3 hours
- **Testing:** 4-6 hours
- **Publishing:** 2-3 hours
- **Review waiting:** 1-7 days
- **Total:** 3-5 days

### Cost:
- **Google Play:** $25 (one-time)
- **Apple Developer:** $99/year
- **Total:** $124

---

## ✅ Deliverables

Please provide:
1. ✅ Signed APK for Android
2. ✅ IPA file for iOS (if applicable)
3. ✅ App Store links after publishing
4. ✅ Keystore file (securely)
5. ✅ Any credentials used

---

## 🎯 Success Criteria

The app should:
- ✅ Work on Android 8.0+
- ✅ Work on iOS 13.0+
- ✅ All features functional
- ✅ No crashes
- ✅ Published on stores
- ✅ Downloadable by users

---

**Good luck! The project is well-prepared and should be straightforward to build and publish.** 🚀

---

**Project Status:** ✅ Ready for mobile conversion  
**Capacitor Setup:** ✅ Complete  
**Estimated Difficulty:** Easy to Medium  
**Last Updated:** October 28, 2025
