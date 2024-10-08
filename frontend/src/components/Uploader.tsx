import React, { useState, useEffect, useRef, useCallback } from "react";
import useToast from "../hooks/useToast";
import ToastContainer from "./shared/ToastContainer";
import { BASE_API_URL } from "../config/baseUrl";
import Loader from "./shared/Loader";

interface UploaderProps {
  resetState: () => void;
  uploadComplete: (reportId: number) => void;
}

const Uploader: React.FC<UploaderProps> = ({ uploadComplete, resetState }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toasts, addToast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    if (!isLoading) {
      fileInputRef.current?.click();
    }
  };

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      addToast("Please select a file first.", "error");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      addToast("Invalid file type. Please select a PDF file.", "error");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      addToast("File size exceeds the limit of 50MB.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("statement", selectedFile);

    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/api/statements/upload`, {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { reportId: number };

      if (response.ok) {
        uploadComplete(data.reportId);
      } else {
        addToast("Upload failed. Please try again.", "error");
        resetState();
      }
    } catch (error) {
      console.error(error);

      addToast("An error occurred. Please try again.", "error");
      resetState();
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, addToast, setIsLoading, resetState, uploadComplete]);

  useEffect(() => {
    if (selectedFile?.name) {
      void handleUpload();
    }
  }, [selectedFile, handleUpload]);

  return (
    <>
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".pdf" className="hidden" />

      {isLoading ? (
        <Loader text="Uploading..." />
      ) : (
        <button
          onClick={handleUploadClick}
          className={`bg-neutral-800 text-white py-4 px-6 rounded hover:bg-neutral-900 active:bg-neutral-950 transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        >
          <span className="text-xl align-middle">Select a PDF File</span>
        </button>
      )}

      <ToastContainer toasts={toasts} />
    </>
  );
};

export default Uploader;
