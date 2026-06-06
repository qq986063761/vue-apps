import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    federation({
      name: 'main',
      remotes: {
        app1: {
          type: 'module',
          name: 'app1',
          entry: 'http://localhost:9981/remoteEntry.js',
          entryGlobalName: 'app1',
          shareScope: 'default',
        },
        app2: {
          type: 'module',
          name: 'app2',
          entry: 'http://localhost:9982/remoteEntry.js',
          entryGlobalName: 'app2',
          shareScope: 'default',
        },
      },
      filename: 'remoteEntry.js',
      shared: {
        vue: { singleton: true },
        'vue-router': { singleton: true },
        pinia: { singleton: true },
        'element-plus': { singleton: true },
      },
      shareStrategy: 'loaded-first',
      dev: {
        remoteHmr: true,
      },
      dts: false,
    }),
    vueDevTools(),
  ],
  server: {
    port: 9980,
    origin: 'http://localhost:9980',
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
