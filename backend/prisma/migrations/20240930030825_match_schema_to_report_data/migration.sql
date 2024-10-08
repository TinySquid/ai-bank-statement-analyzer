/*
  Warnings:

  - You are about to drop the column `totalTransactions` on the `Statement` table. All the data in the column will be lost.
  - You are about to drop the `CommonBill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Insight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeeklyBalance` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `riskAssessment` to the `Assessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closingBalance` to the `Statement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingBalance` to the `Statement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommonBill" DROP CONSTRAINT "CommonBill_assessmentId_fkey";

-- DropForeignKey
ALTER TABLE "Insight" DROP CONSTRAINT "Insight_assessmentId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyBalance" DROP CONSTRAINT "WeeklyBalance_statementId_fkey";

-- AlterTable
ALTER TABLE "Assessment" ADD COLUMN     "riskAssessment" TEXT NOT NULL,
ALTER COLUMN "riskScore" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Statement" DROP COLUMN "totalTransactions",
ADD COLUMN     "closingBalance" TEXT NOT NULL,
ADD COLUMN     "openingBalance" TEXT NOT NULL;

-- DropTable
DROP TABLE "CommonBill";

-- DropTable
DROP TABLE "Insight";

-- DropTable
DROP TABLE "WeeklyBalance";

-- CreateTable
CREATE TABLE "RecurringPayment" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "assessmentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecurringPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskFactor" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "implication" TEXT NOT NULL,
    "assessmentId" INTEGER,

    CONSTRAINT "RiskFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighRiskTransaction" (
    "id" SERIAL NOT NULL,
    "amount" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "justification" TEXT NOT NULL,
    "assessmentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HighRiskTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecurringPayment" ADD CONSTRAINT "RecurringPayment_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskFactor" ADD CONSTRAINT "RiskFactor_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighRiskTransaction" ADD CONSTRAINT "HighRiskTransaction_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
