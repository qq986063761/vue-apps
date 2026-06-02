const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

function getRemoteEntry(appName, host) {
  if (process.env.NODE_ENV !== 'development') {
    host = './' + appName // 生产环境使用相对路径
  }

  // 开发环境
  return appName + '@' + host + '/remoteEntry.js'
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    port: 8080
  },
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'main',
        remotes: {
          app1: getRemoteEntry('app1', 'http://localhost:8081'),
          app2: getRemoteEntry('app2', 'http://localhost:8082')
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
