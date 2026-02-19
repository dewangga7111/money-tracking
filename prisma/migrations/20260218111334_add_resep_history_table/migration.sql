-- CreateTable
CREATE TABLE "tb_resep_history" (
    "history_id" UUID NOT NULL,
    "resep_id" UUID NOT NULL,
    "resep_name" VARCHAR(255) NOT NULL,
    "bahan_deductions" TEXT NOT NULL,
    "executed_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "executed_by" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "error_message" TEXT,

    CONSTRAINT "tb_resep_history_pkey" PRIMARY KEY ("history_id")
);

-- AddForeignKey
ALTER TABLE "tb_resep_history" ADD CONSTRAINT "tb_resep_history_resep_id_fkey" FOREIGN KEY ("resep_id") REFERENCES "tb_resep"("resep_id") ON DELETE RESTRICT ON UPDATE CASCADE;
