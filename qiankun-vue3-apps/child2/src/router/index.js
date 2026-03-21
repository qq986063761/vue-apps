import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

function getRoutes() {
  const isQiankun = qiankunWindow.__POWERED_BY_QIANKUN__
  const prefix = isQiankun ? '/child2' : ''
  return [
    ...(isQiankun
      ? [{ path: '/child2', redirect: '/child2/home' }]
      : [{ path: '/', redirect: '/home' }]),
    {
      path: prefix + '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: prefix + '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  ]
}

function createChildRouter() {
  const r = createRouter({
    history: createWebHashHistory(),
    routes: getRoutes()
  })
  r.beforeEach((to, from, next) => {
    console.log('child2 router beforeEach', to, from)
    next()
  })
  return r
}

export { createChildRouter, getRoutes }
