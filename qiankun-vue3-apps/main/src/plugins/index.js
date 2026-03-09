import { defineAsyncComponent, h } from 'vue'
import router from '@/router'
import store from '@/store'

// 提供给子应用
window.$app = {
  vm: null,
  store,
  router,
  components: {},
  apps: {
    child1: {
      window: null,
      vm: null
    },
    child2: {
      window: null,
      vm: null
    }
  },
  /**
   * 跳转路由
   * 子应用通过 window.$app.to 跳转，支持跨应用路由
   */
  to({ app, name, query, params, method = 'push' }) {
    if (app) {
      const path = `/${app}/${name}`
      router[method]({ path, query })
      const payload = { name, params, query, method }
      const slot = window.$app.apps[app]
      const childTo = slot?.window?.$app?.to
      if (childTo) {
        childTo(payload)
      } else {
        let count = 0
        const maxRetry = 50
        const timer = setInterval(() => {
          const s = window.$app.apps[app]
          const to = s?.window?.$app?.to
          if (to) {
            clearInterval(timer)
            to(payload)
          } else if (++count >= maxRetry) {
            clearInterval(timer)
          }
        }, 60)
      }
    } else {
      router[method]({ name, params, query })
    }
  },
  use({ app, name = '', method = '', args = [] }) {
    console.log('main use', app, name, method, args)
    const slot = window.$app.apps[app]
    const target = slot?.[name] || slot?.window?.[name]
    return target && typeof target[method] === 'function' ? target[method](...args) : undefined
  },
  on() {},
  emit(type, data) {
    Object.keys(window.$app.apps).forEach(appName => {
      const slot = window.$app.apps[appName]
      const $app = slot?.window?.$app
      if ($app && typeof $app.on === 'function') {
        try {
          $app.on(type, data)
        } catch (e) {
          console.warn(`通知子应用 ${appName} 失败:`, e)
        }
      }
    })
  }
}

export default {
  install(app) {
    // 注册 Child1Button 异步组件（等待 child1 export 加载完成后解析）
    app.component('Child1Button', defineAsyncComponent({
      loader: () => new Promise(resolve => {
        const { child1 } = window.$app.apps
        const tryResolve = () => {
          if (child1.Button) {
            resolve(child1.Button)
          } else {
            setTimeout(tryResolve, 60)
          }
        }
        tryResolve()
      }),
      loadingComponent: { render: () => h('div', '组件加载中...') }
    }))

    // 异步加载 child1 通过 Module Federation 暴露的组件
    import('child1/export').then(m => {
      const { Button, modal } = m.default
      window.$app.apps.child1.Button = Button
      window.$app.apps.child1.modal = modal
      console.log('main 中 child1 组件加载完成', m.default)
    }).catch(e => {
      console.warn('child1/export 加载失败（子应用可能未启动）', e)
    })
  }
}
