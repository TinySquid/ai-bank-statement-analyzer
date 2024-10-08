import { Job, Worker } from "bullmq";
import { redisConnection, queues } from "../../queues";
import prisma from "../../../prisma";
import openai from "../../../openai/openai";
import { statementReportSchema } from "../../../openai/responseSchemas";

export const generateReportWorker = new Worker(
  queues.statementReport,
  async (job: Job) => {
    const { reportId, reportText } = job.data;

    const structuredOutput = await convertReportToStructuredOutput(reportText);

    return { reportId, structuredOutput };
  },
  { connection: redisConnection },
);

generateReportWorker.on("completed", async (job) => {
  const { reportId, structuredOutput } = job.returnvalue;

  await saveReportToDb(reportId, structuredOutput);
});

generateReportWorker.on("failed", async (job, err) => {
  if (!job) {
    console.error(`Job queue ${queues.statementReport} has failed with ${err.message}`);
    return;
  }

  console.error(`Job ${job.id} has failed with ${err.message}`);

  const { reportId } = job.data;

  await prisma.report.update({
    where: {
      id: reportId,
    },
    data: {
      state: "ERRORED",
    },
  });
});

async function convertReportToStructuredOutput(reportText: string) {
  const structuredReport = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Extract the bank statement analysis report information.",
      },
      {
        role: "user",
        content: reportText,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: statementReportSchema,
    },
  });

  return structuredReport.choices[0].message.parsed;
}

async function saveReportToDb(reportId: number, structuredOutput: any) {
  try {
    await prisma.$transaction(async (prisma) => {
      const accountHolder = await prisma.accountHolder.create({
        data: {
          name: structuredOutput.account_holder_name,
          report: { connect: { id: reportId } },
        },
      });

      await prisma.statement.create({
        data: {
          bankName: structuredOutput.bank_name,
          period: structuredOutput.bank_statement_period,
          totalCredits: structuredOutput.total_account_credits,
          totalDebits: structuredOutput.total_account_debits,
          openingBalance: structuredOutput.opening_account_balance,
          closingBalance: structuredOutput.closing_account_balance,
          report: { connect: { id: reportId } },
        },
      });

      const assessment = await prisma.assessment.create({
        data: {
          riskScore: structuredOutput.financial_lending_risk_score,
          riskAssessment: structuredOutput.financial_lending_risk_assessment.risk_assessment,
          summary: structuredOutput.summary_of_financial_habits,
          recommendForApproval: structuredOutput.recommend_for_a_loan_approval,
          report: { connect: { id: reportId } },
        },
      });

      if (structuredOutput.financial_lending_risk_assessment.risk_factors.length > 0) {
        const riskFactorPromises = structuredOutput.financial_lending_risk_assessment.risk_factors.map((f: any) => {
          return prisma.riskFactor.create({
            data: {
              title: f.factor,
              description: f.description,
              implication: f.risk_implication,
              assessmentId: assessment.id,
            },
          });
        });

        await Promise.all(riskFactorPromises);
      }

      if (structuredOutput.transactions_increasing_risk.length > 0) {
        const transactionPromises = structuredOutput.transactions_increasing_risk.map(async (t: any) => {
          return prisma.highRiskTransaction.create({
            data: {
              amount: t.amount,
              description: t.transaction_description,
              justification: t.risk_justification,
              assessmentId: assessment.id,
            },
          });
        });

        await Promise.all(transactionPromises);
      }

      if (structuredOutput.existing_loan_obligations.length > 0) {
        const loanPromises = structuredOutput.existing_loan_obligations.map(async (l: any) => {
          return prisma.loan.create({
            data: {
              servicer: l.loan_servicer,
              description: l.loan_payment_transaction_description,
              monthlyAmount: l.amount,
              assessment: { connect: { id: assessment.id } },
            },
          });
        });

        await Promise.all(loanPromises);
      }

      if (structuredOutput.recurring_payments.length > 0) {
        const recurringPromises = structuredOutput.recurring_payments.map(async (p: any) => {
          return prisma.recurringPayment.create({
            data: {
              description: p.transaction_description,
              amount: p.amount,
              category: p.category,
              assessmentId: assessment.id,
            },
          });
        });

        await Promise.all(recurringPromises);
      }

      await prisma.report.update({
        where: { id: reportId },
        data: { state: "COMPLETE" },
      });
    });
  } catch (error) {
    console.error("Error saving report data:", error);

    await prisma.report.update({
      where: { id: reportId },
      data: { state: "ERRORED" },
    });
  }
}
