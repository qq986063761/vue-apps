<template>
  <div class="frame">
    
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

let route = useRoute()
onMounted(() => {
  console.log('performance', performance, route)
})
</script>

<style lang="scss">
.frame {
  height: 100%;
}
</style>