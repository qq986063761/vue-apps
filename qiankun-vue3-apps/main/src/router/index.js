import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChildView from '../views/ChildView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // 子应用挂载页：path 必须与 qiankun activeRule 的 hash 一致；用通配符统一匹配子应用下所有路径
  { path: '/child1', name: 'child1', component: ChildView, meta: { app: 'child1' } },
  { path: '/child1/:pathMatch(.*)*', name: 'child1-page', component: ChildView, meta: { app: 'child1' } },
  { path: '/child2', name: 'child2', component: ChildView, meta: { app: 'child2' } },
  { path: '/child2/:pathMatch(.*)*', name: 'child2-page', component: ChildView, meta: { app: 'child2' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
