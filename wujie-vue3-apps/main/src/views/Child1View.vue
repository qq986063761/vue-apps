<template>
  <div class="child-view">
    <MicroApp
      name="child1"
      :url="child1Url"
      :props="child1Props"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import MicroApp from '@/components/MicroApp.vue'

export default {
  name: 'Child1View',
  components: {
    MicroApp
  },
  setup() {
    const child1Url = ref('http://localhost:8081')
    const child1Props = ref({
      data: {
        message: '来自主应用的数据'
      }
    })
    
    return {
      child1Url,
      child1Props
    }
  }
}
</script>

<style lang="scss" scoped>
.child-view {
  width: 100%;
  height: 100%;
}
</style>
