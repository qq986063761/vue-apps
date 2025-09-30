<template>
  <div>
    <el-card>
      <template #header>状态管理</template>
      <p>日期：{{ date }}</p>
      <p>时间：{{ time }}</p>
      <p>日期时间：{{ dateTime }}</p>
      <p>父 text：{{ text }}</p>
      <div class="block">
        <p>子 text：{{ childText }}</p>
        <el-button type="primary" @click="onChangeParentText">改变父 store 的 text</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import {
  useStore,
  useChildStore
} from '/src/store/index.js'

let store = useStore()
let { updateTime, updateText } = store
// storeToRefs 可以让解构的变量是响应式的
let { date, time, dateTime, text } = storeToRefs(store)
setInterval(updateTime, 1000)

// 子 store
let childStore = useChildStore()
let { childText } = storeToRefs(store)
let onChangeParentText = () => {
  updateText('被改变了的内容')
}
</script>

<style>

</style>