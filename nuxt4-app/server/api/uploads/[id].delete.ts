import { deleteUpload } from '../../utils/uploads-memory'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: '缺少 id' })
  }
  const ok = await deleteUpload(id)
  if (!ok) {
    throw createError({ statusCode: 404, statusMessage: '未找到上传记录' })
  }
  return { ok: true }
})
