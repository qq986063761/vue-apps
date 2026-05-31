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
import type { SubAppConfig, StoreModuleConfig, AjaxConfig } from './types/remotes'

Vue.use(ElementUI)

/**
 * 子应用加载清单
 * key: ModuleFederationPlugin.name
 * loader: import('子应用name/index') —— webpack MF 原生动态导入
 */
const SUB_APPS = [
  { name: 'app1', loader: () => import('app1/index') },
  { name: 'app2', loader: () => import('app2/index') },
]

async function bootstrap(): Promise<void> {
  const subAppConfigs: SubAppConfig[] = []
  const storeModules: StoreModuleConfig[] = []
  const ajaxConfigs: AjaxConfig[] = []

  const results = await Promise.all(
    SUB_APPS.map(async ({ name, loader }) => {
      try {
        const mod = await loader()
        console.log(`[main] 子应用 ${name} 加载成功`)
        return { name, module: mod }
      } catch (err) {
        console.warn(`[main] 子应用 ${name} 加载失败，请确认 ${name} 已启动:`, err)
        return null
      }
    })
  )

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

  new Vue({ router, store, render: (h) => h(App) }).$mount('#app')
}

bootstrap()
