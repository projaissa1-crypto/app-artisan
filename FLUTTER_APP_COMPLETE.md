# 📱 تطبيق Flutter الكامل - منصة الحرفيين

## 🎯 نظرة عامة

تطبيق Flutter كامل يعمل على:
- ✅ Android
- ✅ iOS  
- ✅ Web
- ✅ Windows
- ✅ macOS
- ✅ Linux

---

## 🚀 إنشاء المشروع

### الخطوة 1: تثبيت Flutter

#### على Windows:
1. حمّل Flutter SDK من: https://flutter.dev/docs/get-started/install/windows
2. استخرج الملف في `C:\src\flutter`
3. أضف `C:\src\flutter\bin` إلى PATH
4. شغّل:
```bash
flutter doctor
```

#### على macOS:
```bash
# باستخدام Homebrew
brew install flutter

# تحقق
flutter doctor
```

#### على Linux:
```bash
# حمّل SDK
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.16.0-stable.tar.xz
tar xf flutter_linux_3.16.0-stable.tar.xz
export PATH="$PATH:`pwd`/flutter/bin"

# تحقق
flutter doctor
```

---

### الخطوة 2: إنشاء المشروع

```bash
# إنشاء مشروع جديد
flutter create artisan_platform_mobile

# الدخول للمجلد
cd artisan_platform_mobile
```

---

## 📁 هيكل المشروع

```
artisan_platform_mobile/
├── lib/
│   ├── main.dart
│   ├── models/
│   │   ├── user.dart
│   │   ├── project.dart
│   │   └── material.dart
│   ├── services/
│   │   ├── api_service.dart
│   │   ├── auth_service.dart
│   │   └── storage_service.dart
│   ├── screens/
│   │   ├── login_screen.dart
│   │   ├── home_screen.dart
│   │   ├── projects_screen.dart
│   │   ├── project_detail_screen.dart
│   │   ├── materials_screen.dart
│   │   └── admin_dashboard_screen.dart
│   ├── widgets/
│   │   ├── project_card.dart
│   │   ├── material_item.dart
│   │   └── custom_button.dart
│   ├── utils/
│   │   ├── constants.dart
│   │   └── helpers.dart
│   └── l10n/
│       ├── app_ar.dart
│       └── app_fr.dart
├── pubspec.yaml
└── README.md
```

---

## 📦 التبعيات (pubspec.yaml)

```yaml
name: artisan_platform_mobile
description: منصة الحرفيين المغاربة
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  # UI
  flutter_localizations:
    sdk: flutter
  cupertino_icons: ^1.0.6
  
  # State Management
  provider: ^6.1.1
  
  # HTTP & API
  http: ^1.1.2
  dio: ^5.4.0
  
  # Storage
  shared_preferences: ^2.2.2
  
  # JSON
  json_annotation: ^4.8.1
  
  # Internationalization
  intl: ^0.18.1
  
  # File handling
  path_provider: ^2.1.1
  file_picker: ^6.1.1
  
  # PDF & Export
  pdf: ^3.10.7
  csv: ^5.1.1
  
  # UI Components
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.1
  
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1
  build_runner: ^2.4.7
  json_serializable: ^6.7.1

flutter:
  uses-material-design: true
  
  # Assets
  assets:
    - assets/images/
    - assets/icons/
  
  # Fonts
  fonts:
    - family: Cairo
      fonts:
        - asset: fonts/Cairo-Regular.ttf
        - asset: fonts/Cairo-Bold.ttf
          weight: 700
```

---

## 🔧 الملفات الأساسية

### 1. main.dart

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'services/auth_service.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';
import 'utils/constants.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthService()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'منصة الحرفيين',
      debugShowCheckedModeBanner: false,
      
      // Localization
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('ar', ''),
        Locale('fr', ''),
      ],
      locale: const Locale('ar', ''),
      
      // Theme
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'Cairo',
        textTheme: const TextTheme(
          bodyLarge: TextStyle(fontSize: 16),
          bodyMedium: TextStyle(fontSize: 14),
        ),
      ),
      
      // Routes
      home: Consumer<AuthService>(
        builder: (context, auth, _) {
          return auth.isAuthenticated
              ? const HomeScreen()
              : const LoginScreen();
        },
      ),
    );
  }
}
```

---

### 2. models/user.dart

```dart
class User {
  final String id;
  final String name;
  final String email;
  final String role;
  final String? phone;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.phone,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      role: json['role'] ?? 'artisan',
      phone: json['phone'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'role': role,
      'phone': phone,
    };
  }
}
```

---

### 3. models/project.dart

```dart
class Project {
  final String id;
  final String title;
  final String? description;
  final String? clientName;
  final String? clientPhone;
  final String? clientAddress;
  final List<ProjectMaterial> materials;
  final double totalCost;
  final String userId;
  final DateTime createdAt;
  final DateTime updatedAt;

  Project({
    required this.id,
    required this.title,
    this.description,
    this.clientName,
    this.clientPhone,
    this.clientAddress,
    required this.materials,
    required this.totalCost,
    required this.userId,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Project.fromJson(Map<String, dynamic> json) {
    return Project(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'],
      clientName: json['clientName'],
      clientPhone: json['clientPhone'],
      clientAddress: json['clientAddress'],
      materials: (json['materials'] as List?)
          ?.map((m) => ProjectMaterial.fromJson(m))
          .toList() ?? [],
      totalCost: (json['totalCost'] ?? 0).toDouble(),
      userId: json['userId'] ?? '',
      createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
      updatedAt: DateTime.parse(json['updatedAt'] ?? DateTime.now().toIso8601String()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'clientName': clientName,
      'clientPhone': clientPhone,
      'clientAddress': clientAddress,
      'materials': materials.map((m) => m.toJson()).toList(),
      'totalCost': totalCost,
      'userId': userId,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}

class ProjectMaterial {
  final String materialId;
  final String name;
  final int quantity;
  final double unitPrice;
  final double totalPrice;

  ProjectMaterial({
    required this.materialId,
    required this.name,
    required this.quantity,
    required this.unitPrice,
    required this.totalPrice,
  });

  factory ProjectMaterial.fromJson(Map<String, dynamic> json) {
    return ProjectMaterial(
      materialId: json['materialId'] ?? '',
      name: json['name'] ?? '',
      quantity: json['quantity'] ?? 0,
      unitPrice: (json['unitPrice'] ?? 0).toDouble(),
      totalPrice: (json['totalPrice'] ?? 0).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'materialId': materialId,
      'name': name,
      'quantity': quantity,
      'unitPrice': unitPrice,
      'totalPrice': totalPrice,
    };
  }
}
```

---

### 4. services/api_service.dart

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../utils/constants.dart';
import '../models/user.dart';
import '../models/project.dart';

class ApiService {
  static const String baseUrl = AppConstants.apiUrl;
  
  String? _token;

  void setToken(String token) {
    _token = token;
  }

  Map<String, String> get _headers => {
    'Content-Type': 'application/json',
    if (_token != null) 'Authorization': 'Bearer $_token',
  };

  // Auth
  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('فشل تسجيل الدخول');
    }
  }

  // Projects
  Future<List<Project>> getProjects() async {
    final response = await http.get(
      Uri.parse('$baseUrl/projects'),
      headers: _headers,
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((json) => Project.fromJson(json)).toList();
    } else {
      throw Exception('فشل جلب المشاريع');
    }
  }

  Future<Project> createProject(Map<String, dynamic> projectData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/projects'),
      headers: _headers,
      body: jsonEncode(projectData),
    );

    if (response.statusCode == 201) {
      return Project.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('فشل إنشاء المشروع');
    }
  }

  Future<Project> updateProject(String id, Map<String, dynamic> projectData) async {
    final response = await http.put(
      Uri.parse('$baseUrl/projects/$id'),
      headers: _headers,
      body: jsonEncode(projectData),
    );

    if (response.statusCode == 200) {
      return Project.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('فشل تحديث المشروع');
    }
  }

  Future<void> deleteProject(String id) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/projects/$id'),
      headers: _headers,
    );

    if (response.statusCode != 200) {
      throw Exception('فشل حذف المشروع');
    }
  }

  // Materials
  Future<List<dynamic>> getMaterials() async {
    final response = await http.get(
      Uri.parse('$baseUrl/materials'),
      headers: _headers,
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('فشل جلب المواد');
    }
  }

  // Categories
  Future<List<dynamic>> getCategories() async {
    final response = await http.get(
      Uri.parse('$baseUrl/categories'),
      headers: _headers,
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('فشل جلب التصنيفات');
    }
  }
}
```

---

### 5. services/auth_service.dart

```dart
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';
import 'api_service.dart';

class AuthService with ChangeNotifier {
  User? _user;
  String? _token;
  final ApiService _apiService = ApiService();

  User? get user => _user;
  bool get isAuthenticated => _token != null;
  bool get isAdmin => _user?.role == 'admin';

  Future<void> login(String email, String password) async {
    try {
      final response = await _apiService.login(email, password);
      
      _token = response['token'];
      _user = User.fromJson(response['user']);
      _apiService.setToken(_token!);

      // Save to storage
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', _token!);
      await prefs.setString('user', jsonEncode(_user!.toJson()));

      notifyListeners();
    } catch (e) {
      throw Exception('فشل تسجيل الدخول: $e');
    }
  }

  Future<void> logout() async {
    _token = null;
    _user = null;

    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('user');

    notifyListeners();
  }

  Future<void> loadFromStorage() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('token');
    
    if (_token != null) {
      final userJson = prefs.getString('user');
      if (userJson != null) {
        _user = User.fromJson(jsonDecode(userJson));
        _apiService.setToken(_token!);
      }
    }
    
    notifyListeners();
  }
}
```

---

## 🎨 الشاشات الرئيسية

سأكمل في الرسالة التالية مع باقي الشاشات والتفاصيل...

---

**تم إنشاء:** 28 أكتوبر 2025  
**الحالة:** قيد الإنشاء...  
**التقدم:** 40%
