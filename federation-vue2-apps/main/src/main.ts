// main 应用入口 —— 使用动态 import 启用 Module Federation 异步加载
// 所有初始化逻辑位于 bootstrap.ts 中，确保 webpack 有足够时间协商 shared 模块
import './assets/tailwind.css'
import('./bootstrap')
