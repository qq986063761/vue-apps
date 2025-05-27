const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const vuePlugin = require('rollup-plugin-vue')
const scss = require('rollup-plugin-scss')

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
    scss({
      fileName: 'my-ui.css',
      // 添加全局 SCSS 变量和 mixin
      prependData: `@import "/src/css/mixin.scss";`
    }),
    vuePlugin(),
  ]
}