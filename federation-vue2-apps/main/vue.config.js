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
        remotes: {
          app1: 'app1@http://localhost:8081/remoteEntry.js',
          app2: 'app2@http://localhost:8082/remoteEntry.js'
        },
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
