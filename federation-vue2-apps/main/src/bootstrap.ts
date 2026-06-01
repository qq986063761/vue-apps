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

const REMOTE_MODULES: Array<{
  name: string
  load: () => Promise<SubAppExports>
}> = [
  {
    name: 'app1',
    load: () => import('app1/index')
  },
  {
    name: 'app2',
    load: () => import('app2/index')
  }
]

async function bootstrap(): Promise<void> {
  console.log('bootstrap before')
  const subAppConfigs: SubAppConfig[] = []
  const storeModules: StoreModuleConfig[] = []
  const ajaxConfigs: AjaxConfig[] = []

  const results = await Promise.all(
    REMOTE_MODULES.map(async (remote) => {
      try {
        const mod = await remote.load()
        console.log(`[main] 子应用 ${remote.name} 加载成功`)
        return { name: remote.name, module: mod }
      } catch (err) {
        console.warn(`[main] 子应用 ${remote.name} 加载失败，请确认 ${remote.name} 的 remoteEntry.js 可访问:`, err)
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
