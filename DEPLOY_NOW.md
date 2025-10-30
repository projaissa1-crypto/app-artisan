# 🚀 نشر المشروع على Vercel - خطوة بخطوة

## 📋 الخطوات الكاملة (اتبعها بالترتيب)

---

## الخطوة 1: إنشاء حساب GitHub (5 دقائق)

### 1. اذهب إلى GitHub
افتح المتصفح واذهب إلى: **https://github.com**

### 2. سجل حساب جديد
- اضغط **Sign up** (في الأعلى يمين)
- أدخل:
  - **Email:** بريدك الإلكتروني
  - **Password:** كلمة مرور قوية (احفظها!)
  - **Username:** اسم مستخدم (مثل: `moroccan-artisan`)
- اضغط **Create account**
- تحقق من بريدك الإلكتروني وأدخل الكود

### 3. تم! ✅
الآن لديك حساب GitHub

---

## الخطوة 2: تثبيت GitHub Desktop (5 دقائق)

### 1. حمّل GitHub Desktop
اذهب إلى: **https://desktop.github.com**
- اضغط **Download for Windows**
- انتظر التحميل

### 2. ثبّت البرنامج
- افتح الملف المحمّل
- اضغط **Install**
- انتظر التثبيت

### 3. سجل الدخول
- افتح GitHub Desktop
- اضغط **Sign in to GitHub.com**
- أدخل بريدك وكلمة المرور
- اضغط **Authorize desktop**

### 4. تم! ✅
GitHub Desktop جاهز

---

## الخطوة 3: رفع المشروع على GitHub (3 دقائق)

### 1. في GitHub Desktop:
- اضغط **File** > **Add local repository**
- اضغط **Choose...** واختر مجلد: `D:\app electre`
- إذا ظهرت رسالة "not a Git repository":
  - اضغط **create a repository**
  - Name: `moroccan-artisan-platform`
  - اضغط **Create repository**

### 2. Commit الملفات:
- في GitHub Desktop، سترى جميع الملفات
- في الأسفل:
  - **Summary:** `Initial commit - Complete platform`
  - **Description:** `Full-stack Moroccan Artisan Platform with mobile support`
- اضغط **Commit to main**

### 3. Publish على GitHub:
- اضغط **Publish repository** (في الأعلى)
- اختر:
  - **Name:** `moroccan-artisan-platform`
  - **Description:** `Platform for Moroccan artisans to manage projects`
  - ✅ اترك "Keep this code private" مفعّل (إذا أردت خاص)
  - أو أزله (إذا أردت عام)
- اضغط **Publish repository**

### 4. تم! ✅
المشروع الآن على GitHub!

---

## الخطوة 4: إنشاء حساب Vercel (3 دقائق)

### 1. اذهب إلى Vercel
افتح المتصفح: **https://vercel.com**

### 2. سجل باستخدام GitHub
- اضغط **Sign Up** (في الأعلى يمين)
- اختر **Continue with GitHub**
- اضغط **Authorize Vercel**
- تم! ✅ حساب Vercel جاهز

---

## الخطوة 5: نشر Backend (5 دقائق)

### 1. في Vercel Dashboard:
- اضغط **Add New...** > **Project**
- ستظهر قائمة repositories من GitHub
- ابحث عن: `moroccan-artisan-platform`
- اضغط **Import**

### 2. إعدادات Backend:
- **Framework Preset:** اختر `Other`
- **Root Directory:** اضغط **Edit** واختر `backend`
- **Build Command:** اتركه فارغ أو ضع `npm install`
- **Output Directory:** اتركه فارغ
- **Install Command:** `npm install`

### 3. Environment Variables (مهم!):
اضغ **Environment Variables** وأضف:

```
PORT = 5000
JWT_SECRET = moroccan-artisan-platform-secret-key-2025-production
NODE_ENV = production
```

### 4. Deploy:
- اضغط **Deploy**
- انتظر 2-3 دقائق
- ✅ Backend منشور!

### 5. احفظ الرابط:
بعد النشر، ستحصل على رابط مثل:
```
https://moroccan-artisan-platform-backend.vercel.app
```
**احفظه! سنحتاجه للخطوة التالية**

---

## الخطوة 6: تعديل Frontend للاتصال بـ Backend (دقيقتان)

### 1. افتح ملف API Client:
افتح: `frontend/lib/api/client.ts`

### 2. عدّل API_URL:
غيّر السطر:
```typescript
const API_URL = 'http://localhost:5000/api';
```

إلى:
```typescript
const API_URL = 'https://moroccan-artisan-platform-backend.vercel.app/api';
```
(استخدم الرابط الذي حصلت عليه من الخطوة 5)

### 3. احفظ الملف

### 4. Commit التغيير:
في GitHub Desktop:
- سترى التغيير في `client.ts`
- Summary: `Update API URL for production`
- اضغط **Commit to main**
- اضغط **Push origin** (في الأعلى)

---

## الخطوة 7: نشر Frontend (5 دقائق)

### 1. في Vercel Dashboard:
- اضغط **Add New...** > **Project**
- اختر `moroccan-artisan-platform` مرة أخرى
- اضغط **Import**

### 2. إعدادات Frontend:
- **Framework Preset:** اختر `Next.js`
- **Root Directory:** اضغط **Edit** واختر `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (تلقائي)
- **Install Command:** `npm install`

### 3. Environment Variables:
اضغ **Environment Variables** وأضف:

```
NEXT_PUBLIC_API_URL = https://moroccan-artisan-platform-backend.vercel.app/api
```

### 4. Deploy:
- اضغط **Deploy**
- انتظر 3-5 دقائق
- ✅ Frontend منشور!

### 5. احفظ الرابط:
ستحصل على رابط مثل:
```
https://moroccan-artisan-platform.vercel.app
```

---

## ✅ تم النشر! 🎉

### اختبر الآن:

1. **افتح الرابط:**
```
https://moroccan-artisan-platform.vercel.app
```

2. **سجل الدخول:**
- Email: `admin@artisan.ma`
- Password: `admin123`

3. **جرب الميزات:**
- إنشاء مشروع ✅
- إضافة مواد ✅
- تصدير ✅

---

## 📱 للحرفيين على الهاتف:

### Android:
1. افتح الرابط في Chrome
2. القائمة (⋮) > "إضافة إلى الشاشة الرئيسية"
3. ✅ التطبيق على الشاشة الرئيسية!

### iPhone:
1. افتح الرابط في Safari
2. زر المشاركة (⬆️) > "Add to Home Screen"
3. ✅ التطبيق على الشاشة الرئيسية!

---

## 🔧 إذا واجهت مشاكل:

### مشكلة: Backend لا يعمل
**الحل:**
1. في Vercel Dashboard > اختر مشروع Backend
2. Settings > Environment Variables
3. تأكد من وجود `PORT` و `JWT_SECRET`
4. Deployments > اضغط على آخر deployment > Redeploy

### مشكلة: Frontend لا يتصل بـ Backend
**الحل:**
1. تأكد من تعديل `client.ts` بالرابط الصحيح
2. تأكد من Push التغييرات على GitHub
3. في Vercel > Frontend project > Deployments > Redeploy

### مشكلة: CORS Error
**الحل:**
في `backend/src/server.js`، تأكد من:
```javascript
app.use(cors({
  origin: '*', // أو ضع رابط Frontend
  credentials: true
}));
```

---

## 📊 ملخص الروابط

بعد النشر، احفظ هذه الروابط:

### Backend:
```
https://moroccan-artisan-platform-backend.vercel.app
```

### Frontend (للمستخدمين):
```
https://moroccan-artisan-platform.vercel.app
```

### GitHub Repository:
```
https://github.com/YOUR-USERNAME/moroccan-artisan-platform
```

---

## 🎯 التحديثات المستقبلية

عند تعديل الكود:

1. **عدّل الملفات** في VS Code
2. **في GitHub Desktop:**
   - Commit التغييرات
   - Push origin
3. **Vercel ينشر تلقائياً!** ✅

لا حاجة لإعادة النشر يدوياً!

---

## ✨ النتيجة النهائية

✅ المشروع منشور على الإنترنت  
✅ يعمل على جميع الأجهزة  
✅ الحرفيون يمكنهم استخدامه  
✅ تحديثات تلقائية  
✅ مجاني 100%  

**مبروك! المنصة الآن حية! 🎉**

---

**الوقت الإجمالي:** 20-30 دقيقة  
**التكلفة:** مجاني  
**الصعوبة:** سهل جداً  
**النتيجة:** منصة احترافية منشورة! 🚀
