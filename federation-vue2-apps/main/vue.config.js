const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

function getRemoteEntry(envName, fallbackBaseUrl) {
  const value = process.env[envName] || fallbackBaseUrl
  return value.endsWith('remoteEntry.js') ? value : `${value.replace(/\/$/, '')}/remoteEntry.js`
}

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
        remotes: {
          app1: `app1@${getRemoteEntry('VUE_APP_APP1_URL', 'http://localhost:8081')}`,
          app2: `app2@${getRemoteEntry('VUE_APP_APP2_URL', 'http://localhost:8082')}`
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
