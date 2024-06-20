export interface IBook {
  name: string;
  quantity: number;
  author: string;
  gender: string;
  isbn: string;
}

export class Book implements IBook {
  name: string;
  quantity: number;
  author: string;
  gender: string;
  isbn: string;

  constructor({ name, quantity, author, gender, isbn }: IBook) {
    this.name = name;
    this.quantity = quantity;
    this.author = author;
    this.gender = gender;
    this.isbn = isbn;
  }
}
