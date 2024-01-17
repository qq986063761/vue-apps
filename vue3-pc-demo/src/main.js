import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'

// 创建 vue 应用
const app = createApp(App)

// 错误监听
app.config.errorHandler = (err, vm, info) => {
  console.error('onErrorCaptured', err, vm, info)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
