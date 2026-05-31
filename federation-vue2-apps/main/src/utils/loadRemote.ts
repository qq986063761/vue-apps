/**
 * ============ Module Federation 动态远程加载工具 ============
 *
 * 不在 webpack 配置中声明 remotes，而是在运行时按需加载 remoteEntry.js，
 * 避免 webpack 在 shared scope 初始化时强制加载所有 remote 容器。
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
  /** ModuleFederationPlugin 中配置的 name（全局变量名） */
  scope: string
  /** exposes 中配置的模块路径，如 './index' */
  module: string
}

/**
 * 加载并获取 Module Federation 远程模块
 *
 * 流程：
 * 1. 动态插入 <script> 标签加载 remoteEntry.js
 * 2. 等待脚本加载完成
 * 3. 调用 remote.init() 将主应用的 shared scope 注入到远程容器
 * 4. 调用 remote.get() 获取模块工厂函数
 * 5. 执行工厂函数返回模块
 */
export async function loadRemote({ url, scope, module }: RemoteLoaderOptions): Promise<any> {
  // 1. 加载 remoteEntry.js（去重，同一 scope 只加载一次）
  await loadScript(url, scope)

  // 2. 获取远程容器（webpack 将其挂载到 window[scope]）
  const container = (window as any)[scope]
  if (!container) {
    throw new Error(`[loadRemote] 远程容器 ${scope} 未找到，请确认 ${url} 可访问`)
  }

  // 3. 初始化共享作用域 —— 将主应用的 shared scope 注入到远程容器
  //    确保远程模块使用主应用已加载的共享依赖，而非加载自己的副本
  if ((window as any).__webpack_share_scopes__) {
    const shareScope = (window as any).__webpack_share_scopes__.default
    if (shareScope && typeof container.init === 'function') {
      await container.init(shareScope)
    }
  }

  // 4. 获取模块工厂函数并执行
  const factory = await container.get(module)
  const mod = factory()
  return mod
}

// ============ 脚本加载去重缓存 ============
const scriptCache = new Map<string, Promise<void>>()

function loadScript(url: string, scope: string): Promise<void> {
  const key = scope

  // 已加载过，直接返回
  if (scriptCache.has(key)) {
    return scriptCache.get(key)!
  }

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    script.async = true

    script.onload = () => {
      console.log(`[loadRemote] ${scope} remoteEntry.js 加载成功`)
      resolve()
    }

    script.onerror = () => {
      const err = new Error(`[loadRemote] ${scope} remoteEntry.js 加载失败: ${url}`)
      scriptCache.delete(key) // 允许重试
      reject(err)
    }

    document.head.appendChild(script)
  })

  scriptCache.set(key, promise)
  return promise
}
