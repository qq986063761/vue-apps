import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 项目访问的根路径
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
  plugins: [vue()],
})
