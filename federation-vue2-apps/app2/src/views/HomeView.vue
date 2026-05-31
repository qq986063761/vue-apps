<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-green-600 mb-4">app2 首页</h1>
    <p class="text-gray-600 mb-4">这是 app2 子应用的首页视图。</p>
    <el-card shadow="hover" class="mb-4">
      <div slot="header" class="font-semibold">app2 Store 状态</div>
      <p class="text-sm text-gray-600">
        appName: <span class="font-mono text-green-600">{{ $store.state.app2?.appName || '未加载' }}</span>
      </p>
      <p class="text-sm text-gray-600 mt-1">
        count: <span class="font-mono text-green-600">{{ $store.state.app2?.count ?? 0 }}</span>
      </p>
      <el-button type="success" size="mini" class="mt-3" @click="$store.commit('app2/increment')">
        count +1
      </el-button>
    </el-card>
    <router-link to="/app2/about" class="text-green-500 hover:underline">→ 进入 app2 关于页</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeView extends Vue {}
</script>
