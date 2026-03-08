import router from '@/router'

export default {
  async install(app) {
    // 使用无界 API
    if (window.$wujie) {
      const { bus } = window.$wujie
      const { appName, methods } = window.$wujie.props

      // 监听主应用发送的路由跳转事件（使用应用名隔离事件）
      bus.$on(`${appName}:toPage`, ({ route, method = 'replace' }) => {
        router[method](route)
      })

      // 监听主应用发送的组件调用事件（使用应用名隔离事件）
      bus.$on(`${appName}:useComp`, ({ componentName, method, args }) => {
        // 这里需要根据实际的组件注册方式来实现
        // 例如：如果组件已经注册到全局，可以通过 app.config.globalProperties 访问
        console.log(`调用组件 ${componentName} 的方法 ${method}`, args)
        
        // 可以通过 eventBus 发送组件调用结果
        bus.$emit(`${appName}:useCompResult`, {
          componentName,
          method,
          success: true
        })
      })
    }
  }
}
