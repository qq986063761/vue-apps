import { existsSync } from 'node:fs'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { UploadRecord } from '../../shared/types/upload'

const records = new Map<string, Omit<UploadRecord, 'url'>>()

export function getUploadDir(): string {
  return join(process.cwd(), 'public', 'uploads')
}

export function publicUrlForStoredName(storedName: string): string {
  return `/uploads/${storedName}`
}

function toRecord(row: Omit<UploadRecord, 'url'>): UploadRecord {
  return {
    ...row,
    url: publicUrlForStoredName(row.storedName)
  }
}

export function listUploads(): UploadRecord[] {
  return [...records.values()]
    .map(toRecord)
    .sort((a, b) => b.uploadedAt - a.uploadedAt)
}

export async function saveUpload(part: {
  filename?: string
  data: Buffer
  type?: string
}): Promise<UploadRecord> {
  const rawName = part.filename?.trim() || 'file'
  const dir = getUploadDir()
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true })
  }
  const id = crypto.randomUUID()
  const ext = rawName.includes('.') ? rawName.slice(rawName.lastIndexOf('.')) : ''
  const storedName = `${id}${ext}`
  const path = join(dir, storedName)
  await writeFile(path, part.data)

  const row: Omit<UploadRecord, 'url'> = {
    id,
    originalName: rawName,
    storedName,
    mimeType: part.type || 'application/octet-stream',
    size: part.data.length,
    uploadedAt: Date.now()
  }
  records.set(id, row)
  return toRecord(row)
}

export async function deleteUpload(id: string): Promise<boolean> {
  const row = records.get(id)
  if (!row) return false
  const path = join(getUploadDir(), row.storedName)
  try {
    await unlink(path)
  } catch {
    // 文件可能已被手动删除，仍移除记录
  }
  records.delete(id)
  return true
}
