import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { createChildRouter } from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import plugin, { initWindowParentApp } from './plugins'

let routerInstance = null
let vueApp = null

// 保活缓存：unmount 时不销毁实例，仅移出 DOM；mount 时优先复用
const instanceCache = { vueApp: null, routerInstance: null, el: null }

function render(props = {}) {
  const { container } = props
  routerInstance = createChildRouter()
  window.__CHILD_ROUTER_INSTANCE__ = routerInstance

  vueApp = createApp(App)
  vueApp.use(routerInstance)
  vueApp.use(store)
  vueApp.use(ElementPlus)
  vueApp.use(plugin)

  const mountEl = container ? container.querySelector('#app') : document.querySelector('#app')
  vueApp.mount(mountEl)

  if (props.init) {
    props.init({ window, vm: vueApp })
  }
}

function restoreFromCache(props) {
  const { container } = props
  const cached = instanceCache.vueApp
  if (!cached || !instanceCache.el) return false
  const wrap = container || document.getElementById('subapp-child2')
  if (!wrap) return false
  const appEl = wrap.querySelector('#app')
  if (appEl && appEl.parentNode) {
    appEl.parentNode.replaceChild(instanceCache.el, appEl)
  } else {
    wrap.appendChild(instanceCache.el)
  }
  vueApp = cached
  routerInstance = instanceCache.routerInstance
  window.__CHILD_ROUTER_INSTANCE__ = routerInstance
  if (props.init) {
    props.init({ window, vm: vueApp })
  }
  return true
}

// 独立运行时直接渲染（vite-plugin-qiankun-lite 会将 window 代理到沙箱 window）
if (!window.__POWERED_BY_QIANKUN__) {
  initWindowParentApp()
  render()
}

export function bootstrap() {
  console.log('child2 bootstrap')
}

export function mount(props) {
  console.log('child2 mount', props)
  window.__QIANKUN_PROPS__ = props
  initWindowParentApp()
  if (restoreFromCache(props)) return
  render(props)
}

export function unmount() {
  console.log('child2 unmount')
  if (vueApp) {
    instanceCache.vueApp = vueApp
    instanceCache.routerInstance = routerInstance
    instanceCache.el = vueApp._container
    const el = vueApp._container
    if (el && el.parentNode) {
      el.parentNode.removeChild(el)
    }
    vueApp = null
    routerInstance = null
  }
  window.__CHILD_ROUTER_INSTANCE__ = null
}

export function update(props) {
  console.log('child2 update', props)
}
