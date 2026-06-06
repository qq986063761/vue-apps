const { defineConfig } = require('@vue/cli-service')

// 检测是否为 lib 模式构建（--target lib）
// npm run build → vue-cli-service build（无 --target）
// npm run build:lib → vue-cli-service build --target lib ...
const isLibMode = process.argv.includes('--target') && process.argv.includes('lib')

module.exports = defineConfig({
  // lib 模式输出到 lib/，demo 构建输出到 dist/
  outputDir: isLibMode ? 'lib' : 'dist',

  publicPath: './',

  // CSS 提取为独立文件
  css: {
    extract: true,
    sourceMap: true
  },

  // 为库构建保留 sourceMap
  productionSourceMap: true,

  // 确保 babel 转译所有依赖
  transpileDependencies: true,

  chainWebpack: config => {
    if (isLibMode) {
      // lib 模式下移除 html-webpack-plugin，防止生成无意义的 demo.html
      config.plugins.delete('html')
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
    }
  }
})
