import { AVAILABILITY } from "@/application/enums/availability.enum"

export interface Book {
  title: string
  subtitle?: string
  author: string
  publisher: string
  publication_date: string
  gender: string
  edition: string
  availability: AVAILABILITY
  isbn: string
}
