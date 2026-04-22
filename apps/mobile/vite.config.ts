/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      vue(),
      legacy()
    ],
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'http://localhost:8000/api')
    },
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
  };
});
