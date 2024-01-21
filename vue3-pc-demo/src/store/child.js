import { defineStore } from 'pinia'

// 子 store
export const useChildStore = defineStore('childStore', {
  state: () => ({ 
    childText: '子内容'
  }),
  getters: {
    
  },
  actions: {
    updateParentText(val) {
      this.text = val
    }
  },
})