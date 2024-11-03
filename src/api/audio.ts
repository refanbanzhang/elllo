import audios from "../../audios.json"
import type { AudioItem } from "@/types"

interface PaginatedResponse {
  items: AudioItem[]
  total: number
  page: number
  pageSize: number
}

const getAudios = (page = 1, pageSize = 10): PaginatedResponse => {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = audios.slice(start, end)

  return {
    items,
    total: audios.length,
    page,
    pageSize
  }
}

export { getAudios }
export type { AudioItem, PaginatedResponse }
