/*
  Warnings:

  - You are about to drop the column `loanId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `exitDate` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `userCpf` on the `loans` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `loans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `loans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_cpf` to the `loans` table without a default value. This is not possible if the table is not empty.

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
    "isbn" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loan_id" TEXT,
    CONSTRAINT "books_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "gender", "id", "isbn", "name", "quantity") SELECT "author", "gender", "id", "isbn", "name", "quantity" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");
CREATE TABLE "new_loans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_cpf" TEXT NOT NULL,
    CONSTRAINT "loans_user_cpf_fkey" FOREIGN KEY ("user_cpf") REFERENCES "users" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_loans" ("id") SELECT "id" FROM "loans";
DROP TABLE "loans";
ALTER TABLE "new_loans" RENAME TO "loans";
CREATE UNIQUE INDEX "loans_user_cpf_key" ON "loans"("user_cpf");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("cpf", "email", "id", "name", "phone") SELECT "cpf", "email", "id", "name", "phone" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
