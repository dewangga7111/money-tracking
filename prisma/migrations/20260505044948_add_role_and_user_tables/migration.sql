-- CreateTable
CREATE TABLE "tb_role" (
    "role_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_by" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "tb_user" (
    "user_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role_id" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_by" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(50),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "tb_role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
