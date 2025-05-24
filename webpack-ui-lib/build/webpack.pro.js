const config = require('./webpack.base.js')
const { merge } = require('webpack-merge')

module.exports = merge(config, {
  mode: 'production',
  output: {
    filename: 'wape-ui.min.js'
  }
})