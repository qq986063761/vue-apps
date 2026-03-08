import router from '@/router'
import WujieVue from 'wujie-vue3'
const { bus } = WujieVue
import { h } from 'vue'

const apps = {
  child1: {},
  child2: {},
}
window.apps = apps

// 统一监听所有子应用的初始化事件
bus.$on('app:init', ({ appName, data }) => {
  console.log(`子应用 ${appName} 初始化完成`, data)
  apps[appName].init = true
})

// 监听子应用的路由跳转请求
// 格式：app:toPage
bus.$on('app:toPage', (data) => {
  const { route, method = 'push', app: appName = '' } = data
  const { name, query, params } = route

  // 如果指定了子应用，需要先跳转到子应用页面，再通知子应用跳转
  if (appName) {
    // 1. 先跳转主应用路由到子应用页面
    const currentRoute = router.currentRoute.value
    if (appName !== currentRoute.name) {
      router.push({
        name: appName
      })
    }

    const toPage = () => {
      console.log('toPage', appName, apps)
      if (!apps[appName].init) {
        setTimeout(toPage, 150)
        return
      }

      bus.$emit(`${appName}:toPage`, {
        route: { name, params, query },
        method
      })
    }
    toPage()
  } else {
    // 跳转主应用路由
    router[method]({
      name,
      params: {
        init: true,
        ...params,
      },
      query
    })
  }
})

// 监听子应用请求使用组件
// 格式：app:useComp
bus.$on('app:useComp', (data) => {
  const { app: appName = '', name = '', method = '', args = [] } = data
  
  if (!appName || !name || !method) {
    console.error('useComp 参数不完整', { appName, name, method })
    return
  }

  apps[appName][name][method](...args)

  // 通过 eventBus 发送组件调用事件到指定子应用
  // bus.$emit(`${appName}:useComp`, {
  //   componentName: name,
  //   method,
  //   args
  // })
})

export default {
  async install(app) {
    // 动态注册 Child1Button 组件
    app.component('Child1Button', {
      async setup() {
        const Component = await new Promise(resolve => {
          const next = async () => {
            const { Button } = apps.child1
        
            if (!Button) {
              setTimeout(next, 150)
            } else {
              resolve(Button)
            }
          }
          next()
        })
        
        // 使用 h() 函数渲染组件，而不是直接返回组件对象
        return () => h(Component)
      }
    })

    // 引入 child1 的插件
    try {
      const child1Export = await import('child1/export')
      const { Button, modal } = child1Export.default

      // 保存子组件的组件和方法
      apps.child1.Button = Button
      apps.child1.modal = modal

      console.log('main 中的 child1 插件初始化完成', child1Export.default)
    } catch (error) {
      console.warn('child1 插件加载失败，可能子应用未启动', error)
    }
  }
}
