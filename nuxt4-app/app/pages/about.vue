<template>
  <section class="card">
    <h1>关于</h1>
    <p>本页用于演示 Nuxt 基于文件的路由：<code>app/pages/about.vue</code> 对应路径 <code>/about</code>。</p>
    <p>布局来自 <code>app/layouts/default.vue</code>，在 <code>app/app.vue</code> 中通过 <code>&lt;NuxtLayout&gt;</code> 包裹页面。</p>
  </section>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e5e7eb;
}
h1 {
  margin: 0 0 0.75rem;
  font-size: 1.35rem;
}
p {
  margin: 0.5rem 0;
  line-height: 1.55;
}
code {
  font-size: 0.88em;
  background: #f1f5f9;
  padding: 0.1em 0.35em;
  border-radius: 4px;
}
</style>
