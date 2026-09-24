import React from "react";
import { useAuth } from "../../context/AuthContext";

export function ToastNotification() {
  const { toast, hideToast } = useAuth();

  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-300">
      {toast.type === "loading" && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xl text-slate-800">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div>
            <div className="font-semibold text-sm">{toast.title || "Đang xử lý..."}</div>
            {toast.message && <div className="text-xs text-slate-500 mt-0.5">{toast.message}</div>}
          </div>
        </div>
      )}

      {toast.type === "success" && (
        <div className="flex items-start justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-200 shadow-xl text-emerald-900">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-emerald-800">{toast.title}</div>
              {toast.message && <div className="text-xs text-emerald-700 mt-0.5">{toast.message}</div>}
            </div>
          </div>
          <button
            onClick={hideToast}
            className="text-emerald-500 hover:text-emerald-700 transition-colors p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {toast.type === "error" && (
        <div className="flex items-start justify-between p-4 rounded-xl bg-red-50 border border-red-200 shadow-xl text-red-900">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-red-800">{toast.title}</div>
              {toast.message && <div className="text-xs text-red-700 mt-0.5">{toast.message}</div>}
            </div>
          </div>
          <button
            onClick={hideToast}
            className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}