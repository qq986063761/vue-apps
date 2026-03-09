<template>
  <el-button
    class="child1-button"
    type="primary"
    @click="handleClick"
  >
    {{ text || '没获取到 child1 中 store 数据' }}
  </el-button>
</template>

<script>
import store from '@/store'
import ajax from '@/ajax'

export default {
  name: 'Child1Button',
  computed: {
    // 直接引用 child1 store 模块，不依赖 inject（支持跨应用使用）
    text() {
      return store.state.text
    }
  },
  methods: {
    handleClick() {
      ajax.post()
    }
  },
  mounted() {
    console.log('child1 Button mounted')
  }
}
</script>
