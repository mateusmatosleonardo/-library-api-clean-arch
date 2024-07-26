import { Entity } from "@/shared/entities/entity"

export type BookProps = {
  name: string
  quantity: number
  author: string
  gender: string
  isbn: string
}

export class BookEntity extends Entity<BookProps> {
  constructor(public readonly props: BookProps, id?: string) {
    super(props, id)
  }

  validate() {
    const { name, quantity, author, gender, isbn } = this.props
    if (!name) {
      throw new Error("Name cannot be empty")
    }
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero")
    }
    if (!author) {
      throw new Error("Author cannot be empty")
    }
    if (!gender) {
      throw new Error("Gender cannot be empty")
    }
    if (!isbn) {
      throw new Error("ISBN cannot be empty")
    }
  }
}
