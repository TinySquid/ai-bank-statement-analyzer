import React from "react";
import { Toast } from "@/hooks/useToast";

interface ToastContainerProps {
  toasts: Toast[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }: ToastContainerProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded-md text-white ${toast.type === "error" ? "bg-red-700" : "bg-green-700"}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
