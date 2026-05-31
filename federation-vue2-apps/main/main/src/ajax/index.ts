import axios, { AxiosInstance } from 'axios'
import type { AjaxConfig } from '../types/remotes'

// 主应用自身的 ajax 实例
const mainAjax: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 —— 主应用
mainAjax.interceptors.request.use(
  config => {
    console.log('[main] request:', config.url)
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器 —— 主应用
mainAjax.interceptors.response.use(
  response => {
    console.log('[main] response:', response.config.url)
    return response
  },
  error => {
    console.error('[main] response error:', error.config?.url)
    return Promise.reject(error)
  }
)

/**
 * 子应用 ajax 实例注册表
 * key: 子应用名称 (app1 / app2)
 * value: 对应的 axios 实例（独立拦截器，互不干扰）
 */
const subAppAjaxMap: Record<string, AxiosInstance> = {}

/**
 * 注册子应用的 ajax 实例
 * 每个子应用维护自己的 axios 实例，包括独立的 baseURL、拦截器等
 */
export function registerSubAppAjax(configs: AjaxConfig[]): void {
  configs.forEach(({ name, ajax }) => {
    if (subAppAjaxMap[name]) {
      console.warn(`[main] 子应用 ${name} 的 ajax 实例已注册，将被覆盖`)
    }
    subAppAjaxMap[name] = ajax
    console.log(`[main] 子应用 ${name} 的 ajax 实例已注册`)
  })
}

/**
 * 获取指定子应用的 ajax 实例
 * @param name - 子应用名称
 * @returns axios 实例，未注册时返回 undefined
 */
export function getSubAppAjax(name: string): AxiosInstance | undefined {
  return subAppAjaxMap[name]
}

export { mainAjax }
export default mainAjax
