import { PrismaClient } from "@prisma/client";
import { assistants } from "../src/config/openai/assistants";

import openai from "../src/config/openai/openai";

const prisma = new PrismaClient();

async function main() {
  const id = await findOrCreateAssistant();

  if (id) {
    await connectAssistantToTools(id);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function findOrCreateAssistant() {
  const assistant = assistants.loanOfficer;

  const existingAssistantOnOpenAI = await openai.beta.assistants.list({
    query: assistant.name,
  });

  const existingAssistantOnDb = await prisma.assistant.findUnique({
    where: {
      name: assistant.name,
    },
  });

  if (existingAssistantOnOpenAI && existingAssistantOnDb) return null;

  if (!existingAssistantOnDb) {
    let assistantId: string;

    if (existingAssistantOnOpenAI.data.length > 0) {
      assistantId = existingAssistantOnOpenAI.data[0].id;
    } else {
      const newAssistant = await openai.beta.assistants.create({
        ...assistant,
      });

      assistantId = newAssistant.id;
    }

    try {
      await prisma.assistant.create({
        data: {
          id: assistantId,
          name: assistant.name,
          instructions: assistant.instructions,
          model: assistant.model,
        },
      });

      return assistantId;
    } catch (prismaError) {
      await openai.beta.assistants.del(assistantId);

      console.error(prismaError);
    }
  }
}

async function connectAssistantToTools(assistantId: string) {
  const assistant = assistants.loanOfficer;

  for (const tool of assistant.tools) {
    const createdTool = await prisma.tool.upsert({
      where: { type: tool.type },
      update: {},
      create: { type: tool.type },
    });

    await prisma.assistantToTool.create({
      data: {
        assistantId: assistantId,
        toolId: createdTool.id,
      },
    });
  }
}
