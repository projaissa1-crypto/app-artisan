import 'package:flutter/material.dart';

class AppConstants {
  // API Configuration
  // ⚠️ غيّر هذا إلى رابط Backend الخاص بك
  static const String apiUrl = 'https://yourdomain.com/api';
  
  // App Info
  static const String appName = 'منصة الحرفيين';
  static const String appVersion = '1.0.0';
  
  // Storage Keys
  static const String tokenKey = 'auth_token';
  static const String userKey = 'user_data';
  static const String languageKey = 'app_language';
  
  // Colors
  static const Color primaryColor = Color(0xFF3B82F6);
  static const Color secondaryColor = Color(0xFF64748B);
  static const Color successColor = Color(0xFF10B981);
  static const Color errorColor = Color(0xFFEF4444);
  static const Color warningColor = Color(0xFFF59E0B);
  
  // Gradients
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [Color(0xFF3B82F6), Color(0xFF2563EB)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  // Spacing
  static const double paddingSmall = 8.0;
  static const double paddingMedium = 16.0;
  static const double paddingLarge = 24.0;
  
  // Border Radius
  static const double radiusSmall = 8.0;
  static const double radiusMedium = 12.0;
  static const double radiusLarge = 16.0;
  
  // Animation Duration
  static const Duration animationDuration = Duration(milliseconds: 300);
  
  // Timeouts
  static const Duration apiTimeout = Duration(seconds: 30);
  
  // Pagination
  static const int itemsPerPage = 20;
  
  // Validation
  static const int minPasswordLength = 6;
  static const int maxProjectTitleLength = 100;
  static const int maxDescriptionLength = 500;
}

class AppStrings {
  // Arabic
  static const Map<String, String> ar = {
    // Auth
    'login': 'تسجيل الدخول',
    'register': 'تسجيل جديد',
    'logout': 'تسجيل الخروج',
    'email': 'البريد الإلكتروني',
    'password': 'كلمة المرور',
    'name': 'الاسم',
    'phone': 'رقم الهاتف',
    'forgotPassword': 'نسيت كلمة المرور؟',
    
    // Projects
    'projects': 'المشاريع',
    'myProjects': 'مشاريعي',
    'newProject': 'مشروع جديد',
    'projectTitle': 'عنوان المشروع',
    'projectDescription': 'وصف المشروع',
    'clientName': 'اسم العميل',
    'clientPhone': 'هاتف العميل',
    'clientAddress': 'عنوان العميل',
    'totalCost': 'التكلفة الإجمالية',
    'createProject': 'إنشاء مشروع',
    'editProject': 'تعديل المشروع',
    'deleteProject': 'حذف المشروع',
    'projectDetails': 'تفاصيل المشروع',
    
    // Materials
    'materials': 'المواد',
    'addMaterial': 'إضافة مادة',
    'materialName': 'اسم المادة',
    'quantity': 'الكمية',
    'unitPrice': 'سعر الوحدة',
    'totalPrice': 'السعر الإجمالي',
    'category': 'التصنيف',
    'unit': 'الوحدة',
    
    // Actions
    'save': 'حفظ',
    'cancel': 'إلغاء',
    'delete': 'حذف',
    'edit': 'تعديل',
    'add': 'إضافة',
    'search': 'بحث',
    'filter': 'تصفية',
    'export': 'تصدير',
    'share': 'مشاركة',
    
    // Messages
    'success': 'نجح',
    'error': 'خطأ',
    'loading': 'جاري التحميل...',
    'noData': 'لا توجد بيانات',
    'confirmDelete': 'هل أنت متأكد من الحذف؟',
    'yes': 'نعم',
    'no': 'لا',
    
    // Validation
    'required': 'هذا الحقل مطلوب',
    'invalidEmail': 'البريد الإلكتروني غير صحيح',
    'passwordTooShort': 'كلمة المرور قصيرة جداً',
    'passwordsNotMatch': 'كلمات المرور غير متطابقة',
    
    // Admin
    'dashboard': 'لوحة التحكم',
    'users': 'المستخدمون',
    'catalog': 'الكتالوج',
    'categories': 'التصنيفات',
    'statistics': 'الإحصائيات',
  };
  
  // French
  static const Map<String, String> fr = {
    // Auth
    'login': 'Connexion',
    'register': 'Inscription',
    'logout': 'Déconnexion',
    'email': 'Email',
    'password': 'Mot de passe',
    'name': 'Nom',
    'phone': 'Téléphone',
    'forgotPassword': 'Mot de passe oublié?',
    
    // Projects
    'projects': 'Projets',
    'myProjects': 'Mes projets',
    'newProject': 'Nouveau projet',
    'projectTitle': 'Titre du projet',
    'projectDescription': 'Description',
    'clientName': 'Nom du client',
    'clientPhone': 'Tél. client',
    'clientAddress': 'Adresse client',
    'totalCost': 'Coût total',
    'createProject': 'Créer projet',
    'editProject': 'Modifier projet',
    'deleteProject': 'Supprimer projet',
    'projectDetails': 'Détails du projet',
    
    // Materials
    'materials': 'Matériaux',
    'addMaterial': 'Ajouter matériau',
    'materialName': 'Nom du matériau',
    'quantity': 'Quantité',
    'unitPrice': 'Prix unitaire',
    'totalPrice': 'Prix total',
    'category': 'Catégorie',
    'unit': 'Unité',
    
    // Actions
    'save': 'Enregistrer',
    'cancel': 'Annuler',
    'delete': 'Supprimer',
    'edit': 'Modifier',
    'add': 'Ajouter',
    'search': 'Rechercher',
    'filter': 'Filtrer',
    'export': 'Exporter',
    'share': 'Partager',
    
    // Messages
    'success': 'Succès',
    'error': 'Erreur',
    'loading': 'Chargement...',
    'noData': 'Aucune donnée',
    'confirmDelete': 'Confirmer la suppression?',
    'yes': 'Oui',
    'no': 'Non',
    
    // Validation
    'required': 'Ce champ est requis',
    'invalidEmail': 'Email invalide',
    'passwordTooShort': 'Mot de passe trop court',
    'passwordsNotMatch': 'Mots de passe différents',
    
    // Admin
    'dashboard': 'Tableau de bord',
    'users': 'Utilisateurs',
    'catalog': 'Catalogue',
    'categories': 'Catégories',
    'statistics': 'Statistiques',
  };
}
