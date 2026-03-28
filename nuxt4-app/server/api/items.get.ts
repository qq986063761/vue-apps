import { listItems } from '../utils/items-memory'

export default defineEventHandler(() => {
  return listItems()
})
