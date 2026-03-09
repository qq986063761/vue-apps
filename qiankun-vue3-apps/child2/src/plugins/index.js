import { defineAsyncComponent, h } from 'vue'
import store from '@/store'

const getRouter = () => window.__CHILD_ROUTER_INSTANCE__ || null

function shallowEqual(a, b) {
  const A = a && typeof a === 'object' ? a : {}
  const B = b && typeof b === 'object' ? b : {}
  const keysA = Object.keys(A)
  const keysB = Object.keys(B)
  if (keysA.length !== keysB.length) return false
  return keysA.every(k => A[k] === B[k])
}

// 提供给父应用（主应用在对应乾坤生命周期会调用以下可选钩子）
window.$app = {
  vm: null,
  store,
  get router() {
    return getRouter()
  },
  onActivated() {},
  onDeactivated() {},
  onBeforeUnmount() {},
  to({ app, name = '', params, query, method = 'push' }) {
    if (app) {
      window.$parentApp.to({ app, name, params, query, method })
      return
    }

    console.log('child2 to', name, params, query)
    const r = getRouter()
    if (!r) return
    // Vue Router 4 中 currentRoute 是 ref，需要 .value
    const cur = r.currentRoute.value
    const sameName = cur.name === name
    const sameParams = shallowEqual(cur.params, params ?? {})
    const sameQuery = shallowEqual(cur.query, query ?? {})
    if (sameName && sameParams && sameQuery) return

    const nav = { name, params: params ?? {}, query: query ?? {} }
    const fn = method === 'replace' ? r.replace : r.push
    fn.call(r, nav)
  },
  use({ name, method, args }) {
    console.log('child2 use', name, method, args)
    const { use } = window.$parentApp || {}
    let app = ''
    switch (name) {
      case 'modal':
        app = 'child1'
        break
    }
    return use({ app, name, method, args })
  },
  on() {}
}

// 在 window.__QIANKUN_PROPS__ 赋值之后由 main.js 调用，再挂载 $parentApp
let parentAppInited = false
export function initWindowParentApp() {
  if (parentAppInited) return
  parentAppInited = true
  const getParentApp = () => window.__QIANKUN_PROPS__?.$app ?? window.parent?.$app
  Object.defineProperty(window, '$parentApp', {
    get: getParentApp,
    configurable: true,
    enumerable: true
  })
}

export default {
  install(app) {
    // 注册 Child1Button 异步组件（通过主应用中转获取 child1 的 Button）
    app.component('Child1Button', defineAsyncComponent({
      loader: () => new Promise(resolve => {
        const tryResolve = () => {
          const parentMicroApp = window.$parentApp
          const child1 = parentMicroApp?.apps?.child1
          if (child1?.Button) {
            resolve(child1.Button)
          } else {
            setTimeout(tryResolve, 60)
          }
        }
        tryResolve()
      }),
      loadingComponent: { render: () => h('div', '组件加载中...') }
    }))
  }
}
