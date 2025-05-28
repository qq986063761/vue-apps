const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const vue = require('rollup-plugin-vue')
const scss = require('rollup-plugin-scss')
const path = require('path')
const postcss = require('rollup-plugin-postcss')
const url = require('@rollup/plugin-url')
const terser = require('@rollup/plugin-terser')
const { visualizer } = require("rollup-plugin-visualizer")

const isAnalyze = process.argv.includes('--analyze')

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
    // 静态资源处理
    url({
      fileName: '[dirname][name][extname]', // [hash]
      limit: 0, // 设置为0表示所有文件都保留为原文件
      publicPath: './dist/', // 写到代码中的根路径
      // include: ['**/*.png', '**/*.jpg'], // 指定处理的文件类型
      // emitFiles: true, // 输出文件到目录
    }),
    // css 文件预处理
    postcss({
      plugins: [
        require('autoprefixer'),
        require('postcss-preset-env')
      ],
      extensions: ['.css', '.scss'],
      // 压缩
      minimize: true,
      // 可选：将 CSS 提取到单独的文件
      extract: 'my-ui.css'
    }),
    // 用了 postcss 插件，就不需要 scss 插件了
    // scss({
    //   fileName: 'my-ui.css'
    // }),
    // vue 文件预处理
    vue({
      // 单文件注入 css 预处理数据
      data: {
        // @use "~/css/theme.scss" as *;@use "~/css/mixin.scss" as *;
        // @import "~/css/theme.scss";@import "~/css/mixin.scss";
        scss: () => `@use "~/css/theme.scss" as *;@use "~/css/mixin.scss" as *;`
      },
      style: {
        postcssPlugins: [
          require('autoprefixer'),
          require('postcss-preset-env')
        ],
        preprocessOptions: {
          scss: {
            importer: [
              function (url, prev) {
                return {
                  // 定义 scss 根路径，用于解析文件中的导入 scss 的路径别名
                  file: url.replace(/^~/, path.resolve(__dirname, './src'))
                }
              },
            ],
          },
        },
      },
    }),
    // 压缩
    terser(),
    // 分析打包结果
    isAnalyze && visualizer()
  ]
}