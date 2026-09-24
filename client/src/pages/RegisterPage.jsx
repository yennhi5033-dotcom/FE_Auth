import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Shield, Eye, EyeOff, Lock, Check, Headphones } from "lucide-react";
import GoogleLoginButton from "../components/GoogleLoginButton";

export function RegisterPage() {
  const { register, showToast } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = "Vui lòng nhập họ và tên";
    }

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

    if (!confirmPassword) {
      errs.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (confirmPassword !== password) {
      errs.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    showToast("loading", "Đang tạo tài khoản...", "Vui lòng đợi giây lát");

    try {
      await register(name, email, password, role);
      showToast("success", "Đăng ký thành công!", "Bạn có thể đăng nhập bằng tài khoản vừa tạo.");
      navigate("/login");
    } catch (err) {
      showToast("error", "Đăng ký thất bại", err.message || "Vui lòng thử lại với email khác.");
      setErrors({ form: err.message || "Đăng ký không thành công" });
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
        <div className="text-xs text-slate-500">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Đăng nhập
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          {/* Left Promo (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
            <div className="flex flex-col items-center text-center mt-2">
              <div className="relative w-44 h-44 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-100/60 rounded-full blur-xl" />
                <div className="relative w-36 h-36 bg-blue-600 rounded-3xl rotate-3 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Shield className="w-20 h-20 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Tạo tài khoản
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Tham gia cùng chúng tôi để trải nghiệm nhiều tính năng hữu ích.
              </p>
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <span>Bảo mật cao</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Dễ dàng sử dụng</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Headphones className="w-3.5 h-3.5" />
                </div>
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                Đăng ký
              </h1>

              {errors.form && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                  {errors.form}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tên
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: null });
                    }}
                    placeholder="Nhập họ và tên"
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                      errors.name
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-500 mt-0.5">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                      errors.email
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-0.5">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                      placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                      className={`w-full px-3.5 py-2 pr-10 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                        errors.password
                          ? "border-red-400 focus:ring-2 focus:ring-red-200"
                          : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-red-500 mt-0.5">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword)
                          setErrors({ ...errors, confirmPassword: null });
                      }}
                      placeholder="Nhập lại mật khẩu"
                      className={`w-full px-3.5 py-2 pr-10 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                        errors.confirmPassword
                          ? "border-red-400 focus:ring-2 focus:ring-red-200"
                          : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[11px] text-red-500 mt-0.5">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Role select */}
                <div className="pt-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Loại tài khoản
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  >
                    <option value="user">Người dùng thông thường (User)</option>
                    <option value="admin">Quản trị viên (Admin)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-500/20 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : null}
                  <span>Đăng ký</span>
                </button>

                <p className="text-center text-xs text-slate-500 mt-4">
                  Đã có tài khoản?{" "}
                  <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                    Đăng nhập
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