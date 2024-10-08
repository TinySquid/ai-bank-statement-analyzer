import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

const OpeningBalance: React.FC<{ openingBalance: string }> = ({ openingBalance }) => {
  return (
    <Card className="mx-4 bg-neutral-800 border-neutral-700 text-white w-[25%]">
      <CardContent className="flex justify-start pt-6 items-center">
        <Activity className="w-12 h-12 mr-4 text-green-500" />
        <div className="flex flex-col">
          <p className="text-sm text-gray-100">Opening Balance</p>
          <p className="text-xl font-bold">{openingBalance}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpeningBalance;
