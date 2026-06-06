import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    federation({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './index': './src/exports/index.ts',
      },
      shared: ['vue', 'vue-router', 'pinia', 'element-plus'],
    }),
    vueDevTools(),
  ],
  server: {
    port: 9981,
    cors: true,
  },
  preview: {
    port: 9981,
    cors: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    target: 'esnext',
    minify: false,
  },
})
