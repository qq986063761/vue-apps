const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const vuePlugin = require('rollup-plugin-vue')

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/my-ui.umd.js',
    format: 'umd',
    name: 'MyUi',
  },
  plugins: [
    resolve(),
    commonjs(),
    vuePlugin()
  ]
}