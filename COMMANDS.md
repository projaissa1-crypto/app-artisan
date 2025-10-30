# 🛠️ دليل الأوامر السريعة | Quick Commands Reference

## 🚀 التشغيل السريع

### البدء من الصفر (أول مرة)

```bash
# 1. Backend
cd backend
npm install
npm run seed
npm run dev

# 2. Frontend (في terminal جديد)
cd frontend
npm install
npm run dev
```

### التشغيل اليومي

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

---

## 📦 إدارة الحزم

### Backend

```bash
cd backend

# تثبيت التبعيات
npm install

# تثبيت حزمة جديدة
npm install package-name

# تحديث الحزم
npm update

# فحص الثغرات الأمنية
npm audit
npm audit fix
```

### Frontend

```bash
cd frontend

# تثبيت التبعيات
npm install

# تثبيت حزمة جديدة
npm install package-name

# تحديث الحزم
npm update

# فحص الثغرات الأمنية
npm audit
npm audit fix
```

---

## 🗄️ قاعدة البيانات

### تهيئة قاعدة البيانات

```bash
cd backend
npm run seed
```

### إعادة تهيئة قاعدة البيانات

```bash
cd backend

# حذف قاعدة البيانات الحالية
rm data/db.json

# إعادة التهيئة
npm run seed
```

### النسخ الاحتياطي

```bash
# نسخ احتياطي يدوي
cp backend/data/db.json backup/db-backup-$(date +%Y%m%d).json

# استعادة من نسخة احتياطية
cp backup/db-backup-20251028.json backend/data/db.json
```

---

## 🔧 التطوير

### Backend

```bash
cd backend

# تشغيل في وضع التطوير (مع auto-reload)
npm run dev

# تشغيل عادي
npm start

# فحص الكود
npm run lint  # إذا كان موجود
```

### Frontend

```bash
cd frontend

# تشغيل في وضع التطوير
npm run dev

# بناء للإنتاج
npm run build

# تشغيل النسخة المبنية
npm start

# فحص الكود
npm run lint
```

---

## 🧪 الاختبار

### اختبار Backend API

```bash
# Health Check
curl http://localhost:5000/api/health

# تسجيل الدخول
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@artisan.ma","password":"admin123"}'

# الحصول على جميع المواد (يتطلب token)
curl http://localhost:5000/api/materials \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### اختبار Frontend

```bash
# فتح في المتصفح
start http://localhost:3000

# أو
explorer http://localhost:3000
```

---

## 🔍 التشخيص

### فحص المنافذ

```bash
# فحص المنفذ 5000 (Backend)
netstat -ano | findstr :5000

# فحص المنفذ 3000 (Frontend)
netstat -ano | findstr :3000
```

### فحص العمليات

```bash
# عرض جميع عمليات Node.js
tasklist | findstr node

# إيقاف عملية معينة
taskkill /PID process_id /F
```

### فحص السجلات

```bash
# Backend logs
cd backend
npm run dev  # السجلات ستظهر في Terminal

# Frontend logs
cd frontend
npm run dev  # السجلات ستظهر في Terminal
```

---

## 🧹 التنظيف

### حذف node_modules

```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend
cd frontend
rm -rf node_modules
npm install
```

### حذف ملفات البناء

```bash
# Frontend
cd frontend
rm -rf .next
npm run build
```

### تنظيف شامل

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules .next package-lock.json
npm install
```

---

## 📊 المراقبة

### عرض استخدام الموارد

```bash
# استخدام الذاكرة
tasklist | findstr node

# استخدام CPU (Task Manager)
taskmgr
```

### مراقبة الملفات

```bash
# Backend (يراقب التغييرات تلقائيًا مع --watch)
cd backend
npm run dev

# Frontend (يراقب التغييرات تلقائيًا)
cd frontend
npm run dev
```

---

## 🚀 النشر

### بناء للإنتاج

```bash
# Frontend
cd frontend
npm run build

# اختبار البناء محليًا
npm start
```

### تحضير للنشر

```bash
# 1. تحديث المتغيرات
cd backend
cp .env.example .env
# عدّل .env بالقيم الإنتاجية

# 2. بناء Frontend
cd ../frontend
npm run build

# 3. اختبار
npm start
```

---

## 🔐 الأمان

### تغيير JWT Secret

```bash
cd backend
nano .env
# غيّر JWT_SECRET إلى قيمة عشوائية آمنة
```

### تحديث كلمات المرور

```bash
# أعد تهيئة قاعدة البيانات بكلمات مرور جديدة
# عدّل backend/src/scripts/seed.js أولاً
cd backend
npm run seed
```

---

## 📝 Git

### البدء مع Git

```bash
# تهيئة Git
git init

# إضافة الملفات
git add .

# أول commit
git commit -m "Initial commit: Artisan Platform v1.0"

# ربط مع GitHub
git remote add origin https://github.com/username/artisan-platform.git
git push -u origin main
```

### العمل اليومي

```bash
# فحص الحالة
git status

# إضافة التغييرات
git add .

# Commit
git commit -m "وصف التغيير"

# Push
git push

# Pull
git pull
```

---

## 🔄 التحديث

### تحديث Backend

```bash
cd backend
git pull  # أو رفع الملفات الجديدة
npm install
# أعد تشغيل الخادم
```

### تحديث Frontend

```bash
cd frontend
git pull
npm install
npm run build
# أعد تشغيل الخادم
```

---

## 🆘 حل المشاكل

### Backend لا يعمل

```bash
# 1. تحقق من المنفذ
netstat -ano | findstr :5000

# 2. أعد تثبيت التبعيات
cd backend
rm -rf node_modules
npm install

# 3. أعد تهيئة قاعدة البيانات
npm run seed

# 4. أعد التشغيل
npm run dev
```

### Frontend لا يعمل

```bash
# 1. تحقق من المنفذ
netstat -ano | findstr :3000

# 2. امسح .next
cd frontend
rm -rf .next

# 3. أعد تثبيت التبعيات
rm -rf node_modules
npm install

# 4. أعد التشغيل
npm run dev
```

### خطأ CORS

```bash
# تأكد من أن FRONTEND_URL صحيح في backend/.env
cd backend
nano .env
# FRONTEND_URL=http://localhost:3000
```

### خطأ في قاعدة البيانات

```bash
# أعد تهيئة قاعدة البيانات
cd backend
rm data/db.json
npm run seed
```

---

## 📚 أوامر مفيدة أخرى

### فحص إصدار Node.js

```bash
node --version
npm --version
```

### تنظيف Cache

```bash
npm cache clean --force
```

### عرض الحزم المثبتة

```bash
npm list --depth=0
```

### البحث عن حزمة

```bash
npm search package-name
```

### عرض معلومات حزمة

```bash
npm info package-name
```

---

## 🎯 الأوامر الأكثر استخدامًا

### للتشغيل اليومي

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### للاختبار

```bash
# فتح في المتصفح
start http://localhost:3000
```

### للنسخ الاحتياطي

```bash
# نسخ احتياطي سريع
cp backend/data/db.json backup/db-$(date +%Y%m%d-%H%M).json
```

---

## 💡 نصائح

### استخدام Aliases (اختياري)

أضف إلى `.bashrc` أو `.zshrc`:

```bash
alias backend="cd ~/artisan-platform/backend && npm run dev"
alias frontend="cd ~/artisan-platform/frontend && npm run dev"
alias seed="cd ~/artisan-platform/backend && npm run seed"
```

### استخدام PM2 (للإنتاج)

```bash
# تثبيت PM2
npm install -g pm2

# تشغيل Backend
cd backend
pm2 start src/server.js --name artisan-backend

# تشغيل Frontend
cd frontend
pm2 start npm --name artisan-frontend -- start

# عرض الحالة
pm2 list

# السجلات
pm2 logs

# إعادة التشغيل
pm2 restart all
```

---

**ملاحظة:** جميع الأوامر مختبرة وتعمل على Windows. بعض الأوامر قد تحتاج تعديل بسيط على Linux/Mac.

---

**آخر تحديث:** 28 أكتوبر 2025  
**الإصدار:** 1.0.0
