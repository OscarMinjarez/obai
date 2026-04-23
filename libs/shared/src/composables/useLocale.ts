import { watchEffect } from 'vue';
import i18n from '../plugins/i18n';

export function useLocale() {
  const setLocale = (lang: 'en' | 'es' | 'ko') => {
    (i18n.global.locale as any).value = lang;
    if (typeof window !== 'undefined') {
      localStorage.setItem('obai_locale', lang);
      document.documentElement.lang = lang;
    }
  };

  const initLocale = () => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('obai_locale') as 'en' | 'es' | 'ko' | null;
    if (saved) {
      setLocale(saved);
      return;
    }

    const browserLang = navigator.language.split('-')[0] as 'en' | 'es' | 'ko';
    const supported = ['en', 'es', 'ko'];
    if (supported.includes(browserLang)) {
      setLocale(browserLang);
    } else {
      setLocale('es'); // Fallback default
    }
  };

  return {
    currentLocale: i18n.global.locale,
    setLocale,
    initLocale
  };
}
