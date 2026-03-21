import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 独立运行时：path 为 /home、/about；乾坤下 hash 为 #/child1/xxx，path 需带 child1 前缀
function getRoutes() {
  const isQiankun = window.__POWERED_BY_QIANKUN__
  const prefix = isQiankun ? '/child1' : ''
  return [
    ...(isQiankun
      ? [{ path: '/child1', redirect: '/child1/home' }]
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
    console.log('child1 router beforeEach', to, from)
    next()
  })
  return r
}

export { createChildRouter, getRoutes }
