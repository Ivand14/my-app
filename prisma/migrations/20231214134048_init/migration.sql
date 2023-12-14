/*
  Warnings:

  - The `pay` column on the `shift` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "shift" DROP COLUMN "pay",
ADD COLUMN     "pay" BOOLEAN NOT NULL DEFAULT false;
