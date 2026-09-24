import React from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import {
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export function UserProfileViewPage() {
  const { user } = useAuth();

  const profile = {
    name: user?.name || "Nguyễn Văn A",
    email: user?.email || "nguyenvana@example.com",
    role: user?.role || "User",
    authType: user?.authType || "Google",
    joinedDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "10/04/2025",
    avatar:
      user?.avatar ||
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80",
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-5xl">
        {/* Top Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 shadow-sm"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {profile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-[11px] font-bold uppercase tracking-wider">
                  {profile.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-mono">
                {profile.email}
              </p>
            </div>
          </div>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap sm:flex-col gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div className="w-5 h-5 flex items-center justify-center font-bold text-red-500">
                G
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium uppercase">Auth Type</span>
                <span className="font-semibold text-slate-700 capitalize">{profile.authType}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <UserCheck className="w-4 h-4 text-blue-500" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium uppercase">Role</span>
                <span className="font-semibold text-slate-700 capitalize">{profile.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Info & Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Thông tin tài khoản */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
            <h2 className="text-base font-bold text-slate-800 mb-4">
              Thông tin tài khoản
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-slate-500">Họ và tên</span>
                <span className="font-semibold text-slate-800">{profile.name}</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-slate-500">Email</span>
                <span className="font-semibold text-slate-800 font-mono">{profile.email}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tham gia từ</span>
                <span className="font-semibold text-slate-800">{profile.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Right: Hoạt động gần đây */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-800 mb-4">
              Hoạt động gần đây
            </h2>

            <div className="space-y-4">
              {/* Activity 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800">
                    Đăng nhập thành công
                  </span>
                  <span className="text-[11px] text-slate-400">10:24 • Hôm nay</span>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800">
                    Đổi mật khẩu
                  </span>
                  <span className="text-[11px] text-slate-400">09:12 • 01/04/2025</span>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800">
                    Cập nhật thông tin
                  </span>
                  <span className="text-[11px] text-slate-400">08:45 • 08/04/2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}