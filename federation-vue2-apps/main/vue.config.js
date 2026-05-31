const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080
  },
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'main',
        // 不在构建时绑定远程地址 —— 运行时由 loadRemote() 动态加载
        shared: {
          vue: { singleton: true, eager: true, requiredVersion: '^2.6.14' },
          'vue-router': { singleton: true, eager: true, requiredVersion: '^3.5.1' },
          vuex: { singleton: true, eager: true, requiredVersion: '^3.6.2' },
          'element-ui': { singleton: true, eager: true, requiredVersion: '^2.15.14' }
        }
      })
    ]
  }
})
