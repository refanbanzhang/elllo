export interface AudioItem {
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

export interface PaginatedResponse {
  items: AudioItem[]
  page: number
  pageSize: number
  total: number
}
