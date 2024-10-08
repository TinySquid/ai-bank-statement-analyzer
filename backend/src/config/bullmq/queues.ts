import { Queue, ConnectionOptions } from "bullmq";
// import * as tls from "tls";

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  // url: process.env.REDIS_URL,
  // tls: {
  //   rejectUnauthorized: false,
  // },
};

export const queues = {
  statementAnalysis: "statementAnalysis",
  statementReport: "statementReport",
};

export const statementAnalysisQueue = new Queue(queues.statementAnalysis, {
  connection: redisConnection,
});

export const statementReportQueue = new Queue(queues.statementReport, {
  connection: redisConnection,
});
