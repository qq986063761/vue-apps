import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { federation } from '@module-federation/vite'
import type { LogLevel, RolldownLog, LogOrStringHandler } from 'rolldown'

function suppressVueUsePureAnnotationWarnings(
  level: LogLevel,
  log: RolldownLog,
  defaultHandler: LogOrStringHandler,
): void {
  const id = log.id?.replace(/\\/g, '/') ?? ''

  // 过滤日志
  if (
    log.code === 'INVALID_ANNOTATION' &&
    id.includes('node_modules/@vueuse/core/dist/index.js')
  ) {
    return
  }

  defaultHandler(level, log)
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [
    vue(),
    vueJsx(),
    federation({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './index': './src/exports/index.ts',
      },
      shared: {
        vue: { singleton: true },
        'vue-router': { singleton: true },
        pinia: { singleton: true },
        'element-plus': { singleton: true },
      },
      dev: {
        remoteHmr: true,
      },
      dts: false,
    }),
    vueDevTools(),
  ],
  server: {
    port: 9982,
    cors: true,
    origin: 'http://localhost:9982',
  },
  preview: {
    port: 9982,
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
    rolldownOptions: {
      onLog: suppressVueUsePureAnnotationWarnings,
    },
  },
}))
