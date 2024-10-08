import React from "react";
import RecurringPayment from "./RecurringPayment";
import { Card, CardContent, CardHeader } from "../ui/card";
import { RecurringPaymentParams } from "reportDataParams";

interface RecurringPaymentsListProps {
  payments: RecurringPaymentParams[];
}

const RecurringPaymentsList: React.FC<RecurringPaymentsListProps> = ({ payments }) => {
  if (payments.length) {
    return (
      <Card className="m-4 my-6 bg-neutral-800 border-neutral-700 text-white">
        <CardHeader>
          <h2 className="text-2xl font-semibold ">Recurring Payments</h2>
        </CardHeader>
        <CardContent className="text-lg">
          <ul className="list-disc list-inside pl-4">
            {payments.map((payment, idx) => (
              <RecurringPayment key={idx} {...payment} />
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default RecurringPaymentsList;
