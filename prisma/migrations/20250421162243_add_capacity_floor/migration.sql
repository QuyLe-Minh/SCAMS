/*
  Warnings:

  - Added the required column `buildingId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "buildingId" INTEGER NOT NULL,
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "floor" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Building_name_key" ON "Building"("name");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
