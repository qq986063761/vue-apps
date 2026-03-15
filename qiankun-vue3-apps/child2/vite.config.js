import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import qiankun from 'vite-plugin-qiankun'
import { resolve } from 'path'

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  plugins: [
    vue(),
    qiankun('child2-app', { useDevMode: isDev }),
    federation({
      name: 'child2',
      filename: 'remoteEntry.js',
      shared: ['vue']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8082,
    cors: true,
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
  }
})
