/*
  Warnings:

  - You are about to drop the `SiteHotel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SiteHotel" DROP CONSTRAINT "SiteHotel_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "SiteHotel" DROP CONSTRAINT "SiteHotel_siteId_fkey";

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "siteId" TEXT;

-- DropTable
DROP TABLE "SiteHotel";

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;
