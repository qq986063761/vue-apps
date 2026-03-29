import type { UploadRecord } from '~/shared/types/upload'

export const useUploadsStore = defineStore('uploads', {
  state: () => ({
    list: [] as UploadRecord[],
    loading: false,
    uploading: false
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        this.list = await $fetch<UploadRecord[]>('/api/uploads')
      } finally {
        this.loading = false
      }
    },
    async uploadFile(file: File) {
      this.uploading = true
      try {
        const body = new FormData()
        body.append('file', file)
        await $fetch<UploadRecord>('/api/upload', { method: 'POST', body })
        await this.fetchAll()
      } finally {
        this.uploading = false
      }
    },
    async remove(id: string) {
      await $fetch(`/api/uploads/${id}`, { method: 'DELETE' })
      await this.fetchAll()
    }
  }
})
