import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

export function ChangePasswordPage() {
  const { changePassword, showToast } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword) {
      setError("Vui lòng nhập mật khẩu hiện tại");
      return;
    }
    if (!newPassword) {
      setError("Vui lòng nhập mật khẩu mới");
      return;
    }
    if (newPassword.length < 6) {
      setError("Mật khẩu mới tối thiểu 6 ký tự");
      return;
    }

    setError("");
    setLoading(true);
    showToast("loading", "Đang xử lý...", "Hệ thống đang cập nhật mật khẩu của bạn");

    try {
      await changePassword(oldPassword, newPassword);
      setSuccess(true);
      showToast("success", "Đổi mật khẩu thành công!", "Vui lòng ghi nhớ mật khẩu mới của bạn.");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message || "Đổi mật khẩu thất bại. Mật khẩu hiện tại có thể không đúng.");
      showToast("error", "Đổi mật khẩu thất bại", err.message || "Vui lòng kiểm tra lại mật khẩu hiện tại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-sm max-w-2xl">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Đổi mật khẩu
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-8">
          Vui lòng nhập mật khẩu hiện tại và mật khẩu mới.
        </p>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Đổi mật khẩu thành công!</span>
              <p className="text-emerald-700 text-[11px] mt-0.5">
                Vui lòng đăng nhập lại để tiếp tục sử dụng phiên an toàn.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
          {/* Old password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  if (error) setError("");
                  if (success) setSuccess(false);
                }}
                placeholder="Nhập mật khẩu hiện tại"
                className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (error) setError("");
                  if (success) setSuccess(false);
                }}
                placeholder="Tối thiểu 6 ký tự"
                className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-500/20 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : null}
            <span>Đổi mật khẩu</span>
          </button>
        </form>
      </div>
    </AppLayout>
  );
}