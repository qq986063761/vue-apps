import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { federation } from '@module-federation/vite'
import type { LogLevel, RolldownLog, LogOrStringHandler } from 'rolldown'

const remoteDevPorts = {
  app1: 9981,
  app2: 9982,
} as const

type RemoteAppName = keyof typeof remoteDevPorts

function suppressVueUsePureAnnotationWarnings(
  level: LogLevel,
  log: RolldownLog,
  defaultHandler: LogOrStringHandler,
): void {
  const id = log.id?.replace(/\\/g, '/') ?? ''

  if (
    log.code === 'INVALID_ANNOTATION' &&
    id.includes('node_modules/@vueuse/core/dist/index.js')
  ) {
    return
  }

  defaultHandler(level, log)
}

function getRemoteEntry(name: RemoteAppName, command: 'serve' | 'build'): string {
  if (command === 'serve') {
    return `http://localhost:${remoteDevPorts[name]}/remoteEntry.js`
  }

  return `./${name}/remoteEntry.js`
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    federation({
      name: 'main',
      remotes: {
        app1: {
          type: 'module',
          name: 'app1',
          entry: getRemoteEntry('app1', command),
          entryGlobalName: 'app1',
          shareScope: 'default',
        },
        app2: {
          type: 'module',
          name: 'app2',
          entry: getRemoteEntry('app2', command),
          entryGlobalName: 'app2',
          shareScope: 'default',
        },
      },
      filename: 'remoteEntry.js',
      shared: {
        vue: { singleton: true },
        'vue-router': { singleton: true },
        pinia: { singleton: true },
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
    rolldownOptions: {
      onLog: suppressVueUsePureAnnotationWarnings,
    },
  },
}))
