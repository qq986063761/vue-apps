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
import { loadRemote } from './utils/loadRemote'
import type { SubAppConfig, StoreModuleConfig, AjaxConfig } from './types/remotes'

Vue.use(ElementUI)

/**
 * 主应用启动入口
 * 运行时动态加载远程模块，URL 集中配置在 src/config/remotes.ts
 *
 * 流程：
 * 1. 遍历 REMOTE_CONFIG，运行时注入 <script> 并调用 MF 容器 API
 * 2. 在 main Router 上注册子应用路由（自动加 /app1 /app2 前缀）
 * 3. 在 main Vuex Store 上注册子应用 store 模块（namespaced）
 * 4. 注册子应用 ajax 实例（独立拦截器）
 * 5. 挂载 Vue 根实例
 */
async function bootstrap(): Promise<void> {
  // 运行时动态加载所有子应用模块
  const remoteModules = await Promise.all(
    REMOTE_CONFIG.map(entry => loadRemote(entry))
  )

  const subAppConfigs: SubAppConfig[] = []
  const storeModules: StoreModuleConfig[] = []
  const ajaxConfigs: AjaxConfig[] = []

  REMOTE_CONFIG.forEach((entry, i) => {
    const mod = remoteModules[i]
    if (!mod) return

    // 路由 → /app1 /app2
    if (mod.routes) {
      subAppConfigs.push({ prefix: `/${entry.name}`, routes: mod.routes })
    }
    // Store 模块 → namespaced: app1 / app2
    if (mod.store) {
      storeModules.push({ namespace: entry.name, module: mod.store })
    }
    // Ajax 实例 → 独立拦截器
    if (mod.ajax) {
      ajaxConfigs.push({ name: entry.name, ajax: mod.ajax })
    }
  })

  registerSubAppRoutes(subAppConfigs)
  registerSubAppStores(storeModules)
  registerSubAppAjax(ajaxConfigs)

  // 挂载根实例
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

bootstrap()
