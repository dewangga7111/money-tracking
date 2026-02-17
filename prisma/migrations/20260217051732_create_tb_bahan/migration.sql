-- CreateTable
CREATE TABLE "tb_bahan" (
    "bahan_id" UUID NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "satuan" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_by" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_bahan_pkey" PRIMARY KEY ("bahan_id")
);
