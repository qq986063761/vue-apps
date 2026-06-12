import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'
import { resolve } from 'path'

const remoteDevPorts = {
  child1: 8081,
  child2: 8082,
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
        child2: {
          type: 'module',
          name: 'child2',
          entry: getRemoteEntry('child2', command),
          entryGlobalName: 'child2',
          shareScope: 'default',
        },
      },
      shared: {
        vue: { singleton: false },
        'vue-router': { singleton: false },
        vuex: { singleton: false },
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
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8080,
    cors: true,
    origin: 'http://localhost:8080',
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
}))
