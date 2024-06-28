export type Isbn = {
  isbn: string;
};

export type CreateLoan = {
  exitDate: Date;
  returnDate: Date;
  userCpf: string;
  books: Isbn[];
};
