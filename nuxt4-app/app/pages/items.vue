<script setup lang="ts">
const store = useItemsStore()
const draft = ref('')
const editingId = ref<string | null>(null)
const editTitle = ref('')

onMounted(() => {
  store.fetchAll()
})

async function onCreate() {
  if (!draft.value.trim()) return
  await store.create(draft.value)
  draft.value = ''
}

function startEdit(id: string, title: string) {
  editingId.value = id
  editTitle.value = title
}

function cancelEdit() {
  editingId.value = null
  editTitle.value = ''
}

async function onSave(id: string) {
  if (!editTitle.value.trim()) return
  await store.update(id, editTitle.value)
  cancelEdit()
}

async function onDelete(id: string) {
  await store.remove(id)
  if (editingId.value === id) cancelEdit()
}
</script>

<template>
  <section class="card">
    <h1>全栈 CRUD（内存数据）</h1>
    <p class="muted">
      接口由 <code>server/api/items.*</code> 提供，数据存在服务端进程内存，重启后会恢复默认一条。
      列表由 Pinia <code>stores/items.ts</code> 拉取并缓存。
    </p>

    <form class="row" @submit.prevent="onCreate">
      <input v-model="draft" type="text" placeholder="新建标题" autocomplete="off" />
      <button type="submit" :disabled="store.loading">新增</button>
    </form>

    <p v-if="store.loading" class="muted">加载中…</p>

    <ul v-else class="list">
      <li v-for="item in store.list" :key="item.id">
        <template v-if="editingId === item.id">
          <input v-model="editTitle" type="text" class="grow" @keyup.enter="onSave(item.id)" />
          <button type="button" @click="onSave(item.id)">保存</button>
          <button type="button" class="ghost" @click="cancelEdit">取消</button>
        </template>
        <template v-else>
          <span class="grow title">{{ item.title }}</span>
          <button type="button" @click="startEdit(item.id, item.title)">编辑</button>
          <button type="button" class="danger" @click="onDelete(item.id)">删除</button>
        </template>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e5e7eb;
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
.row input {
  flex: 1;
  min-width: 0;
  padding: 0.45rem 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
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
}
button.ghost {
  background: transparent;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.list li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}
.grow {
  flex: 1;
  min-width: 0;
}
.title {
  font-weight: 500;
}
</style>
