/**
 * ============ Module Federation 动态远程加载工具 ============
 *
 * 不在 webpack 配置中声明 remotes，而是在运行时加载 remoteEntry.js，
 * 然后从 window[scope] 读取 Module Federation 容器。
 *
 * 使用方式：
 *   const mod = await loadRemote({
 *     url: 'http://localhost:8081/remoteEntry.js',
 *     scope: 'app1',
 *     module: './index'
 *   })
 */

interface RemoteLoaderOptions {
  /** remoteEntry.js 的完整 URL */
  url: string
  /** ModuleFederationPlugin 中配置的 name */
  scope: string
  /** exposes 中配置的模块路径，如 './index' */
  module: string
}

declare const __webpack_init_sharing__: (scope: 'default') => Promise<void>
declare const __webpack_share_scopes__: { default: unknown }

const scriptCache = new Map<string, Promise<any>>()

export async function loadRemote({ url, scope, module }: RemoteLoaderOptions): Promise<any> {
  // 去重：同一 scope 只加载一次，直接返回缓存的 Promise
  const cached = scriptCache.get(scope)
  if (cached) return cached

  const promise = doLoad({ url, scope, module })
  scriptCache.set(scope, promise)
  return promise
}

async function doLoad({ url, scope, module }: RemoteLoaderOptions): Promise<any> {
  // ============ 1. 加载 remoteEntry.js ============
  const container = await new Promise<any>((resolve, reject) => {
    const existingContainer = (window as any)[scope]
    if (existingContainer) {
      resolve(existingContainer)
      return
    }

    const timeout = setTimeout(() => {
      reject(new Error(`[loadRemote] ${scope} 容器初始化超时 (30s)`))
    }, 30000)

    const existingScript = document.querySelector<HTMLScriptElement>(`script[data-mf-scope="${scope}"]`)
    const script = existingScript || document.createElement('script')

    script.onload = () => {
      const loadedContainer = (window as any)[scope]
      clearTimeout(timeout)

      if (!loadedContainer) {
        reject(new Error(`[loadRemote] ${scope} 容器未挂载到 window.${scope}`))
        return
      }

      resolve(loadedContainer)
    }

    script.onerror = () => {
      clearTimeout(timeout)
      reject(new Error(`[loadRemote] ${scope} 脚本加载失败: ${url}`))
    }

    if (!existingScript) {
      script.src = url
      script.type = 'text/javascript'
      script.async = true
      script.dataset.mfScope = scope
      document.head.appendChild(script)
    }
  })

  // ============ 2. 初始化 shared scope ============
  await __webpack_init_sharing__('default')
  if (typeof container.init === 'function') {
    await container.init(__webpack_share_scopes__.default)
  }

  // ============ 3. 获取模块 ============
  const factory = await container.get(module)
  const mod = factory()
  console.log(`[loadRemote] ${scope} → ${module} 加载成功`)
  return mod
}
