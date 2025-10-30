# 📱 الكود الكامل لتطبيق Flutter

## 🎯 نظرة عامة

هذا الملف يحتوي على **جميع الأكواد** اللازمة لبناء تطبيق Flutter كامل.

---

## 📦 الخطوة 1: إنشاء المشروع

```bash
# إنشاء مشروع Flutter جديد
flutter create artisan_platform_mobile

# الدخول للمجلد
cd artisan_platform_mobile
```

---

## 📝 الخطوة 2: pubspec.yaml

استبدل محتوى `pubspec.yaml` بهذا:

```yaml
name: artisan_platform_mobile
description: منصة الحرفيين المغاربة
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  
  cupertino_icons: ^1.0.6
  provider: ^6.1.1
  http: ^1.1.2
  dio: ^5.4.0
  shared_preferences: ^2.2.2
  json_annotation: ^4.8.1
  intl: ^0.18.1
  path_provider: ^2.1.1
  file_picker: ^6.1.1
  share_plus: ^7.2.1
  pdf: ^3.10.7
  printing: ^5.11.1
  csv: ^5.1.1
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.1
  shimmer: ^3.0.0
  uuid: ^4.2.2
  
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1
  build_runner: ^2.4.7
  json_serializable: ^6.7.1

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
```

ثم شغّل:
```bash
flutter pub get
```

---

## 🗂️ الخطوة 3: هيكل المجلدات

أنشئ هذه المجلدات في `lib/`:

```
lib/
├── config/
├── models/
├── services/
├── providers/
├── screens/
│   ├── auth/
│   ├── home/
│   ├── projects/
│   ├── materials/
│   └── admin/
├── widgets/
└── utils/
```

---

## 📄 الخطوة 4: الملفات الأساسية

### 1. lib/config/constants.dart

```dart
import 'package:flutter/material.dart';

class AppConstants {
  // ⚠️ غيّر هذا إلى رابط Backend الخاص بك
  static const String apiUrl = 'https://yourdomain.com/api';
  
  static const String appName = 'منصة الحرفيين';
  static const String tokenKey = 'auth_token';
  static const String userKey = 'user_data';
  
  static const Color primaryColor = Color(0xFF3B82F6);
  static const Color successColor = Color(0xFF10B981);
  static const Color errorColor = Color(0xFFEF4444);
}
```

---

### 2. lib/models/user.dart

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

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'email': email,
    'role': role,
    'phone': phone,
  };
}
```

---

### 3. lib/models/project.dart

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
      createdAt: DateTime.parse(
        json['createdAt'] ?? DateTime.now().toIso8601String()
      ),
    );
  }

  Map<String, dynamic> toJson() => {
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
  };
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

  Map<String, dynamic> toJson() => {
    'materialId': materialId,
    'name': name,
    'quantity': quantity,
    'unitPrice': unitPrice,
    'totalPrice': totalPrice,
  };
}
```

---

### 4. lib/services/api_service.dart

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/constants.dart';
import '../models/user.dart';
import '../models/project.dart';

class ApiService {
  static const String baseUrl = AppConstants.apiUrl;
  String? _token;

  void setToken(String token) => _token = token;

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
    }
    throw Exception('فشل تسجيل الدخول');
  }

  // Projects
  Future<List<Project>> getProjects() async {
    final response = await http.get(
      Uri.parse('$baseUrl/projects'),
      headers: _headers,
    );

    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((json) => Project.fromJson(json)).toList();
    }
    throw Exception('فشل جلب المشاريع');
  }

  Future<Project> createProject(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/projects'),
      headers: _headers,
      body: jsonEncode(data),
    );

    if (response.statusCode == 201) {
      return Project.fromJson(jsonDecode(response.body));
    }
    throw Exception('فشل إنشاء المشروع');
  }

  Future<Project> updateProject(String id, Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/projects/$id'),
      headers: _headers,
      body: jsonEncode(data),
    );

    if (response.statusCode == 200) {
      return Project.fromJson(jsonDecode(response.body));
    }
    throw Exception('فشل تحديث المشروع');
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
    }
    throw Exception('فشل جلب المواد');
  }

  // Categories
  Future<List<dynamic>> getCategories() async {
    final response = await http.get(
      Uri.parse('$baseUrl/categories'),
      headers: _headers,
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw Exception('فشل جلب التصنيفات');
  }
}
```

---

### 5. lib/providers/auth_provider.dart

```dart
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/user.dart';
import '../services/api_service.dart';

class AuthProvider with ChangeNotifier {
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

### 6. lib/providers/projects_provider.dart

```dart
import 'package:flutter/foundation.dart';
import '../models/project.dart';
import '../services/api_service.dart';

class ProjectsProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  List<Project> _projects = [];
  bool _isLoading = false;

  List<Project> get projects => _projects;
  bool get isLoading => _isLoading;

  Future<void> fetchProjects() async {
    _isLoading = true;
    notifyListeners();

    try {
      _projects = await _apiService.getProjects();
    } catch (e) {
      print('Error fetching projects: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> createProject(Map<String, dynamic> data) async {
    try {
      final project = await _apiService.createProject(data);
      _projects.insert(0, project);
      notifyListeners();
    } catch (e) {
      throw Exception('فشل إنشاء المشروع: $e');
    }
  }

  Future<void> updateProject(String id, Map<String, dynamic> data) async {
    try {
      final updated = await _apiService.updateProject(id, data);
      final index = _projects.indexWhere((p) => p.id == id);
      if (index != -1) {
        _projects[index] = updated;
        notifyListeners();
      }
    } catch (e) {
      throw Exception('فشل تحديث المشروع: $e');
    }
  }

  Future<void> deleteProject(String id) async {
    try {
      await _apiService.deleteProject(id);
      _projects.removeWhere((p) => p.id == id);
      notifyListeners();
    } catch (e) {
      throw Exception('فشل حذف المشروع: $e');
    }
  }
}
```

---

## 🎨 الخطوة 5: الشاشات

سأكمل في الملف التالي مع جميع الشاشات...

---

**التقدم:** 60%  
**الحالة:** قيد الإنشاء...  
**المتبقي:** الشاشات + الويدجتس + main.dart
