<template>
  <div class="side-menu">
    <div class="menu-header">
      <h2>微前端应用</h2>
    </div>
    <ul class="menu-list">
      <li 
        v-for="item in menuItems" 
        :key="item.path"
        :class="{ active: currentPath === item.path }"
        @click="navigateTo(item.path)"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { House, Document, Folder } from '@element-plus/icons-vue'

export default {
  name: 'SideMenu',
  components: {
    House,
    Document,
    Folder
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const menuItems = [
      {
        path: '/',
        name: '首页',
        icon: 'House'
      },
      {
        path: '/child1',
        name: 'Child1',
        icon: 'Document'
      },
      {
        path: '/child2',
        name: 'Child2',
        icon: 'Folder'
      }
    ]
    
    const currentPath = computed(() => route.path)
    
    const navigateTo = (path) => {
      router.push(path)
    }
    
    return {
      menuItems,
      currentPath,
      navigateTo
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  width: 200px;
  height: 100vh;
  background: #304156;
  color: #bfcbd9;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  .menu-header {
    padding: 20px;
    border-bottom: 1px solid #434a50;
    
    h2 {
      color: #fff;
      margin: 0;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .menu-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 15px 20px;
      cursor: pointer;
      transition: all 0.3s;
      border-bottom: 1px solid #434a50;
      display: flex;
      align-items: center;

      &:hover {
        background: #263445;
        color: #fff;
      }

      &.active {
        background: #409eff;
        color: #fff;
      }

      :deep(.el-icon) {
        margin-right: 10px;
        font-size: 16px;
      }

      span {
        font-size: 14px;
      }
    }
  }
}
</style>
