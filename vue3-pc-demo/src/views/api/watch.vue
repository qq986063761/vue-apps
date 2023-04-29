<template>
  <div>
    <p>姓：<el-input v-model="fstName"></el-input></p>
    <p>名：<el-input v-model="lastName"></el-input></p>
    <p v-blue>姓名：{{ name }}</p>
  </div>
</template>

<script setup>
  import {ref, computed, watch, watchEffect} from 'vue'

  let fstName = ref('FstName')
  let lastName = ref('LastName')

  // 计算属性
  let name = computed(() => {
    return fstName.value + ' ' + lastName.value
  })

  // 监听器
  let unwatch = watch(fstName, (val, oldVal) => {
    console.log('watch fstName', val, oldVal)
  })

  // 监听多个变量，如果是监听对象的属性要用函数 () => data.prop
  watch([lastName, name], ([val, val1], [oldVal, oldVal1]) => {
    console.log('watch 多个变量', [val, val1], [oldVal, oldVal1])
  })

  // 立即运行，并监听内部依赖变化
  watchEffect(() => {
    console.log('watchEffect', name.value)
  })
</script>

<script>
export default {
  directives: {
    // 指令的 hook 和 vue2 不同
    blue: {
      created(el, binding, vnode, prevNnode) {
        el.style.background = 'skyblue'
        console.log('directive created', el, binding, vnode, prevNnode)
      },
      beforeMount(el, binding, vnode, prevNnode) {
        console.log('directive beforeMount', el, binding, vnode, prevNnode)
      },
      mounted(el, binding, vnode, prevNnode) {
        console.log('directive mounted', el, binding, vnode, prevNnode)
      },
      beforeUpdate(el, binding, vnode, prevNnode) {
        console.log('directive beforeUpdate', el, binding, vnode, prevNnode)
      },
      updated(el, binding, vnode, prevNnode) {
        console.log('directive updated', el, binding, vnode, prevNnode)
      },
      beforeUnmount(el, binding, vnode, prevNnode) {
        console.log('directive beforeUnmount', el, binding, vnode, prevNnode)
      },
      unmounted(el, binding, vnode, prevNnode) {
        console.log('directive unmounted', el, binding, vnode, prevNnode)
      }
    }
  }
}
</script>