# 📱 تطبيق Flutter - منصة الحرفيين المغاربة

## 🎯 نظرة عامة

تطبيق Flutter كامل يعمل على جميع المنصات:
- ✅ Android
- ✅ iOS
- ✅ Web
- ✅ Windows
- ✅ macOS
- ✅ Linux

---

## 🚀 البدء السريع

### 1. تثبيت Flutter

```bash
# تحميل Flutter SDK
https://flutter.dev/docs/get-started/install

# تحقق من التثبيت
flutter doctor
```

### 2. إنشاء المشروع

```bash
# إنشاء مشروع جديد
flutter create artisan_platform_mobile

# نسخ الملفات من هذا المجلد
cp -r lib/* artisan_platform_mobile/lib/
cp pubspec.yaml artisan_platform_mobile/

# الدخول للمشروع
cd artisan_platform_mobile

# تثبيت التبعيات
flutter pub get
```

### 3. تشغيل التطبيق

```bash
# على Android
flutter run

# على iOS (Mac فقط)
flutter run

# على Web
flutter run -d chrome

# على Windows
flutter run -d windows
```

---

## 📁 هيكل المشروع

```
lib/
├── main.dart                    # نقطة البداية
├── config/
│   └── constants.dart           # الثوابت والإعدادات
├── models/
│   ├── user.dart               # نموذج المستخدم
│   ├── project.dart            # نموذج المشروع
│   ├── material.dart           # نموذج المادة
│   └── category.dart           # نموذج التصنيف
├── services/
│   ├── api_service.dart        # خدمة API
│   ├── auth_service.dart       # خدمة المصادقة
│   └── storage_service.dart    # التخزين المحلي
├── providers/
│   ├── auth_provider.dart      # مزود المصادقة
│   ├── projects_provider.dart  # مزود المشاريع
│   └── materials_provider.dart # مزود المواد
├── screens/
│   ├── auth/
│   │   ├── login_screen.dart
│   │   └── register_screen.dart
│   ├── home/
│   │   └── home_screen.dart
│   ├── projects/
│   │   ├── projects_list_screen.dart
│   │   ├── project_detail_screen.dart
│   │   ├── create_project_screen.dart
│   │   └── edit_project_screen.dart
│   ├── materials/
│   │   ├── materials_screen.dart
│   │   └── add_material_dialog.dart
│   └── admin/
│       ├── dashboard_screen.dart
│       ├── users_screen.dart
│       └── catalog_screen.dart
├── widgets/
│   ├── project_card.dart
│   ├── material_item.dart
│   ├── custom_button.dart
│   ├── custom_text_field.dart
│   └── loading_indicator.dart
├── utils/
│   ├── validators.dart
│   ├── formatters.dart
│   └── helpers.dart
└── l10n/
    ├── app_localizations.dart
    ├── app_ar.dart
    └── app_fr.dart
```

---

## 🔧 الإعدادات

### تعديل API URL

في `lib/config/constants.dart`:

```dart
class AppConstants {
  // غيّر هذا إلى رابط Backend الخاص بك
  static const String apiUrl = 'https://yourdomain.com/api';
}
```

---

## 📦 بناء التطبيق

### Android APK

```bash
flutter build apk --release
```

الملف في: `build/app/outputs/flutter-apk/app-release.apk`

### Android App Bundle (للنشر على Google Play)

```bash
flutter build appbundle --release
```

### iOS

```bash
flutter build ios --release
```

### Web

```bash
flutter build web --release
```

### Windows

```bash
flutter build windows --release
```

---

## 📱 النشر

### Google Play Store

1. أنشئ حساب Google Play Developer ($25)
2. ابنِ App Bundle: `flutter build appbundle --release`
3. ارفع على Google Play Console
4. املأ معلومات التطبيق
5. انتظر المراجعة (1-3 أيام)

### Apple App Store

1. أنشئ حساب Apple Developer ($99/سنة)
2. ابنِ للـ iOS: `flutter build ios --release`
3. افتح Xcode > Archive
4. ارفع على App Store Connect
5. انتظر المراجعة (1-7 أيام)

---

## ✅ الميزات

- ✅ تسجيل الدخول والخروج
- ✅ إدارة المشاريع (CRUD)
- ✅ إضافة مواد من الكتالوج
- ✅ حساب التكلفة تلقائياً
- ✅ تصدير JSON/CSV/PDF
- ✅ دعم العربية والفرنسية
- ✅ RTL/LTR تلقائي
- ✅ لوحة تحكم Admin
- ✅ Offline support
- ✅ Dark mode

---

## 🎨 التخصيص

### الألوان

في `lib/main.dart`:

```dart
primaryColor: Color(0xFF3B82F6),
```

### الخطوط

في `pubspec.yaml`:

```yaml
fonts:
  - family: Cairo
    fonts:
      - asset: fonts/Cairo-Regular.ttf
```

---

## 📞 الدعم

للمساعدة، راجع:
- `FLUTTER_GUIDE.md` - دليل كامل
- `TROUBLESHOOTING.md` - حل المشاكل

---

**تم التطوير بـ ❤️ للحرفيين المغاربة**
