export interface Lesson {
  title: string
  url: string
  img: string
  html: string
  lessonNo: string
}

export interface Query {
  page?: number
  pageSize?: number
}

export interface PaginatedLessons {
  items: Lesson[]
  page: number
  pageSize: number
  total: number
}
