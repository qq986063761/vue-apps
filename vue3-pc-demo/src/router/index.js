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
      path: '/api/router',
      component: () => import('/src/views/api/router/router.vue'),
      children: [
        {
          path: '',
          redirect: '/api/router/child1'
        },
        {
          path: 'child1',
          name: 'routerChild1',
          component: () => import('/src/views/api/router/routerChild1.vue')
        },
        {
          path: 'child2',
          name: 'routerChild2',
          component: () => import('/src/views/api/router/routerChild2.vue')
        },
      ]
    },
    {
      path: '/api/store',
      component: () => import('/src/views/api/store/store.vue'),
      name: 'store'
    },
  ]
})

export default router
