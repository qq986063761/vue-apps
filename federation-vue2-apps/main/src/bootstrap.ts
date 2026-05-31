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
import REMOTE_CONFIG from './config/remotes'
import type { SubAppConfig, StoreModuleConfig, AjaxConfig } from './types/remotes'

Vue.use(ElementUI)

/**
 * 各子应用的 import() 加载器映射
 * webpack 在构建时看到这些静态字符串，通过 remotes 配置中的 promise 动态加载
 */
const remoteLoaders: Record<string, () => Promise<any>> = {
  app1: () => import('app1/index'),
  app2: () => import('app2/index'),
}

/**
 * 主应用启动入口
 *
 * 流程：
 * 1. 遍历 REMOTE_CONFIG，通过 import('appX/index') 动态加载远程模块
 * 2. 在 main Router 上注册子应用路由（自动加 /app1 /app2 前缀）
 * 3. 在 main Vuex Store 上注册子应用 store 模块（namespaced）
 * 4. 注册子应用 ajax 实例（独立拦截器）
 * 5. 挂载 Vue 根实例
 */
async function bootstrap(): Promise<void> {
  const subAppConfigs: SubAppConfig[] = []
  const storeModules: StoreModuleConfig[] = []
  const ajaxConfigs: AjaxConfig[] = []

  // 并行加载所有子应用远程模块
  const results = await Promise.all(
    REMOTE_CONFIG.map(async (entry) => {
      const loader = remoteLoaders[entry.name]
      if (!loader) {
        console.warn(`[main] 未知的子应用: ${entry.name}，请在 remoteLoaders 中注册`)
        return null
      }
      try {
        const mod = await loader()
        console.log(`[main] 子应用 ${entry.name} 远程模块加载成功: ${entry.url}`)
        return { name: entry.name, module: mod }
      } catch (err) {
        console.warn(`[main] 加载子应用 ${entry.name} 失败，请确认 ${entry.url} 已启动:`, err)
        return null
      }
    })
  )

  results.forEach((result) => {
    if (!result) return
    const { name, module: mod } = result

    // 路由 → /app1 /app2 前缀
    if (mod.routes) {
      subAppConfigs.push({ prefix: `/${name}`, routes: mod.routes })
    }
    // Store → namespaced 模块
    if (mod.store) {
      storeModules.push({ namespace: name, module: mod.store })
    }
    // Ajax → 独立 axios 实例
    if (mod.ajax) {
      ajaxConfigs.push({ name, ajax: mod.ajax })
    }
  })

  registerSubAppRoutes(subAppConfigs)
  registerSubAppStores(storeModules)
  registerSubAppAjax(ajaxConfigs)

  // 挂载根实例
  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app')
}

bootstrap()
