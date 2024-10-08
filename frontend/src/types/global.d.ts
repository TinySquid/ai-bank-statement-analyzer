declare module "reportDataParams" {
  export enum ReportState {
    CREATED = "CREATED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETE = "COMPLETE",
    ERRORED = "ERRORED",
  }

  export interface AccountHolderParams {
    name: string;
  }

  export interface StatementParams {
    bankName: string;
    period: string;
    totalCredits: string;
    totalDebits: string;
    openingBalance: string;
    closingBalance: string;
  }

  export interface AssessmentParams {
    riskScore: string;
    riskAssessment: string;
    summary: string;
    recommendForApproval: boolean;
    riskFactors: RiskFactorParams[];
    highRiskTransactions: HighRiskTransactionParams[];
    recurringPayments: RecurringPaymentParams[];
    existingLoans: ExistingLoanParams[];
  }

  export interface RiskFactorParams {
    title: string;
    description: string;
    implication: string;
  }

  export interface HighRiskTransactionParams {
    amount: string;
    description: string;
    justification: string;
  }

  export interface RecurringPaymentParams {
    description: string;
    amount: string;
    category: string;
  }

  export interface ExistingLoanParams {
    servicer: string;
    description: string;
    monthlyAmount: string;
  }

  export interface ReportDataParams {
    state: ReportState;
    accountHolder: AccountHolderParams;
    statement: StatementParams;
    assessment: AssessmentParams;
  }

  export interface ErrorResponse {
    error: string;
  }
}
