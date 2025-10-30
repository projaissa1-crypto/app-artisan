# 📑 فهرس المشروع الشامل | Complete Project Index

## 📂 دليل الملفات والمجلدات

### 📁 الجذر (Root Directory)
```
d:\app electre/
│
├── 📄 README.md                    # التوثيق الرئيسي الشامل
├── 📄 QUICKSTART.md                # دليل البدء السريع (3 خطوات)
├── 📄 TESTING.md                   # دليل الاختبار المفصل
├── 📄 DEPLOYMENT.md                # دليل النشر للإنتاج
├── 📄 PROJECT_STATUS.md            # حالة المشروع التفصيلية
├── 📄 SUMMARY.md                   # ملخص المشروع النهائي
├── 📄 VERIFICATION.md              # تقرير التحقق النهائي
├── 📄 INDEX.md                     # هذا الملف - الفهرس الشامل
├── 📄 .env.example                 # مثال لمتغيرات البيئة
├── 📄 package.json                 # سكريبتات التشغيل الموحدة
│
├── 📁 backend/                     # Backend API (Express.js)
└── 📁 frontend/                    # Frontend App (Next.js)
```

---

## 🔙 Backend Structure

### 📁 backend/
```
backend/
│
├── 📄 package.json                 # تبعيات Backend
├── 📄 .env                         # متغيرات البيئة (محلي)
├── 📄 .env.example                 # مثال متغيرات البيئة
├── 📄 .gitignore                   # ملفات Git المستبعدة
├── 📄 README.md                    # توثيق Backend API
│
├── 📁 data/                        # قاعدة البيانات
│   ├── 📄 .gitkeep                 # حفظ المجلد في Git
│   └── 📄 db.json                  # قاعدة البيانات JSON (يُنشأ بعد seed)
│
└── 📁 src/                         # الكود المصدري
    │
    ├── 📄 server.js                # نقطة الدخول الرئيسية
    │
    ├── 📁 db/                      # إعدادات قاعدة البيانات
    │   └── 📄 index.js             # LowDB configuration
    │
    ├── 📁 models/                  # نماذج البيانات
    │   ├── 📄 User.js              # نموذج المستخدم
    │   ├── 📄 Category.js          # نموذج التصنيف
    │   ├── 📄 Material.js          # نموذج المادة
    │   └── 📄 Project.js           # نموذج المشروع
    │
    ├── 📁 routes/                  # مسارات API
    │   ├── 📄 auth.js              # مسارات المصادقة
    │   ├── 📄 users.js             # مسارات المستخدمين
    │   ├── 📄 categories.js        # مسارات التصنيفات
    │   ├── 📄 materials.js         # مسارات المواد
    │   └── 📄 projects.js          # مسارات المشاريع
    │
    ├── 📁 middleware/              # Middleware
    │   ├── 📄 auth.js              # مصادقة وتفويض
    │   └── 📄 errorHandler.js      # معالجة الأخطاء
    │
    └── 📁 scripts/                 # سكريبتات مساعدة
        └── 📄 seed.js              # تهيئة قاعدة البيانات
```

---

## 🎨 Frontend Structure

### 📁 frontend/
```
frontend/
│
├── 📄 package.json                 # تبعيات Frontend
├── 📄 tsconfig.json                # تكوين TypeScript
├── 📄 next.config.js               # تكوين Next.js + PWA
├── 📄 tailwind.config.ts           # تكوين TailwindCSS
├── 📄 postcss.config.js            # تكوين PostCSS
├── 📄 .gitignore                   # ملفات Git المستبعدة
├── 📄 .env.local                   # متغيرات البيئة المحلية
│
├── 📁 public/                      # الملفات العامة
│   └── 📄 manifest.json            # PWA Manifest
│
├── 📁 app/                         # صفحات التطبيق (App Router)
│   │
│   ├── 📄 globals.css              # الأنماط العامة
│   ├── 📄 layout.tsx               # Layout الرئيسي
│   ├── 📄 page.tsx                 # الصفحة الرئيسية
│   │
│   ├── 📁 login/                   # صفحة تسجيل الدخول
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 register/                # صفحة التسجيل
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 portal/                  # بوابة الحرفي
│   │   ├── 📄 layout.tsx           # Layout البوابة
│   │   ├── 📄 page.tsx             # قائمة المشاريع
│   │   └── 📁 projects/
│   │       ├── 📁 new/             # مشروع جديد
│   │       │   └── 📄 page.tsx
│   │       └── 📁 [id]/            # تفاصيل المشروع
│   │           └── 📄 page.tsx
│   │
│   └── 📁 admin/                   # لوحة التحكم
│       ├── 📄 layout.tsx           # Layout لوحة التحكم
│       ├── 📄 page.tsx             # Dashboard
│       ├── 📁 users/               # إدارة المستخدمين
│       │   └── 📄 page.tsx
│       ├── 📁 categories/          # إدارة التصنيفات
│       │   └── 📄 page.tsx
│       ├── 📁 materials/           # إدارة المواد
│       │   └── 📄 page.tsx
│       └── 📁 projects/            # عرض المشاريع
│           └── 📄 page.tsx
│
├── 📁 components/                  # المكونات القابلة لإعادة الاستخدام
│   └── 📁 ui/                      # مكونات UI
│       ├── 📄 Button.tsx           # مكون الزر
│       ├── 📄 Input.tsx            # مكون الإدخال
│       └── 📄 Card.tsx             # مكون البطاقة
│
└── 📁 lib/                         # المكتبات والأدوات
    │
    ├── 📄 utils.ts                 # دوال مساعدة
    │
    ├── 📁 i18n/                    # نظام الترجمة
    │   ├── 📄 config.ts            # تكوين اللغات
    │   ├── 📄 translations.ts      # الترجمات
    │   └── 📄 I18nProvider.tsx     # مزود الترجمة
    │
    └── 📁 api/                     # API Clients
        ├── 📄 client.ts            # Axios client
        ├── 📄 auth.ts              # API المصادقة
        ├── 📄 users.ts             # API المستخدمين
        ├── 📄 categories.ts        # API التصنيفات
        ├── 📄 materials.ts         # API المواد
        └── 📄 projects.ts          # API المشاريع
```

---

## 📚 دليل التوثيق

### الملفات الرئيسية

| الملف | الوصف | الاستخدام |
|------|-------|-----------|
| `README.md` | التوثيق الشامل | للفهم العام للمشروع |
| `QUICKSTART.md` | البدء السريع | للتشغيل الفوري |
| `TESTING.md` | دليل الاختبار | لاختبار جميع الميزات |
| `DEPLOYMENT.md` | دليل النشر | للنشر في الإنتاج |
| `PROJECT_STATUS.md` | حالة المشروع | لمعرفة التقدم والإنجازات |
| `SUMMARY.md` | الملخص النهائي | للنظرة الشاملة |
| `VERIFICATION.md` | تقرير التحقق | للتأكد من عمل كل شيء |
| `INDEX.md` | هذا الملف | للتنقل في المشروع |

---

## 🎯 المسارات الرئيسية

### Backend API Endpoints

#### Authentication
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول

#### Users
- `GET /api/users` - جميع المستخدمين (Admin)
- `GET /api/users/me` - المستخدم الحالي
- `GET /api/users/:id` - مستخدم محدد (Admin)
- `PUT /api/users/:id` - تحديث مستخدم
- `DELETE /api/users/:id` - حذف مستخدم (Admin)

#### Categories
- `GET /api/categories` - جميع التصنيفات
- `GET /api/categories/:id` - تصنيف محدد
- `GET /api/categories/:id/subcategories` - التصنيفات الفرعية
- `POST /api/categories` - إضافة تصنيف (Admin)
- `PUT /api/categories/:id` - تحديث تصنيف (Admin)
- `DELETE /api/categories/:id` - حذف تصنيف (Admin)

#### Materials
- `GET /api/materials` - جميع المواد
- `GET /api/materials?search=query` - بحث عن مواد
- `GET /api/materials?categoryId=id` - مواد حسب التصنيف
- `GET /api/materials/:id` - مادة محددة
- `POST /api/materials` - إضافة مادة (Admin)
- `PUT /api/materials/:id` - تحديث مادة (Admin)
- `DELETE /api/materials/:id` - حذف مادة (Admin)

#### Projects
- `GET /api/projects` - جميع المشاريع
- `GET /api/projects/:id` - مشروع محدد
- `GET /api/projects/:id/details` - مشروع مع تفاصيل المواد
- `POST /api/projects` - إنشاء مشروع
- `PUT /api/projects/:id` - تحديث مشروع
- `DELETE /api/projects/:id` - حذف مشروع
- `POST /api/projects/:id/items` - إضافة مادة للمشروع
- `PUT /api/projects/:id/items/:itemId` - تحديث مادة
- `DELETE /api/projects/:id/items/:itemId` - حذف مادة
- `GET /api/projects/:id/export/json` - تصدير JSON
- `GET /api/projects/:id/export/csv` - تصدير CSV

### Frontend Routes

#### Public
- `/` - الصفحة الرئيسية
- `/login` - تسجيل الدخول
- `/register` - إنشاء حساب

#### Portal (Artisan)
- `/portal` - قائمة المشاريع
- `/portal/projects/new` - مشروع جديد
- `/portal/projects/[id]` - تفاصيل المشروع

#### Admin
- `/admin` - Dashboard
- `/admin/users` - إدارة المستخدمين
- `/admin/categories` - إدارة التصنيفات
- `/admin/materials` - إدارة المواد
- `/admin/projects` - عرض جميع المشاريع

---

## 🔑 المعلومات الأساسية

### المنافذ (Ports)
- **Backend:** 5000
- **Frontend:** 3000

### الحسابات الافتراضية
- **Admin:** admin@artisan.ma / admin123
- **Artisan:** artisan@artisan.ma / artisan123

### قاعدة البيانات
- **النوع:** LowDB (JSON)
- **الموقع:** `backend/data/db.json`
- **الحجم:** ~15 KB

---

## 📊 إحصائيات المشروع

### الملفات
- **Backend:** 23 ملف
- **Frontend:** 35+ ملف
- **التوثيق:** 8 ملفات
- **إجمالي:** 66+ ملف

### الكود
- **Backend:** 1,200+ سطر
- **Frontend:** 2,500+ سطر
- **التوثيق:** 2,000+ سطر
- **إجمالي:** 5,700+ سطر

### التبعيات
- **Backend:** 7 حزم رئيسية
- **Frontend:** 15 حزمة رئيسية
- **إجمالي:** ~700 حزمة (مع التبعيات)

---

## 🚀 الأوامر السريعة

### التثبيت
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### التشغيل
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

### التهيئة
```bash
# قاعدة البيانات
cd backend && npm run seed
```

### البناء
```bash
# Frontend
cd frontend && npm run build
```

---

## 🎨 الألوان والتصميم

### نظام الألوان
- **Primary:** Blue (#3b82f6)
- **Secondary:** Indigo (#6366f1)
- **Success:** Green (#10b981)
- **Warning:** Yellow (#f59e0b)
- **Error:** Red (#ef4444)

### الخطوط
- **العربية:** Cairo
- **اللاتينية:** Inter
- **الحجم الأساسي:** 16px

---

## 🔍 البحث السريع

### للبدء السريع
👉 اقرأ `QUICKSTART.md`

### للاختبار
👉 اقرأ `TESTING.md`

### للنشر
👉 اقرأ `DEPLOYMENT.md`

### للمشاكل
👉 راجع `VERIFICATION.md`

### للتفاصيل الفنية
👉 راجع `README.md`

---

## 📞 الدعم والمساعدة

### الوثائق
- جميع الملفات موثقة بالتفصيل
- تعليقات واضحة في الكود
- أمثلة عملية في كل ملف

### الموارد
- Backend README: `backend/README.md`
- API Documentation: في ملفات routes
- Component Documentation: في ملفات components

---

## ✅ قائمة التحقق

### قبل البدء
- [ ] قرأت `QUICKSTART.md`
- [ ] ثبّت Node.js 18+
- [ ] ثبّت npm

### أثناء التطوير
- [ ] Backend يعمل
- [ ] Frontend يعمل
- [ ] قاعدة البيانات مهيأة
- [ ] يمكنني تسجيل الدخول

### قبل النشر
- [ ] قرأت `DEPLOYMENT.md`
- [ ] غيّرت JWT_SECRET
- [ ] اختبرت جميع الميزات
- [ ] جهّزت النسخ الاحتياطي

---

## 🎉 ملاحظات نهائية

هذا الفهرس يساعدك على:
- 🗺️ التنقل في المشروع بسهولة
- 📚 فهم البنية والتنظيم
- 🔍 إيجاد الملفات بسرعة
- 📖 الوصول للتوثيق المناسب

**استمتع بالتطوير! 🚀**

---

**آخر تحديث:** 28 أكتوبر 2025  
**الإصدار:** 1.0.0  
**الحالة:** ✅ مكتمل
