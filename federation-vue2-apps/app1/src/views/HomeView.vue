<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-blue-600 mb-4">app1 首页</h1>
    <p class="text-gray-600 mb-4">这是 app1 子应用的首页视图。</p>
    <el-card shadow="hover" class="mb-4">
      <div slot="header" class="font-semibold">app1 Store 状态</div>
      <p class="text-sm text-gray-600">
        appName: <span class="font-mono text-blue-600">{{ $store.state.app1?.appName || '未加载' }}</span>
      </p>
      <p class="text-sm text-gray-600 mt-1">
        count: <span class="font-mono text-blue-600">{{ $store.state.app1?.count ?? 0 }}</span>
      </p>
      <el-button type="primary" size="mini" class="mt-3" @click="$store.commit('app1/increment')">
        count +1
      </el-button>
    </el-card>
    <router-link to="/app1/about" class="text-blue-500 hover:underline">→ 进入 app1 关于页</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeView extends Vue {}
</script>
