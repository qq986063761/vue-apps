import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import qiankun from 'vite-plugin-qiankun-lite'
import { resolve } from 'path'

// vite-plugin-qiankun-lite sandbox:true 会对所有 JS 跑 Babel（包含 node_modules），
// 导致现代 ESM（如 @floating-ui/dom）解析失败。
// 用 configResolved hook 包装 qiankun:support-sandbox 插件的 transform，跳过 node_modules。
function patchQiankunSandbox() {
  return {
    name: 'patch-qiankun-sandbox-exclude-node-modules',
    configResolved(cfg) {
      const target = cfg.plugins.find(p => p.name === 'qiankun:support-sandbox')
      if (!target || !target.transform) return
      const original = target.transform
      target.transform = function(code, id, options) {
        // node_modules 和 Module Federation 生成的虚拟/产物文件不走沙箱转换：
        // remoteEntry 和 __federation__ 虚拟模块在主应用上下文运行，不存在 __QIANKUN_WINDOW__
        if (id.includes('node_modules')) return null
        if (id.includes('__federation__') || id.includes('remoteEntry')) return null
        return original.call(this, code, id, options)
      }
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    qiankun({
      name: 'child1-app',
      sandbox: true
    }),
    patchQiankunSandbox(),
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
