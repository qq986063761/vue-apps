import { createRouter, createWebHashHistory } from 'vue-router'

let router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/api/template'
    },
    {
      path: '/api/template',
      component: () => import('/src/views/api/template.vue')
    },
    {
      path: '/api/watch',
      component: () => import('/src/views/api/watch.vue')
    },
    {
      path: '/api/comp',
      component: () => import('/src/views/api/componet/index.vue')
    },
    {
      path: '/api/render',
      component: () => import('/src/views/api/render.js')
    },
    {
      path: '/api/routerStore',
      component: () => import('/src/views/api/routerStore.vue'),
      children: [
        {
          path: 'child',
          name: 'routerStoreChild',
          component: () => import('/src/views/api/routerStoreChild.vue')
        },
        {
          path: 'child2',
          name: 'routerStoreChild2',
          component: () => import('/src/views/api/routerStoreChild2.vue')
        },
      ]
    },
  ]
})

export default router
