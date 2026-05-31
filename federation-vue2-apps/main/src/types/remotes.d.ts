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
export interface AjaxConfig {
  name: string
  ajax: AxiosInstance
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
  ajax: AxiosInstance
}

// ============ loadRemote 远程加载工具的类型 ============
// 见 src/utils/loadRemote.ts
export interface RemoteConfig {
  name: string
  url: string
  scope: string
  module: string
}
