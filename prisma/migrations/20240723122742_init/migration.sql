/*
  Warnings:

  - Made the column `siteId` on table `Hotel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_siteId_fkey";

-- AlterTable
ALTER TABLE "Hotel" ALTER COLUMN "siteId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
