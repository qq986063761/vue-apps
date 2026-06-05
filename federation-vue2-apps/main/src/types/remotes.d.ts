import { RouteConfig } from 'vue-router'
import { AxiosInstance } from 'axios'

// ============ 子应用 Store 模块配置 ============
export interface StoreModuleConfig {
  namespace: string
  module: {
    namespaced?: boolean
    state?: Record<string, unknown>
    getters?: Record<string, (...args: unknown[]) => unknown>
    mutations?: Record<string, (...args: unknown[]) => void>
    actions?: Record<string, (...args: unknown[]) => unknown>
    modules?: Record<string, unknown>
  }
}

// ============ 子应用 Ajax 配置 ============
export interface SubAppAjaxFactoryOptions {
  ajax: AxiosInstance
  path: string
}

export interface SubAppAjaxModule {
  apiList: Record<string, string>
  ajaxList: Record<string, (...args: unknown[]) => Promise<unknown>>
}

export type SubAppAjaxFactory = (options: SubAppAjaxFactoryOptions) => SubAppAjaxModule

export interface AjaxConfig {
  name: string
  path?: string
  ajax: SubAppAjaxFactory
}

// ============ 子应用配置（路由注册用） ============
export interface SubAppConfig {
  prefix: string
  routes: Array<RouteConfig>
}

// ============ 子应用统一入口类型 ============
export interface SubAppExports {
  routes: RouteConfig[]
  store: StoreModuleConfig['module']
  ajax: SubAppAjaxFactory
}
