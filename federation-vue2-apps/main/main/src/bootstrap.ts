import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { registerSubAppRoutes } from './router'
import { registerSubAppStores } from './store'
import { registerSubAppAjax } from './ajax'
import type { SubAppConfig, StoreModuleConfig, AjaxConfig } from './types/remotes'

/**
 * 安全加载远程模块 —— 子应用未启动时返回 null，主应用不受影响
 */
async function safeLoad<T>(importer: () => Promise<T>, label: string): Promise<T | null> {
  try {
    return await importer()
  } catch (err) {
    console.warn(`[main] 加载子应用模块失败 [${label}]，该子应用可能未启动:`, (err as Error).message)
    return null
  }
}

/**
 * 主应用 async 启动入口
 *
 * 流程：
 * 1. 动态加载 app1 / app2 的远程模块（routes, store, ajax）
 * 2. 在 main Router 上注册子应用路由（自动加 /app1 /app2 前缀）
 * 3. 在 main Vuex Store 上注册子应用 store 模块（namespaced）
 * 4. 注册子应用 ajax 实例（独立拦截器，互不干扰）
 * 5. 挂载 Vue 根实例
 */
async function bootstrap(): Promise<void> {
  // ============ 加载 app1 远程模块 ============
  const [app1Routes, app1StoreModule, app1Ajax] = await Promise.all([
    safeLoad(() => import('app1/routes'), 'app1/routes'),
    safeLoad(() => import('app1/store'), 'app1/store'),
    safeLoad(() => import('app1/ajax'), 'app1/ajax')
  ])

  // ============ 加载 app2 远程模块 ============
  const [app2Routes, app2StoreModule, app2Ajax] = await Promise.all([
    safeLoad(() => import('app2/routes'), 'app2/routes'),
    safeLoad(() => import('app2/store'), 'app2/store'),
    safeLoad(() => import('app2/ajax'), 'app2/ajax')
  ])

  // ============ 注册子应用路由（路径隔离） ============
  const subAppConfigs: SubAppConfig[] = []
  if (app1Routes) {
    subAppConfigs.push({ prefix: '/app1', routes: app1Routes.default })
  }
  if (app2Routes) {
    subAppConfigs.push({ prefix: '/app2', routes: app2Routes.default })
  }
  registerSubAppRoutes(subAppConfigs)

  // ============ 注册子应用 Store 模块（命名空间隔离） ============
  const storeModules: StoreModuleConfig[] = []
  if (app1StoreModule) {
    storeModules.push({ namespace: 'app1', module: app1StoreModule.default })
  }
  if (app2StoreModule) {
    storeModules.push({ namespace: 'app2', module: app2StoreModule.default })
  }
  registerSubAppStores(storeModules)

  // ============ 注册子应用 Ajax 实例 ============
  const ajaxConfigs: AjaxConfig[] = []
  if (app1Ajax) {
    ajaxConfigs.push({ name: 'app1', ajax: app1Ajax.default })
  }
  if (app2Ajax) {
    ajaxConfigs.push({ name: 'app2', ajax: app2Ajax.default })
  }
  registerSubAppAjax(ajaxConfigs)

  // ============ 挂载根实例 ============
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

bootstrap()
