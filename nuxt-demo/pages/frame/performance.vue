<template>
  <div class="frame-perormance">
    <div v-for="({ label, text }) in timings" :key="label">
      {{ label }}: {{ text }}
    </div>
  </div>
</template>

<script setup>
// 定义页面 key，用于其他页面路由匹配
definePageMeta({
  key: route => route.frame
})

import { ref, onMounted } from 'vue'

let timings = ref([])
// console.log('performance', performance)

onMounted(() => {
  let { timing } = performance
  let timingLabelMap = {
    domContentLoadedEventStart: '文档内容加载开始',
    domContentLoadedEventEnd: '文档内容加载结束',
    domComplete: '文档内容完全加载完成',
    loadEventStart: '页面完全加载的开始',
    loadEventEnd: '页面完全加载的结束',
  }
  
  for (let prop in timing) {
    let val = timing[prop]
    if (typeof val !== 'number') continue

    let date = new Date(val)

    timings.value.push({
      prop,
      value: val,
      label: timingLabelMap[prop] || prop,
      text: date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    })
  }

  timings.value = timings.value.sort((a, b) => a.value - b.value)
})
</script>

<style lang="scss">
.frame-perormance {

}
</style>