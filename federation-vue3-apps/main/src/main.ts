import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ElButton, ElCard, ElIcon, ElLoading, ElMenu, ElMenuItem } from 'element-plus'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/card/style/css'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/menu/style/css'
import 'element-plus/es/components/menu-item/style/css'
import 'element-plus/es/components/message/style/css'

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
app.use(ElButton)
app.use(ElCard)
app.use(ElIcon)
app.use(ElLoading)
app.use(ElMenu)
app.use(ElMenuItem)

app.mount('#app')
