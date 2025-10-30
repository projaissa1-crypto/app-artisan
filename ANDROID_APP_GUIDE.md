# 📱 دليل تحويل المنصة إلى تطبيق Android

## 🎯 الهدف
تحويل منصة الحرفيين إلى **تطبيق Android** يمكن تحميله من **Google Play Store**

---

## ⏱️ الوقت المتوقع
- **الإعداد:** 2-3 ساعات
- **الاختبار:** 1 يوم
- **النشر:** 2-3 أيام (مراجعة Google)
- **الإجمالي:** أسبوع واحد

---

## 💰 التكلفة
- **Google Play Developer Account:** $25 (مرة واحدة فقط)
- **باقي الأدوات:** مجانية

---

## 🛠️ المتطلبات

### على جهازك:
1. ✅ Node.js 18+ (موجود بالفعل)
2. ✅ المشروع يعمل (موجود بالفعل)
3. 📥 **Android Studio** - سنثبته الآن

---

## 📋 الخطوات الكاملة

### المرحلة 1: تثبيت Android Studio (30 دقيقة)

#### 1. تحميل Android Studio
1. اذهب إلى: https://developer.android.com/studio
2. اضغط **Download Android Studio**
3. قبل الشروط واضغط تحميل
4. **الحجم:** ~1 GB

#### 2. تثبيت Android Studio
1. شغّل الملف المحمّل
2. اتبع خطوات التثبيت (Next > Next > Install)
3. **المكان الافتراضي:** `C:\Program Files\Android\Android Studio`
4. انتظر التثبيت (~10 دقائق)

#### 3. إعداد Android Studio
1. افتح Android Studio لأول مرة
2. اختر **Standard Installation**
3. اختر Theme (فاتح أو داكن)
4. اضغط **Finish**
5. انتظر تحميل SDK Components (~15 دقيقة)

#### 4. تثبيت SDK
1. في Android Studio، افتح **SDK Manager**
   - File > Settings > Appearance & Behavior > System Settings > Android SDK
2. تأكد من تثبيت:
   - ✅ Android 13.0 (API 33)
   - ✅ Android SDK Build-Tools
   - ✅ Android SDK Platform-Tools
3. اضغط **Apply** ثم **OK**

---

### المرحلة 2: إعداد المشروع (15 دقيقة)

#### 1. تثبيت Capacitor

افتح Terminal في مجلد المشروع:

```bash
cd frontend

# تثبيت Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# تهيئة Capacitor
npx cap init
```

**عند السؤال:**
- **App name:** منصة الحرفيين
- **App package ID:** `com.artisan.platform`
- **Web asset directory:** `out`

#### 2. تعديل next.config.js

افتح `frontend/next.config.js` وعدّله:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // مهم جداً!
  images: {
    unoptimized: true,
  },
  // تعطيل trailing slashes
  trailingSlash: true,
};

module.exports = nextConfig;
```

#### 3. تعديل package.json

أضف هذه السكريبتات في `frontend/package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build",
    "cap:sync": "cap sync",
    "cap:open": "cap open android",
    "android": "npm run export && cap sync && cap open android"
  }
}
```

#### 4. إنشاء ملف capacitor.config.ts

أنشئ `frontend/capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.artisan.platform',
  appName: 'منصة الحرفيين',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    // للتطوير فقط - احذف في الإنتاج
    // url: 'http://192.168.1.100:3000',
    // cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'APK'
    }
  }
};

export default config;
```

---

### المرحلة 3: بناء التطبيق (10 دقائق)

```bash
cd frontend

# بناء المشروع
npm run build

# إضافة منصة Android
npx cap add android

# مزامنة الملفات
npx cap sync
```

**ملاحظة:** إذا ظهرت أخطاء، تجاهلها الآن. سنصلحها في Android Studio.

---

### المرحلة 4: فتح في Android Studio (5 دقائق)

```bash
# فتح المشروع في Android Studio
npx cap open android
```

**سيفتح Android Studio تلقائياً!**

انتظر حتى:
- ✅ Gradle Sync ينتهي (~5 دقائق أول مرة)
- ✅ Indexing ينتهي

---

### المرحلة 5: تشغيل التطبيق (أول اختبار)

#### الطريقة 1: على المحاكي (Emulator)

1. في Android Studio، اضغط **Device Manager** (أيقونة الهاتف)
2. اضغط **Create Device**
3. اختر **Pixel 5** أو أي جهاز
4. اختر **System Image:** Android 13 (API 33)
5. اضغط **Next** ثم **Finish**
6. انتظر تحميل النظام (~5 دقائق)
7. اضغط زر **Run** (▶️) الأخضر
8. اختر المحاكي
9. **انتظر التطبيق يفتح!** 🎉

#### الطريقة 2: على هاتفك الحقيقي (أفضل!)

1. **على الهاتف:**
   - اذهب إلى Settings > About Phone
   - اضغط على "Build Number" **7 مرات**
   - ارجع وافتح **Developer Options**
   - فعّل **USB Debugging**

2. **وصّل الهاتف بالكمبيوتر** (USB)

3. **على الهاتف:** اقبل "Allow USB Debugging"

4. **في Android Studio:**
   - اختر هاتفك من القائمة
   - اضغط **Run** (▶️)
   - **التطبيق سيفتح على هاتفك!** 🎉

---

### المرحلة 6: تخصيص التطبيق

#### 1. تغيير الأيقونة

**الأيقونة الحالية:** افتراضية من Capacitor

**لتغييرها:**

1. حضّر أيقونة **1024x1024** بصيغة PNG
2. استخدم أداة: https://icon.kitchen/
3. ارفع أيقونتك
4. حمّل الملف الناتج
5. استخرج في `frontend/android/app/src/main/res/`

**أو يدوياً:**

ضع الأيقونات في:
```
android/app/src/main/res/
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
└── mipmap-xxxhdpi/ic_launcher.png (192x192)
```

#### 2. تغيير اسم التطبيق

افتح `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">منصة الحرفيين</string>
    <string name="title_activity_main">منصة الحرفيين</string>
    <string name="package_name">com.artisan.platform</string>
    <string name="custom_url_scheme">com.artisan.platform</string>
</resources>
```

#### 3. تغيير الألوان

افتح `android/app/src/main/res/values/styles.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">#3b82f6</item>
        <item name="colorPrimaryDark">#2563eb</item>
        <item name="colorAccent">#3b82f6</item>
    </style>
</resources>
```

---

### المرحلة 7: بناء APK للنشر

#### 1. إنشاء Keystore (مفتاح التوقيع)

```bash
# في مجلد frontend
keytool -genkey -v -keystore artisan-release.keystore -alias artisan -keyalg RSA -keysize 2048 -validity 10000
```

**عند السؤال:**
- **Password:** اختر كلمة مرور قوية (احفظها!)
- **Name:** اسمك
- **Organization:** اسم الشركة
- **City, State, Country:** معلوماتك

**⚠️ مهم جداً:** احفظ الملف `artisan-release.keystore` وكلمة المرور في مكان آمن!

#### 2. تكوين Gradle للتوقيع

أنشئ ملف `android/key.properties`:

```properties
storePassword=كلمة_المرور_التي_اخترتها
keyPassword=كلمة_المرور_التي_اخترتها
keyAlias=artisan
storeFile=../../artisan-release.keystore
```

⚠️ **لا ترفع هذا الملف على Git!**

#### 3. تعديل build.gradle

افتح `android/app/build.gradle` وأضف قبل `android {`:

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    // ... الكود الموجود
    
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### 4. بناء APK

```bash
cd android
./gradlew assembleRelease

# أو على Windows
gradlew.bat assembleRelease
```

**الملف الناتج:**
```
android/app/build/outputs/apk/release/app-release.apk
```

**حجم متوقع:** 15-25 MB

---

### المرحلة 8: اختبار APK

#### على هاتفك:
1. انسخ `app-release.apk` إلى هاتفك
2. افتحه من File Manager
3. اقبل "Install from Unknown Sources"
4. ثبّت التطبيق
5. **جرّبه!** 🎉

#### اختبر:
- ✅ تسجيل الدخول
- ✅ إنشاء مشروع
- ✅ إضافة مواد
- ✅ التصدير
- ✅ تسجيل الخروج

---

### المرحلة 9: النشر على Google Play

#### 1. إنشاء حساب Google Play Developer

1. اذهب إلى: https://play.google.com/console
2. اضغط **Create Developer Account**
3. ادفع **$25** (مرة واحدة)
4. املأ معلوماتك
5. انتظر الموافقة (~48 ساعة)

#### 2. إنشاء تطبيق جديد

1. في Google Play Console، اضغط **Create App**
2. املأ:
   - **App name:** منصة الحرفيين المغاربة
   - **Default language:** العربية
   - **App or game:** App
   - **Free or paid:** Free
3. اقبل الشروط
4. اضغط **Create app**

#### 3. إعداد صفحة التطبيق

**Store Listing:**
- **App name:** منصة الحرفيين المغاربة
- **Short description:** منصة لإدارة مشاريع ومواد الحرفيين
- **Full description:**
```
منصة الحرفيين المغاربة هي تطبيق شامل لمساعدة الحرفيين على:

✨ إدارة المشاريع بسهولة
✨ إضافة وتتبع المواد
✨ حساب التكاليف تلقائياً
✨ تصدير لوائح المواد
✨ دعم كامل للغة العربية والفرنسية

مثالي للكهربائيين، السباكين، والحرفيين من جميع التخصصات!
```

**Screenshots:** (مطلوب على الأقل 2)
- خذ screenshots من التطبيق
- الحجم الموصى به: 1080x1920

**App icon:** (512x512)
- نفس أيقونة التطبيق

**Feature graphic:** (1024x500)
- صورة بانر للتطبيق

**Category:** Business أو Productivity

#### 4. رفع APK

1. اذهب إلى **Production** > **Create new release**
2. ارفع `app-release.apk`
3. املأ **Release notes:**
```
الإصدار 1.0.0
- إطلاق أول نسخة من التطبيق
- إدارة المشاريع والمواد
- دعم العربية والفرنسية
- تصدير البيانات
```
4. اضغط **Save** ثم **Review release**
5. اضغط **Start rollout to Production**

#### 5. انتظر المراجعة

- **الوقت:** 1-3 أيام عادةً
- **الحالة:** تابع في Play Console
- **الإشعارات:** ستصلك على البريد

#### 6. النشر! 🎉

بعد الموافقة:
- ✅ التطبيق متاح على Google Play
- ✅ يمكن للحرفيين تحميله
- ✅ رابط التطبيق: `https://play.google.com/store/apps/details?id=com.artisan.platform`

---

## 🔄 التحديثات المستقبلية

### عند تحديث التطبيق:

```bash
# 1. عدّل الكود في frontend
cd frontend

# 2. ابنِ المشروع
npm run build

# 3. زامن مع Android
npx cap sync

# 4. زد رقم الإصدار في android/app/build.gradle
# versionCode من 1 إلى 2
# versionName من "1.0.0" إلى "1.0.1"

# 5. ابنِ APK جديد
cd android
./gradlew assembleRelease

# 6. ارفع على Google Play
```

---

## 🎨 نصائح للنجاح

### 1. الأيقونة
- استخدم أيقونة احترافية وواضحة
- تجنب النصوص الصغيرة
- استخدم ألوان متناسقة

### 2. Screenshots
- خذ screenshots من صفحات مهمة
- أضف نصوص توضيحية
- استخدم هاتف حقيقي (ليس محاكي)

### 3. الوصف
- اكتب وصف واضح وجذاب
- استخدم نقاط (bullets)
- اذكر الميزات الرئيسية

### 4. الاختبار
- اختبر على أجهزة مختلفة
- اختبر جميع الميزات
- اطلب من أصدقاء التجربة

---

## ❓ مشاكل شائعة وحلولها

### المشكلة: Gradle Sync Failed
**الحل:**
```bash
cd android
./gradlew clean
./gradlew build
```

### المشكلة: App crashes on startup
**الحل:**
- تأكد من `output: 'export'` في next.config.js
- تأكد من `webDir: 'out'` في capacitor.config.ts

### المشكلة: White screen
**الحل:**
- افتح Chrome DevTools في المحاكي
- راجع Console للأخطاء
- تأكد من API URL صحيح

### المشكلة: Can't connect to backend
**الحل:**
في `capacitor.config.ts` للتطوير:
```typescript
server: {
  url: 'http://192.168.1.100:5000',  // IP جهازك
  cleartext: true
}
```

---

## ✅ قائمة التحقق النهائية

قبل النشر:

- [ ] التطبيق يعمل على المحاكي
- [ ] التطبيق يعمل على هاتف حقيقي
- [ ] جميع الميزات تعمل
- [ ] الأيقونة احترافية
- [ ] Screenshots جاهزة
- [ ] الوصف مكتوب
- [ ] APK موقّع
- [ ] اختبرت على أجهزة مختلفة
- [ ] حساب Google Play جاهز
- [ ] دفعت $25

---

## 🎉 النتيجة

بعد اتباع هذه الخطوات:

✅ تطبيق Android احترافي  
✅ متاح على Google Play Store  
✅ الحرفيون يحملونه بسهولة  
✅ تحديثات سهلة  
✅ نفس الكود للويب والموبايل  

---

## 📞 مساعدة إضافية

### موارد مفيدة:
- **Capacitor Docs:** https://capacitorjs.com/docs
- **Android Studio:** https://developer.android.com/studio/intro
- **Google Play Console:** https://support.google.com/googleplay/android-developer

### فيديوهات:
- "Capacitor Tutorial" على YouTube
- "Publishing to Google Play" على YouTube

---

**آخر تحديث:** 28 أكتوبر 2025  
**الحالة:** ✅ جاهز للتحويل إلى تطبيق Android
**الوقت المتوقع:** أسبوع واحد
**التكلفة:** $25 فقط
