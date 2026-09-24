import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Shield, Eye, EyeOff, Lock, Zap, Award } from "lucide-react";
import GoogleLoginButton from "../components/GoogleLoginButton";

export function LoginPage() {
  const { login, showToast } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Email không đúng định dạng";
    }

    if (!password) {
      errs.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      errs.password = "Mật khẩu tối thiểu 6 ký tự";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    showToast("loading", "Đang xử lý, vui lòng chờ...", "Hệ thống đang xác thực thông tin tài khoản");

    try {
      const res = await login(email, password);
      showToast("success", "Đăng nhập thành công!", "Chào mừng bạn trở lại với FE_Auth");
      if (res?.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      showToast("error", "Email hoặc mật khẩu không đúng!", err.message || "Vui lòng kiểm tra lại thông tin.");
      setErrors({ form: err.message || "Email hoặc mật khẩu không đúng!" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (data) => {
    showToast("success", "Đăng nhập Google thành công!", "Chào mừng bạn trở lại!");
    if (data?.user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/profile");
    }
  };

  const handleGoogleFailure = (msg) => {
    showToast("error", "Đăng nhập Google thất bại", msg);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
            <Shield className="w-5 h-5 fill-white" />
          </div>
          <span className="font-bold text-lg text-blue-600 tracking-tight">FE_Auth</span>
        </div>
        <div className="text-xs text-slate-500">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Đăng ký
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
          {/* Left Illustration & Promo (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
            {/* Graphic Illustration */}
            <div className="flex flex-col items-center text-center mt-2">
              <div className="relative w-44 h-44 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-100/60 rounded-full blur-xl" />
                <div className="relative w-36 h-36 bg-blue-500 rounded-3xl rotate-6 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Shield className="w-20 h-20 text-white -rotate-6" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Chào mừng trở lại!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Đăng nhập để tiếp tục sử dụng hệ thống.
              </p>
            </div>

            {/* Feature bullets */}
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <span>Bảo mật thông tin</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>Truy cập nhanh chóng</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span>Trải nghiệm tốt hơn</span>
              </div>
            </div>
          </div>

          {/* Right Login Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                Đăng nhập
              </h1>

              {errors.form && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <span>{errors.form}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: null });
                    }}
                    placeholder="Nhập email của bạn"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-white border rounded-xl focus:outline-none transition-all ${
                      errors.email
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: null });
                      }}
                      placeholder="Nhập mật khẩu"
                      className={`w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-white border rounded-xl focus:outline-none transition-all ${
                        errors.password
                          ? "border-red-400 focus:ring-2 focus:ring-red-200"
                          : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Remember me & Forgot Password */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Ghi nhớ đăng nhập</span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Quên mật khẩu?
                  </Link>
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
                  <span>Đăng nhập</span>
                </button>

                {/* Or divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="w-full border-t border-slate-200" />
                  <span className="absolute bg-white px-3 text-[11px] text-slate-400 font-medium">
                    Hoặc
                  </span>
                </div>

                {/* Google Login Button */}
                <GoogleLoginButton
                  onLoginSuccess={handleGoogleSuccess}
                  onLoginFailure={handleGoogleFailure}
                />

                {/* Bottom Register prompt */}
                <p className="text-center text-xs text-slate-500 mt-4">
                  Chưa có tài khoản?{" "}
                  <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                    Đăng ký ngay
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}