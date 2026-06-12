<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function openSubApp(path: string): void {
  router.push(path)
}
</script>

<template>
  <div class="home-view">
    <h1>欢迎使用主应用</h1>
    <p class="lead">这是 Vue3 主应用首页，通过左侧菜单可以按需加载 app1 和 app2。</p>

    <div class="app-grid">
      <el-card shadow="hover">
        <div class="app-card">
          <h2 class="app1-title">app1</h2>
          <p>子应用一，独立提供 routes、Pinia store 和 ajax 配置。</p>
          <el-button type="primary" @click="openSubApp('/app1')">进入 app1</el-button>
        </div>
      </el-card>

      <el-card shadow="hover">
        <div class="app-card">
          <h2 class="app2-title">app2</h2>
          <p>子应用二，独立提供 routes、Pinia store 和 ajax 配置。</p>
          <el-button type="success" @click="openSubApp('/app2')">进入 app2</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 920px;
}

h1 {
  margin: 0 0 12px;
  color: #1f2937;
  font-size: 28px;
  font-weight: 700;
}

.lead {
  margin: 0 0 24px;
  color: #5f6b7a;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.app-card {
  text-align: center;
}

.app-card h2 {
  margin: 0 0 8px;
  font-size: 22px;
}

.app-card p {
  min-height: 44px;
  margin: 0 0 16px;
  color: #667085;
  font-size: 14px;
}

.app1-title {
  color: #2563eb;
}

.app2-title {
  color: #16a34a;
}

@media (max-width: 720px) {
  .app-grid {
    grid-template-columns: 1fr;
  }
}
</style>
