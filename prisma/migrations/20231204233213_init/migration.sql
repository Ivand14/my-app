/*
  Warnings:

  - Added the required column `service` to the `shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shift" ADD COLUMN     "service" TEXT NOT NULL;
