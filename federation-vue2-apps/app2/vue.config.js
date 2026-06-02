const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'auto',
  devServer: {
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    ...(process.env.NODE_ENV === 'development' && {
      optimization: {
        splitChunks: false // 必须，不然 main 引入报错
      } || {}
    }),
    plugins: [
      new ModuleFederationPlugin({
        name: 'app2',
        filename: 'remoteEntry.js',
        exposes: {
          './index': './src/exports/index.ts'
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
