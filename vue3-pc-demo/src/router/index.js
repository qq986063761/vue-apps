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
      path: '/api/computed-watch',
      component: () => import('/src/views/api/computed-watch.vue')
    },
    {
      path: '/api/directive',
      component: () => import('/src/views/api/directive.vue')
    },
    {
      path: '/api/comp',
      component: () => import('/src/views/api/componet/index.vue')
    },
    {
      path: '/api/render',
      component: () => import('/src/views/api/render/render.js')
    },
    {
      path: '/api/routerStore',
      component: () => import('/src/views/api/router/routerStore.vue'),
      children: [
        {
          path: 'child',
          name: 'routerStoreChild',
          component: () => import('/src/views/api/router/routerStoreChild.vue')
        },
        {
          path: 'child2',
          name: 'routerStoreChild2',
          component: () => import('/src/views/api/router/routerStoreChild2.vue')
        },
      ]
    },
  ]
})

export default router
