import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { installGlobalAjax } from './ajax'
import { setupSubAppLazyLoadGuard } from './sub-app-loader'

Vue.use(ElementUI)

function bootstrap(): void {
  console.log('bootstrap before')

  installGlobalAjax()
  setupSubAppLazyLoadGuard()

  console.log('bootstrap after')
  new Vue({ router, store, render: (h) => h(App) }).$mount('#app')
}

bootstrap()
