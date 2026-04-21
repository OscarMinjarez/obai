import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
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
    server: {
      fs: {
        allow: [fileURLToPath(new URL('../..', import.meta.url))]
      }
    }
  }
})
