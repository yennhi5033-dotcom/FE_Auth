import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import GoogleLoginButton from "../components/GoogleLoginButton";

export function AuthPage({ onLoginSuccess, onLoginFailure }) {
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [showError, setShowError] = useState(true);
  const [loginEmail, setLoginEmail] = useState("sarah.jenkins@authshield.io");
  const [loginPassword, setLoginPassword] = useState("••••••••••••");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[calc(100vh-8rem)] p-4 sm:p-8 relative overflow-hidden">
      {/* Background glow conduits */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 my-auto">
        {/* Headline Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/80 text-primary mb-3 shadow-sm border border-primary/20">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Zero-Trust Identity Core
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
            Cổng Xác Thực An Toàn
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-md mx-auto mt-2">
            Truy cập bảng điều khiển bảo mật, phân quyền RBAC và quản lý khóa API theo chuẩn Zero-Trust.
          </p>
        </div>

        {/* Main Glassmorphic Container */}
        <div className="w-full bg-surface-container-low/75 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-10 overflow-hidden relative">
          {/* Top Auth Mode Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-surface-container-highest/60 p-1.5 rounded-xl flex items-center gap-1.5 border border-white/5">
              <button
                onClick={() => setAuthMode("login")}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  authMode === "login"
                    ? "bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white shadow-md shadow-indigo-500/20"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-base">login</span>
                <span>Đăng nhập</span>
              </button>
              <button
                onClick={() => setAuthMode("register")}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  authMode === "register"
                    ? "bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white shadow-md shadow-indigo-500/20"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-base">person_add</span>
                <span>Đăng ký</span>
              </button>
            </div>
          </div>

          {/* Error Banner Notification (Demo alert from spec) */}
          {showError && (
            <div className="mb-6 flex items-center justify-between p-3.5 sm:px-4 rounded-xl bg-error-container/25 border border-error/30 text-on-surface shadow-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error">error</span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="font-mono text-xs font-bold text-error">
                    401_UNAUTHORIZED:
                  </span>
                  <span className="text-xs text-on-surface">
                    Khóa token hết hạn hoặc email chưa được phê chuẩn bảo mật.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowError(false)}
                className="p-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Đóng cảnh báo"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}

          {/* Grid Two-Column Form & Feature Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {authMode === "login" ? (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-on-surface">
                      Đăng nhập tài khoản
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Sử dụng thông tin định danh nội bộ hoặc cổng Google SSO.
                    </p>
                  </div>

                  {/* Google OAuth Button Component */}
                  <div className="mb-6">
                    <GoogleLoginButton
                      onLoginSuccess={onLoginSuccess}
                      onLoginFailure={onLoginFailure}
                    />
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center my-6">
                    <div className="w-full border-t border-white/10" />
                    <span className="absolute bg-surface-container-low px-3 text-xs text-on-surface-variant font-mono uppercase">
                      Hoặc tiếp tục với mật khẩu
                    </span>
                  </div>

                  {/* Login Form Fields */}
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
                        Địa chỉ Email quản trị / nhân sự
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="ten@authshield.io"
                          className="pl-10"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">
                          mail
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-on-surface-variant">
                          Mật khẩu bảo vệ
                        </label>
                        <a
                          href="#forgot"
                          className="text-xs text-primary hover:underline"
                        >
                          Quên mật khẩu?
                        </a>
                      </div>
                      <div className="relative">
                        <Input
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Nhập mật khẩu an toàn..."
                          className="pl-10"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">
                          lock
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-on-surface-variant">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded border-white/20 bg-surface-container text-primary focus:ring-primary/30"
                        />
                        <span>Ghi nhớ phiên đăng nhập (24 giờ)</span>
                      </label>
                    </div>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-full mt-2 h-11 text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">key</span>
                      <span>Xác thực & Truy cập</span>
                    </Button>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-on-surface">
                      Đăng ký tài khoản mới
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Thiết lập hồ sơ định danh nhân sự trong hệ sinh thái AuthShield.
                    </p>
                  </div>

                  <div className="mb-6">
                    <GoogleLoginButton
                      onLoginSuccess={onLoginSuccess}
                      onLoginFailure={onLoginFailure}
                    />
                  </div>

                  <div className="relative flex items-center justify-center my-6">
                    <div className="w-full border-t border-white/10" />
                    <span className="absolute bg-surface-container-low px-3 text-xs text-on-surface-variant font-mono uppercase">
                      Hoặc tạo tài khoản bằng email
                    </span>
                  </div>

                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
                        Họ và tên đầy đủ
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="Nguyễn Văn A"
                          className="pl-10"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">
                          badge
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
                        Địa chỉ Email doanh nghiệp
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="email@congty.com"
                          className="pl-10"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">
                          mail
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
                        Mật khẩu (tối thiểu 6 ký tự, bao gồm số & ký tự đặc biệt)
                      </label>
                      <div className="relative">
                        <Input
                          type="password"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="pl-10"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">
                          lock_reset
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-full mt-2 h-11 text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">how_to_reg</span>
                      <span>Hoàn tất Đăng ký</span>
                    </Button>
                  </form>
                </div>
              )}
            </div>

            {/* Right Information Panel (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4 bg-surface-container-high/40 p-6 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <span className="material-symbols-outlined text-secondary text-xl">
                  shield_with_heart
                </span>
                <h3 className="text-sm font-semibold text-on-surface">
                  Tiêu Chuẩn Bảo Mật Cấp Doanh Nghiệp
                </h3>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-sm">enhanced_encryption</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-on-surface">
                      Mã hóa JWT & Argon2id
                    </h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      Toàn bộ payload xác thực được mã hóa bằng chuẩn RFC 7519 và bảo vệ chống tấn công Brute-force.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-secondary/20 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-on-surface">
                      Phân quyền RBAC 4 cấp độ
                    </h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      Kiểm soát truy cập chi tiết từ role Guest, User, Moderator đến Super Admin.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-sm">fingerprint</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-on-surface">
                      Tích hợp Google SSO & 2FA
                    </h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      Hỗ trợ đăng nhập nhanh một chạm và xác thực hai yếu tố OTP thời gian thực.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status footer pill */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">Hệ thống IAM:</span>
                <span className="font-mono text-secondary text-xs flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  99.99% Uptime Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}