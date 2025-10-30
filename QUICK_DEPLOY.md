# ⚡ نشر سريع على Vercel - 5 خطوات فقط!

## 📋 الخطوات (20 دقيقة)

### 1️⃣ إنشاء حساب GitHub
- اذهب إلى: https://github.com
- اضغط **Sign up**
- أدخل بريدك وكلمة مرور
- تحقق من البريد
- ✅ تم!

---

### 2️⃣ تثبيت GitHub Desktop
- حمّل من: https://desktop.github.com
- ثبّت البرنامج
- سجل الدخول بحساب GitHub
- ✅ تم!

---

### 3️⃣ رفع المشروع على GitHub
في GitHub Desktop:
1. **File** > **Add local repository**
2. اختر مجلد: `D:\app electre`
3. إذا طلب "create repository" → اضغطه
4. **Commit to main** (في الأسفل)
5. **Publish repository** (في الأعلى)
6. ✅ تم!

---

### 4️⃣ إنشاء حساب Vercel
- اذهب إلى: https://vercel.com
- اضغط **Sign Up**
- اختر **Continue with GitHub**
- اضغط **Authorize Vercel**
- ✅ تم!

---

### 5️⃣ نشر المشروع

#### نشر Backend:
1. في Vercel: **Add New** > **Project**
2. اختر `moroccan-artisan-platform`
3. **Root Directory:** اختر `backend`
4. **Environment Variables:** أضف:
   ```
   PORT = 5000
   JWT_SECRET = your-secret-key-here
   ```
5. **Deploy**
6. احفظ الرابط! (مثل: `https://xxx-backend.vercel.app`)

#### تعديل Frontend:
1. افتح `frontend/lib/api/client.ts`
2. غيّر:
   ```typescript
   const API_URL = 'https://xxx-backend.vercel.app/api';
   ```
3. احفظ
4. في GitHub Desktop: **Commit** ثم **Push**

#### نشر Frontend:
1. في Vercel: **Add New** > **Project**
2. اختر `moroccan-artisan-platform` مرة أخرى
3. **Root Directory:** اختر `frontend`
4. **Framework:** Next.js
5. **Deploy**
6. احفظ الرابط! (مثل: `https://xxx.vercel.app`)

---

## ✅ تم النشر! 🎉

### الرابط النهائي:
```
https://your-app.vercel.app
```

### اختبر:
- افتح الرابط
- سجل دخول: `admin@artisan.ma` / `admin123`
- ✅ يعمل!

### شارك مع الحرفيين:
- أرسل الرابط
- علّمهم: "إضافة إلى الشاشة الرئيسية"
- ✅ يستخدمونه كتطبيق!

---

## 📞 مشاكل؟

راجع: `DEPLOY_NOW.md` للتفاصيل الكاملة

---

**الوقت:** 20 دقيقة  
**التكلفة:** مجاني  
**النتيجة:** منصة منشورة! 🚀
