<template>
  <div class="index">

  </div>
</template>

<script setup>
// 默认跳其他页面
navigateTo({
  name: 'frame',
  query: {
    a: 1
  },
  params: {
    text: 'asfasf'
  }
})
</script>

<style lang="scss">
.index {

}
</style>