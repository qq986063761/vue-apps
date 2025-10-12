<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
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
  <!-- 左侧菜单 -->
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
  <el-container class="app-main">
    <router-view class="app-main-view"/>
  </el-container>
</template>

<style lang="scss" scoped>
.sidebar {
  background-color: #304156;
  transition: width 0.3s;
}

.app-main {

  &-view {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
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



/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    width: 64px !important;
  }
  
  .logo h3 {
    display: none;
  }
}
</style>
