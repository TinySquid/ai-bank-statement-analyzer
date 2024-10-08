-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assistant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistantToTool" (
    "assistantId" INTEGER NOT NULL,
    "toolId" INTEGER NOT NULL,

    CONSTRAINT "AssistantToTool_pkey" PRIMARY KEY ("assistantId","toolId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tool_type_key" ON "Tool"("type");

-- CreateIndex
CREATE INDEX "AssistantToTool_assistantId_idx" ON "AssistantToTool"("assistantId");

-- CreateIndex
CREATE INDEX "AssistantToTool_toolId_idx" ON "AssistantToTool"("toolId");

-- AddForeignKey
ALTER TABLE "AssistantToTool" ADD CONSTRAINT "AssistantToTool_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantToTool" ADD CONSTRAINT "AssistantToTool_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
