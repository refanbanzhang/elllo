import audios from "../../audios.json"
import type { Query, PaginatedLessons, Lesson } from "@/types"

const mockPromise = (data: any, delay = 300): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}

export const getLessons = (query: Query): Promise<PaginatedLessons> => {
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

export const getLessonByNo = (lessonNo: string): Promise<Lesson> => {
  return mockPromise(audios.find((audio) => audio.lessonNo === lessonNo))
}

export const getPrevLesson = (lessonNo?: string): Promise<Lesson | null> => {
  if (!lessonNo) {
    return mockPromise(audios[0])
  }

  const index = audios.findIndex((audio) => audio.lessonNo === lessonNo)
  const prevIndex = index - 1

  if (prevIndex < 0) {
    return mockPromise(audios[audios.length - 1])
  }

  return mockPromise(audios[prevIndex])
}

export const getNextLesson = (lessonNo?: string): Promise<Lesson | null> => {
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