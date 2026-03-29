/** 上传记录（与 GET /api/uploads 返回结构一致） */
export interface UploadRecord {
  id: string
  originalName: string
  storedName: string
  mimeType: string
  size: number
  uploadedAt: number
  url: string
}
