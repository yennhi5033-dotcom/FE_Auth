import React from "react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export function Forbidden403Page({ onNavigateHome, onRequestElevatedRole }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-8 relative overflow-hidden">
      {/* Background glow conduits */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-b from-error/15 via-error-container/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-primary/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="w-full max-w-3xl flex flex-col items-center relative z-10">
        {/* Glowing 403 Icon Box */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-error/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative w-28 h-28 rounded-3xl bg-surface-container-high/90 border border-white/10 shadow-2xl flex items-center justify-center backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-error/25 via-transparent to-transparent" />
            <div className="w-20 h-20 rounded-2xl bg-surface-container-lowest/80 flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-5xl text-error select-none">
                gpp_maybe
              </span>
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-error-container flex items-center justify-center shadow-lg border border-white/10">
              <span className="material-symbols-outlined text-sm text-on-error select-none">
                lock
              </span>
            </div>
          </div>
        </div>

        {/* 403 Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high/80 backdrop-blur-md mb-4 shadow-sm border border-error/30">
          <span className="w-2 h-2 rounded-full bg-error animate-ping" />
          <span className="font-mono text-xs uppercase text-error tracking-wider font-semibold">
            HTTP 403 Forbidden
          </span>
          <span className="text-outline-variant font-mono">•</span>
          <span className="text-xs text-on-surface-variant font-medium">
            Yêu cầu quyền Quản trị viên (Admin RBAC Guard)
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl tracking-tight text-center text-on-surface mb-3 font-bold">
          Quyền truy cập bị từ chối
        </h1>

        <p className="text-sm sm:text-base text-on-surface-variant text-center max-w-xl mb-8 leading-relaxed">
          Bạn đang đăng nhập với vai trò Người dùng thông thường (
          <span className="font-mono text-xs text-primary bg-surface-container-high px-1.5 py-0.5 rounded border border-white/5">
            role: user
          </span>
          ). Khu vực{" "}
          <span className="font-mono text-xs text-on-surface bg-surface-container-high px-1.5 py-0.5 rounded border border-white/5">
            /admin/dashboard
          </span>{" "}
          và các API tài nguyên quản trị yêu cầu quyền hạn{" "}
          <span className="font-mono text-xs text-error bg-surface-container-high px-1.5 py-0.5 rounded font-semibold border border-error/20">
            role: admin
          </span>{" "}
          hoặc token ủy quyền cấp cao hơn.
        </p>

        {/* Identity & RBAC Diagnostics Card */}
        <div className="w-full bg-surface-container-low/90 rounded-2xl border border-white/10 p-6 backdrop-blur-xl shadow-xl mb-8 relative">
          {/* Header Identity Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 bg-surface-container/30 -mx-6 -mt-6 p-6 rounded-t-2xl border-b border-white/5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuABix2uUThmFPh2EDeWge4dp4vfBbbNHlxIg1aPrEGb7iOBIvdhUMKGW5735bCq7JdHALsbziqAqsz8D795Rp9DlYDf-KAmDF_xs-N_RggYLCjlQZoxgzGqMvlemHLAyIc25iulFPtptj2qOvDP4CSHFJQtCysUeefPJwCXWfz6Y-E4o-81TW1rRsdeWs3n8SPXf_GxRWr9IgSUqRB2Ur3-CVcrdhTdG5L5PIUV-mlwNZ1nvv5g3qzHbw"
                  alt="Sarah Jenkins"
                  className="w-12 h-12 rounded-full object-cover shadow-md ring-1 ring-white/10"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-surface-container-low" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-on-surface truncate">
                    Sarah Jenkins
                  </span>
                  <span className="font-mono text-[11px] text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded">
                    ID: 8092-USR
                  </span>
                </div>
                <span className="text-xs text-on-surface-variant font-mono truncate">
                  sarah.jenkins@authshield.io
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-center">
              <span className="font-mono text-xs text-secondary bg-secondary-container/20 border border-secondary/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Authenticated
              </span>
            </div>
          </div>

          {/* Grid Role Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-surface-container/60 border border-white/5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                  Vai trò hiện tại
                </span>
                <span className="material-symbols-outlined text-primary text-base">
                  verified_user
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base font-bold text-on-surface font-mono">
                  role: "user"
                </span>
                <Badge variant="default" className="text-[10px]">
                  Cơ bản
                </Badge>
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">
                Quyền hạn: Xem thông tin cá nhân, cập nhật mật khẩu.
              </span>
            </div>

            <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-surface-container/60 border border-error/20">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-error uppercase tracking-wider">
                  Vai trò yêu cầu
                </span>
                <span className="material-symbols-outlined text-error text-base">
                  admin_panel_settings
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base font-bold text-error font-mono">
                  role: "admin"
                </span>
                <Badge variant="error" className="text-[10px]">
                  Bắt buộc
                </Badge>
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">
                Quyền hạn: Quản trị người dùng, cấp Token, giám sát Logs.
              </span>
            </div>
          </div>

          {/* Diagnostics Log Output */}
          <div className="mt-4 p-3 rounded-xl bg-surface-container-lowest border border-white/5 font-mono text-[11px] space-y-1 text-on-surface-variant">
            <div className="text-error font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs">close</span>
              <span>RBAC_GUARD_REJECT: Missing scope [admin:read, admin:write]</span>
            </div>
            <div className="text-on-surface-variant/80 pl-4">
              Path: /api/v1/admin/users • Enforced by AuthShield Zero-Trust Policy Engine
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="secondary"
            onClick={onNavigateHome}
            className="gap-2 w-full sm:w-auto text-sm"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Quay lại Trang chính</span>
          </Button>

          <Button
            variant="primary"
            onClick={onRequestElevatedRole}
            className="gap-2 w-full sm:w-auto text-sm"
          >
            <span className="material-symbols-outlined text-base">upgrade</span>
            <span>Yêu cầu cấp quyền Quản trị (Escalate)</span>
          </Button>
        </div>
      </div>
    </div>
  );
}