import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: fileURLToPath(new URL('../../libs/shared/src/assets/index.css', import.meta.url))
  },
  alias: {
    '@obai/shared': fileURLToPath(new URL('../../libs/shared/src', import.meta.url))
  },
  vite: {
    define: {
      'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:8000/api')
    },
    server: {
      fs: {
        allow: [fileURLToPath(new URL('../..', import.meta.url))]
      }
    },
    optimizeDeps: {
      include: [
        'vue-i18n',
        'vee-validate',
        '@vee-validate/zod',
        'zod',
      ]
    }
  }
});
