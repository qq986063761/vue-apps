// ============ 主应用入口 ============
// 1. 注入远程模块 URL 配置（必须在 webpack MF runtime 初始化之前）
// 2. 动态加载 bootstrap（异步边界，确保 shared modules 协商完成）
import './assets/tailwind.css'
import REMOTE_CONFIG from './config/remotes'

// 将 URL 配置注入 window，供 vue.config.js 中的 promise-based remotes 读取
;(window as any).__REMOTE_URLS__ = REMOTE_CONFIG.reduce(
  (map: Record<string, string>, entry: { name: string; url: string }) => {
    map[entry.name] = entry.url
    return map
  },
  {} as Record<string, string>
)

import('./bootstrap')
