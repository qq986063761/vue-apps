<template>
  <div>
    <p>v-model <input v-model="_text"></p>
    <p>v-model:title <input v-model="_title"></p>
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
  let compIndexData = inject('compIndex', {})
  console.log('inject 获取数据', compIndexData)

  // props
  let props = defineProps({
    modelValue: String,
    // Modifiers 结尾的 props 用来接收对应 prop 的修饰参数
    modelModifiers: Object,
    title: String,
    titleModifiers: Object,
  })

  // 定义 emit 配置
  let emit = defineEmits([
    'update:modelValue',
    'update:title'
  ])

  let _text = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    }
  })

  let _title = computed({
    get() {
      return props.title
    },
    set(val) {
      emit('update:title', val)
    }
  })

  console.log('获取到 props 中 v-model 的修饰参数：', props.modelModifiers)
  console.log('获取到 props 中 v-model:title 的修饰参数：', props.titleModifiers)
</script>

<style>

</style>