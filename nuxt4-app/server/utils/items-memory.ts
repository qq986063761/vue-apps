import type { Item } from '../../shared/types/item'

const items: Item[] = [
  { id: crypto.randomUUID(), title: '示例：第一条', createdAt: Date.now() }
]

export function listItems(): Item[] {
  return [...items].sort((a, b) => b.createdAt - a.createdAt)
}

export function createItem(title: string): Item {
  const trimmed = title.trim()
  if (!trimmed) {
    throw createError({ statusCode: 400, statusMessage: '标题不能为空' })
  }
  const item: Item = {
    id: crypto.randomUUID(),
    title: trimmed,
    createdAt: Date.now()
  }
  items.push(item)
  return item
}

export function updateItem(id: string, title: string): Item {
  const trimmed = title.trim()
  if (!trimmed) {
    throw createError({ statusCode: 400, statusMessage: '标题不能为空' })
  }
  const idx = items.findIndex((i) => i.id === id)
  if (idx === -1) {
    throw createError({ statusCode: 404, statusMessage: '未找到条目' })
  }
  items[idx] = { ...items[idx], title: trimmed }
  return items[idx]
}

export function deleteItem(id: string): void {
  const idx = items.findIndex((i) => i.id === id)
  if (idx === -1) {
    throw createError({ statusCode: 404, statusMessage: '未找到条目' })
  }
  items.splice(idx, 1)
}
