import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { registerSubAppRoutes } from './router'
import { registerSubAppStores } from './store'
import { registerSubAppAjax } from './ajax'
import type { SubAppConfig, StoreModuleConfig, AjaxConfig, SubAppExports } from './types/remotes'

Vue.use(ElementUI)

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
 * 主应用启动入口
 * 每个子应用只 import 一次，内部包含 routes / store / ajax 三个字段
 */
async function bootstrap(): Promise<void> {
  // 单次 import 加载每个子应用的全部模块
  const [app1Module, app2Module] = await Promise.all([
    safeLoad<SubAppExports>(() => import('app1/index'), 'app1'),
    safeLoad<SubAppExports>(() => import('app2/index'), 'app2'),
  ])

  // ============ 注册子应用路由（路径隔离） ============
  const subAppConfigs: SubAppConfig[] = []
  if (app1Module?.routes) {
    subAppConfigs.push({ prefix: '/app1', routes: app1Module.routes })
  }
  if (app2Module?.routes) {
    subAppConfigs.push({ prefix: '/app2', routes: app2Module.routes })
  }
  registerSubAppRoutes(subAppConfigs)

  // ============ 注册子应用 Store 模块（命名空间隔离） ============
  const storeModules: StoreModuleConfig[] = []
  if (app1Module?.store) {
    storeModules.push({ namespace: 'app1', module: app1Module.store })
  }
  if (app2Module?.store) {
    storeModules.push({ namespace: 'app2', module: app2Module.store })
  }
  registerSubAppStores(storeModules)

  // ============ 注册子应用 Ajax 实例 ============
  const ajaxConfigs: AjaxConfig[] = []
  if (app1Module?.ajax) {
    ajaxConfigs.push({ name: 'app1', ajax: app1Module.ajax })
  }
  if (app2Module?.ajax) {
    ajaxConfigs.push({ name: 'app2', ajax: app2Module.ajax })
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
