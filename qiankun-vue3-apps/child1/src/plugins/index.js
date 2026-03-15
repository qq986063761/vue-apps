import store from '@/store'
import ajax from '@/ajax'

// 使用当前 render 内创建的路由实例（qiankun 每次 mount 新建），避免与默认单例不一致
const getRouter = () => window.__CHILD_ROUTER_INSTANCE__ || null

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

function shallowEqual(a, b) {
  const A = a && typeof a === 'object' ? a : {}
  const B = b && typeof b === 'object' ? b : {}
  const keysA = Object.keys(A)
  const keysB = Object.keys(B)
  if (keysA.length !== keysB.length) return false
  return keysA.every(k => A[k] === B[k])
}

// 提供给子应用（主应用在对应乾坤生命周期会调用以下可选钩子）
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

    console.log('child1 to', name, params, query)
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
  use() {},
  on(type, opts) {
    if (type === 'store-state') {
      const { prop, value } = opts || {}
      if (prop && value !== undefined) {
        switch (prop) {
          case 'usrs':
            store.commit('SET_USRS', value)
            console.log('child1 收到主应用 store-state 更新，已同步 usrs', value)
            break
          default:
            console.warn(`child1 收到未知 store-state 属性: ${prop}`)
        }
      }
    }
  }
}

export default {
  install(app) {
    // 初始化应用内 ajax
    app.config.globalProperties.$ajax = ajax
    store.dispatch('getData')
  }
}
