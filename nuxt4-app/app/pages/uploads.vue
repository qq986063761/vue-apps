<script setup lang="ts">
import { useUploadsStore } from '~/stores/uploads'

const store = useUploadsStore()
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  store.fetchAll()
})

function pickFile() {
  inputRef.value?.click()
}

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  await store.uploadFile(file)
}

function isImage(mime: string) {
  return mime.startsWith('image/')
}

function formatSize(n: number) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}
</script>

<template>
  <section class="card">
    <h1>文件上传与展示</h1>
    <p class="muted">
      接口：<code>POST /api/upload</code>（multipart 字段名 <code>file</code>）、<code>GET /api/uploads</code>、<code>DELETE /api/uploads/:id</code>；文件写入
      <code>public/uploads</code>，由 Nuxt 静态服务，访问路径为 <code>/uploads/&lt;文件名&gt;</code>。元数据在服务端内存，重启后列表清空（磁盘文件可保留）。
    </p>

    <div class="row">
      <input
        ref="inputRef"
        type="file"
        class="sr-only"
        accept="image/*,application/pdf,.txt"
        @change="onFileChange"
      />
      <button type="button" :disabled="store.uploading" @click="pickFile">
        {{ store.uploading ? '上传中…' : '选择文件上传' }}
      </button>
    </div>

    <p v-if="store.loading" class="muted">加载中…</p>

    <ul v-else class="list">
      <li v-for="u in store.list" :key="u.id" class="item">
        <div class="preview">
          <img v-if="isImage(u.mimeType)" :src="u.url" :alt="u.originalName" class="thumb" />
          <div v-else class="placeholder">{{ u.mimeType }}</div>
        </div>
        <div class="meta">
          <div class="name" :title="u.originalName">{{ u.originalName }}</div>
          <div class="sub">{{ formatSize(u.size) }} · {{ new Date(u.uploadedAt).toLocaleString() }}</div>
          <a class="link" :href="u.url" target="_blank" rel="noopener">打开 / 下载</a>
        </div>
        <button type="button" class="danger" :disabled="store.uploading" @click="store.remove(u.id)">删除</button>
      </li>
    </ul>

    <p v-if="!store.loading && !store.list.length" class="muted empty">暂无上传，请选择文件。</p>
  </section>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e5e7eb;
  max-width: 48rem;
}
h1 {
  margin: 0 0 0.75rem;
  font-size: 1.35rem;
}
.muted {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 1rem;
  line-height: 1.5;
}
code {
  font-size: 0.85em;
  background: #f1f5f9;
  padding: 0.1em 0.35em;
  border-radius: 4px;
}
.row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
button {
  padding: 0.45rem 0.75rem;
  cursor: pointer;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #f8fafc;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
button.danger {
  border-color: #fecaca;
  color: #b91c1c;
  background: #fef2f2;
  align-self: flex-start;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.item {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
}
.preview {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 6px;
  overflow: hidden;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.placeholder {
  font-size: 0.65rem;
  padding: 0.35rem;
  text-align: center;
  word-break: break-all;
  color: #64748b;
}
.meta {
  flex: 1;
  min-width: 0;
}
.name {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sub {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 0.2rem;
}
.link {
  font-size: 0.85rem;
  color: #2563eb;
  margin-top: 0.35rem;
  display: inline-block;
}
.empty {
  margin-top: 0.5rem;
}
</style>
