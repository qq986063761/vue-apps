import type { SubAppExports } from '../types/remotes'

/**
 * ============ 运行时动态加载远程 MF 模块 ============
 * 不依赖 webpack build-time 的 remotes 配置，
 * 而是运行时通过 <script> 注入并调用 MF 容器 API 获取模块
 *
 * 用法：
 *   const app1 = await loadRemote({ name: 'app1', url: 'http://localhost:8081' })
 *   // app1.routes / app1.store / app1.ajax
 */

declare const __webpack_init_sharing__: (scope: string) => Promise<void>
declare const __webpack_share_scopes__: { default: unknown }

type RemoteContainer = { init: (scope: unknown) => Promise<void>; get: (exposed: string) => Promise<() => Record<string, unknown>> }

/** 已加载的远程容器缓存，避免重复注入 script 标签 */
const containerCache: Record<string, RemoteContainer> = {}

/**
 * 通过创建 <script> 标签加载 remoteEntry.js，
 * 并调用 MF 容器生命周期返回暴露的模块
 */
export async function loadRemote(entry: { name: string; url: string }): Promise<SubAppExports | null> {
  const { name, url } = entry

  // 已加载过，直接用缓存的容器
  if (containerCache[name]) {
    return getExposed<SubAppExports>(containerCache[name], name)
  }

  try {
    // 1. 动态注入 <script src="remoteEntry.js">
    await injectScript(name, `${url}/remoteEntry.js`)

    // 2. 获取 window 上注册的容器
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const container = (window as any)[name] as RemoteContainer
    if (!container || typeof container.init !== 'function') {
      throw new Error(`远程容器 ${name} 未在 window 上注册`)
    }

    // 3. 初始化共享作用域（让 remote 使用 host 的 vue/vue-router/vuex 单例）
    await __webpack_init_sharing__('default')
    await container.init(__webpack_share_scopes__.default)

    containerCache[name] = container
    console.log(`[main] 子应用 ${name} 远程模块加载成功: ${url}`)

    return getExposed<SubAppExports>(container, name)
  } catch (err) {
    console.warn(`[main] 加载子应用 ${name} 失败，可能未启动:`, (err as Error).message)
    return null
  }
}

/**
 * 从容器中获取暴露的模块
 */
async function getExposed<T>(
  container: { get: (exposed: string) => Promise<() => Record<string, unknown>> },
  _name: string
): Promise<T> {
  const factory = await container.get('./index')
  const module = factory()

  // 有些 webpack 构建产物会包一层 default，防御性解包
  const hasDefault = module.default && typeof module.default === 'object' && Object.keys(module.default as object).length > 0
  if (hasDefault) {
    return module.default as T
  }
  return module as unknown as T
}

/**
 * 注入 <script> 标签并等待加载完成
 */
function injectScript(name: string, src: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[data-remote="${name}"]`)
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.setAttribute('data-remote', name)
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`加载 ${src} 失败`))
    document.head.appendChild(script)
  })
}
