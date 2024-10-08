-- CreateEnum
CREATE TYPE "ReportState" AS ENUM ('CREATED', 'IN_PROGRESS', 'COMPLETE', 'ERRORED');

-- CreateTable
CREATE TABLE "AccountHolder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reportId" INTEGER,

    CONSTRAINT "AccountHolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "state" "ReportState" NOT NULL DEFAULT 'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountHolder_reportId_key" ON "AccountHolder"("reportId");

-- AddForeignKey
ALTER TABLE "AccountHolder" ADD CONSTRAINT "AccountHolder_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
