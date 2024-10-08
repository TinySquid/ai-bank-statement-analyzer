import React from "react";
import { HighRiskTransactionParams } from "@/types/reportData";

const HighRiskTransaction: React.FC<HighRiskTransactionParams> = ({ amount, description, justification }) => {
  return (
    <li className="mt-2">
      <strong>{amount}:</strong> {description} ({justification})
    </li>
  );
};

export default HighRiskTransaction;
