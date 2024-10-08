import React from "react";
import { ExistingLoanParams } from "@/types/reportData";

const Loan: React.FC<ExistingLoanParams> = ({ servicer, description, monthlyAmount }) => {
  return (
    <>
      <li className="mt-2">
        <strong>{servicer}:</strong> {description} ({monthlyAmount} / Monthly)
      </li>
    </>
  );
};

export default Loan;
