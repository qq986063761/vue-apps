import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import type { SubAppConfig } from '../types/remotes'

Vue.use(VueRouter)

// ============ 主应用自身路由 ============
const mainRoutes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'main-home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'main-about',
    component: () => import(/* webpackChunkName: "main-about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes: mainRoutes
})

// ============ 子应用路由注册 ============

/**
 * 给路由数组统一添加路径前缀和名称前缀
 * 实现子应用路由隔离
 *
 * @example
 * prefixRoutes([{ path: '/', name: 'home' }], '/app1')
 * // => [{ path: '/app1', name: 'app1-home' }]
 */
function prefixRoutes(routes: Array<RouteConfig>, prefix: string): Array<RouteConfig> {
  return routes.map(route => ({
    ...route,
    path: prefix + (route.path === '/' ? '' : route.path),
    name: route.name ? `${prefix.replace('/', '')}-${route.name}` : undefined,
    children: route.children ? prefixRoutes(route.children, prefix) : undefined
  }))
}

/**
 * 动态注册子应用路由
 * 每个子应用的路由统一加上 /appName 前缀，避免路径冲突
 *
 * @param configs - 子应用路由配置数组 [{ prefix: '/app1', routes: [...] }, ...]
 */
export function registerSubAppRoutes(configs: SubAppConfig[]): void {
  configs.forEach(({ prefix, routes }) => {
    const prefixedRoutes = prefixRoutes(routes, prefix)
    prefixedRoutes.forEach(route => {
      router.addRoute(route)
    })
    console.log(`[main] 子应用路由已注册: ${prefix} (${prefixedRoutes.length} 条路由)`)
  })
}

export default router
