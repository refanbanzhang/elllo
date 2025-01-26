import audios from "../../audios.json"
import type { Query, PaginatedResponse, AudioItem } from "@/types"

const mockPromise = (data: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

export const getAudios = (query: Query): Promise<PaginatedResponse> => {
  const page = query.page || 1
  const pageSize = query.pageSize || 20

  // 计算起始index（当前页码 * 每页数量）
  const start = (page - 1) * pageSize
  // 计算结束index（起始index + 每页数量）
  const end = start + pageSize
  const items = audios.slice(start, end)

  return mockPromise({
    items,
    page,
    pageSize,
    total: audios.length
  })
}

export const getAudio = (lessonNo: string): Promise<AudioItem> => {
  return mockPromise(audios.find((audio) => audio.lessonNo === lessonNo))
}

export const getNextAudio = (lessonNo?: string): Promise<AudioItem | null> => {
  if (!lessonNo) {
    return mockPromise(audios[0])
  }

  const index = audios.findIndex((audio) => audio.lessonNo === lessonNo)
  const nextIndex = index + 1

  if (nextIndex >= audios.length) {
    return mockPromise(audios[0])
  }

  return mockPromise(audios[nextIndex])
}

