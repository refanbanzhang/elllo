import audios from "../../audios.json"
import type { Query, PaginatedResponse } from "@/types"

export const getAudios = (query: Query): Promise<PaginatedResponse> => {
  const page = query.page || 1
  const pageSize = query.pageSize || 20

  // 计算起始index（当前页码 * 每页数量）
  const start = (page - 1) * pageSize
  // 计算结束index（起始index + 每页数量）
  const end = start + pageSize
  const items = audios.slice(start, end)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items,
        page,
        pageSize,
        total: audios.length,
      })
    }, 1000)
  })
}
