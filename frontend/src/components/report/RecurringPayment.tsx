import React from "react";
import { RecurringPaymentParams } from "reportDataParams";

const RecurringPayment: React.FC<RecurringPaymentParams> = ({ category, description, amount }) => {
  return (
    <li className="mt-2">
      <strong>{amount}:</strong> {description} ({category})
    </li>
  );
};

export default RecurringPayment;
