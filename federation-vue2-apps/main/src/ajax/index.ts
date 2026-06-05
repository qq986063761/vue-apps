import axios, { AxiosInstance } from 'axios'
import type { AjaxConfig, SubAppAjaxModule } from '../types/remotes'

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
 * 子应用 ajax 配置注册表
 * key: 子应用名称 (app1 / app2)
 * value: 子应用基于主应用 ajax/path 组合出的 apiList 和 ajaxList
 */
const subAppAjaxMap: Record<string, SubAppAjaxModule> = {}

function normalizePath(path: string): string {
  const normalized = path.replace(/\/+$/, '')
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

/**
 * 注册子应用 ajax 配置
 * 子应用只声明接口配置，主应用在这里注入统一的 axios 实例和子应用 url 前缀
 */
export function registerSubAppAjax(configs: AjaxConfig[]): void {
  configs.forEach(({ name, path, ajax }) => {
    if (subAppAjaxMap[name]) {
      console.warn(`[main] 子应用 ${name} 的 ajax 配置已注册，将被覆盖`)
    }

    const appPath = normalizePath(path || `/${name}`)
    subAppAjaxMap[name] = ajax({
      ajax: mainAjax,
      path: appPath
    })
    console.log(`[main] 子应用 ${name} 的 ajax 配置已注册，path: ${appPath}`)
  })

  console.log('[main] 当前注册的子应用 ajax 配置:', subAppAjaxMap)
}

/**
 * 获取指定子应用组合后的 ajax 配置
 * @param name - 子应用名称
 * @returns 子应用 apiList 和 ajaxList，未注册时返回 undefined
 */
export function getSubAppAjax(name: string): SubAppAjaxModule | undefined {
  return subAppAjaxMap[name]
}

export { mainAjax }
export default mainAjax
