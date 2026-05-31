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
import { loadRemote } from './utils/loadRemote'
import type { SubAppConfig, StoreModuleConfig, AjaxConfig } from './types/remotes'

Vue.use(ElementUI)

/**
 * 子应用远程地址（可通过环境变量覆盖）
 * 不在 webpack 配置中声明 remotes，改为运行时动态加载 remoteEntry.js
 */
const REMOTE_CONFIGS = [
  {
    name: 'app1',
    url: process.env.VUE_APP_APP1_URL || 'http://localhost:8081/remoteEntry.js',
    scope: 'app1' as const,
    module: './index' as const,
  },
  {
    name: 'app2',
    url: process.env.VUE_APP_APP2_URL || 'http://localhost:8082/remoteEntry.js',
    scope: 'app2' as const,
    module: './index' as const,
  },
]

async function bootstrap(): Promise<void> {
  console.log('bootstrap before')
  const subAppConfigs: SubAppConfig[] = []
  const storeModules: StoreModuleConfig[] = []
  const ajaxConfigs: AjaxConfig[] = []

  const results = await Promise.all(
    REMOTE_CONFIGS.map(async (remote) => {
      try {
        const mod = await loadRemote(remote)
        console.log(`[main] 子应用 ${remote.name} 加载成功`)
        return { name: remote.name, module: mod }
      } catch (err) {
        console.warn(`[main] 子应用 ${remote.name} 加载失败，请确认 ${remote.name} 已启动:`, err)
        return null
      }
    })
  )

  console.log('bootstrap results', results)
  results.forEach((result) => {
    if (!result) return
    const { name, module: mod } = result

    if (mod.routes) subAppConfigs.push({ prefix: `/${name}`, routes: mod.routes })
    if (mod.store) storeModules.push({ namespace: name, module: mod.store })
    if (mod.ajax) ajaxConfigs.push({ name, ajax: mod.ajax })
  })

  registerSubAppRoutes(subAppConfigs)
  registerSubAppStores(storeModules)
  registerSubAppAjax(ajaxConfigs)

  console.log('bootstrap after')
  new Vue({ router, store, render: (h) => h(App) }).$mount('#app')
}

bootstrap()
