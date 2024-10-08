import React from "react";
import { HighRiskTransactionParams } from "reportDataParams";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import HighRiskTransaction from "./HighRiskTransaction";

interface HighRiskTransactionListProps {
  transactions: HighRiskTransactionParams[];
}

const HighRiskTransactionList: React.FC<HighRiskTransactionListProps> = ({ transactions }) => {
  if (transactions.length) {
    return (
      <Card className="m-4 my-6 bg-neutral-800 border-neutral-700 text-white">
        <CardHeader>
          <h2 className="text-2xl font-semibold ">High Risk Transactions</h2>
        </CardHeader>
        <CardContent className="text-lg">
          <ul className="list-disc list-inside pl-4">
            {transactions.map((transaction, idx) => (
              <HighRiskTransaction key={idx} {...transaction} />
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default HighRiskTransactionList;
