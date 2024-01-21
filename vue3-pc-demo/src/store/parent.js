import { defineStore } from 'pinia'

// 父 store
export const useStore = defineStore('store', {
  state: () => ({ 
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    text: '内容'
  }),
  getters: {
    dateTime(state) {
      return state.date + ' ' + state.time
    }
  },
  actions: {
    updateTime() {
      this.time = new Date().toLocaleTimeString()
    },
    updateText(val) {
      this.text = val
    }
  },
})