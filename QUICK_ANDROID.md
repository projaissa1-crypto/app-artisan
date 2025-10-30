# ⚡ تحويل سريع إلى تطبيق Android

## 🎯 الهدف
تطبيق Android للحرفيين يحملونه من Google Play

---

## ⏱️ الوقت
**أسبوع واحد** (معظمه انتظار مراجعة Google)

---

## 💰 التكلفة
**$25** فقط (حساب Google Play Developer)

---

## 📋 الخطوات السريعة

### 1️⃣ ثبّت Android Studio (30 دقيقة)
```
https://developer.android.com/studio
```
حمّل وثبّت → Next → Next → Install

---

### 2️⃣ أضف Capacitor (5 دقائق)
```bash
cd frontend
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
```

**عند السؤال:**
- App name: `منصة الحرفيين`
- Package ID: `com.artisan.platform`
- Web dir: `out`

---

### 3️⃣ عدّل next.config.js
```javascript
const nextConfig = {
  output: 'export',  // مهم!
  images: { unoptimized: true },
};
```

---

### 4️⃣ ابنِ وأضف Android (10 دقائق)
```bash
npm run build
npx cap add android
npx cap sync
```

---

### 5️⃣ افتح في Android Studio
```bash
npx cap open android
```

انتظر Gradle Sync ينتهي (~5 دقائق)

---

### 6️⃣ شغّل على هاتفك

**على الهاتف:**
- Settings → About → اضغط Build Number 7 مرات
- Developer Options → فعّل USB Debugging
- وصّل USB بالكمبيوتر

**في Android Studio:**
- اختر هاتفك
- اضغط Run (▶️)
- **التطبيق يعمل!** 🎉

---

### 7️⃣ ابنِ APK للنشر

```bash
# أنشئ مفتاح التوقيع
keytool -genkey -v -keystore artisan-release.keystore -alias artisan -keyalg RSA -keysize 2048 -validity 10000

# ابنِ APK
cd android
./gradlew assembleRelease
```

**الملف:** `android/app/build/outputs/apk/release/app-release.apk`

---

### 8️⃣ انشر على Google Play

1. **أنشئ حساب:** https://play.google.com/console ($25)
2. **Create App** → املأ المعلومات
3. **ارفع APK** → Production → Upload
4. **انتظر المراجعة** (1-3 أيام)
5. **تم النشر!** 🎉

---

## ✅ النتيجة

✅ تطبيق Android احترافي  
✅ على Google Play Store  
✅ الحرفيون يحملونه بسهولة  

---

## 📚 للتفاصيل الكاملة

راجع: **`ANDROID_APP_GUIDE.md`** - دليل شامل خطوة بخطوة

---

**الوقت:** أسبوع واحد  
**التكلفة:** $25  
**الصعوبة:** متوسطة  
**النتيجة:** تطبيق احترافي! 🚀
