/*
  Warnings:

  - Added the required column `name` to the `tb_bahan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_bahan" ADD COLUMN     "name" VARCHAR(255) NOT NULL;
