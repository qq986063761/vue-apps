import { deleteItem } from '../../utils/items-memory'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: '缺少 id' })
  }
  deleteItem(id)
  return { ok: true }
})
