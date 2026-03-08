import { createApp } from 'vue'
import Modal from './Modal.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

let vm = null

export default {
  show(...args) {
    if (!vm) {
      const div = document.createElement('div')
      document.body.appendChild(div)
      
      const app = createApp(Modal)
      app.use(router)
      app.use(createPinia())
      app.use(ElementPlus)
      
      vm = app.mount(div)
    }

    vm.show(...args)
  }
}
