<template>
  <div class="child-view">
    <MicroApp
      name="child2"
      :url="child2Url"
      :props="child2Props"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import MicroApp from '@/components/MicroApp.vue'

export default {
  name: 'Child2View',
  components: {
    MicroApp
  },
  setup() {
    const child2Url = ref('http://localhost:8082')
    const child2Props = ref({
      data: {
        message: '来自主应用的数据'
      }
    })
    
    return {
      child2Url,
      child2Props
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
