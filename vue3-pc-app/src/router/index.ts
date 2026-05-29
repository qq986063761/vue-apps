import { createRouter, createWebHistory } from 'vue-router'
import Data from '../views/data.vue'
import Component from '../views/component.vue'
import BuiltinComponents from '../views/builtin-components.vue'
import StoreDemo from '../views/store-demo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/data'
    },
    {
      path: '/data',
      name: 'Data',
      component: Data
    },
    {
      path: '/component',
      name: 'Component',
      component: Component
    },
    {
      path: '/builtin-components',
      name: 'BuiltinComponents',
      component: BuiltinComponents
    },
    {
      path: '/store-demo',
      name: 'StoreDemo',
      component: StoreDemo
    }
  ],
})

export default router
