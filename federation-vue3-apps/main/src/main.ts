import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import { installGlobalAjax } from './ajax'
import { setupSubAppLazyLoadGuard } from './sub-app-loader'
import { setupStoreRegistry } from './stores'

const app = createApp(App)
const pinia = createPinia()

setupStoreRegistry(pinia)
installGlobalAjax(app)
setupSubAppLazyLoadGuard()

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
