<template>
  <div>
    <el-form :model="form">
      <el-form-item label="姓">
        <el-input v-model="form.fstName" />
      </el-form-item>
      <el-form-item label="名">
        <el-input v-model="form.lastName" />
      </el-form-item>
      <el-form-item label="计算属性">
        <el-input :value="name" readonly />
      </el-form-item>
    </el-form>
    <!-- <p v-blue>姓名：{{ name }}</p> -->
  </div>
</template>

<script setup>
  import {ref, reactive, computed, watch, watchEffect} from 'vue'

  let form = reactive({
    fstName: 'Wan',
    lastName: 'Peng'
  })

  // 计算属性
  let name = computed(() => {
    return form.fstName + ' ' + form.lastName
  })

  // 监听属性
  let unwatch = watch(name, (val, oldVal) => {
    console.log(`name 变化：从 ${ oldVal } 变成了 ${ val }`)
  })

  // 监听多个变量，监听对象的属性要用函数 () => data.prop 返回
  watch([() => form.fstName, () => form.lastName], ([val, val1], [oldVal, oldVal1]) => {
    console.log(`多个变量变化：姓从 ${ oldVal } 变成了 ${ val }，名从 ${ oldVal1 } 变成了 ${ val1 }`)
  })

  // 监听整个内部内容变化，一开始会立即执行一次
  watchEffect(() => {
    console.log('watchEffect', name.value)
  })
</script>
