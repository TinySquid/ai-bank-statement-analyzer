import { ReportDataParams } from "reportDataParams";
import FinancialAssessment from "./assessment/FinancialAssessment";
import StatementOverview from "./statement/StatementOverview";

const Report = ({ reportData }: { reportData: ReportDataParams }) => {
  if (!reportData) return null;

  const { accountHolder, statement, assessment } = reportData;

  return (
    <div className="w-4/5 max-w-[1200px] bg-neutral-900 text-white p-6 rounded-lg shadow-md mx-auto">
      <h1 className="text-3xl font-bold m-6 mb-10">Statement Insights Report</h1>

      <StatementOverview accountHolderName={accountHolder.name} {...statement} />

      <FinancialAssessment assessment={assessment} />
    </div>
  );
};

export default Report;
