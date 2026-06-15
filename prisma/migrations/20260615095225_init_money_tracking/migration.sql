/*
  Warnings:

  - You are about to drop the `tb_home_section` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('BANK', 'E_WALLET', 'CASH');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'TRANSFER');

-- DropTable
DROP TABLE "tb_home_section";

-- CreateTable
CREATE TABLE "tb_wallet" (
    "wallet_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" "WalletType" NOT NULL,
    "balance" DECIMAL(19,4) NOT NULL DEFAULT 0,
    "user_id" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_by" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_wallet_pkey" PRIMARY KEY ("wallet_id")
);

-- CreateTable
CREATE TABLE "tb_category" (
    "category_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" "CategoryType" NOT NULL,
    "icon" VARCHAR(50),
    "user_id" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_by" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "tb_transaction" (
    "transaction_id" UUID NOT NULL,
    "amount" DECIMAL(19,4) NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "notes" VARCHAR(255),
    "type" "TransactionType" NOT NULL,
    "wallet_id" UUID NOT NULL,
    "to_wallet_id" UUID,
    "category_id" UUID,
    "user_id" UUID NOT NULL,
    "created_by" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- AddForeignKey
ALTER TABLE "tb_wallet" ADD CONSTRAINT "tb_wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_category" ADD CONSTRAINT "tb_category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_transaction" ADD CONSTRAINT "tb_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_transaction" ADD CONSTRAINT "tb_transaction_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "tb_wallet"("wallet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_transaction" ADD CONSTRAINT "tb_transaction_to_wallet_id_fkey" FOREIGN KEY ("to_wallet_id") REFERENCES "tb_wallet"("wallet_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_transaction" ADD CONSTRAINT "tb_transaction_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tb_category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;
