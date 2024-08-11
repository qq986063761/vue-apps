<template>
  <div class="frame">
    <menus></menus>
    <div class="frame-main">
      <!-- 路由匹配 -->
      <NuxtPage class="frame-main-page" :page-key="route => route.frame" />
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.frame {
  display: flex;
  height: 100%;
}

.frame-main {
  flex: 1;
  min-width: 0;
  height: 100%;
}

.frame-main-page {
  height: 100%;
}
</style>