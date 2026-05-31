import Vue from 'vue'
import Vuex from 'vuex'
import type { StoreModuleConfig } from '../types/remotes'

Vue.use(Vuex)

// ============ 主应用自身 Store ============
const store = new Vuex.Store({
  state: {
    appName: 'main'
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})

// ============ 子应用 Store 模块动态注册 ============

/**
 * 动态注册子应用的 Vuex Store 模块（命名空间隔离）
 *
 * 每个子应用模块以 namespaced: true 方式注册，
 * 主应用中通过 this.$store.state.app1.xxx / this.$store.state.app2.xxx 访问，
 * 通过 this.$store.dispatch('app1/someAction') / this.$store.dispatch('app2/someAction') 分发
 *
 * @param configs - 子应用 store 模块配置 [{ namespace: 'app1', module: {...} }, ...]
 */
export function registerSubAppStores(configs: StoreModuleConfig[]): void {
  configs.forEach(({ namespace, module }) => {
    // 确保模块以命名空间方式注册
    if (!module.namespaced) {
      console.warn(`[main] 子应用 store 模块 ${namespace} 未设置 namespaced: true，已自动设置`)
      module.namespaced = true
    }
    store.registerModule(namespace, module)
    console.log(`[main] 子应用 Store 模块已注册: ${namespace}`)
  })
}

export default store
