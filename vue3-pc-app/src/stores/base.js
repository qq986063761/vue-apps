import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBaseStore = defineStore('base', () => {
  const baseData = ref('Base Store Data')
  const baseCount = ref(0)
  
  // 计算属性
  const baseInfo = computed(() => ({
    data: baseData.value,
    count: baseCount.value,
    timestamp: new Date().toLocaleTimeString()
  }))
  
  // 方法
  function updateBaseData(newData) {
    baseData.value = newData
  }
  
  function incrementBase() {
    baseCount.value++
  }
  
  function resetBase() {
    baseCount.value = 0
    baseData.value = 'Base Store Data'
  }
  
  return {
    baseData,
    baseCount,
    baseInfo,
    updateBaseData,
    incrementBase,
    resetBase
  }
})
