<template>
  <div>
    <p>{{ text }}</p>
    <p>{{ data.text }}</p>
    <!-- ref 用来挂载对象 -->
    <p ref="refEl">{{ str }}</p>
    <p ref="refEls" v-for="n in 3" :key="n">列表 {{ n }}</p>
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  nextTick,
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated, 
  onBeforeUnmount, 
  onUnmounted,
  getCurrentInstance
} from 'vue'

let vm = null
let refEl = ref(null)
let refEls = []
let text = '普通内容'
let data = reactive({
  text: '响应式对象的内容'
})
setTimeout(() => {
  data.text = '响应式对象的内容变化了'
}, 1000)

let str = ref('响应式原始类型内容')
setTimeout(() => {
  str.value = '响应式原始类型内容变化了'

  // nextTick 中，dom 更新完了，可以取 dom 最新状态
  nextTick(() => {
    console.log('nextTick 中获取 ref 对象', refEl.value)
    console.log('列表的 ref 挂载对象', refEls)
  })
}, 1000)

onBeforeMount(() => {
  console.log('onBeforeMount')
})

onMounted(() => {
  vm = getCurrentInstance()
  console.warn('onMounted 获取组件实例，这个方法是调试看数据用的，不要用在生产', vm)
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})

onUnmounted(() => {
  console.log('onUnmounted')
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})

onUpdated(() => {
  console.log('onUpdated')
})
</script>