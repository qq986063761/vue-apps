<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const aboutNavItems = computed<NavigationMenuItem[]>(() => [
  { label: '关于首页', to: '/about' },
  { label: '关于-1', to: '/about/about-1' },
  { label: '关于-2', to: '/about/about-2' }
])
</script>

<template>
  <div>
    <p class="text-muted text-sm mb-3">
      以下为 <code class="text-xs bg-muted px-1 py-0.5 rounded">/about</code> 下的嵌套路由演示；子页面在
      <code class="text-xs bg-muted px-1 py-0.5 rounded">app/pages/about/</code> 目录中。
    </p>
    <UNavigationMenu :items="aboutNavItems" class="mb-6 max-w-max" />
    <NuxtPage />
  </div>
</template>
