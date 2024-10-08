import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const TotalCredits: React.FC<{ totalCredits: string }> = ({ totalCredits }) => {
  return (
    <Card className="mx-4 bg-neutral-800 border-neutral-700 text-white w-[25%]">
      <CardContent className="flex justify-start pt-6 items-center">
        <DollarSign className="w-12 h-12 mr-4 text-blue-500" />
        <div className="flex flex-col">
          <p className="text-sm text-gray-100">Total Credits</p>
          <p className="text-xl font-bold">{totalCredits}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalCredits;
