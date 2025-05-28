const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const vue = require('rollup-plugin-vue')
const scss = require('rollup-plugin-scss')
const path = require('path')
const postcss = require('rollup-plugin-postcss')

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
    // 浏览器兼容css属性补全
    postcss({
      plugins: []
    }),
    scss({
      fileName: 'my-ui.css'
    }),
    vue({
      // 单文件注入 css 预处理数据
      data: {
        // @use "~/css/theme.scss" as *;@use "~/css/mixin.scss" as *;
        // @import "~/css/theme.scss";@import "~/css/mixin.scss";
        scss: () => `@use "~/css/theme.scss" as *;@use "~/css/mixin.scss" as *;`, 
      },
      style: {
        preprocessOptions: {
          scss: {
            importer: [
              function (url, prev) {
                return {
                  // 定义 scss 根路径
                  file: url.replace(/^~/, path.resolve(__dirname, './src'))
                }
              },
            ],
          },
        },
      },
    }),
  ]
}