import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue2(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'My UI Library Demo',
          // injectScript: `<script src="./main.js"></script>`
        }
      }
    })
  ],
  resolve: {
    // 别名，用于内部路径解析
    alias: {
      'my-ui': path.resolve(__dirname, '../src'),
      '~': path.resolve(__dirname, '../src')  // 添加 ~ 别名
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${path.resolve(__dirname, '../src/css/theme.scss')}" as *;@use "${path.resolve(__dirname, '../src/css/mixin.scss')}" as *;`
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: { 
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
})