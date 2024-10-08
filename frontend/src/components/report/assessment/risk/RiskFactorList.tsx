import React from "react";
import RiskFactor, { RiskFactorParams } from "./RiskFactor";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface RiskFactorListProps {
  riskFactors: RiskFactorParams[];
}

const RiskFactorList: React.FC<RiskFactorListProps> = ({ riskFactors }) => {
  if (riskFactors.length) {
    return (
      <Card className="m-4 my-6 bg-neutral-800 border-neutral-700 text-white">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Primary Risk Factors Identified</h2>
        </CardHeader>
        <CardContent className="text-lg">
          <ul className="list-disc list-inside pl-4">
            {riskFactors.map((factor, idx) => (
              <RiskFactor key={idx} {...factor} />
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default RiskFactorList;
