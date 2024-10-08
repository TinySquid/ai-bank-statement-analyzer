import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

const ClosingBalance: React.FC<{ closingBalance: string }> = ({ closingBalance }) => {
  return (
    <Card className="mx-4 bg-neutral-800 border-neutral-700 text-white w-[25%]">
      <CardContent className="flex justify-start pt-6 items-center">
        <RefreshCw className="w-12 h-12 mr-4 text-yellow-500" />
        <div className="flex flex-col">
          <p className="text-sm text-gray-100">Closing Balance</p>
          <p className="text-xl font-bold">{closingBalance}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClosingBalance;
