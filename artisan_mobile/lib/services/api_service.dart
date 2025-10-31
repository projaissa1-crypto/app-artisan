import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../config/constants.dart';

class ApiService {
  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(AppConstants.tokenKey);
  }

  Future<Map<String, String>> _getHeaders() async {
    final token = await _getToken();
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  // Projects
  Future<Map<String, dynamic>> getProjects() async {
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('${AppConstants.apiUrl}/projects'),
        headers: headers,
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return {'success': true, 'data': data};
      } else {
        return {'success': false, 'message': 'فشل تحميل المشاريع'};
      }
    } catch (e) {
      return {'success': false, 'message': 'خطأ في الاتصال: ${e.toString()}'};
    }
  }

  Future<Map<String, dynamic>> createProject(Map<String, dynamic> projectData) async {
    try {
      final headers = await _getHeaders();
      final response = await http.post(
        Uri.parse('${AppConstants.apiUrl}/projects'),
        headers: headers,
        body: json.encode(projectData),
      );

      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        return {'success': true, 'data': data};
      } else {
        final error = json.decode(response.body);
        return {'success': false, 'message': error['error'] ?? 'فشل إنشاء المشروع'};
      }
    } catch (e) {
      return {'success': false, 'message': 'خطأ في الاتصال: ${e.toString()}'};
    }
  }

  // Materials
  Future<Map<String, dynamic>> getMaterials() async {
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('${AppConstants.apiUrl}/materials'),
        headers: headers,
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return {'success': true, 'data': data};
      } else {
        return {'success': false, 'message': 'فشل تحميل المواد'};
      }
    } catch (e) {
      return {'success': false, 'message': 'خطأ في الاتصال: ${e.toString()}'};
    }
  }

  // Categories
  Future<Map<String, dynamic>> getCategories() async {
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('${AppConstants.apiUrl}/categories'),
        headers: headers,
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return {'success': true, 'data': data};
      } else {
        return {'success': false, 'message': 'فشل تحميل الفئات'};
      }
    } catch (e) {
      return {'success': false, 'message': 'خطأ في الاتصال: ${e.toString()}'};
    }
  }

  // Specialties
  Future<Map<String, dynamic>> getSpecialties() async {
    try {
      final response = await http.get(
        Uri.parse('${AppConstants.apiUrl}/specialties'),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return {'success': true, 'data': data};
      } else {
        return {'success': false, 'message': 'فشل تحميل التخصصات'};
      }
    } catch (e) {
      return {'success': false, 'message': 'خطأ في الاتصال: ${e.toString()}'};
    }
  }
}
