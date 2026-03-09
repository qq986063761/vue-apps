import store from '@/store'
import Button from '@/components/Button.vue'
import modal from '@/components/modal.js'

// 将 Button 和 modal 暴露给主应用或其他子应用通过 Module Federation 使用
// Button 组件内部直接引用 child1 的 store 模块，不依赖 Vue provide/inject
export default {
  Button,
  modal,
  store,
}
