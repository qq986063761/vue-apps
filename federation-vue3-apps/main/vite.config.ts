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
      name: 'main',
      remotes: {
        app1: 'http://localhost:9981/assets/remoteEntry.js',
        app2: 'http://localhost:9982/assets/remoteEntry.js',
      },
      shared: ['vue', 'vue-router', 'pinia', 'element-plus'],
    }),
    vueDevTools(),
  ],
  server: {
    port: 9980,
  },
  preview: {
    port: 9980,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    target: 'esnext',
  },
})
