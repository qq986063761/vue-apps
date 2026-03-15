import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import qiankun from 'vite-plugin-qiankun'
import { resolve } from 'path'

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  plugins: [
    vue(),
    qiankun('child1-app', { useDevMode: isDev }),
    federation({
      name: 'child1',
      filename: 'remoteEntry.js',
      exposes: {
        './export': './src/plugins/export.js'
      },
      shared: ['vue']
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
