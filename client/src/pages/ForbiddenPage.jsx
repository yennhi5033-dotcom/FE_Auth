import React from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { X } from "lucide-react";

export function ForbiddenPage() {
  return (
    <AppLayout>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 sm:p-20 shadow-sm flex flex-col items-center justify-center text-center max-w-4xl mx-auto min-h-[460px]">
        {/* Blue Circle with X icon matching Image 8 */}
        <div className="w-24 h-24 rounded-full bg-blue-100/80 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center">
            <X className="w-9 h-9 stroke-[3]" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-blue-600 tracking-tight">
          403
        </h1>
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mt-1">
          Forbidden
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md">
          Bạn không có quyền truy cập vào trang này.
        </p>

        <div className="mt-8">
          <Link
            to="/profile"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-98 cursor-pointer"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}