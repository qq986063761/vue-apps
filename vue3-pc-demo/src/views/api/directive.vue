<template>
  <div>
    <h1 v-blue style="color: #fff;padding: 10px 20px;">
      利用指令背景变颜色
    </h1>
  </div>
</template>

<script setup>

</script>

<script>
export default {
  directives: {
    // 指令的 hook 和 vue2 不同
    blue: {
      created(el, binding, vnode, prevNnode) {
        el.style.background = 'blue'
        console.log('created', el, binding, vnode, prevNnode)
      },
      beforeMount(el, binding, vnode, prevNnode) {
        console.log('beforeMount', el, binding, vnode, prevNnode)
      },
      mounted(el, binding, vnode, prevNnode) {
        console.log('mounted', el, binding, vnode, prevNnode)
      },
      beforeUpdate(el, binding, vnode, prevNnode) {
        console.log('beforeUpdate', el, binding, vnode, prevNnode)
      },
      updated(el, binding, vnode, prevNnode) {
        console.log('updated', el, binding, vnode, prevNnode)
      },
      beforeUnmount(el, binding, vnode, prevNnode) {
        console.log('beforeUnmount', el, binding, vnode, prevNnode)
      },
      unmounted(el, binding, vnode, prevNnode) {
        console.log('unmounted', el, binding, vnode, prevNnode)
      }
    }
  }
}
</script>