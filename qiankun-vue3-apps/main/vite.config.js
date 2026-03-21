import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'main',
      remotes: {
        child1: {
          // 运行时从 window.__APP_CONFIG__.federation.child1 读取 origin，
          // 未设置时退回 http://localhost:8081，避免 config.js 未加载时报错。
          external: `Promise.resolve(
            ((window.__APP_CONFIG__?.federation?.child1) || 'http://localhost:8081')
            + '/remoteEntry.js'
          )`,
          externalType: 'promise',
          format: 'esm',
          from: 'vite'
        },
        child2: {
          external: `Promise.resolve(
            ((window.__APP_CONFIG__?.federation?.child2) || 'http://localhost:8082')
            + '/remoteEntry.js'
          )`,
          externalType: 'promise',
          format: 'esm',
          from: 'vite'
        }
      },
      shared: ['vue']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
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
  }
})
