export const statementReportSchema = {
  "name": "financial_report_response",
  "strict": true,
  "schema": {
    "type": "object",
    "required": [
      "account_holder_name",
      "bank_name",
      "bank_statement_period",
      "total_account_debits",
      "total_account_credits",
      "opening_account_balance",
      "closing_account_balance",
      "existing_loan_obligations",
      "recurring_payments",
      "transactions_increasing_risk",
      "summary_of_financial_habits",
      "financial_lending_risk_assessment",
      "financial_lending_risk_score",
      "recommend_for_a_loan_approval",
    ],
    "additionalProperties": false,
    "properties": {
      "account_holder_name": {
        "type": "string",
      },
      "bank_name": {
        "type": "string",
      },
      "bank_statement_period": {
        "type": "string",
      },
      "total_account_debits": {
        "type": "string",
      },
      "total_account_credits": {
        "type": "string",
      },
      "opening_account_balance": {
        "type": "string",
      },
      "closing_account_balance": {
        "type": "string",
      },
      "existing_loan_obligations": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["loan_servicer", "loan_payment_transaction_description", "amount"],
          "additionalProperties": false,
          "properties": {
            "loan_servicer": {
              "type": "string",
            },
            "loan_payment_transaction_description": {
              "type": "string",
            },
            "amount": {
              "type": "string",
            },
          },
        },
      },
      "recurring_payments": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["transaction_description", "amount", "category"],
          "additionalProperties": false,
          "properties": {
            "transaction_description": {
              "type": "string",
            },
            "amount": {
              "type": "string",
            },
            "category": {
              "type": "string",
            },
          },
        },
      },
      "transactions_increasing_risk": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["transaction_description", "amount", "risk_justification"],
          "additionalProperties": false,
          "properties": {
            "transaction_description": {
              "type": "string",
            },
            "amount": {
              "type": "string",
            },
            "risk_justification": {
              "type": "string",
            },
          },
        },
      },
      "summary_of_financial_habits": {
        "type": "string",
      },
      "financial_lending_risk_assessment": {
        "type": "object",
        "required": ["risk_assessment", "risk_factors"],
        "additionalProperties": false,
        "properties": {
          "risk_assessment": {
            "type": "string",
          },
          "risk_factors": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["factor", "description", "risk_implication"],
              "additionalProperties": false,
              "properties": {
                "factor": {
                  "type": "string",
                },
                "description": {
                  "type": "string",
                },
                "risk_implication": {
                  "type": "string",
                },
              },
            },
          },
        },
      },
      "financial_lending_risk_score": {
        "type": "string",
      },
      "recommend_for_a_loan_approval": {
        "type": "boolean",
      },
    },
  },
};
