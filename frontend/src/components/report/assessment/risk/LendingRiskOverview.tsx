import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LendingRiskOverviewParams {
  riskScore: string;
  recommendForApproval: boolean;
  summary: string;
}

const RiskScoreBar: React.FC<{ riskScore: string }> = ({ riskScore }) => {
  const riskScoreInt = parseInt(riskScore);

  let riskScoreColor = "bg-green-500";
  if (riskScoreInt >= 65) {
    riskScoreColor = "bg-red-500";
  } else if (riskScoreInt >= 30) {
    riskScoreColor = "bg-yellow-500";
  }

  return <div className={`w-16 h-4 ${riskScoreColor} rounded-full`} style={{ width: `${riskScoreInt}%` }}></div>;
};

const RiskOpinion: React.FC<{ recommendForApproval: boolean }> = ({ recommendForApproval }) => {
  return (
    <Alert variant={`${recommendForApproval ? "positive" : "destructive"}`}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Recommendation for Lending</AlertTitle>
      {recommendForApproval ? (
        <AlertDescription className="inline">
          This individual&apos;s finances may allow for a loan approval.
        </AlertDescription>
      ) : (
        <AlertDescription className="inline">
          This individual should not be approved for additional loans.
        </AlertDescription>
      )}
    </Alert>
  );
};

const LendingRiskOverview: React.FC<LendingRiskOverviewParams> = ({ riskScore, recommendForApproval, summary }) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        <div className="w-24 h-4 bg-gray-200 rounded-full mr-2">
          <RiskScoreBar riskScore={riskScore} />
        </div>
        <p>Lending Risk Score: {riskScore}/100</p>
      </div>

      <RiskOpinion recommendForApproval={recommendForApproval} />

      <h1 className="mt-4 text-xl font-semibold">Summary</h1>
      <p className="my-4">{summary}</p>
    </div>
  );
};

export default LendingRiskOverview;
