export const statementAnalysisPrompt = `
This is a bank statement provided by a business loan applicant. Answer the following list based on the information in the bank statement. Include the quoted title as a heading in your response for each point.
1. "Account Holder's Name" What is the account holder's name?
2. "Name of the Bank" What is the name of the bank?
3. "Statement Period" What is the bank statement period? Use a format like 'MM/DD/YYYY to MM/DD/YYYY'.
4. "Total Debits and Credits" Identify the total debits and credits.
5. "Opening and Closing Account Balance Amounts" Identify the opening and closing account balance amounts
6. "Existing Loan Obligations" Identify any existing loans the account holder may be making payments on. Include the loan servicer, transaction description, and the amount.
7. "Recurring Payments" Identify any recurring payments and categorize them. Include the description of the transaction, the amount, and the category.
8. "Transactions Increasing Risk" Identify any transactions that would increase the risk of lending to this account holder. Include the description of the transaction, the amount, and the risk it poses.
9. "Summary of Financial Habits and Spending Patterns" Provide a summary of the account holder's financial habits and spending patterns.
10. "Risk Assessment" Provide a risk assessment of the overall financials from the bank statement and whether you recommend them for approval for a business loan. Include insights into their cash flow and spending habits, noting the account balance throughout the statement period. Include 3 key factors in supporting your risk assessment and a short description, and a short sentence on the risk implication of each factor.
11. "Financial Risk Score" Generate a financial risk score for this account holder between 0 and 100, with 100 being extremely risky, and 0 being extremely safe. Only include the risk score number.
Lastly, keep responses concise and focused, avoiding unnecessary elaboration or additional context unless explicitly requested. If a response requires further detail, prioritize the most relevant information and conclude promptly.
`;
