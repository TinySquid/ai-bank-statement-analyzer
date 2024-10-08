import React from "react";
import LendingRiskOverview from "./risk/LendingRiskOverview";
import RiskFactorList from "./risk/RiskFactorList";
import HighRiskTransactionList from "./risk/HighRiskTransactionList";
import RecurringPaymentsList from "../RecurringPaymentsList";
import LoanList from "../LoanList";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { AssessmentParams } from "reportDataParams";

interface FinancialAssessmentParams {
  assessment: AssessmentParams;
}

const FinancialAssessment: React.FC<FinancialAssessmentParams> = ({ assessment }) => {
  return (
    <>
      <Card className="m-4 my-6 bg-neutral-800 border-neutral-700 text-white">
        <CardHeader>
          <h2 className="text-2xl font-semibold ">Financial Assessment</h2>
        </CardHeader>
        <CardContent className="text-lg">
          <LendingRiskOverview
            riskScore={assessment.riskScore}
            recommendForApproval={assessment.recommendForApproval}
            summary={assessment.summary}
          />
        </CardContent>
      </Card>

      <RiskFactorList riskFactors={assessment.riskFactors} />

      <HighRiskTransactionList transactions={assessment.highRiskTransactions} />

      <RecurringPaymentsList payments={assessment.recurringPayments} />

      <LoanList loans={assessment.existingLoans} />
    </>
  );
};

export default FinancialAssessment;
