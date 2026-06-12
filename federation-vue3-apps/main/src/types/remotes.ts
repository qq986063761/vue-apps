import type { StoreDefinition } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import type { AxiosRequestConfig } from 'axios'

export interface StoreModuleConfig {
  namespace: string
  useStore: StoreDefinition
}

export type SubAppAjaxRequestMethod = (
  key: string,
  params?: unknown,
  config?: AxiosRequestConfig,
) => Promise<unknown>

export interface InjectedSubAppAjax {
  appName: string
  get: SubAppAjaxRequestMethod
  post: SubAppAjaxRequestMethod
  put: SubAppAjaxRequestMethod
  patch: SubAppAjaxRequestMethod
  delete: SubAppAjaxRequestMethod
}

export interface SubAppAjaxFactoryOptions {
  ajax: InjectedSubAppAjax
  path: string
}

export interface SubAppAjaxModule {
  apiList: Record<string, string>
  ajaxList: Record<string, (...args: unknown[]) => Promise<unknown>>
}

export type SubAppAjaxFactory = (options: SubAppAjaxFactoryOptions) => SubAppAjaxModule

export interface AjaxConfig {
  name: string
  path?: string
  ajax: SubAppAjaxFactory
}

export interface SubAppConfig {
  prefix: string
  routes: RouteRecordRaw[]
}

export interface SubAppExports {
  routes: RouteRecordRaw[]
  store: StoreDefinition
  ajax: SubAppAjaxFactory
}
