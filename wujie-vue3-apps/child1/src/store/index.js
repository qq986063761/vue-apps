import { defineStore } from 'pinia'

export const useChild1Store = defineStore('child1', {
  state: () => ({
    text: 'child1 store text'
  }),
  getters: {},
  actions: {
    async getData() {
      await new Promise(resolve => setTimeout(() => {
        this.text = 'child1 store 数据加载完成，点击发起应用内 ajax 请求'
        resolve()
      }, 1000))
    }
  }
})
