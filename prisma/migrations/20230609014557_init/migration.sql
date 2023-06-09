/*
  Warnings:

  - A unique constraint covering the columns `[ds_username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ds_email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_fk_id_type_user_fkey";

-- AlterTable
ALTER TABLE "Employees" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Establishment_payments" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Establishments" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Schedules" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Telephones" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Type_payment" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Type_user" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Users_ds_username_key" ON "Users"("ds_username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_ds_email_key" ON "Users"("ds_email");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_fk_id_type_user_fkey" FOREIGN KEY ("fk_id_type_user") REFERENCES "Type_user"("id_type_user") ON DELETE NO ACTION ON UPDATE CASCADE;