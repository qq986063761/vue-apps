<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('child2 App mounted', window.$wujie, window.$wujie?.location?.href, window.location.href)
  
  // 通知主应用子应用加载完成
  if (window.$wujie) {
    const { bus } = window.$wujie
    const { name: appName } = window.$wujie.props || {}
    
    bus.$emit('app:init', {
      appName,
      data: { timestamp: Date.now() }
    })
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
