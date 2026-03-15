import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/global.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import plugin from './plugins'

const app = createApp(App)

// 注册所有 element-plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(plugin)

const vm = app.mount('#app')

window.$app.vm = vm

// 微应用改为在 MicroApp 组件首次挂载时再注册并启动（见 micro-apps.js），保证对应 container 已存在
