<template>
  <div class="micro-app-container">
    <WujieVue
      v-if="url"
      :width="'100%'"
      :height="'100%'"
      :name="name"
      :url="url"
      :sync="true"
      :fetch="fetch"
      :props="appProps"
      :loading="loadingEl"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  props: {
    type: Object,
    default: () => ({})
  }
})

const loadingEl = ref(document.createElement('span'))

// 使用无界的 props API 传递数据和方法
const appProps = computed(() => {
  return {
    name: props.name,
    ...props.props // 合并外部传入的 props
  }
})

const fetch = (url, options) => {
  return window.fetch(url, options)
}
</script>

<style lang="scss" scoped>
.micro-app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
