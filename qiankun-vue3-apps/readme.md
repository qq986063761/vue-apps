# qiankun-vue3-demo

基于 **Vue3 + qiankun** 的微前端架构演示项目。

## 技术栈

- 主框架：Vue 3 + Vue Router 4 + Vuex 4
- UI 组件：Element Plus
- 微前端：qiankun 2.x
- 模块联邦：webpack5 Module Federation
- 构建：@vue/cli-service 5.x

## 项目结构

```
├── main/        主应用（端口 8080）
├── child1/      子应用1（端口 8081）
└── child2/      子应用2（端口 8082）
```

## 快速启动

```bash
# 一键安装所有依赖
npm run install:all

# 启动所有应用
npm run dev
```

## 功能演示

- 主题切换：主应用注入 CSS 变量，子应用自动生效
- 跨应用路由跳转：`window.$app.to({ app, name })`
- 数据同步：主应用更新 store 后通过 `$app.emit` 广播给所有子应用
- 跨应用组件复用：通过 MF 导出，主应用/子应用按需引入
- 跨应用调用弹窗：子应用通过 `window.$app.use` 调用其他子应用的弹窗
- 状态保活：切换子应用时保留 DOM/实例，返回时无需重新渲染

## Vue2 → Vue3 主要改动

| 内容 | Vue2 | Vue3 |
|------|------|------|
| 应用实例 | `new Vue().$mount()` | `createApp().mount()` |
| Router | `new VueRouter()` | `createRouter()` + `createWebHashHistory()` |
| Store | `new Vuex.Store()` | `createStore()` |
| UI 库 | element-ui | element-plus |
| 图标 | `el-icon-*` class | `@element-plus/icons-vue` 组件 |
| Dialog | `:visible.sync` | `v-model` |
| keep-alive | `<keep-alive><router-view/></keep-alive>` | `<router-view v-slot><keep-alive><component/></keep-alive></router-view>` |
| Vue.extend | 不再支持 | 组件直接引用 store 模块 |
| currentRoute | 普通对象 | Ref，需 `.value` |
| v-deep | `::v-deep` | `:deep()` |
| 子应用保活 | `instance.$el` | `vueApp._container` |

## 样式
  - 乾坤子应用与主应用同文档，样式共享；需要加应用前缀和 css scoped 做样式隔离
  - 主题：主应用提供主题变量，注入到 document，子应用同文档自动生效

## 跨应用通信
  - 子调主/其他子应用：`window.$parentApp.to()` 跳转
  - 主调子：主应用先切到对应子应用路由，再通过 `$app.apps[appName].window.$app.to()` 跳子应用内路由
  - 数据变化后通知子应用：主应用 `$app.emit(type, data)`，子应用在 `$app.on(type, data)` 中接收并同步 store

## 跨应用组件
  - 通过 webpack5 Module Federation 暴露组件给主应用，在主应用中注册组件
  - 子应用通过 `window.$parentApp.use()` 调用主应用中转的组件方法
