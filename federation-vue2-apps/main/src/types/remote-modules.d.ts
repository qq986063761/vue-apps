// ============ 远程模块类型声明 ============
// ⚠️ 本文件不能有任何顶层 import/export，否则会被 TS 视为模块文件
// 导致 declare module 变成 augmentation 而非 ambient declaration

declare module 'app1/index' {
  export const routes: import('vue-router').RouteConfig[]
  export const store: {
    namespaced?: boolean
    state?: Record<string, unknown>
    getters?: Record<string, (...args: unknown[]) => unknown>
    mutations?: Record<string, (...args: unknown[]) => void>
    actions?: Record<string, (...args: unknown[]) => unknown>
    modules?: Record<string, unknown>
  }
  export const ajax: import('axios').AxiosInstance
}

declare module 'app2/index' {
  export const routes: import('vue-router').RouteConfig[]
  export const store: {
    namespaced?: boolean
    state?: Record<string, unknown>
    getters?: Record<string, (...args: unknown[]) => unknown>
    mutations?: Record<string, (...args: unknown[]) => void>
    actions?: Record<string, (...args: unknown[]) => unknown>
    modules?: Record<string, unknown>
  }
  export const ajax: import('axios').AxiosInstance
}
