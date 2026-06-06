import router, { registerSubAppRoutes } from '@/router'
import { registerSubAppAjax } from '@/ajax'
import { registerSubAppStores } from '@/stores'
import type { AjaxConfig, StoreModuleConfig, SubAppConfig, SubAppExports } from '@/types/remotes'

interface RemoteModule {
  name: string
  loader: () => Promise<unknown>
}

const REMOTE_MODULES: RemoteModule[] = [
  {
    name: 'app1',
    loader: () => import('app1/index'),
  },
  {
    name: 'app2',
    loader: () => import('app2/index'),
  },
]

const remoteModuleMap = REMOTE_MODULES.reduce<Record<string, RemoteModule>>((map, remote) => {
  map[remote.name] = remote
  return map
}, {})

const loadedSubApps = new Set<string>()
const loadingSubApps = new Map<string, Promise<void>>()

let lazyLoadGuardInstalled = false

function normalizeSubAppExports(mod: unknown): SubAppExports {
  if (typeof mod === 'function') {
    return normalizeSubAppExports((mod as () => unknown)())
  }

  const moduleLike = mod as Partial<SubAppExports> & {
    default?: Partial<SubAppExports> | (() => unknown)
  }

  if (moduleLike.routes || moduleLike.store || moduleLike.ajax) {
    return moduleLike as SubAppExports
  }

  if (moduleLike.default) {
    return normalizeSubAppExports(moduleLike.default)
  }

  throw new Error('[main] remote module does not expose routes/store/ajax')
}

async function loadRemoteModule(remote: RemoteModule): Promise<SubAppExports> {
  const mod = await remote.loader()
  return normalizeSubAppExports(mod)
}

export function getSubAppNameFromPath(path: string): string | undefined {
  const name = path.replace(/^\/+/, '').split('/')[0]
  return name && remoteModuleMap[name] ? name : undefined
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
    throw new Error(`[main] missing sub app config: ${name}`)
  }

  const subAppLoading = loadRemoteModule(remote)
    .then((mod) => {
      const subAppConfigs: SubAppConfig[] = []
      const storeModules: StoreModuleConfig[] = []
      const ajaxConfigs: AjaxConfig[] = []

      if (mod.routes) subAppConfigs.push({ prefix: `/${name}`, routes: mod.routes })
      if (mod.store) storeModules.push({ namespace: name, useStore: mod.store })
      if (mod.ajax) ajaxConfigs.push({ name, path: `/${name}`, ajax: mod.ajax })

      registerSubAppRoutes(subAppConfigs)
      registerSubAppStores(storeModules)
      registerSubAppAjax(ajaxConfigs)

      loadedSubApps.add(name)
      console.log(`[main] sub app loaded: ${name}`)
    })
    .catch((err) => {
      console.warn(`[main] sub app load failed: ${name}`, err)
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

  router.beforeEach(async (to) => {
    const name = getSubAppNameFromPath(to.path)

    if (!name || isSubAppLoaded(name)) {
      return true
    }

    try {
      await loadSubApp(name)
      return {
        path: to.path,
        query: to.query,
        hash: to.hash,
        replace: true,
      }
    } catch {
      return false
    }
  })
}
