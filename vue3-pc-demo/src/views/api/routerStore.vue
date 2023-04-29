<template>
  <div class="router-store-demo">
    <p>
      <router-link to="/api/routerStore/child">跳转 Child</router-link>
      <router-link to="/api/routerStore/child2">跳转 Child2</router-link>
      <el-link type="primary" @click="toView('routerStoreChild')">js 跳转 Child</el-link>
      <el-link type="danger" @click="toView('routerStoreChild2')">js 跳转 Child2</el-link>
    </p>
    <router-view class="block"></router-view>

    <p>状态管理</p>
    <div class="block">
      <p>日期：{{ date }}</p>
      <p>时间：{{ time }}</p>
      <p>日期时间：{{ dateTime }}</p>
    </div>
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

  import { storeToRefs } from 'pinia'
  import { 
    useStore, 
    useChildStore 
  } from '/src/store/index.js'

  let router = useRouter()
  let route = useRoute()

  let toView = name => {
    console.log('route', route)

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

  // storeToRefs 可以让解构的变量是响应式的
  let store = useStore()
  let childStore = useChildStore()
  let { updateTime } = store
  let { date, time, dateTime } = storeToRefs(store) 
  setInterval(updateTime, 1000)
</script>

<style lang="scss">
  .router-store-demo {
    a + a {
      margin-left: 20px;
    }
  }
</style>