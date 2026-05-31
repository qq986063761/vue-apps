<template>
  <div class="home-view">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">欢迎使用主应用</h1>
    <p class="text-gray-600 mb-6">这是主应用的首页，通过左侧菜单可切换各子应用。</p>

    <div class="grid grid-cols-2 gap-4">
      <!-- app1 卡片 -->
      <el-card shadow="hover">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-blue-600 mb-2">app1</h3>
          <p class="text-sm text-gray-500">子应用一，提供独立 routes、store、ajax</p>
          <el-button type="primary" size="small" class="mt-3" @click="$router.push('/app1')">进入 app1</el-button>
        </div>
      </el-card>

      <!-- app2 卡片 -->
      <el-card shadow="hover">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-green-600 mb-2">app2</h3>
          <p class="text-sm text-gray-500">子应用二，提供独立 routes、store、ajax</p>
          <el-button type="success" size="small" class="mt-3" @click="$router.push('/app2')">进入 app2</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeView extends Vue {}
</script>
