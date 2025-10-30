'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, languages, defaultLanguage } from './config';
import { translations } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    // Load language from localStorage
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && languages[savedLang]) {
        setLanguageState(savedLang);
      }
    }
  }, []);

  useEffect(() => {
    // Update HTML attributes when language changes
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = languages[language].dir;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dir: languages[language].dir,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
