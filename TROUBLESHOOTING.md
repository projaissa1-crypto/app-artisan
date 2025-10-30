# 🔧 حل المشاكل الشائعة | Troubleshooting Guide

## ❌ مشكلة: فشل تسجيل الدخول

### الأعراض
- لا يحدث شيء عند الضغط على "تسجيل الدخول"
- رسالة خطأ في Console
- الصفحة لا تتحول بعد تسجيل الدخول

### الحلول

#### 1. تحقق من أن Backend يعمل
```bash
# افتح Terminal وتحقق
curl http://localhost:5000/api/health
```

**النتيجة المتوقعة:**
```json
{"status":"ok","message":"Artisan Platform API is running"}
```

إذا لم يعمل:
```bash
cd backend
npm run dev
```

---

#### 2. تحقق من قاعدة البيانات
```bash
# تحقق من وجود الملف
ls backend/data/db.json

# إذا لم يكن موجودًا، أعد التهيئة
cd backend
npm run seed
```

---

#### 3. امسح Cache المتصفح
1. افتح Developer Tools (F12)
2. اذهب إلى Application > Storage
3. اضغط "Clear site data"
4. أعد تحميل الصفحة (Ctrl+Shift+R)

---

#### 4. تحقق من Console للأخطاء
1. افتح Developer Tools (F12)
2. اذهب إلى Console
3. ابحث عن أخطاء حمراء

**أخطاء شائعة:**

##### خطأ CORS
```
Access to XMLHttpRequest blocked by CORS policy
```

**الحل:**
```bash
# تحقق من backend/.env
cd backend
cat .env
# تأكد من: FRONTEND_URL=http://localhost:3000
```

##### خطأ Network
```
Failed to fetch / Network Error
```

**الحل:**
- تأكد من أن Backend يعمل على المنفذ 5000
- تحقق من الـ Firewall

---

#### 5. أعد تشغيل كل شيء
```bash
# أوقف جميع العمليات (Ctrl+C في كل Terminal)

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

---

#### 6. استخدم الحسابات الصحيحة

**Admin:**
- Email: `admin@artisan.ma`
- Password: `admin123`

**Artisan:**
- Email: `artisan@artisan.ma`
- Password: `artisan123`

⚠️ **ملاحظة:** الحسابات حساسة لحالة الأحرف!

---

## ❌ مشكلة: الصفحة بيضاء فارغة

### الحل
```bash
# امسح .next
cd frontend
rm -rf .next

# أعد التشغيل
npm run dev
```

---

## ❌ مشكلة: لوحة التحكم تظهر ثم تختفي

### الأعراض
- تظهر لوحة التحكم لجزء من الثانية ثم تختفي
- يتم التوجيه إلى صفحة تسجيل الدخول

### السبب
فحص الصلاحيات يحدث بعد عرض الصفحة

### الحل
✅ **تم إصلاحه!** الآن يظهر مؤشر تحميل أثناء فحص الصلاحيات.

إذا استمرت المشكلة:

1. **تأكد من تسجيل الدخول كـ Admin:**
   - Email: `admin@artisan.ma`
   - Password: `admin123`

2. **امسح localStorage:**
   ```bash
   # F12 > Application > Local Storage > Clear
   # ثم سجل الدخول مرة أخرى
   ```

3. **تحقق من Console:**
   ```bash
   # F12 > Console
   # ابحث عن أخطاء تتعلق بـ "role" أو "admin"
   ```

---

## ❌ مشكلة: خطأ "localStorage is not defined"

### السبب
Next.js يستخدم Server-Side Rendering

### الحل
✅ **تم إصلاحه!** الكود الآن يتحقق من `typeof window !== 'undefined'` قبل استخدام localStorage.

إذا استمرت المشكلة:
```bash
# أعد تشغيل Frontend
cd frontend
npm run dev
```

---

## ❌ مشكلة: المنفذ مستخدم

### الأعراض
```
Error: listen EADDRINUSE: address already in use :::5000
```

### الحل
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# ثم أعد التشغيل
cd backend
npm run dev
```

---

## ❌ مشكلة: خطأ في التبعيات

### الأعراض
```
Cannot find module 'xyz'
```

### الحل
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## ❌ مشكلة: البيانات لا تظهر

### الحل
```bash
# أعد تهيئة قاعدة البيانات
cd backend
rm data/db.json
npm run seed
```

---

## ❌ مشكلة: التصميم لا يظهر

### الحل
```bash
# امسح .next وأعد البناء
cd frontend
rm -rf .next
npm run dev
```

---

## ❌ مشكلة: اللغة لا تتغير

### الحل
1. امسح localStorage:
   - F12 > Application > Local Storage > Clear
2. أعد تحميل الصفحة

---

## 🔍 فحص شامل

### قائمة التحقق السريعة

```bash
# 1. تحقق من Node.js
node --version  # يجب أن يكون 18+

# 2. تحقق من Backend
curl http://localhost:5000/api/health

# 3. تحقق من Frontend
curl http://localhost:3000

# 4. تحقق من قاعدة البيانات
cat backend/data/db.json | head

# 5. تحقق من المنافذ
netstat -ano | findstr :5000
netstat -ano | findstr :3000
```

---

## 📞 الحصول على المساعدة

### خطوات التشخيص

1. **افتح Developer Tools (F12)**
2. **اذهب إلى Console**
3. **انسخ رسالة الخطأ الكاملة**
4. **راجع هذا الملف للحل**

### معلومات مفيدة للدعم

عند طلب المساعدة، وفّر:
- رسالة الخطأ الكاملة
- خطوات إعادة إنتاج المشكلة
- إصدار Node.js (`node --version`)
- نظام التشغيل
- المتصفح المستخدم

---

## ✅ اختبار سريع

### اختبر أن كل شيء يعمل

```bash
# 1. Backend Health
curl http://localhost:5000/api/health

# 2. تسجيل الدخول
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@artisan.ma","password":"admin123"}'

# 3. Frontend
start http://localhost:3000
```

---

## 🎯 نصائح الوقاية

### لتجنب المشاكل

1. ✅ دائمًا شغّل Backend قبل Frontend
2. ✅ لا تغلق Terminal أثناء العمل
3. ✅ احفظ نسخة احتياطية من db.json
4. ✅ امسح Cache عند تحديث الكود
5. ✅ استخدم المتصفح في وضع Incognito للاختبار

---

## 🔄 إعادة التشغيل الكاملة

إذا فشل كل شيء، جرب هذا:

```bash
# 1. أوقف كل شيء (Ctrl+C في كل Terminal)

# 2. امسح كل شيء
cd backend
rm -rf node_modules .next data/db.json

cd ../frontend
rm -rf node_modules .next

# 3. أعد التثبيت
cd ../backend
npm install
npm run seed

cd ../frontend
npm install

# 4. أعد التشغيل
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

---

**آخر تحديث:** 28 أكتوبر 2025  
**الإصدار:** 1.0.1 (مع إصلاحات SSR)
