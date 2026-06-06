const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: './',
  
  // CSS 提取为独立文件
  css: {
    extract: true,
    sourceMap: true
  },

  // 为库构建保留 sourceMap
  productionSourceMap: true,

  // 确保 babel 转译所有依赖
  transpileDependencies: true
})
