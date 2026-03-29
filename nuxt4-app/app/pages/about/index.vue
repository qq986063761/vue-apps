<template>
  <UCard>
    <template #header>
      <h1 class="text-lg font-semibold text-highlighted">关于（首页）</h1>
    </template>

    <p class="text-default leading-relaxed">
      对应文件 <code class="text-sm bg-muted px-1.5 py-0.5 rounded">app/pages/about/index.vue</code>，
      路由为 <code class="text-sm bg-muted px-1.5 py-0.5 rounded">/about</code>。
    </p>
    <p class="text-default leading-relaxed mt-3">
      父级布局在 <code class="text-sm bg-muted px-1.5 py-0.5 rounded">app/pages/about.vue</code>，
      内含 <code class="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;NuxtPage /&gt;</code> 用于渲染子路由。
    </p>
  </UCard>
</template>
