-- CreateTable
CREATE TABLE "Statement" (
    "id" SERIAL NOT NULL,
    "bankName" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "totalTransactions" TEXT NOT NULL,
    "totalCredits" TEXT NOT NULL,
    "totalDebits" TEXT NOT NULL,
    "reportId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyBalance" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "statementId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeeklyBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonBill" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "assessmentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommonBill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "servicer" TEXT NOT NULL,
    "monthlyAmount" TEXT NOT NULL,
    "assessmentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "recommendForApproval" BOOLEAN NOT NULL,
    "summary" TEXT NOT NULL,
    "reportId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insight" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assessmentId" INTEGER,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Statement_reportId_key" ON "Statement"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyBalance_statementId_key" ON "WeeklyBalance"("statementId");

-- CreateIndex
CREATE UNIQUE INDEX "Loan_assessmentId_key" ON "Loan"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_reportId_key" ON "Assessment"("reportId");

-- CreateIndex
CREATE INDEX "AccountHolder_name_idx" ON "AccountHolder"("name");

-- CreateIndex
CREATE INDEX "Report_state_idx" ON "Report"("state");

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyBalance" ADD CONSTRAINT "WeeklyBalance_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "Statement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonBill" ADD CONSTRAINT "CommonBill_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insight" ADD CONSTRAINT "Insight_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
