import React, { useState, useEffect, useCallback } from "react";
import useToast from "./hooks/useToast";
import ToastContainer from "./components/shared/ToastContainer";
import Uploader from "./components/Uploader";
import Loader from "./components/shared/Loader";
import Report from "./components/report/Report";

import { BASE_API_URL } from "./config/baseUrl";
import { ErrorResponse, ReportDataParams } from "reportDataParams";
import { isErrorResponse } from "./helpers/isErrorResponse";

const App: React.FC = () => {
  const [reportId, setReportId] = useState<number>(0);
  const [reportData, setReportData] = useState<ReportDataParams | null>(null);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [isPolling, setIsPolling] = useState<boolean>(false);

  const { toasts, addToast } = useToast();

  const resetState = () => {
    setReportId(0);
    setReportData(null);
    setUploadComplete(false);
    setAnalysisComplete(false);
    setIsPolling(false);
  };

  useEffect(() => {
    if (reportId && !analysisComplete) {
      const intervalId = setInterval(() => {
        if (!isPolling) {
          setIsPolling(true);

          void (async () => {
            try {
              const response = await fetch(`${BASE_API_URL}/api/reports/${reportId}/status`);
              const data = (await response.json()) as { status: string };

              if (data.status === "COMPLETE") {
                setAnalysisComplete(true);
                clearInterval(intervalId);
              }
            } catch (error) {
              console.error(error);

              addToast("An error occurred while fetching the report status.", "error");
              resetState();
            } finally {
              setIsPolling(false);
            }
          })();
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [reportId, analysisComplete, isPolling, addToast]);

  useEffect(() => {
    if (analysisComplete) {
      const fetchReport = async () => {
        try {
          const response = await fetch(`${BASE_API_URL}/api/reports/${reportId}`);
          const data: ReportDataParams | ErrorResponse = (await response.json()) as ReportDataParams;

          if (response.ok) {
            setReportData(data);
          } else {
            if (isErrorResponse(data)) {
              if (data.error) {
                addToast(data.error, "error");
              }
            }

            resetState();
          }
        } catch (error) {
          console.error(error);

          addToast("An error occurred while fetching the report data.", "error");
          resetState();
        }
      };

      void fetchReport();
    }
  }, [analysisComplete, addToast, reportId]);

  const handleUploadComplete = useCallback((reportId: number) => {
    setReportId(reportId);
    setUploadComplete(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full bg-neutral-800 text-white h-[60px] flex align-middle">
        <button
          className="px-10 h-full text-lg font-semibold hover:bg-neutral-900 active:bg-neutral-950"
          onClick={() => window.location.reload()}
        >
          Restart
        </button>
      </div>
      {!reportData && (
        <div className="flex-grow flex items-center justify-center w-full mx-auto  text-white">
          {!uploadComplete && <Uploader uploadComplete={handleUploadComplete} resetState={resetState} />}
          {uploadComplete && !analysisComplete && <Loader text="Analyzing Bank Statement..." />}
        </div>
      )}

      <div className="my-8">{analysisComplete && reportData && <Report reportData={reportData} />}</div>

      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default App;
