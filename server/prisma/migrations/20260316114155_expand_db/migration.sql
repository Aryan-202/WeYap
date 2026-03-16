/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Yapper` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Yapper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Yapper" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Yapper_email_key" ON "Yapper"("email");
