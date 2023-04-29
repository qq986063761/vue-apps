import { defineStore } from 'pinia'
export { useChildStore } from './child.js'

// 根 store
export const useStore = defineStore('store', {
  state: () => ({ 
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  }),
  getters: {
    dateTime(state) {
      return state.date + ' ' + state.time
    }
  },
  actions: {
    updateTime() {
      this.time = new Date().toLocaleTimeString()
    }
  },
})