import app from "./app";
import { statementAnalysisWorker } from "./config/bullmq/workers/statements/analysisWorker";
import { generateReportWorker } from "./config/bullmq/workers/statements/reportWorker";

if (!statementAnalysisWorker.isRunning()) {
  statementAnalysisWorker.run();
}

if (!generateReportWorker.isRunning()) {
  generateReportWorker.run();
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${String(PORT)} in ${process.env.NODE_ENV} mode`);
});
