const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'app1',
        filename: 'remoteEntry.js',
        exposes: {
          './routes': './src/exports/routes.ts',
          './store': './src/exports/store.ts',
          './ajax': './src/exports/ajax.ts'
        },
        shared: {
          vue: { singleton: true, requiredVersion: '^2.6.14' },
          'vue-router': { singleton: true, requiredVersion: '^3.5.1' },
          vuex: { singleton: true, requiredVersion: '^3.6.2' }
        }
      })
    ]
  }
})
