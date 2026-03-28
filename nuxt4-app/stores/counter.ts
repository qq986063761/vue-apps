/** 演示 Pinia 客户端全局状态（与 server 无关） */
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    inc() {
      this.count += 1
    },
    dec() {
      this.count -= 1
    }
  }
})
