const config = require('./webpack.demo.js')
const { merge } = require('webpack-merge')

module.exports = merge(config, {
  mode: 'production'
})