/*
  Warnings:

  - Made the column `emailVerified` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "emailVerified" SET NOT NULL,
ALTER COLUMN "emailVerified" SET DEFAULT CURRENT_TIMESTAMP;
