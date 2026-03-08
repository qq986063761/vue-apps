import { createApp } from 'vue'
// import { useChild1Store } from '@/store'
// import router from '@/router'
import ajax from '@/ajax'
import Button from '@/components/Button.vue'
import modal from '@/components/modal.js'

// 样式可以不引入，会继承其他应用的 element-plus 样式
// import 'element-plus/dist/index.css'

// 创建一个临时应用实例来设置全局属性
const tempApp = createApp({})
tempApp.config.globalProperties.$ajax = ajax

// 导出 Button 组件（直接导出，使用时需要提供 store 和 router）
const data = {
  Button,
  modal,
  // store: useChild1Store,
}

export default {
  ...data,
  // 提供初始化数据方法，主应用在调用子应用组件之前会执行
  // async init(opts) {
  //   // 如果需要等子应用数据初始化
  //   const store = useChild1Store()
  //   await store.getData()
  // }
}
