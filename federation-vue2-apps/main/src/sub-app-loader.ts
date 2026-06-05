import router, { registerSubAppRoutes } from './router'
import { registerSubAppStores } from './store'
import { registerSubAppAjax } from './ajax'
import type { AjaxConfig, StoreModuleConfig, SubAppConfig, SubAppExports } from './types/remotes'

interface RemoteContainer {
  init: (shareScope: unknown) => Promise<void> | void
  get: (module: string) => Promise<() => SubAppExports>
}

interface RemoteModule {
  name: string
  entry: string
  exposedModule: string
}

const REMOTE_MODULES: RemoteModule[] = [
  {
    name: 'app1',
    entry: getRemoteEntryUrl('app1', 'http://localhost:9981'),
    exposedModule: './index'
  },
  {
    name: 'app2',
    entry: getRemoteEntryUrl('app2', 'http://localhost:9982'),
    exposedModule: './index'
  }
]

const remoteModuleMap = REMOTE_MODULES.reduce<Record<string, RemoteModule>>((map, remote) => {
  map[remote.name] = remote
  return map
}, {})

const loadedSubApps = new Set<string>()
const loadingSubApps = new Map<string, Promise<void>>()
const remoteEntryLoaders = new Map<string, Promise<void>>()
const initializedContainers = new Set<string>()

let lazyLoadGuardInstalled = false

declare const __webpack_init_sharing__: (scope: string) => Promise<void>
declare const __webpack_share_scopes__: Record<string, unknown>

function getRemoteEntryUrl(name: string, devHost: string): string {
  if (process.env.NODE_ENV !== 'development') {
    return `./${name}/remoteEntry.js`
  }

  return `${devHost}/remoteEntry.js`
}

function getRemoteContainer(name: string): RemoteContainer | undefined {
  return (window as unknown as Record<string, RemoteContainer | undefined>)[name]
}

function loadRemoteEntry(remote: RemoteModule): Promise<void> {
  const existingContainer = getRemoteContainer(remote.name)
  if (existingContainer) return Promise.resolve()

  const existingLoader = remoteEntryLoaders.get(remote.name)
  if (existingLoader) return existingLoader

  const loader = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[data-remote="${remote.name}"]`)
    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        resolve()
        return
      }

      if (existingScript.dataset.error === 'true') {
        reject(new Error(`[main] ${remote.name} remoteEntry.js 加载失败: ${remote.entry}`))
        return
      }

      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error(`[main] ${remote.name} remoteEntry.js 加载失败`)), {
        once: true
      })
      return
    }

    const script = document.createElement('script')
    script.src = remote.entry
    script.type = 'text/javascript'
    script.async = true
    script.dataset.remote = remote.name
    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve()
    }
    script.onerror = () => {
      script.dataset.error = 'true'
      reject(new Error(`[main] ${remote.name} remoteEntry.js 加载失败: ${remote.entry}`))
    }
    document.head.appendChild(script)
  }).finally(() => {
    remoteEntryLoaders.delete(remote.name)
  })

  remoteEntryLoaders.set(remote.name, loader)
  return loader
}

async function loadRemoteModule(remote: RemoteModule): Promise<SubAppExports> {
  await loadRemoteEntry(remote)
  await __webpack_init_sharing__('default')

  const container = getRemoteContainer(remote.name)
  if (!container) {
    throw new Error(`[main] 子应用 ${remote.name} 的容器不存在`)
  }

  if (!initializedContainers.has(remote.name)) {
    await container.init(__webpack_share_scopes__.default)
    initializedContainers.add(remote.name)
  }

  const factory = await container.get(remote.exposedModule)
  return factory()
}

export function getSubAppNameFromPath(path: string): string | undefined {
  const name = path.replace(/^\/+/, '').split('/')[0]
  return remoteModuleMap[name] ? name : undefined
}

export function isSubAppLoaded(name: string): boolean {
  return loadedSubApps.has(name)
}

export async function loadSubApp(name: string): Promise<void> {
  if (loadedSubApps.has(name)) return

  const existingLoading = loadingSubApps.get(name)
  if (existingLoading) return existingLoading

  const remote = remoteModuleMap[name]
  if (!remote) {
    throw new Error(`[main] 未找到子应用配置: ${name}`)
  }

  const subAppLoading = loadRemoteModule(remote)
    .then((mod) => {
      const subAppConfigs: SubAppConfig[] = []
      const storeModules: StoreModuleConfig[] = []
      const ajaxConfigs: AjaxConfig[] = []

      if (mod.routes) subAppConfigs.push({ prefix: `/${name}`, routes: mod.routes })
      if (mod.store) storeModules.push({ namespace: name, module: mod.store })
      if (mod.ajax) ajaxConfigs.push({ name, path: `/${name}`, ajax: mod.ajax })

      registerSubAppRoutes(subAppConfigs)
      registerSubAppStores(storeModules)
      registerSubAppAjax(ajaxConfigs)

      loadedSubApps.add(name)
      console.log(`[main] 子应用 ${name} 懒加载成功`)
    })
    .catch((err) => {
      console.warn(`[main] 子应用 ${name} 加载失败，请确认 ${name} 的 remoteEntry.js 可访问:`, err)
      throw err
    })
    .finally(() => {
      loadingSubApps.delete(name)
    })

  loadingSubApps.set(name, subAppLoading)
  return subAppLoading
}

export function setupSubAppLazyLoadGuard(): void {
  if (lazyLoadGuardInstalled) return
  lazyLoadGuardInstalled = true

  router.beforeEach(async (to, _from, next) => {
    const name = getSubAppNameFromPath(to.path)

    if (!name || isSubAppLoaded(name)) {
      next()
      return
    }

    try {
      await loadSubApp(name)
      next({
        path: to.path,
        query: to.query,
        hash: to.hash,
        replace: true
      })
    } catch (err) {
      next(false)
    }
  })
}
