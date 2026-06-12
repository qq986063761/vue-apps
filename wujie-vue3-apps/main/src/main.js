import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import WujieVue from 'wujie-vue3'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import plugin from './plugins'

const app = createApp(App)

// 过滤报错
app.config.warnHandler = function (msg, vm, trace) {
  // 忽略 style 保留属性的警告
  if (msg.includes('"style" is a reserved attribute')) {
    return
  }
  console.warn(msg, trace)
}

app.use(createPinia())
app.use(router)
app.use(WujieVue)
app.use(ElementPlus)
app.use(plugin)

// 挂载应用
app.mount('#app')
