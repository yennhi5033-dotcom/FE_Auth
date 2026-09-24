import React from "react";
import { Logo } from "./ui/Logo";

export function Header({ activeTab, onTabChange, user, onLogout }) {
  const navItems = [
    { id: "auth", label: "Đăng nhập / Đăng ký" },
    { id: "admin", label: "Quản trị RBAC" },
    { id: "profile", label: "Tài khoản cá nhân" },
    { id: "forbidden", label: "Truy cập bị từ chối (403)" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-16 w-full px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Logo & Platform Info */}
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => onTabChange && onTabChange("auth")}
          >
            <Logo className="h-8 w-8" />
            <span className="text-lg tracking-tight text-on-surface font-semibold">
              AuthShield
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high/60 border border-white/5">
            <span className="font-mono text-xs text-on-surface-variant">
              v1.4.0 • Zero-Trust Engine
            </span>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange && onTabChange(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "text-primary bg-primary/10 border border-primary/20 shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Status & User Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/20 border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
              Active Session
            </span>
          </div>

          {/* Mobile Navigation Dropdown / Selector */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => onTabChange && onTabChange(e.target.value)}
              className="bg-surface-container-high text-on-surface text-xs rounded-lg px-2.5 py-1.5 border border-white/10 outline-none"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* User Profile avatar trigger */}
          <div
            onClick={() => onTabChange && onTabChange("profile")}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-full bg-surface-container-low/80 hover:bg-surface-container-high border border-white/10 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>SJ</span>
              )}
            </div>
            <span className="hidden sm:inline-block text-xs font-medium text-on-surface pr-1">
              {user?.name || "Sarah Jenkins"}
            </span>
            <span className="material-symbols-outlined text-on-surface-variant text-base pr-1">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}