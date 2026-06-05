import Vue from 'vue'
import axios, { AxiosInstance } from 'axios'
import type { AjaxConfig, SubAppAjaxModule } from '../types/remotes'

export type AjaxRequestMethod = (...args: unknown[]) => Promise<unknown>
export type AjaxRequestMethodMap = Record<string, AjaxRequestMethod>

export interface MainAjaxList {
  getUsers: AjaxRequestMethod
  [key: string]: AjaxRequestMethod
}

export interface GlobalAjaxMap {
  getUsers: AjaxRequestMethod
  [key: string]: AjaxRequestMethod | AjaxRequestMethodMap
}

// 主应用自身的 ajax 实例
const mainAjax: AxiosInstance = axios.create({
  baseURL: '/',
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
    const url = error && error.config ? error.config.url : undefined
    console.error('[main] response error:', url)
    return Promise.reject(error)
  }
)

// 主应用自身接口配置会直接展开到 this.$ajax 根节点下
const mainApiList = {
  getUsers: '/getUsers'
}

const mainAjaxList: MainAjaxList = {
  getUsers(params = {}) {
    return mainAjax.post(mainApiList.getUsers, params)
  }
}

/**
 * 子应用 ajax 配置注册表
 * key: 子应用名称 (app1 / app2)
 * value: 子应用基于主应用 ajax/path 组合出的 apiList 和 ajaxList
 */
let subAppAjaxMap: Record<string, SubAppAjaxModule> = {}

function normalizePath(path: string): string {
  const normalized = path.replace(/\/+$/, '')
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

function createGlobalAjax(): GlobalAjaxMap {
  return Object.keys(subAppAjaxMap).reduce<GlobalAjaxMap>(
    (ajaxMap, name) => ({
      ...ajaxMap,
      [name]: subAppAjaxMap[name].ajaxList
    }),
    { ...mainAjaxList }
  )
}

/**
 * 将主应用 ajaxList 展开到根节点，子应用 ajaxList 按应用名挂载。
 * 最终调用方式：
 * - 主应用：this.$ajax.getUsers(...)
 * - 子应用：this.$ajax.app1.getUsers(...) / this.$ajax.app2.getUsers(...)
 */
export function installGlobalAjax(): void {
  const globalAjax = createGlobalAjax()
  const vuePrototype = Vue.prototype as Vue & { $ajax: GlobalAjaxMap }
  vuePrototype.$ajax = globalAjax
  console.log('[main] 全局 $ajax 已注册:', globalAjax)
}

/**
 * 注册子应用 ajax 配置
 * 子应用只声明接口配置，主应用在这里注入统一的 axios 实例和子应用 url 前缀
 */
export function registerSubAppAjax(configs: AjaxConfig[]): void {
  subAppAjaxMap = configs.reduce<Record<string, SubAppAjaxModule>>((ajaxMap, { name, path, ajax }) => {
    if (ajaxMap[name]) {
      console.warn(`[main] 子应用 ${name} 的 ajax 配置已注册，将被覆盖`)
    }

    const appPath = normalizePath(path || `/${name}`)
    const appAjaxModule = ajax({
      ajax: mainAjax,
      path: appPath
    })
    console.log(`[main] 子应用 ${name} 的 ajax 配置已注册，path: ${appPath}`)

    return {
      ...ajaxMap,
      [name]: appAjaxModule
    }
  }, subAppAjaxMap)

  installGlobalAjax()

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
