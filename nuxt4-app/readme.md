# nuxt4-app（演示）

基于 [Nuxt 4](https://nuxt.com) 的最小示例：页面渲染、文件路由、Pinia 状态管理，以及 Nitro 提供的全栈 REST API（内存 CRUD）。

## 结构说明

| 路径 | 作用 |
| --- | --- |
| `app/app.vue` | 根组件，挂载 `<NuxtLayout>` + `<NuxtPage>` |
| `app/layouts/default.vue` | 默认布局（顶栏导航） |
| `app/pages/*.vue` | 文件路由：`/`、`/about`、`/items` |
| `stores/*.ts` | Pinia：`counter`（纯前端）、`items`（对接 API） |
| `server/api/items.*` | Nitro 路由：`GET/POST /api/items`，`PUT/DELETE /api/items/:id` |
| `server/utils/items-memory.ts` | 服务端内存数据源（重启后重置） |
| `shared/types/item.ts` | 前后端共用的 `Item` 类型 |

## 本地运行

```bash
npm install
npm run dev
```

浏览器访问 `http://localhost:3000`。生产构建与预览：

```bash
npm run build
npm run preview
```

## 参考文档

- [Nuxt 4 文档](https://nuxt.com/docs/getting-started/introduction)
- [Pinia](https://pinia.vuejs.org/)
- [Nitro 服务端路由](https://nitro.unjs.io/)
