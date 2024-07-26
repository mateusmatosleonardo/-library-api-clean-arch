/*
  Warnings:

  - Added the required column `name` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "isbn" TEXT NOT NULL
);
INSERT INTO "new_books" ("author", "gender", "id", "isbn", "quantity") SELECT "author", "gender", "id", "isbn", "quantity" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
