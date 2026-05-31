/**
 * ============ Module Federation 动态远程加载工具 ============
 *
 * 不在 webpack 配置中声明 remotes，而是运行时 fetch remoteEntry.js 源码，
 * 注入"容器暴露到 window"的逻辑后执行，不依赖 webpack 的 library 选项。
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
  // ============ 1. Fetch remoteEntry.js 源码 ============
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`[loadRemote] 获取 ${url} 失败: ${response.status}`)
  }
  let code = await response.text()

  // ============ 2. 修复 publicPath 为绝对 URL ============
  // 远程应用的 publicPath 为 "/"，在 Blob URL 上下文中会解析错误的主应用地址
  // 将其替换为绝对 URL，确保远程应用的 chunk 从正确地址加载
  const baseUrl = url.substring(0, url.lastIndexOf('/') + 1)
  code = code.replace(
    /__webpack_require__\.p\s*=\s*"[^"]*"/g,
    `__webpack_require__.p = "${baseUrl}"`
  )

  // ============ 3. 注入代码：在 IIFE 关闭前暴露容器 ============
  // remoteEntry.js 结构：(function() { ... __webpack_require__("webpack/container/entry/<scope>") ... })()
  // 我们在 IIFE 关闭前插入回调，调用 __webpack_require__ 获取容器并传给全局回调
  const callbackName = `__mf_load_${scope}`
  const containerModuleId = `webpack/container/entry/${scope}`

  // 找到最后一个 })(); —— webpack bootstrap IIFE 的结束位置
  const iifeEnd = code.lastIndexOf('})();')
  if (iifeEnd === -1) {
    // fallback：尝试找 })(window);
    const altEnd = code.lastIndexOf('})(window);')
    if (altEnd === -1) {
      throw new Error(`[loadRemote] 无法解析 ${url}，找不到 IIFE 结束标记`)
    }
    const injected = `\n;window["${callbackName}"]&&window["${callbackName}"](__webpack_require__("${containerModuleId}"));`
    code = code.slice(0, altEnd) + injected + code.slice(altEnd)
  } else {
    const injected = `\n;window["${callbackName}"]&&window["${callbackName}"](__webpack_require__("${containerModuleId}"));`
    code = code.slice(0, iifeEnd) + injected + code.slice(iifeEnd)
  }

  // ============ 4. 通过 Blob URL 执行注入后的代码 ============
  const container = await new Promise<any>((resolve, reject) => {
    const timeout = setTimeout(() => {
      delete (window as any)[callbackName]
      reject(new Error(`[loadRemote] ${scope} 容器初始化超时 (30s)`))
    }, 30000)

    ;(window as any)[callbackName] = (c: any) => {
      clearTimeout(timeout)
      delete (window as any)[callbackName]
      resolve(c)
    }

    const blob = new Blob([code], { type: 'application/javascript' })
    const blobUrl = URL.createObjectURL(blob)
    const script = document.createElement('script')
    script.src = blobUrl

    script.onerror = () => {
      clearTimeout(timeout)
      delete (window as any)[callbackName]
      URL.revokeObjectURL(blobUrl)
      reject(new Error(`[loadRemote] ${scope} 脚本执行失败`))
    }

    script.onload = () => {
      URL.revokeObjectURL(blobUrl)
      // onload 只表示脚本执行完毕，容器已通过回调 resolve
    }

    document.head.appendChild(script)
  })

  // ============ 5. 初始化 shared scope ============
  const shareScopes = (window as any).__webpack_share_scopes__
  if (shareScopes?.default && typeof container.init === 'function') {
    await container.init(shareScopes.default)
  }

  // ============ 6. 获取模块 ============
  const factory = await container.get(module)
  const mod = factory()
  console.log(`[loadRemote] ${scope} → ${module} 加载成功`)
  return mod
}
