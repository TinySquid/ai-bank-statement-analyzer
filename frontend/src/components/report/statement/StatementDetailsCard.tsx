import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface StatementDetailsParams {
  bankName: string;
  period: string;
}

const StatementDetailsCard: React.FC<StatementDetailsParams> = ({ bankName, period }) => {
  return (
    <Card className="m-4 my-6 bg-neutral-800 border-neutral-700 text-white">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Statement Details</h2>
      </CardHeader>
      <CardContent className="text-lg">
        <p>Bank: {bankName}</p>
        <p>Period: {period}</p>
      </CardContent>
    </Card>
  );
};

export default StatementDetailsCard;
