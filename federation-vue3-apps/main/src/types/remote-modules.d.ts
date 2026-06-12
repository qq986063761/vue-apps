declare module 'app1/index' {
  const routes: import('vue-router').RouteRecordRaw[]
  const store: import('pinia').StoreDefinition
  const ajax: import('@/types/remotes').SubAppAjaxFactory
  export { routes, store, ajax }
}

declare module 'app2/index' {
  const routes: import('vue-router').RouteRecordRaw[]
  const store: import('pinia').StoreDefinition
  const ajax: import('@/types/remotes').SubAppAjaxFactory
  export { routes, store, ajax }
}
