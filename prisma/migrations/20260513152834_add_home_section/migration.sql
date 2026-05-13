-- CreateTable
CREATE TABLE "tb_home_section" (
    "section" VARCHAR(50) NOT NULL,
    "data" JSONB NOT NULL,
    "updated_by" VARCHAR(50),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_home_section_pkey" PRIMARY KEY ("section")
);
