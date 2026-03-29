import { readMultipartFormData } from 'h3'
import { saveUpload } from '../utils/uploads-memory'

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  if (!parts?.length) {
    throw createError({ statusCode: 400, statusMessage: '请使用 multipart/form-data 上传' })
  }
  const filePart = parts.find((p) => p.name === 'file' && p.filename && p.data)
  if (!filePart?.data) {
    throw createError({ statusCode: 400, statusMessage: '缺少 file 字段或文件内容为空' })
  }
  return saveUpload({
    filename: filePart.filename,
    data: Buffer.from(filePart.data),
    type: filePart.type
  })
})
