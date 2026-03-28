<script setup lang="ts">
const counter = useCounterStore()
</script>

<template>
  <section class="card">
    <h1>首页</h1>
    <p>最小 Nuxt 4 演示：文件路由、布局、Pinia、以及 Nitro 全栈 API。</p>
    <p class="hint">顶部导航可切换到「关于」与「全栈 CRUD」。</p>

    <div class="counter">
      <p>Pinia 计数器（纯前端状态）：<strong>{{ counter.count }}</strong></p>
      <div class="btns">
        <button type="button" @click="counter.dec()">−</button>
        <button type="button" @click="counter.inc()">+</button>
      </div>
    </div>
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
.hint {
  color: #6b7280;
  font-size: 0.9rem;
}
.counter {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px dashed #e5e7eb;
}
.btns {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
button {
  min-width: 2.5rem;
  padding: 0.35rem 0.75rem;
  cursor: pointer;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #f8fafc;
}
button:hover {
  background: #eef2ff;
}
</style>
