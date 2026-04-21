/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@obai/shared': path.resolve(__dirname, '../../libs/shared/src')
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, '../..')]
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
