const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

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
        // 不在 webpack 配置中声明 remotes，改为运行时动态加载
        // 避免 webpack 在 shared scope 初始化时强制加载所有 remote 容器
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
