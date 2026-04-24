import { createI18n } from 'vue-i18n';

// English
import enCommon from '../locales/en/common.json';
import enAuth from '../locales/en/auth.json';
import enSetup from '../locales/en/setup.json';
import enChat from '../locales/en/chat.json';
import enSidebar from '../locales/en/sidebar.json';
import enErrors from '../locales/en/errors.json';
import enValidation from '../locales/en/validation.json';
import enLanding from '../locales/en/landing.json';

// Spanish
import esCommon from '../locales/es/common.json';
import esAuth from '../locales/es/auth.json';
import esSetup from '../locales/es/setup.json';
import esChat from '../locales/es/chat.json';
import esSidebar from '../locales/es/sidebar.json';
import esErrors from '../locales/es/errors.json';
import esValidation from '../locales/es/validation.json';
import esLanding from '../locales/es/landing.json';

// Korean
import koCommon from '../locales/ko/common.json';
import koAuth from '../locales/ko/auth.json';
import koSetup from '../locales/ko/setup.json';
import koChat from '../locales/ko/chat.json';
import koSidebar from '../locales/ko/sidebar.json';
import koErrors from '../locales/ko/errors.json';
import koValidation from '../locales/ko/validation.json';
import koLanding from '../locales/ko/landing.json';

const i18n = createI18n({
  legacy: false,
  locale: 'es', // Default locale
  fallbackLocale: 'en',
  messages: {
    en: {
      common: enCommon,
      auth: enAuth,
      setup: enSetup,
      chat: enChat,
      sidebar: enSidebar,
      errors: enErrors,
      validation: enValidation,
      landing: enLanding,
    },
    es: {
      common: esCommon,
      auth: esAuth,
      setup: esSetup,
      chat: esChat,
      sidebar: esSidebar,
      errors: esErrors,
      validation: esValidation,
      landing: esLanding,
    },
    ko: {
      common: koCommon,
      auth: koAuth,
      setup: koSetup,
      chat: koChat,
      sidebar: koSidebar,
      errors: koErrors,
      validation: koValidation,
      landing: koLanding,
    },
  },
});

export default i18n;
