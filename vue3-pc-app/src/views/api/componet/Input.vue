<template>
  <div>
    <h3>我是子组件</h3>
    <p>v-model <el-input v-model="text" placeholder="请输入" /></p>
    <p>v-model:title <el-input v-model="title" placeholder="请输入" /></p>
  </div>
</template>

<script setup>
  import { 
    computed,
    defineProps, 
    defineEmits,
    inject,
  } from 'vue'

  // 注入依赖值 参数2是默认值
  let injectData = inject('parentData', {})
  console.log('获取到 inject 数据', injectData)

  // 定义 props
  let props = defineProps({
    modelValue: String,
    // Modifiers 结尾，接收对应属性的修饰参数
    modelModifiers: Object,
    title: String,
    titleModifiers: Object,
  })

  // 定义 emit
  let emit = defineEmits([
    'update:modelValue',
    'update:title'
  ])

  // 双向绑定
  let text = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    }
  })

  let title = computed({
    get() {
      return props.title
    },
    set(val) {
      emit('update:title', val)
    }
  })

  console.log('props 中 v-model 的修饰参数：', props.modelModifiers)
  console.log('props 中 v-model:title 的修饰参数：', props.titleModifiers)
</script>

<style>

</style>