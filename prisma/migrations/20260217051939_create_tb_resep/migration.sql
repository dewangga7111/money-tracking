-- CreateTable
CREATE TABLE "tb_resep" (
    "resep_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "resep" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_by" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_resep_pkey" PRIMARY KEY ("resep_id")
);
