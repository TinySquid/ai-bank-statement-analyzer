import express, { Request, Response } from "express";
import prisma from "../../../config/prisma";

const router = express.Router();

router.get("/:reportId/status", async (req: Request, res: Response) => {
  const { reportId } = req.params;

  const report = await prisma.report.findUnique({
    where: {
      id: parseInt(reportId),
    },
  });

  if (!report) {
    res.status(404).json({ error: "Report not found" });
    return;
  }

  res.status(200).json({ status: report.state });
});

router.get("/:reportId", async (req: Request, res: Response) => {
  const { reportId } = req.params;

  try {
    const report = await prisma.report.findUnique({
      where: {
        id: parseInt(reportId),
      },
      include: {
        accountHolder: true,
        statement: true,
        assessment: {
          include: {
            riskFactors: true,
            highRiskTransactions: true,
            recurringPayments: true,
            existingLoans: true,
          },
        },
      },
    });

    if (!report) {
      res.status(404).json({ error: "Report not found" });
      return;
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report:", error);

    res.status(500).json({ error: "An error occurred while fetching the report" });
  }
});

export default router;
