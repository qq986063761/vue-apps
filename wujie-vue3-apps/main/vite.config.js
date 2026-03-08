import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'main',
      filename: 'remoteEntry.js',
      // 在开发模式下需要声明 remotes，即使 URL 是动态的
      // 这样插件才能生成 virtual:__federation__ 虚拟模块
      // 运行时可以通过 setRemote API 动态更新 URL
      // 注意：开发模式下也需要使用 /assets/remoteEntry.js（需要 child1 先构建）
      remotes: {
        child1: 'http://localhost:8081/assets/remoteEntry.js',
      },
      shared: {
        vue: {
          singleton: false, // 设置为 false，允许每个应用使用自己的 Vue 实例（适用于版本不一致的情况）
        },
      },
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
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
