class AppConstants {
  // API Configuration
  static const String apiUrl = 'https://app-artisan.onrender.com/api';
  
  // App Info
  static const String appName = 'منصة الحرفيين';
  static const String appVersion = '1.0.0';
  
  // Storage Keys
  static const String tokenKey = 'auth_token';
  static const String userKey = 'user_data';
  static const String languageKey = 'app_language';
  
  // Colors
  static const int primaryColor = 0xFF3B82F6;
  static const int secondaryColor = 0xFF8B5CF6;
  static const int successColor = 0xFF10B981;
  static const int warningColor = 0xFFF59E0B;
  static const int errorColor = 0xFFEF4444;
  static const int backgroundColor = 0xFFF9FAFB;
  static const int surfaceColor = 0xFFFFFFFF;
  static const int textPrimaryColor = 0xFF111827;
  static const int textSecondaryColor = 0xFF6B7280;
  
  // Spacing
  static const double spacingXs = 4.0;
  static const double spacingSm = 8.0;
  static const double spacingMd = 16.0;
  static const double spacingLg = 24.0;
  static const double spacingXl = 32.0;
  
  // Border Radius
  static const double radiusSm = 4.0;
  static const double radiusMd = 8.0;
  static const double radiusLg = 12.0;
  static const double radiusXl = 16.0;
  
  // Animation Duration
  static const int animationDuration = 300;
  
  // Timeouts
  static const int connectionTimeout = 30000;
  static const int receiveTimeout = 30000;
  
  // Pagination
  static const int itemsPerPage = 20;
  
  // Validation
  static const int minPasswordLength = 6;
  static const int maxNameLength = 100;
  static const int maxDescriptionLength = 500;
}
