<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: '首页', to: '/' },
  { label: '关于', to: '/about' },
  { label: '全栈 CRUD', to: '/items' },
  { label: '文件上传', to: '/uploads' }
])
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-muted">
    <UHeader class="border-b border-default">
      <template #title>
        <NuxtLink to="/" class="text-highlighted font-semibold">
          nuxt4-app demo
        </NuxtLink>
      </template>

      <UNavigationMenu :items="navItems" />

      <template #body>
        <UNavigationMenu
          :items="navItems"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain class="flex-1">
      <UContainer class="max-w-3xl py-6 pb-8">
        <slot />
      </UContainer>
    </UMain>
  </div>
</template>
