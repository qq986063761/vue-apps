import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import type { App } from 'vue'
import type {
  AjaxConfig,
  InjectedSubAppAjax,
  SubAppAjaxModule,
} from '@/types/remotes'
import type { GlobalAjax } from '@/types/global-properties'

export type AjaxRequestMethod = (...args: unknown[]) => Promise<unknown>
export type AjaxRequestMethodMap = Record<string, AjaxRequestMethod>

type SubAppAjaxMethodName = 'get' | 'post' | 'put' | 'patch' | 'delete'

const mainAjax: AxiosInstance = axios.create({
  baseURL: '/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

mainAjax.interceptors.request.use(
  (config) => {
    console.log('[main] request:', config.url)
    return config
  },
  (error) => Promise.reject(error),
)

mainAjax.interceptors.response.use(
  (response) => {
    console.log('[main] response:', response.config.url)
    return response
  },
  (error) => {
    const url = error && error.config ? error.config.url : undefined
    console.error('[main] response error:', url)
    return Promise.reject(error)
  },
)

const mainApiList = {
  getUsers: '/getUsers',
}

const mainAjaxList: Pick<GlobalAjax, 'getUsers'> = {
  getUsers(params?: unknown) {
    return mainAjax.post(mainApiList.getUsers, params)
  },
}

let vueApp: App | undefined
let subAppAjaxMap: Record<string, SubAppAjaxModule> = {}

function normalizePath(path: string): string {
  const normalized = path.replace(/\/+$/, '')
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

function resolveSubAppApiUrl(appName: string, key: string): string {
  const apiList = subAppAjaxMap[appName]?.apiList
  if (!apiList) {
    throw new Error(`[main] missing ajax apiList for ${appName}`)
  }

  const url = apiList[key]
  if (!url) {
    throw new Error(`[main] missing ajax api key "${key}" for ${appName}`)
  }

  return url
}

function requestSubAppApi(
  this: InjectedSubAppAjax,
  method: SubAppAjaxMethodName,
  key: string,
  params?: unknown,
  config?: AxiosRequestConfig,
): Promise<unknown> {
  const url = resolveSubAppApiUrl(this.appName, key)

  switch (method) {
    case 'get': {
      const requestConfig: AxiosRequestConfig = { ...(config || {}) }
      if (params !== undefined) requestConfig.params = params
      return mainAjax.get(url, requestConfig)
    }
    case 'post':
      return mainAjax.post(url, params, config)
    case 'put':
      return mainAjax.put(url, params, config)
    case 'patch':
      return mainAjax.patch(url, params, config)
    case 'delete': {
      const requestConfig: AxiosRequestConfig = { ...(config || {}) }
      if (params !== undefined) requestConfig.data = params
      return mainAjax.delete(url, requestConfig)
    }
    default:
      return Promise.reject(new Error(`[main] unsupported ajax method: ${method}`))
  }
}

function createSubAppAjaxProxy(appName: string): InjectedSubAppAjax {
  return {
    appName,
    get(key, params, config) {
      return requestSubAppApi.call(this, 'get', key, params, config)
    },
    post(key, params, config) {
      return requestSubAppApi.call(this, 'post', key, params, config)
    },
    put(key, params, config) {
      return requestSubAppApi.call(this, 'put', key, params, config)
    },
    patch(key, params, config) {
      return requestSubAppApi.call(this, 'patch', key, params, config)
    },
    delete(key, params, config) {
      return requestSubAppApi.call(this, 'delete', key, params, config)
    },
  }
}

function createGlobalAjax(): GlobalAjax {
  const ajaxMap: GlobalAjax = { ...mainAjaxList }
  Object.entries(subAppAjaxMap).forEach(([name, module]) => {
    ajaxMap[name] = module.ajaxList
  })
  return ajaxMap
}

export function installGlobalAjax(app: App): void {
  vueApp = app
  vueApp.config.globalProperties.$ajax = createGlobalAjax()
}

export function registerSubAppAjax(configs: AjaxConfig[]): void {
  subAppAjaxMap = configs.reduce<Record<string, SubAppAjaxModule>>(
    (ajaxMap, { name, path, ajax }) => {
      const appPath = normalizePath(path || `/${name}`)
      const subAppAjax = createSubAppAjaxProxy(name)
      const appAjaxModule = ajax({
        ajax: subAppAjax,
        path: appPath,
      })
      console.log(`[main] sub app ajax registered: ${name}, path: ${appPath}`)

      return {
        ...ajaxMap,
        [name]: appAjaxModule,
      }
    },
    subAppAjaxMap,
  )

  if (vueApp) {
    vueApp.config.globalProperties.$ajax = createGlobalAjax()
  }
}

export function getSubAppAjax(name: string): SubAppAjaxModule | undefined {
  return subAppAjaxMap[name]
}

export { mainAjax }
export default mainAjax
