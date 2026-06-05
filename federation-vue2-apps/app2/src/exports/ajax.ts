type AjaxMethod = <T = unknown>(url: string, ...args: unknown[]) => Promise<T>

interface InjectedAjax {
  get: AjaxMethod
  post: AjaxMethod
  put: AjaxMethod
  patch: AjaxMethod
  delete: AjaxMethod
}

interface CreateAjaxOptions {
  ajax: InjectedAjax
  path: string
}

interface App2AjaxModule {
  apiList: Record<string, string>
  ajaxList: {
    getUsers: (params?: Record<string, unknown>) => Promise<unknown>
  }
}

function createApiPath(path: string, api: string): string {
  return `${path.replace(/\/$/, '')}/${api.replace(/^\//, '')}`
}

function createApp2Ajax({ ajax, path }: CreateAjaxOptions): App2AjaxModule {
  const apiList = {
    getUsers: createApiPath(path, '/getUsers')
  }

  return {
    apiList,
    ajaxList: {
      getUsers(params = {}) {
        return ajax.post(apiList.getUsers, params)
      }
    }
  }
}

export default createApp2Ajax
