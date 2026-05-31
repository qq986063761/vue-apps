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

// ⚠️ app1/index / app2/index 的 ambient module 声明在 remote-modules.d.ts
// 该文件无顶层 import，确保 declare module 被 TS 视为全新模块声明而非 augmentation
