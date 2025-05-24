const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.base.js')

module.exports = {
  mode: 'development',
  entry: {
    app: './demo/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: '[name]_[hash].js'
  },
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: path.posix.join('static', '[name].[hash:7].[ext]')
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      filename: 'index.html',
      chunks: ['app']
    })
  ],
  resolve: {
    extensions: commonConfig.resolve.extensions,
    alias: {
      ...commonConfig.resolve.alias,
      'demo': path.resolve(__dirname, '../demo')
    }
  }
}