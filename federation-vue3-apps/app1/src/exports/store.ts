import { defineStore } from 'pinia'

export const useApp1Store = defineStore('app1', {
  state: () => ({
    appName: 'app1',
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count += 1
    },
    setCount(payload: number) {
      this.count = payload
    },
    incrementAsync() {
      window.setTimeout(() => {
        this.increment()
      }, 1000)
    },
  },
})

export default useApp1Store
