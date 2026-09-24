import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Shield, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react";
import { resetPasswordApi } from "../server/api/apiAuth";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { showToast } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(token ? "" : "Token không hợp lệ hoặc đã hết hạn!");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Token không hợp lệ hoặc đã hết hạn!");
      return;
    }
    if (!password) {
      setError("Vui lòng nhập mật khẩu mới");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu mới tối thiểu 6 ký tự");
      return;
    }
    if (confirmPassword !== password) {
      setError("Xác nhận mật khẩu mới không khớp");
      return;
    }

    setError("");
    setLoading(true);
    showToast("loading", "Đang cập nhật mật khẩu...", "Vui lòng chờ giây lát");

    try {
      await resetPasswordApi({ token, password });
      setSuccess(true);
      showToast("success", "Đặt lại mật khẩu thành công!", "Bạn có thể đăng nhập bằng mật khẩu mới.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Token không hợp lệ hoặc đã hết hạn!");
      showToast("error", "Lỗi đặt lại mật khẩu", err.message || "Vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col justify-between font-sans">
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
            <Shield className="w-5 h-5 fill-white" />
          </div>
          <span className="font-bold text-lg text-blue-600 tracking-tight">FE_Auth</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 relative">
          <div className="flex flex-col items-center text-center">
            {/* Blue Lock Icon Circle */}
            <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
              <Lock className="w-9 h-9" />
            </div>

            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Đặt lại mật khẩu
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm">
              Vui lòng nhập mật khẩu mới của bạn.
            </p>
          </div>

          {success ? (
            <div className="mt-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <p className="text-xs text-emerald-800 font-semibold">
                Mật khẩu đã được cập nhật thành công!
              </p>
              <p className="text-[11px] text-emerald-700 mt-1">
                Đang chuyển hướng về trang đăng nhập...
              </p>
              <Link to="/login" className="inline-block mt-3 text-xs font-semibold text-blue-600 hover:underline">
                Đăng nhập ngay
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-500/20 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : null}
                <span>Cập nhật mật khẩu</span>
              </button>

              {/* Error banner as in design 4 */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 mt-4">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Quay lại đăng nhập</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}