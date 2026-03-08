<template>
  <div class="home">
    <div class="header">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    
    <h1>【webpack5联邦】测试引入子应用组件</h1>
    <Suspense>
      <template #default>
        <Child1Button />
      </template>
      <template #fallback>
        <div>加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
.home {
  padding: 20px;

  .header {
    text-align: center;
  }
}
</style>
