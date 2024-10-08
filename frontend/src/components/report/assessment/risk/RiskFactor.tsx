import React from "react";

export interface RiskFactorParams {
  title: string;
  description: string;
  implication: string;
}

const RiskFactor: React.FC<RiskFactorParams> = ({ title, description, implication }) => {
  return (
    <li className="mt-2">
      <strong>{title}:</strong> {description} ({implication})
    </li>
  );
};

export default RiskFactor;
