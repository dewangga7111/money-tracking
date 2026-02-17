-- CreateTable
CREATE TABLE "tb_system" (
    "sys_cat" VARCHAR(100) NOT NULL,
    "sys_sub_cat" VARCHAR(100) NOT NULL,
    "sys_code" VARCHAR(100) NOT NULL,
    "sys_value" TEXT NOT NULL,
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_by" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_system_pkey" PRIMARY KEY ("sys_cat","sys_sub_cat","sys_code")
);
