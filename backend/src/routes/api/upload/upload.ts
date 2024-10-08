import express, { Request, Response } from "express";
import { upload } from "./multerConfig";
import { statementAnalysisQueue } from "../../../config/bullmq/queues";
import prisma from "../../../config/prisma";

const router = express.Router();

router.post("/upload", upload.single("statement"), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const report = await prisma.report.create({
    data: {
      state: "CREATED",
    },
  });

  await statementAnalysisQueue.add("analyzeStatement", {
    filePath: req.file.path,
    reportId: report.id,
  });

  res.status(201).json({ reportId: report.id });
});

export default router;
