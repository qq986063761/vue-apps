import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'
import qiankun from 'vite-plugin-qiankun'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [
    vue(),
    qiankun('child2-app', { useDevMode: true }),
    federation({
      name: 'child2',
      filename: 'remoteEntry.js',
      shared: {
        vue: { singleton: false },
        'vue-router': { singleton: false },
        vuex: { singleton: false },
        'element-plus': { singleton: false },
      },
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
    port: 8082,
    cors: true,
    origin: 'http://localhost:8082',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
  },
  preview: {
    port: 8082,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
}))
