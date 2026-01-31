import React, { createContext, useState, useEffect, useCallback } from 'react';

/**
 * Shape of the language context
 */
interface ILanguageContext {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

/**
 * Translation dictionary type
 */
interface TranslationDict {
  [key: string]: any;
}

/**
 * LanguageContext for managing app-wide language preferences
 */
export const LanguageContext = createContext<ILanguageContext | undefined>(undefined);

/**
 * Props for LanguageProvider component
 */
interface LanguageProviderProps {
  children: React.ReactNode;
}

/**
 * LanguageProvider component that wraps the app
 * Handles language state management and translation
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<string>('en');
  const [translations, setTranslations] = useState<Record<string, TranslationDict>>({});

  // Load translations on mount
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enModule, swModule] = await Promise.all([
          import('../locales/en.json'),
          import('../locales/sw.json'),
        ]);
        setTranslations({
          en: enModule.default || enModule,
          sw: swModule.default || swModule,
        });
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };

    loadTranslations();
  }, []);

  // Load initial language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('korongo_language');
    if (savedLanguage && ['en', 'sw'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  /**
   * Get nested value from object using dot notation
   */
  const getNestedValue = (obj: any, path: string): string => {
    try {
      return path.split('.').reduce((current, prop) => current[prop], obj) || path;
    } catch {
      return path;
    }
  };

  /**
   * Translate a key with optional parameters
   */
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const dict = translations[language];
      if (!dict) return key;

      let value = getNestedValue(dict, key);

      // Replace parameters
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          value = value.replace(`{{${paramKey}}}`, String(paramValue));
        });
      }

      return value;
    },
    [language, translations]
  );

  const setLanguage = (lang: string) => {
    if (['en', 'sw'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('korongo_language', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
