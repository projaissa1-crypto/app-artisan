export const languages = {
  ar: { name: 'العربية', dir: 'rtl' },
  fr: { name: 'Français', dir: 'ltr' }
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'ar';
