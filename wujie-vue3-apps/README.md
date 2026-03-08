# 微前端应用使用说明

## 项目结构
```
wujie-vue3-apps/
├── main/           # 主应用（基座应用）
├── child1/         # 子应用1
├── child2/         # 子应用2
└── start-all.sh    # 一键启动脚本（Mac/Linux）
```

## 功能说明

### 主应用 (main)
- 左侧菜单导航
- 右侧内容区域
- 集成无界微前端框架
- 支持路由切换

### 菜单结构
- **首页**: 主应用自己的内容（使用 `<router-view/>`）
- **Child1**: 加载子应用1的完整应用
- **Child2**: 加载子应用2的完整应用

## 启动方式

### 方式一：一键启动（推荐）
```bash
# Mac/Linux
chmod +x start-all.sh
./start-all.sh

# Windows
start-all.bat
```

### 方式二：手动启动
1. 安装所有依赖：
   ```bash
   npm run install:all
   ```

2. 启动主应用：
   ```bash
   cd main
   npm run dev
   ```

3. 启动子应用1：
   ```bash
   cd child1
   npm run dev
   ```

4. 启动子应用2：
   ```bash
   cd child2
   npm run dev
   ```

### 方式三：使用 concurrently 同时启动
```bash
npm run start:all
```

## 访问地址
- 主应用: http://localhost:8080
- 子应用1: http://localhost:8081
- 子应用2: http://localhost:8082

## 技术栈
- **主应用**: Vue 3 + Vite + Vue Router 4 + Pinia + 无界微前端
- **子应用**: Vue 3 + Vite + Vue Router 4 + Pinia
- **微前端框架**: wujie-vue3
- **UI 组件库**: Element Plus
- **构建工具**: Vite
- **模块联邦**: @originjs/vite-plugin-federation

## 主要特性

### 1. 模块联邦
- 主应用可以通过模块联邦引入子应用的组件
- 子应用可以暴露组件和方法供主应用使用

### 2. 无界微前端
- 使用 wujie-vue3 实现微前端架构
- 支持子应用独立运行和嵌入运行
- 支持子应用路由同步

### 3. 状态管理
- 使用 Pinia 进行状态管理
- 主应用和子应用各自独立的状态管理

### 4. 路由管理
- 使用 Vue Router 4
- 支持主应用和子应用的路由跳转

## 注意事项
1. 确保所有应用都正常启动后再访问主应用
2. 子应用的端口号需要与配置中的一致
3. 如果修改了子应用端口，需要同步更新主应用中的URL配置
4. 首次启动需要先安装依赖：`npm run install:all`

## 开发说明

### 添加新的子应用
1. 在项目根目录创建新的子应用目录
2. 配置 vite.config.js 中的 Module Federation
3. 在主应用的 vite.config.js 中添加 remotes 配置
4. 在主应用的 router 中添加路由
5. 在主应用的 SideMenu 中添加菜单项

### 构建生产版本
```bash
npm run build:all
```

构建后的文件会在各应用的 `dist` 目录中。

## 常见问题

### 1. 端口冲突
如果端口被占用，可以修改各应用的 `vite.config.js` 中的 `server.port` 配置。

### 2. 跨域问题
开发环境已配置 CORS，如果遇到跨域问题，检查各应用的 `vite.config.js` 中的 `server.headers` 配置。

### 3. 模块联邦加载失败
确保子应用已启动，并且 `remoteEntry.js` 可以正常访问。
