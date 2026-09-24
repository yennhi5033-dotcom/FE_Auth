import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Shield, Mail, ArrowLeft } from "lucide-react";
import { forgotPasswordApi } from "../server/api/apiAuth";

export function ForgotPasswordPage() {
  const { showToast } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Vui lòng nhập email");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email không đúng định dạng");
      return;
    }

    setError("");
    setLoading(true);
    showToast("loading", "Đang gửi yêu cầu...", "Vui lòng kiểm tra hộp thư sau giây lát");

    try {
      await forgotPasswordApi({ email });
      setSentSuccess(true);
      showToast("success", "Đã gửi email!", "Vui lòng kiểm tra hòm thư của bạn để lấy liên kết đặt lại mật khẩu.");
    } catch (err) {
      setError(err.message || "Không thể gửi yêu cầu đặt lại mật khẩu");
      showToast("error", "Thất bại", err.message || "Có lỗi xảy ra, vui lòng thử lại");
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
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold mb-6 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại đăng nhập</span>
          </Link>

          <div className="flex flex-col items-center text-center">
            {/* Blue Mail Icon Circle */}
            <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
              <Mail className="w-9 h-9" />
            </div>

            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Quên mật khẩu?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm">
              Nhập email của bạn, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu nếu tài khoản tồn tại.
            </p>
          </div>

          {sentSuccess ? (
            <div className="mt-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <p className="text-xs text-emerald-800 font-semibold">
                Đã gửi yêu cầu đặt lại mật khẩu đến <span className="font-bold">{email}</span>.
              </p>
              <p className="text-[11px] text-emerald-700 mt-1">
                Vui lòng kiểm tra hộp thư (kể cả thư mục Spam/Rác).
              </p>
              <Link
                to={`/reset-password?token=mock_demo_reset_token&email=${encodeURIComponent(email)}`}
                className="inline-block mt-4 text-xs font-semibold text-blue-600 hover:underline"
              >
                [Demo] Nhấn vào đây để sang màn Đặt lại mật khẩu
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Nhập email của bạn"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                    error
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-500/20 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : null}
                <span>Gửi yêu cầu</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}