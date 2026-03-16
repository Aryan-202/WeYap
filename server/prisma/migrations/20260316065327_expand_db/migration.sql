/*
  Warnings:

  - Added the required column `password` to the `Yapper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Yapper" ADD COLUMN     "password" TEXT NOT NULL;
