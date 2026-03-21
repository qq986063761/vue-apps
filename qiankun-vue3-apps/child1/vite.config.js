import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import qiankun from 'vite-plugin-qiankun-lite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    qiankun({
      name: 'child1-app',
      sandbox: false
    }),
    federation({
      name: 'child1',
      filename: 'remoteEntry.js',
      exposes: {
        './export': './src/plugins/export.js'
      },
      shared: ['vue'],
//   shared: {
//     vue: {
//       singleton: false, // 设置为 false，允许每个应用使用自己的 Vue 实例（适用于版本不一致的情况）
//     },
//   },
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8081,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
  },
  preview: {
    port: 8081,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
