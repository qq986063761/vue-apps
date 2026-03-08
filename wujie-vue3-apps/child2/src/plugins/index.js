import router from '@/router'

export default {
  async install(app) {
    // 使用无界 API
    if (window.$wujie) {
      const { bus } = window.$wujie
      const { name: appName } = window.$wujie.props

      console.log(`child2 插件初始化完成`, appName)
      // 监听主应用发送的路由跳转事件（使用应用名隔离事件）
      bus.$on(`${appName}:toPage`, ({ route, method = 'replace' }) => {
        console.log(`跳转路由 ${route} ${method}`)
        router[method](route)
      })

      // 监听主应用发送的组件调用事件（使用应用名隔离事件）
      bus.$on(`${appName}:useComp`, ({ componentName, method, args }) => {
        console.log(`调用组件 ${componentName} 的方法 ${method}`, args)
        
        // 可以通过 eventBus 发送组件调用结果
        bus.$emit(`${appName}:useCompResult`, {
          componentName,
          method,
          success: true
        })
      })

      // 注意：应用挂载在 main.js 中处理
      // 这里只负责设置事件监听
    }
  }
}
