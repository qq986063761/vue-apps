import { updateItem } from '../../utils/items-memory'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: '缺少 id' })
  }
  const body = await readBody<{ title?: string }>(event)
  const title = body?.title ?? ''
  return updateItem(id, title)
})
