import Button from './components/button/button.vue'

const components = [
  Button
]

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

export {
  Button
}