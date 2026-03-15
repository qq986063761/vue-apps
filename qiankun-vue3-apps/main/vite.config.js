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
        child1: 'http://localhost:8081/assets/remoteEntry.js'
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
