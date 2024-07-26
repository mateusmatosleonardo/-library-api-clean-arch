-- CreateTable
CREATE TABLE "loans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exitDate" DATETIME NOT NULL,
    "returnDate" DATETIME NOT NULL,
    "userCpf" TEXT NOT NULL,
    CONSTRAINT "loans_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "users" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "loanId" TEXT,
    CONSTRAINT "books_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "gender", "id", "isbn", "name", "quantity") SELECT "author", "gender", "id", "isbn", "name", "quantity" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "loans_userCpf_key" ON "loans"("userCpf");
