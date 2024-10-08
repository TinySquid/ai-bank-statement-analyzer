import { unlink } from "fs/promises";

export const deleteFile = async (filePath: string) => {
  try {
    await unlink(filePath);
  } catch (error) {
    console.error("Error deleting file", error);
  }
};
