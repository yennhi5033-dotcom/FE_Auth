import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  User,
  KeyRound,
  LogOut,
  LayoutDashboard,
  Users,
  Settings,
  Shield,
  Search,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export function AppLayout({ children, searchTerm, setSearchTerm }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin";

  const navItems = isAdmin
    ? [
        { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/admin/users", label: "Quản lý người dùng", icon: Users },
        { path: "/admin/settings", label: "Cài đặt", icon: Settings },
      ]
    : [
        { path: "/profile", label: "Trang chủ", icon: Home },
        { path: "/profile", label: "Hồ sơ", icon: User },
        { path: "/change-password", label: "Đổi mật khẩu", icon: KeyRound },
      ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Shield className="w-5 h-5 fill-white" />
            </div>
            <span className="font-bold text-lg text-blue-600 tracking-tight">FE_Auth</span>
          </Link>

          {/* Search bar in header */}
          <div className="hidden md:flex items-center relative w-72 lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm !== undefined ? searchTerm : ""}
              onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs lg:text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right User info & dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <img
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
                }
                alt={user?.name || "User"}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 leading-tight">
                  {user?.name || "Nguyễn Văn A"}
                </span>
                <span className="text-[11px] text-slate-500 capitalize">
                  {user?.role || "User"}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setUserDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                  <p className="text-xs font-semibold text-slate-800">{user?.name || "Nguyễn Văn A"}</p>
                  <p className="text-[11px] text-slate-500">{user?.email || "user@example.com"}</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  Hồ sơ cá nhân
                </Link>
                <Link
                  to="/change-password"
                  className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <KeyRound className="w-4 h-4 text-slate-400" />
                  Đổi mật khẩu
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 font-medium"
                  >
                    <LayoutDashboard className="w-4 h-4 text-blue-600" />
                    Admin Dashboard
                  </Link>
                )}
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Body Container with Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Left Sidebar (Desktop) */}
        <aside className="w-56 shrink-0 hidden md:flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm h-[calc(100vh-8rem)] sticky top-20">
          <nav className="space-y-1">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-400 hover:text-red-500" />
            <span>Đăng xuất</span>
          </button>
        </aside>

        {/* Mobile slide-down menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 shadow-xl p-4 z-30 space-y-2">
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm !== undefined ? searchTerm : ""}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* Mobile Bottom Navigation Bar (image 11) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex justify-around items-center h-14 z-30 px-2">
        <Link
          to="/profile"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            location.pathname === "/profile" ? "text-blue-600 font-semibold" : "text-slate-500"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Trang chủ</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            location.pathname === "/profile" ? "text-blue-600 font-semibold" : "text-slate-500"
          }`}
        >
          <User className="w-5 h-5" />
          <span>Hồ sơ</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col items-center gap-0.5 text-[10px] text-slate-500 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
          <span>Khác</span>
        </button>
      </div>
    </div>
  );
}