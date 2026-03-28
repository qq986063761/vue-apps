import { createItem } from '../utils/items-memory'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ title?: string }>(event)
  const title = body?.title ?? ''
  return createItem(title)
})
