import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/Dialog";

export function UserProfilePage({ user, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isCopiedToken, setIsCopiedToken] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);

  const currentUser = user || {
    name: "Sarah Jenkins",
    email: "sarah.jenkins@authshield.io",
    role: "ADMIN",
    authType: "Google OAuth 2.0",
    id: "8092-USR",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABix2uUThmFPh2EDeWge4dp4vfBbbNHlxIg1aPrEGb7iOBIvdhUMKGW5735bCq7JdHALsbziqAqsz8D795Rp9DlYDf-KAmDF_xs-N_RggYLCjlQZoxgzGqMvlemHLAyIc25iulFPtptj2qOvDP4CSHFJQtCysUeefPJwCXWfz6Y-E4o-81TW1rRsdeWs3n8SPXf_GxRWr9IgSUqRB2Ur3-CVcrdhTdG5L5PIUV-mlwNZ1nvv5g3qzHbw",
  };

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setIsCopiedToken(true);
    setTimeout(() => setIsCopiedToken(false), 2000);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
      {/* Top Context Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <nav className="flex items-center gap-2 text-xs">
            <span className="text-on-surface-variant">Dashboard</span>
            <span className="material-symbols-outlined text-outline text-xs">chevron_right</span>
            <span className="text-on-surface-variant">User Settings</span>
            <span className="material-symbols-outlined text-outline text-xs">chevron_right</span>
            <span className="text-primary font-medium">Profile & Security</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
              Tài khoản & Bảo mật
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[11px] font-semibold flex items-center gap-1.5 border border-secondary/30">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
              SYNCED
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-white/5 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-primary">terminal</span>
            <span className="font-mono text-xs text-on-surface">/api/auth/me • 200 OK</span>
          </div>
          <Button
            variant="destructive"
            onClick={() => setShowLogoutModal(true)}
            className="gap-2 text-xs sm:text-sm font-medium"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Đăng xuất</span>
          </Button>
        </div>
      </div>

      {/* Main Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Identity & Sessions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main User Card */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-low border border-white/10 p-6 sm:p-8 shadow-xl">
            {/* Subtle Violet Ambient Gradient Glow */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-white/10">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-primary/40 shadow-lg"
                />
                <span
                  className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md"
                  title="2FA Active"
                >
                  <span className="material-symbols-outlined text-xs">verified_user</span>
                </span>
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-on-surface truncate">
                    {currentUser.name}
                  </h2>
                  <Badge variant="primary" className="text-[10px]">
                    <span className="material-symbols-outlined text-xs mr-0.5">
                      auto_awesome
                    </span>
                    {currentUser.role || "ADMIN"}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant truncate font-mono">
                  {currentUser.email}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-on-surface-variant font-mono">
                    User UID: {currentUser.id || "8092-USR"}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-[11px] text-secondary font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    Verified Provider
                  </span>
                </div>
              </div>
            </div>

            {/* Provider Details Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div className="p-4 rounded-xl bg-surface-container/60 border border-white/5">
                <span className="text-[11px] text-on-surface-variant uppercase font-mono block mb-1">
                  Phương thức xác thực
                </span>
                <div className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-primary text-base">
                    lock_open
                  </span>
                  <span>{currentUser.authType || "Google OAuth 2.0 (Federated)"}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container/60 border border-white/5">
                <span className="text-[11px] text-on-surface-variant uppercase font-mono block mb-1">
                  Thời hạn Token phiên
                </span>
                <div className="flex items-center gap-2 text-sm font-semibold text-secondary font-mono">
                  <span className="material-symbols-outlined text-base">timer</span>
                  <span>23 giờ 42 phút còn lại</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Device Sessions Card */}
          <div className="rounded-2xl bg-surface-container-low border border-white/10 p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">devices</span>
                <h3 className="text-sm font-semibold text-on-surface">
                  Phiên Hoạt Động & Thiết Bị (Sessions)
                </h3>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                2 Thiết bị
              </Badge>
            </div>

            <div className="space-y-3">
              {/* Device 1 */}
              <div className="p-4 rounded-xl bg-surface-container/80 border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">laptop_mac</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-on-surface">
                        MacBook Pro M3 • Chrome 128
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-mono font-semibold">
                        Phiên Hiện Tại
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                      IP: 118.69.182.10 (TP. Hồ Chí Minh, VN) • Hoạt động 1 phút trước
                    </p>
                  </div>
                </div>
              </div>

              {/* Device 2 */}
              <div className="p-4 rounded-xl bg-surface-container/40 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">smartphone</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-on-surface">
                      iPhone 16 Pro • Safari Mobile
                    </span>
                    <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                      IP: 14.161.20.45 (Hà Nội, VN) • Hoạt động 4 giờ trước
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-error hover:bg-error/10 text-xs">
                  Thu hồi
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Security Tokens & 2FA (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* JWT Security Token Box */}
          <div className="rounded-2xl bg-surface-container-low border border-white/10 p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl">vpn_key</span>
                <h3 className="text-sm font-semibold text-on-surface">
                  Khóa Bảo Mật API (JWT Token)
                </h3>
              </div>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-xs text-primary hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">
                  {showApiKey ? "visibility_off" : "visibility"}
                </span>
                {showApiKey ? "Ẩn" : "Hiện mã"}
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Sử dụng khóa token này để chứng thực với các API Endpoint được bảo vệ theo giao thức Bearer.
            </p>

            {/* Token display box */}
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-white/5 font-mono text-xs text-on-surface flex items-center justify-between gap-2 overflow-hidden">
              <div className="truncate text-primary-light">
                {showApiKey
                  ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI4MDkyLVVTUiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNjkxMjg5MH0.k8s_9dj2K"
                  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9•••••••••••••••••••••••••••••"}
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  handleCopy(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI4MDkyLVVTUiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNjkxMjg5MH0.k8s_9dj2K"
                  )
                }
                className="shrink-0 gap-1 text-[11px]"
              >
                <span className="material-symbols-outlined text-sm">
                  {isCopiedToken ? "check" : "content_copy"}
                </span>
                <span>{isCopiedToken ? "Đã copy" : "Copy"}</span>
              </Button>
            </div>
          </div>

          {/* 2FA Security Toggle Card */}
          <div className="rounded-2xl bg-surface-container-low border border-white/10 p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">security</span>
                <h3 className="text-sm font-semibold text-on-surface">
                  Xác Thực 2 Yếu Tố (2FA / MFA)
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                  twoFactorEnabled
                    ? "bg-secondary/15 text-secondary border border-secondary/30"
                    : "bg-error/15 text-error border border-error/30"
                }`}
              >
                {twoFactorEnabled ? "ĐÃ BẬT" : "TẮT"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-xs font-semibold text-on-surface">
                  Ứng dụng Google Authenticator / Passkey
                </h4>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">
                  Bảo vệ tài khoản khi đăng nhập từ thiết bị lạ bằng mã OTP thời gian thực.
                </p>
              </div>

              {/* Toggle switch */}
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  twoFactorEnabled ? "bg-primary" : "bg-surface-container-highest"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    twoFactorEnabled ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Security Audit Snapshot */}
          <div className="rounded-2xl bg-surface-container-low border border-white/10 p-6 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-semibold text-on-surface uppercase font-mono tracking-wider">
                Lịch sử bảo mật gần đây
              </span>
              <span className="text-[10px] text-on-surface-variant font-mono">Real-time</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-on-surface-variant pb-1.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">login</span>
                  <span className="text-[11px] text-on-surface">Đăng nhập thành công (Google)</span>
                </div>
                <span className="text-[10px]">Hôm nay, 10:14</span>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant pb-1.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">key</span>
                  <span className="text-[11px] text-on-surface">Tạo JWT Token truy cập</span>
                </div>
                <span className="text-[10px]">Hôm qua, 18:30</span>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    shield_lock
                  </span>
                  <span className="text-[11px] text-on-surface">Kích hoạt 2FA TOTP</span>
                </div>
                <span className="text-[10px]">3 ngày trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-error-container/25 text-error flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-2xl">logout</span>
          </div>
          <DialogTitle>Xác nhận đăng xuất?</DialogTitle>
          <DialogDescription>
            Phiên làm việc hiện tại và token truy cập sẽ bị hủy. Bạn sẽ cần xác thực lại để tiếp tục sử dụng hệ thống.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setShowLogoutModal(false)}
          >
            Hủy bỏ
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowLogoutModal(false);
              if (onLogout) onLogout();
            }}
          >
            Đăng xuất ngay
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}