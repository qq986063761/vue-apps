import { createRouter, createWebHistory } from 'vue-router'
import Data from '../views/data.vue'

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
    }
  ],
})

export default router
