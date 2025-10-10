<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  Menu as IconMenu, 
  DataAnalysis,
  Setting,
  User,
  Document
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// 菜单折叠状态
const isCollapse = ref(false)

// 菜单数据
const menuItems = [
  {
    index: '/data',
    title: '数据渲染',
    icon: DataAnalysis
  },
  {
    index: '/users',
    title: '用户管理',
    icon: User
  },
  {
    index: '/documents',
    title: '文档管理',
    icon: Document
  },
  {
    index: '/settings',
    title: '系统设置',
    icon: Setting
  }
]

// 处理菜单点击
const handleMenuClick = (index) => {
  router.push(index)
}

// 切换菜单折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="app-container">
    <!-- 左侧菜单 -->
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
        <div class="logo">
          <h3 v-if="!isCollapse">Vue3 PC App</h3>
          <h3 v-else>V3</h3>
        </div>
        
        <el-menu
          :default-active="route.path"
          :collapse="isCollapse"
          :unique-opened="true"
          class="sidebar-menu"
          @select="handleMenuClick"
        >
          <el-menu-item 
            v-for="item in menuItems" 
            :key="item.index"
            :index="item.index"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右侧内容区域 -->
      <el-container>
        <!-- 顶部导航栏 -->
        <el-header class="header">
          <div class="header-left">
            <el-button 
              type="text" 
              @click="toggleCollapse"
              class="collapse-btn"
            >
              <el-icon><IconMenu /></el-icon>
            </el-button>
            <span class="breadcrumb">当前位置：{{ route.meta?.title || '数据渲染' }}</span>
          </div>
          <div class="header-right">
            <el-dropdown>
              <span class="user-info">
                <el-icon><User /></el-icon>
                管理员
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主内容区域 -->
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100%;

  :deep(.el-container) {
    height: 100%;
  }
}

.sidebar {
  background-color: #304156;
  transition: width 0.3s;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b3a4b;
  color: white;
  margin-bottom: 0;
}

.logo h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.sidebar-menu {
  border: none;
  background-color: #304156;
}

.sidebar-menu .el-menu-item {
  color: #bfcbd9;
}

.sidebar-menu .el-menu-item:hover {
  background-color: #263445;
  color: #fff;
}

.sidebar-menu .el-menu-item.is-active {
  background-color: #409eff;
  color: #fff;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.collapse-btn {
  margin-right: 20px;
  font-size: 18px;
}

.breadcrumb {
  color: #606266;
  font-size: 14px;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #606266;
}

.user-info:hover {
  color: #409eff;
}

.main-content {
  background-color: #f5f5f5;
  padding: 20px;
  overflow-y: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    width: 64px !important;
  }
  
  .logo h3 {
    display: none;
  }
  
  .breadcrumb {
    display: none;
  }
}
</style>
