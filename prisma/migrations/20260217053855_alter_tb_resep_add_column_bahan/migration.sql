/*
  Warnings:

  - Added the required column `bahan` to the `tb_resep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_resep" ADD COLUMN     "bahan" TEXT NOT NULL;
