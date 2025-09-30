<template>
  <div class="api-template-demo">
    <el-card>
      <template #header>
        普通渲染
      </template>
      <p>{{ text }}</p>
      <p>{{ data.text }}</p>
      <p ref="refEl">{{ str }}</p>
    </el-card>

    <el-card>
      <template #header>
        列表渲染
      </template>
      <p ref="refEls" v-for="n in 3" :key="n">列表 {{ n }}</p>
    </el-card>

    <el-card>
      <template #header>
        css绑定
      </template>
      <p class="cssbind">我的颜色会随变量改变而变化</p>
    </el-card>
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

let refEl = ref(null)
let refEls = []
let text = '普通内容'
let str = ref('响应式原始类型')
let data = reactive({
  text: '响应式对象类型'
})

// ref 定义的响应式数据，赋值方式如下
// str.value = ''

// nextTick 中，dom 已经更新到最新状态
nextTick(() => {
  console.log('获取 ref', refEl.value)
  console.log('获取 refs', refEls)
})

// 生命周期
onBeforeMount(() => {
  console.log('onBeforeMount')
})

onMounted(() => {
  console.log('onBeforeMount')
  
  // 获取当前组件实例，调试看数据用的，不要用在生产
  // let vm = getCurrentInstance()
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


// css bind 变量
let theme = reactive({
  color: 'blue'
})

setInterval(() => {
  theme.color = theme.color === 'blue' 
    ? 'unset' 
    : 'blue'
}, 1000)
</script>

<style lang="scss">
  .api-template-demo {
    .el-card {
      + .el-card {
        margin-top: 10px;
      }
    }

    .cssbind {
      color: v-bind('theme.color');
    }
  }
</style>