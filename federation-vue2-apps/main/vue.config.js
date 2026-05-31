const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

/**
 * 子应用 remoteEntry.js 地址
 * 可通过环境变量覆盖：
 *   cross-env APP1_URL=http://prod:8081 APP2_URL=http://prod:8082 npm run build
 */
const APP1_URL = process.env.APP1_URL || 'http://localhost:8081'
const APP2_URL = process.env.APP2_URL || 'http://localhost:8082'

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  devServer: {
    port: 8080
  },
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'main',
        // ===== 标准 MF remote URL 格式 =====
        // webpack 自行负责脚本注入、容器初始化、shared scope 协商
        // import('app1/index') 原生可用
        remotes: {
          app1: `app1@${APP1_URL}/remoteEntry.js`,
          app2: `app2@${APP2_URL}/remoteEntry.js`,
        },
        shared: {
          vue: { singleton: true, requiredVersion: '^2.6.14' },
          'vue-router': { singleton: true, requiredVersion: '^3.5.1' },
          vuex: { singleton: true, requiredVersion: '^3.6.2' },
          'element-ui': { singleton: true, requiredVersion: '^2.15.14' }
        }
      })
    ]
  }
})
