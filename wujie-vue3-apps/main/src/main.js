import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import WujieVue from 'wujie-vue3'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import plugin from './plugins'

// 动态导入 virtual:__federation__ API
import {
  __federation_method_setRemote as setRemote,
} from 'virtual:__federation__'

const app = createApp(App)

// 过滤报错
app.config.warnHandler = function (msg, vm, trace) {
  // 忽略 style 保留属性的警告
  if (msg.includes('"style" is a reserved attribute')) {
    return
  }
  console.warn(msg, trace)
}

/**
 * 初始化远程模块配置
 * 在运行时根据环境动态设置 remote 模块的 URL
 * @param {Object} remoteConfig - remote 配置对象
 */
function initRemotes() {
  // 注意：@originjs/vite-plugin-federation 在开发模式下不会生成 remoteEntry.js
  // 远程应用需要先构建（vite build），然后使用 preview 模式或直接访问构建后的文件
  // 因此开发模式也使用 /assets/remoteEntry.js 路径（需要 child1 先构建）
  const isDev = import.meta.env.DEV
  const child1Url = isDev 
    ? "http://localhost:8081/assets/remoteEntry.js"  // 开发模式：需要 child1 先构建
    : "http://localhost:8081/assets/remoteEntry.js"  // 预览/生产模式
  
  const remoteConfig = {
    "child1": child1Url
  }

  // 遍历配置，动态设置每个 remote
  Object.keys(remoteConfig).forEach(remoteName => {
    const remoteUrl = remoteConfig[remoteName]
    
    if (remoteUrl) {
      // 使用 virtual:__federation__ API 动态设置 remote
      setRemote(remoteName, {
        url: remoteUrl,
        format: 'esm', // 使用 esm 格式
        from: 'vite',  // 来源是 vite
      })
      
      console.log(`[Federation] 已设置 remote: ${remoteName} -> ${remoteUrl}`)
    }
  })
}
// 初始化远程模块
initRemotes()

app.use(createPinia())
app.use(router)
app.use(WujieVue)
app.use(ElementPlus)
app.use(plugin)

// 挂载应用
app.mount('#app')
