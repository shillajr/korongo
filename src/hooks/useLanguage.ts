import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

/**
 * Custom hook for accessing language context
 * Provides access to current language and translation function
 *
 * @throws Error if used outside LanguageProvider
 * @returns Language context with translation function
 *
 * @example
 * const { language, t, setLanguage } = useLanguage();
 * const welcomeText = t('arrivalFlow.welcome.title');
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
