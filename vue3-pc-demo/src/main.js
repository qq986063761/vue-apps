import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()
const app = createApp(App)

// 错误监听
app.config.errorHandler = (err, vm, info) => {
  console.error('onErrorCaptured', err, vm, info)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
