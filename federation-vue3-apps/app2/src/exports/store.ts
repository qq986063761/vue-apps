import { defineStore } from 'pinia'

export const useApp2Store = defineStore('app2', {
  state: () => ({
    appName: 'app2',
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

export default useApp2Store
