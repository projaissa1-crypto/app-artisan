import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../config/constants.dart';

class AuthService {
  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('${AppConstants.apiUrl}/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        
        // Save token
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString(AppConstants.tokenKey, data['token']);
        await prefs.setString(AppConstants.userKey, json.encode(data['user']));
        
        return {'success': true, 'data': data};
      } else {
        final error = json.decode(response.body);
        return {'success': false, 'message': error['message'] ?? 'فشل تسجيل الدخول'};
      }
    } catch (e) {
      return {'success': false, 'message': 'خطأ في الاتصال: ${e.toString()}'};
    }
  }

  Future<Map<String, dynamic>> register(String name, String email, String password, String role, List<int> specialties) async {
    try {
      final response = await http.post(
        Uri.parse('${AppConstants.apiUrl}/auth/register'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'name': name,
          'email': email,
          'password': password,
          'role': role,
          'specialties': specialties,
        }),
      );

      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        
        // Save token
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString(AppConstants.tokenKey, data['token']);
        await prefs.setString(AppConstants.userKey, json.encode(data['user']));
        
        return {'success': true, 'data': data};
      } else {
        final error = json.decode(response.body);
        return {
          'success': false, 
          'message': 'خطأ ${response.statusCode}: ${error['error'] ?? error['message'] ?? json.encode(error)}'
        };
      }
    } catch (e) {
      return {'success': false, 'message': 'خطأ في الاتصال: ${e.toString()}'};
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(AppConstants.tokenKey);
    await prefs.remove(AppConstants.userKey);
  }

  Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.containsKey(AppConstants.tokenKey);
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(AppConstants.tokenKey);
  }

  Future<Map<String, dynamic>?> getUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userStr = prefs.getString(AppConstants.userKey);
    if (userStr != null) {
      return json.decode(userStr);
    }
    return null;
  }
}
