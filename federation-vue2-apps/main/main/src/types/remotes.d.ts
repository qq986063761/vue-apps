import { RouteConfig } from 'vue-router'
import { AxiosInstance } from 'axios'

// ============ 子应用 Store 模块配置 ============
// 使用宽松定义以兼容运行时的动态注册
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

// ============ 远程模块类型声明 ============
declare module 'app1/routes' {
  const routes: RouteConfig[]
  export default routes
}

declare module 'app1/store' {
  const storeModule: StoreModuleConfig['module']
  export default storeModule
}

declare module 'app1/ajax' {
  const ajax: AxiosInstance
  export default ajax
}

declare module 'app2/routes' {
  const routes: RouteConfig[]
  export default routes
}

declare module 'app2/store' {
  const storeModule: StoreModuleConfig['module']
  export default storeModule
}

declare module 'app2/ajax' {
  const ajax: AxiosInstance
  export default ajax
}
