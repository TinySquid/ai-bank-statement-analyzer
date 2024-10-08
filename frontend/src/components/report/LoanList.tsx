import React from "react";
import Loan from "./Loan";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ExistingLoanParams } from "reportDataParams";

interface LoanListProps {
  loans: ExistingLoanParams[];
}

const LoanList: React.FC<LoanListProps> = ({ loans }) => {
  if (loans.length) {
    return (
      <Card className="m-4 my-6 bg-neutral-800 border-neutral-700 text-white">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Existing Loans Identified</h1>
        </CardHeader>
        <CardContent className="text-lg">
          <ul className="list-disc list-inside pl-4">
            {loans.map((loan, idx) => (
              <Loan key={idx} {...loan} />
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default LoanList;
