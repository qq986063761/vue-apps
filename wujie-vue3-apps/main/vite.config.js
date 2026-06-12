import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'
import path from 'path'

const remoteDevPorts = {
  child1: 8081,
}

function getRemoteEntry(name, command) {
  if (command === 'serve') {
    return `http://localhost:${remoteDevPorts[name]}/remoteEntry.js`
  }
  return `./${name}/remoteEntry.js`
}

export default defineConfig(({ command }) => ({
  base: './',
  plugins: [
    vue(),
    federation({
      name: 'main',
      filename: 'remoteEntry.js',
      remotes: {
        child1: {
          type: 'module',
          name: 'child1',
          entry: getRemoteEntry('child1', command),
          entryGlobalName: 'child1',
          shareScope: 'default',
        },
      },
      shared: {
        vue: { singleton: false },
        'vue-router': { singleton: false },
        pinia: { singleton: false },
        'element-plus': { singleton: false },
      },
      shareStrategy: 'loaded-first',
      dev: {
        remoteHmr: true,
      },
      dts: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
    cors: true,
    origin: 'http://localhost:8080',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
}))
