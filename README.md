# منصة الحرفيين المغاربة | Moroccan Artisan Platform

منصة ثنائية اللغة (العربية/الفرنسية) لمساعدة الحرفيين على إدارة المشاريع والمواد.

## 🎯 المميزات

### للحرفيين (Artisan Portal)
- ✅ إنشاء وإدارة المشاريع
- ✅ تجميع لائحة المواد من كتالوغ مُدار مركزيًا
- ✅ تعديل الكميات والوحدات والأسعار
- ✅ تصدير المشاريع (JSON/CSV)
- ✅ تتبع المشاريع السابقة
- ✅ حساب التكلفة الإجمالية تلقائيًا

### للمديرين (Admin Panel)
- ✅ إدارة المستخدمين والأدوار
- ✅ إدارة الكتالوغ (تصنيفات ومواد) باللغتين
- ✅ عرض وإدارة جميع المشاريع
- ✅ لوحة معلومات شاملة

### تقنيات إضافية
- 🌐 دعم ثنائي اللغة (العربية/الفرنسية)
- 📱 PWA - يعمل على الموبايل والويب
- 🔐 نظام مصادقة آمن (JWT)
- 🎨 واجهة حديثة وسهلة الاستخدام

## 🛠️ التكنولوجيا المستخدمة

### Backend
- **Express.js** - إطار عمل الخادم
- **LowDB** - قاعدة بيانات JSON (سهلة التشغيل على Windows)
- **JWT** - المصادقة والترخيص
- **Bcryptjs** - تشفير كلمات المرور

### Frontend
- **Next.js 14** - إطار عمل React مع App Router
- **TypeScript** - للكتابة الآمنة
- **TailwindCSS** - للتصميم
- **Lucide Icons** - الأيقونات
- **Axios** - طلبات API
- **PWA** - دعم Progressive Web App

## 📦 التثبيت والتشغيل

### المتطلبات
- Node.js 18+ 
- npm أو yarn

### 1. Backend Setup

```bash
cd backend
npm install
npm run seed    # تهيئة قاعدة البيانات بالبيانات الأولية
npm run dev     # تشغيل الخادم
```

الخادم سيعمل على: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev     # تشغيل التطبيق
```

التطبيق سيعمل على: `http://localhost:3000`

## 🔑 حسابات تجريبية

بعد تشغيل `npm run seed` في Backend:

**Admin:**
- Email: `admin@artisan.ma`
- Password: `admin123`

**Artisan:**
- Email: `artisan@artisan.ma`
- Password: `artisan123`

## 📁 هيكل المشروع

```
app-electre/
├── backend/
│   ├── src/
│   │   ├── db/              # إعدادات قاعدة البيانات
│   │   ├── models/          # نماذج البيانات
│   │   ├── routes/          # مسارات API
│   │   ├── middleware/      # Middleware (Auth, Errors)
│   │   ├── scripts/         # سكريبتات (seed)
│   │   └── server.js        # نقطة الدخول
│   ├── data/                # ملفات قاعدة البيانات
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── portal/          # واجهة الحرفي
    │   ├── admin/           # لوحة التحكم
    │   ├── login/           # صفحة تسجيل الدخول
    │   └── register/        # صفحة التسجيل
    ├── components/          # مكونات UI
    ├── lib/
    │   ├── api/            # API clients
    │   └── i18n/           # نظام الترجمة
    └── package.json
```

## 🌐 API Endpoints

### Authentication
```
POST /api/auth/register  - تسجيل مستخدم جديد
POST /api/auth/login     - تسجيل الدخول
```

### Users
```
GET    /api/users        - جميع المستخدمين (Admin)
GET    /api/users/me     - المستخدم الحالي
PUT    /api/users/:id    - تحديث مستخدم
DELETE /api/users/:id    - حذف مستخدم (Admin)
```

### Categories
```
GET    /api/categories           - جميع التصنيفات
POST   /api/categories           - إضافة تصنيف (Admin)
PUT    /api/categories/:id       - تحديث تصنيف (Admin)
DELETE /api/categories/:id       - حذف تصنيف (Admin)
```

### Materials
```
GET    /api/materials            - جميع المواد
GET    /api/materials?search=x   - بحث عن مواد
POST   /api/materials            - إضافة مادة (Admin)
PUT    /api/materials/:id        - تحديث مادة (Admin)
DELETE /api/materials/:id        - حذف مادة (Admin)
```

### Projects
```
GET    /api/projects                    - جميع المشاريع
GET    /api/projects/:id                - مشروع محدد
GET    /api/projects/:id/details        - مشروع مع تفاصيل المواد
POST   /api/projects                    - إنشاء مشروع
PUT    /api/projects/:id                - تحديث مشروع
DELETE /api/projects/:id                - حذف مشروع
POST   /api/projects/:id/items          - إضافة مادة للمشروع
PUT    /api/projects/:id/items/:itemId  - تحديث مادة
DELETE /api/projects/:id/items/:itemId  - حذف مادة
GET    /api/projects/:id/export/json    - تصدير JSON
GET    /api/projects/:id/export/csv     - تصدير CSV
```

## 🎨 نماذج البيانات

### User
```typescript
{
  id: string
  email: string
  name: string
  role: 'admin' | 'artisan'
  phone?: string
  specialty?: string
  createdAt: string
  updatedAt: string
}
```

### Category
```typescript
{
  id: string
  nameAr: string
  nameFr: string
  descriptionAr?: string
  descriptionFr?: string
  parentId?: string
  createdAt: string
  updatedAt: string
}
```

### Material
```typescript
{
  id: string
  categoryId: string
  nameAr: string
  nameFr: string
  unit: string
  defaultPrice?: number
  sku?: string
  createdAt: string
  updatedAt: string
}
```

### Project
```typescript
{
  id: string
  userId: string
  nameAr: string
  nameFr: string
  clientName?: string
  clientPhone?: string
  items: ProjectItem[]
  status: 'draft' | 'submitted' | 'completed'
  createdAt: string
  updatedAt: string
}
```

## 🔄 سير العمل

1. **تسجيل الدخول** - الحرفي يسجل الدخول
2. **إنشاء مشروع** - يُنشئ مشروع جديد مع معلومات العميل
3. **إضافة مواد** - يختار المواد من الكتالوغ ويحدد الكميات
4. **تعديل الأسعار** - يمكن تعديل الأسعار حسب الحاجة
5. **المراجعة** - يراجع المجموع الكلي
6. **التصدير** - يصدر لائحة المواد بصيغة JSON أو CSV

## 🚀 التطوير المستقبلي

- [ ] تصدير PDF مع تصميم احترافي
- [ ] رفع صور للمواد
- [ ] إشعارات البريد الإلكتروني
- [ ] تقارير وإحصائيات متقدمة
- [ ] الانتقال إلى SQLite/PostgreSQL
- [ ] نظام الفواتير
- [ ] دعم عملات متعددة
- [ ] تطبيق موبايل أصلي

## 📝 ملاحظات مهمة

- **قاعدة البيانات**: حاليًا تستخدم LowDB (JSON) لسهولة التشغيل على Windows. الكود مصمم بحيث يسهل الانتقال إلى SQLite أو PostgreSQL لاحقًا.
- **الأمان**: في الإنتاج، تأكد من تغيير `JWT_SECRET` في ملف `.env`
- **PWA**: في التطوير، PWA معطل. سيتم تفعيله في الإنتاج تلقائيًا.

## 🤝 المساهمة

هذا المشروع مفتوح للتطوير والتحسين. يمكنك المساهمة عبر:
1. Fork المشروع
2. إنشاء فرع للميزة الجديدة
3. Commit التغييرات
4. Push إلى الفرع
5. فتح Pull Request

## 📄 الترخيص

MIT License

---

**تم التطوير بواسطة:** Cascade AI Agent  
**التاريخ:** 2025  
**الإصدار:** 1.0.0
