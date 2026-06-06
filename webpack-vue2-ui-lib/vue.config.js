const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 库构建时 CSS 内联到 JS 中，方便按需加载
  css: {
    extract: process.env.NODE_ENV === 'production' ? false : true,
    sourceMap: true
  },

  // 为库构建保留 sourceMap
  productionSourceMap: true,

  // 确保 babel 转译所有依赖
  transpileDependencies: true
})
