import './css/base.css'
import Vue from 'vue'
import App from './App.vue'
import MyUI from 'my-ui'
console.log('MyUI', MyUI)

Vue.use(MyUI)

new Vue({
  el: '#app',
  render: h => h(App)
})