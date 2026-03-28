import type { Item } from '~/shared/types/item'

export const useItemsStore = defineStore('items', {
  state: () => ({
    list: [] as Item[],
    loading: false
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        this.list = await $fetch<Item[]>('/api/items')
      } finally {
        this.loading = false
      }
    },
    async create(title: string) {
      await $fetch<Item>('/api/items', { method: 'POST', body: { title } })
      await this.fetchAll()
    },
    async update(id: string, title: string) {
      await $fetch<Item>(`/api/items/${id}`, { method: 'PUT', body: { title } })
      await this.fetchAll()
    },
    async remove(id: string) {
      await $fetch(`/api/items/${id}`, { method: 'DELETE' })
      await this.fetchAll()
    }
  }
})
