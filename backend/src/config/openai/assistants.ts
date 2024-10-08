import { AssistantCreateParams } from "openai/resources/beta";

type AssistantKeys = "loanOfficer";

type Assistants = Record<AssistantKeys, AssistantCreateParams>;

export const assistants: Assistants = {
  loanOfficer: {
    name: "Loan Officer",
    instructions:
      "You are an expert loan officer. Use your knowledge base to generate financial reports and answer questions about provided bank statements.",
    model: "gpt-4o",
    tools: [{ type: "file_search" }],
  },
};
