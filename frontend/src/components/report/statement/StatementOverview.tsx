import React from "react";
import AccountHolderCard from "@/components/report/AccountHolderCard";
import StatementDetailsCard, { StatementDetailsParams } from "./StatementDetailsCard";
import TotalCredits from "@/components/report/metrics/TotalCredits";
import TotalDebits from "@/components/report/metrics/TotalDebits";
import OpeningBalance from "@/components/report/metrics/OpeningBalance";
import ClosingBalance from "@/components/report/metrics/ClosingBalance";

interface AccountHolder {
  accountHolderName: string;
}

interface AccountMetricsParams {
  totalCredits: string;
  totalDebits: string;
  openingBalance: string;
  closingBalance: string;
}

interface StatementOverviewProps extends AccountHolder, StatementDetailsParams, AccountMetricsParams {}

const StatementOverview: React.FC<StatementOverviewProps> = ({
  accountHolderName,
  bankName,
  period,
  totalCredits,
  totalDebits,
  openingBalance,
  closingBalance,
}) => {
  return (
    <>
      <AccountHolderCard accountHolderName={accountHolderName} />
      <StatementDetailsCard bankName={bankName} period={period} />

      <div className="flex">
        <TotalCredits totalCredits={totalCredits} />
        <TotalDebits totalDebits={totalDebits} />
        <OpeningBalance openingBalance={openingBalance} />
        <ClosingBalance closingBalance={closingBalance} />
      </div>
    </>
  );
};

export default StatementOverview;
