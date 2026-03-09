import { createApp } from 'vue'
import ComponentVue from './Modal.vue'
import store from '@/store'
import ElementPlus from 'element-plus'

export default {
  _app: null,
  _instance: null,
  show(...args) {
    if (!this._app) {
      const mountEl = document.createElement('div')
      document.body.appendChild(mountEl)
      this._app = createApp(ComponentVue)
      this._app.use(store)
      this._app.use(ElementPlus)
      this._instance = this._app.mount(mountEl)
    }
    this._instance.show(...args)
  }
}
