import { Job, Worker } from "bullmq";
import { redisConnection, queues, statementReportQueue } from "../../queues";
import { assistants } from "../../../openai/assistants";
import prisma from "../../../prisma";
import openai from "../../../openai/openai";
import fs from "fs";
import { statementAnalysisPrompt } from "../../../openai/prompts";
import { deleteFile } from "../../../../utils/fileHelpers";

export const statementAnalysisWorker = new Worker(
  queues.statementAnalysis,
  async (job: Job) => {
    const { filePath, reportId } = job.data;

    await prisma.report.update({
      where: {
        id: reportId,
      },
      data: {
        state: "IN_PROGRESS",
      },
    });

    const assistant = await prisma.assistant.findFirst({
      where: {
        name: assistants.loanOfficer.name!,
      },
    });

    if (!assistant) {
      throw new Error(`Assistant '${assistants.loanOfficer.name}' not found`);
    }

    const fileStore = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });

    console.log("Job", job.id, "assistant", assistant.id, "file store", fileStore.id);

    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content: statementAnalysisPrompt,
          attachments: [{ file_id: fileStore.id, tools: [{ type: "file_search" }] }],
        },
      ],
    });

    console.log("thread", thread.id);

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id!,
    });

    console.log("run", run.id);

    const messages = await openai.beta.threads.messages.list(thread.id, {
      run_id: run.id,
    });

    const message = messages.data.pop()!;

    if (message.content[0].type === "text") {
      const { text } = message.content[0];

      return {
        reportId: reportId,
        threadId: thread.id,
        fileStoreId: fileStore.id,
        filePath: filePath,
        rawReportText: text.value,
      };
    }

    throw new Error("Unexpected message type from AI response");
  },
  { connection: redisConnection },
);

statementAnalysisWorker.on("completed", async (job) => {
  const { reportId, threadId, fileStoreId, filePath, rawReportText } = job.returnvalue;

  await statementReportQueue.add("convertToStructuredOutput", {
    reportId: reportId,
    reportText: rawReportText,
  });

  await openai.beta.threads.del(threadId);
  await openai.files.del(fileStoreId);
  await deleteFile(filePath);
});

statementAnalysisWorker.on("failed", async (job, err) => {
  if (!job) {
    console.error(`Job queue ${queues.statementAnalysis} has failed with ${err.message}`);
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
