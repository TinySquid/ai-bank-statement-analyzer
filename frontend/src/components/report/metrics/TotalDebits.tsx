import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const TotalDebits: React.FC<{ totalDebits: string }> = ({ totalDebits }) => {
  return (
    <Card className="mx-4 bg-neutral-800 border-neutral-700 text-white w-[25%]">
      <CardContent className="flex justify-start pt-6 items-center">
        <CreditCard className="w-12 h-12 mr-4 text-red-500" />
        <div className="flex flex-col">
          <p className="text-sm text-gray-100">Total Debits</p>
          <p className="text-xl font-bold">{totalDebits}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalDebits;
