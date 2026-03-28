<template>
  <div class="layout">
    <header class="header">
      <strong class="brand">nuxt4-app demo</strong>
      <nav class="nav">
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/about">关于</NuxtLink>
        <NuxtLink to="/items">全栈 CRUD</NuxtLink>
      </nav>
    </header>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  font-family: system-ui, sans-serif;
  color: #1a1a1a;
  background: #f6f7f9;
}
.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  padding: 0.75rem 1.25rem;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}
.brand {
  font-size: 1rem;
}
.nav {
  display: flex;
  gap: 1rem;
}
.nav a {
  color: #2563eb;
  text-decoration: none;
}
.nav a.router-link-active {
  font-weight: 600;
  text-decoration: underline;
}
.main {
  max-width: 42rem;
  margin: 0 auto;
  padding: 1.5rem 1rem 2rem;
}
</style>
