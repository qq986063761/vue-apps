import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue2(),
    // legacy({
    //   targets: ['defaults', 'not IE 11']
    // }),
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
    alias: {
      'my-ui': path.resolve(__dirname, '../src')
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
        main: path.resolve(__dirname, 'index.html') // path.resolve(__dirname, 'main.js')
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
})