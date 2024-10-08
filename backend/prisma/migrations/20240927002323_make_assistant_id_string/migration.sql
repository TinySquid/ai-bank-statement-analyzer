/*
  Warnings:

  - The primary key for the `Assistant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AssistantToTool` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AssistantToTool" DROP CONSTRAINT "AssistantToTool_assistantId_fkey";

-- AlterTable
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Assistant_id_seq";

-- AlterTable
ALTER TABLE "AssistantToTool" DROP CONSTRAINT "AssistantToTool_pkey",
ALTER COLUMN "assistantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AssistantToTool_pkey" PRIMARY KEY ("assistantId", "toolId");

-- AddForeignKey
ALTER TABLE "AssistantToTool" ADD CONSTRAINT "AssistantToTool_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
