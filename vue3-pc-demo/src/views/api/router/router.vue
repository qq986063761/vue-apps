<template>
  <div class="router-demo">
    <el-card>
      <template #header>
        <router-link to="/api/router/child1">router-link 跳转 Child1</router-link>
        <router-link to="/api/router/child2">router-link 跳转 Child2</router-link>
        <el-link type="primary" @click="toView('routerChild1')">js 跳转 Child1</el-link>
        <el-link type="danger" @click="toView('routerChild2')">js 跳转 Child2</el-link>
      </template>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script setup>
  import {
    watchEffect
  } from 'vue'

  import {
    useRouter,
    useRoute,
    onBeforeRouteUpdate,
    onBeforeRouteLeave
  } from 'vue-router'

  let router = useRouter()
  let route = useRoute()

  let toView = name => {
    console.log('toView', route)

    router.push({
      name
    })
  }

  // 路由这里我们可以用 watchEffect 来实现初始化进入
  watchEffect(() => {
    console.log('init')
  })

  onBeforeRouteUpdate((to, from) => {
    console.log('onBeforeRouteUpdate', to, from)
  })

  onBeforeRouteLeave((to, from) => {
    console.log('onBeforeRouteLeave', to, from)

    // return 可以控制是否离开
    // return false
  })
</script>

<style lang="scss">
  .router-demo {
    a + a {
      margin-left: 20px;
    }
  }
</style>