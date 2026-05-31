/**
 * ============ Module Federation 远程模块类型声明 ============
 *
 * ⚠️ 此文件不得包含任何顶层 import / export 语句
 *    否则 TypeScript 会将其视为"模块文件"，
 *    其中的 declare module 会变成模块扩充（augmentation）而非声明全新的 ambient module
 */

declare module 'app1/index' {
  const routes: import('vue-router').RouteConfig[]
  const store: {
    namespaced?: boolean
    state?: Record<string, unknown>
    getters?: Record<string, (...args: unknown[]) => unknown>
    mutations?: Record<string, (...args: unknown[]) => void>
    actions?: Record<string, (...args: unknown[]) => unknown>
  }
  const ajax: import('axios').AxiosInstance
  export { routes, store, ajax }
}

declare module 'app2/index' {
  const routes: import('vue-router').RouteConfig[]
  const store: {
    namespaced?: boolean
    state?: Record<string, unknown>
    getters?: Record<string, (...args: unknown[]) => unknown>
    mutations?: Record<string, (...args: unknown[]) => void>
    actions?: Record<string, (...args: unknown[]) => unknown>
  }
  const ajax: import('axios').AxiosInstance
  export { routes, store, ajax }
}
