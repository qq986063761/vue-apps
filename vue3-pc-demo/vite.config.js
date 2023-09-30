import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 访问根路径
  base: '/web/',
  build: {
    // 文件输出的根路径
    outDir: 'dist/web',
    rollupOptions: {
      output: {
        // 分割打包
        manualChunks: {
          vue: ['vue', 'vue-router'],
          element: ['element-plus'],
          'routerStore': [
            './src/views/api/routerStore.vue',
            './src/views/api/routerStoreChild.vue',
            './src/views/api/routerStoreChild2.vue'
          ],
        }
      }
    }
  },
  css: {
    // css 预处理
    preprocessorOptions: {
      scss: {
        additionalData: `@import '/src/assets/theme.scss';`
      }
    }
  },
})
