type AjaxRequestMethod = (...args: unknown[]) => Promise<unknown>
type AjaxRequestMethodMap = Record<string, AjaxRequestMethod>

export interface GlobalAjax {
  getUsers: AjaxRequestMethod
  app1?: AjaxRequestMethodMap
  app2?: AjaxRequestMethodMap
  [key: string]: AjaxRequestMethod | AjaxRequestMethodMap | undefined
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $ajax: GlobalAjax
  }
}
