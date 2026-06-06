import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import type { SubAppConfig } from '@/types/remotes'

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main-home',
    component: HomeView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: mainRoutes,
})

const registeredSubAppRoutePrefixes = new Set<string>()

function prefixRoutes(routes: RouteRecordRaw[], prefix: string): RouteRecordRaw[] {
  return routes.map((route) => {
    const prefixedRoute = {
      ...route,
      path: prefix + (route.path === '/' ? '' : route.path),
      name: route.name ? `${prefix.replace('/', '')}-${String(route.name)}` : undefined,
    } as RouteRecordRaw

    if (route.children) {
      prefixedRoute.children = prefixRoutes(route.children, prefix)
    }

    return prefixedRoute
  })
}

export function registerSubAppRoutes(configs: SubAppConfig[]): void {
  configs.forEach(({ prefix, routes }) => {
    if (registeredSubAppRoutePrefixes.has(prefix)) {
      console.log(`[main] sub app routes already registered: ${prefix}`)
      return
    }

    const prefixedRoutes = prefixRoutes(routes, prefix)
    prefixedRoutes.forEach((route) => {
      router.addRoute(route)
    })
    registeredSubAppRoutePrefixes.add(prefix)
    console.log(`[main] sub app routes registered: ${prefix}`)
  })
}

export default router
