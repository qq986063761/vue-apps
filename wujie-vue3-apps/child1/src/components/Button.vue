<template>
  <el-button class="child1-button" type="primary" @click="handleClick">
    {{ displayText }}
  </el-button>
</template>

<script setup>
import { computed, onMounted, getCurrentInstance } from 'vue'

// 定义 props，允许从外部传入文本
const props = defineProps({
  text: {
    type: String,
    default: 'child1 store text'
  }
})

// 显示文本：优先使用 props.text
const displayText = computed(() => props.text)

onMounted(() => {
  console.log('child1 Button mounted')
})

const handleClick = () => {
  const instance = getCurrentInstance()
  if (instance && instance.appContext.config.globalProperties.$ajax) {
    instance.appContext.config.globalProperties.$ajax.post()
  }
}
</script>
