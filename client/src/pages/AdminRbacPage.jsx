import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/Dialog";

const MOCK_USERS = [
  {
    id: "usr_99812",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@authshield.io",
    role: "Admin",
    authType: "Google OAuth",
    status: "Active",
    lastLogin: "2 phút trước",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuABix2uUThmFPh2EDeWge4dp4vfBbbNHlxIg1aPrEGb7iOBIvdhUMKGW5735bCq7JdHALsbziqAqsz8D795Rp9DlYDf-KAmDF_xs-N_RggYLCjlQZoxgzGqMvlemHLAyIc25iulFPtptj2qOvDP4CSHFJQtCysUeefPJwCXWfz6Y-E4o-81TW1rRsdeWs3n8SPXf_GxRWr9IgSUqRB2Ur3-CVcrdhTdG5L5PIUV-mlwNZ1nvv5g3qzHbw",
  },
  {
    id: "usr_44019",
    name: "Alex Rivera",
    email: "alex.rivera@techcorp.dev",
    role: "Developer",
    authType: "Google OAuth",
    status: "Active",
    lastLogin: "15 phút trước",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "usr_33108",
    name: "David Nguyen",
    email: "d.nguyen@cloudmatrix.com",
    role: "User",
    authType: "Email / Password",
    status: "Pending MFA",
    lastLogin: "3 giờ trước",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "usr_11904",
    name: "Elena Rostova",
    email: "elena.r@cybersec.io",
    role: "Security Auditor",
    authType: "Google OAuth",
    status: "Active",
    lastLogin: "Hôm qua",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "usr_08214",
    name: "Marcus Vance",
    email: "marcus.vance@infranet.org",
    role: "User",
    authType: "Email / Password",
    status: "Suspended",
    lastLogin: "7 ngày trước",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
];

export function AdminRbacPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);

  // Form states
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("User");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    const newUser = {
      id: `usr_${Math.floor(10000 + Math.random() * 90000)}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      authType: "Google OAuth",
      status: "Active",
      lastLogin: "Vừa tạo",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    };
    setUsers([newUser, ...users]);
    setNewUserName("");
    setNewUserEmail("");
    setIsAddUserOpen(false);
  };

  const handleRoleChange = (role) => {
    if (!selectedUser) return;
    setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, role } : u)));
    setIsEditRoleOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
      {/* Top Header & Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(78,222,163,0.8)]" />
            <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold">
              RBAC Security Guard • Level 4 Access
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
            Quản trị viên & Phân quyền RBAC
          </h1>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Quản lý danh sách người dùng, phiên hoạt động và phân quyền vai trò API theo tiêu chuẩn Zero-Trust Core.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="secondary" className="gap-2 text-xs sm:text-sm">
            <span className="material-symbols-outlined text-base">file_download</span>
            <span>Xuất dữ liệu CSV</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsAddUserOpen(true)}
            className="gap-2 text-xs sm:text-sm"
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            <span>+ Thêm người dùng mới</span>
          </Button>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-sm flex flex-col justify-between group hover:border-white/10 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-medium">
              Tổng người dùng
            </span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">group</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-on-surface tracking-tight">12,845</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-secondary font-mono">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+12.5%</span>
              <span className="text-on-surface-variant font-sans">so với tháng trước</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-sm flex flex-col justify-between group hover:border-white/10 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-medium">
              Tài khoản Google OAuth
            </span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">vpn_key</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-on-surface tracking-tight">8,420</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-on-surface-variant font-sans">
              <span className="font-mono text-secondary font-medium">65.5%</span> tổng đăng ký
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-sm flex flex-col justify-between group hover:border-white/10 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-medium">
              Tài khoản Quản trị (Admin)
            </span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary-light group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">shield</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-on-surface tracking-tight">34</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-on-surface-variant font-sans">
              <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
              <span>100% đã kích hoạt 2FA</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-surface-container-low border border-white/5 shadow-sm flex flex-col justify-between group hover:border-white/10 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-medium">
              Yêu cầu 403 Forbidden
            </span>
            <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-error group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">block</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-on-surface tracking-tight">18</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-error font-mono">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span>-4.2%</span>
              <span className="text-on-surface-variant font-sans">bị chặn an toàn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Table (8 cols) + RBAC Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* User Management Table (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="rounded-2xl border border-white/10 bg-surface-container-low/80 backdrop-blur-xl p-5 shadow-xl">
            {/* Search & Filter bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="relative flex-1 max-w-sm">
                <Input
                  type="text"
                  placeholder="Tìm theo tên, email hoặc UID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 text-xs"
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-base">
                  search
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant font-medium">Lọc vai trò:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="h-10 rounded-lg bg-surface-container px-3 text-xs text-on-surface border border-white/10 outline-none"
                >
                  <option value="all">Tất cả vai trò</option>
                  <option value="Admin">Admin</option>
                  <option value="Developer">Developer</option>
                  <option value="Security Auditor">Auditor</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-on-surface-variant font-mono uppercase tracking-wider text-[11px]">
                    <th className="pb-3 pl-2">Người dùng / Định danh</th>
                    <th className="pb-3">Vai trò RBAC</th>
                    <th className="pb-3">Cổng xác thực</th>
                    <th className="pb-3">Trạng thái</th>
                    <th className="pb-3 text-right pr-2">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-on-surface-variant">
                        Không tìm thấy người dùng phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="py-3.5 pl-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-9 h-9 rounded-full object-cover border border-white/10"
                            />
                            <div className="flex flex-col">
                              <span className="font-semibold text-on-surface text-sm">
                                {user.name}
                              </span>
                              <span className="text-on-surface-variant text-[11px] font-mono">
                                {user.email} • {user.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5">
                          <Badge
                            variant={
                              user.role === "Admin"
                                ? "primary"
                                : user.role === "Developer"
                                ? "secondary"
                                : user.role === "Security Auditor"
                                ? "warning"
                                : "default"
                            }
                          >
                            {user.role}
                          </Badge>
                        </td>

                        <td className="py-3.5">
                          <span className="font-mono text-on-surface-variant">
                            {user.authType}
                          </span>
                        </td>

                        <td className="py-3.5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              user.status === "Active"
                                ? "bg-secondary/10 text-secondary"
                                : user.status === "Pending MFA"
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-error/10 text-error"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                user.status === "Active"
                                  ? "bg-secondary"
                                  : user.status === "Pending MFA"
                                  ? "bg-amber-400"
                                  : "bg-error"
                              }`}
                            />
                            {user.status}
                          </span>
                        </td>

                        <td className="py-3.5 text-right pr-2">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditRoleOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface transition-colors cursor-pointer"
                              title="Chỉnh sửa vai trò"
                            >
                              <span className="material-symbols-outlined text-base">
                                edit
                              </span>
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1.5 rounded-lg bg-error-container/20 hover:bg-error-container/40 text-error transition-colors cursor-pointer"
                              title="Xóa quyền truy cập"
                            >
                              <span className="material-symbols-outlined text-base">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RBAC Matrix & Telemetry Stream (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Permission Matrix Card */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/10 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  admin_panel_settings
                </span>
                <h3 className="text-sm font-semibold text-on-surface">
                  Ma Trận Quyền Hạn (RBAC Matrix)
                </h3>
              </div>
              <Badge variant="primary" className="text-[10px]">
                Strict Policy
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-12 text-[11px] font-mono text-on-surface-variant px-2 py-1 bg-surface-container/50 rounded">
                <span className="col-span-6">Quyền / Permission</span>
                <span className="col-span-3 text-center">Admin</span>
                <span className="col-span-3 text-center">User</span>
              </div>

              {/* Permission Item */}
              <div className="grid grid-cols-12 items-center p-2 rounded bg-surface-container/80 text-xs">
                <div className="col-span-6">
                  <span className="font-mono text-primary text-[11px] block">read:users</span>
                  <span className="text-[10px] text-on-surface-variant">Xem danh sách & hồ sơ</span>
                </div>
                <div className="col-span-3 flex justify-center text-secondary">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
                <div className="col-span-3 flex justify-center text-secondary">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
              </div>

              <div className="grid grid-cols-12 items-center p-2 rounded bg-surface-container/80 text-xs">
                <div className="col-span-6">
                  <span className="font-mono text-primary text-[11px] block">write:users</span>
                  <span className="text-[10px] text-on-surface-variant">Tạo & sửa thông tin</span>
                </div>
                <div className="col-span-3 flex justify-center text-secondary">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
                <div className="col-span-3 flex justify-center text-on-surface-variant/40">
                  <span className="material-symbols-outlined text-base">remove</span>
                </div>
              </div>

              <div className="grid grid-cols-12 items-center p-2 rounded bg-surface-container/80 text-xs">
                <div className="col-span-6">
                  <span className="font-mono text-primary text-[11px] block">delete:users</span>
                  <span className="text-[10px] text-on-surface-variant">Xóa vĩnh viễn user</span>
                </div>
                <div className="col-span-3 flex justify-center text-secondary">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
                <div className="col-span-3 flex justify-center text-error">
                  <span className="material-symbols-outlined text-base">block</span>
                </div>
              </div>

              <div className="grid grid-cols-12 items-center p-2 rounded bg-surface-container/80 text-xs">
                <div className="col-span-6">
                  <span className="font-mono text-primary text-[11px] block">manage:roles</span>
                  <span className="text-[10px] text-on-surface-variant">Gán vai trò & Token API</span>
                </div>
                <div className="col-span-3 flex justify-center text-secondary">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
                <div className="col-span-3 flex justify-center text-error">
                  <span className="material-symbols-outlined text-base">block</span>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Real-time Stream Card */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-white/10 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">terminal</span>
                <h3 className="text-xs font-semibold text-on-surface uppercase tracking-wider font-mono">
                  Audit Telemetry Live
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-white/5 flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">ROLE_UPDATED</span>
                  <span className="text-on-surface-variant text-[10px]">10:45:12 UTC</span>
                </div>
                <p className="text-on-surface-variant truncate">
                  usr_99812: granted role:admin by Root
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-white/5 flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-bold">SESSION_ISSUED</span>
                  <span className="text-on-surface-variant text-[10px]">10:41:02 UTC</span>
                </div>
                <p className="text-on-surface-variant truncate">
                  usr_44019: Google SSO / 118.69.182.1
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-white/5 flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-error font-bold">403_ACCESS_BLOCKED</span>
                  <span className="text-on-surface-variant text-[10px]">10:38:44 UTC</span>
                </div>
                <p className="text-on-surface-variant truncate">
                  usr_33108: denied GET /api/admin/metrics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Thêm người dùng mới */}
      <Dialog open={isAddUserOpen} onClose={() => setIsAddUserOpen(false)}>
        <DialogHeader>
          <DialogTitle>Thêm người dùng mới</DialogTitle>
          <DialogDescription>
            Tạo tài khoản định danh mới và phân bổ vai trò ban đầu trong hệ thống.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
              Họ và tên
            </label>
            <Input
              type="text"
              placeholder="Nguyễn Văn A"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
              Email công vụ
            </label>
            <Input
              type="email"
              placeholder="user@authshield.io"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1.5">
              Vai trò (Role RBAC)
            </label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              className="w-full h-10 rounded-lg bg-surface-container px-3 text-sm text-on-surface border border-white/10 outline-none"
            >
              <option value="User">User (Quyền cơ bản)</option>
              <option value="Developer">Developer (API & Webhooks)</option>
              <option value="Security Auditor">Security Auditor (Chỉ đọc Log)</option>
              <option value="Admin">Admin (Toàn quyền quản trị)</option>
            </select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddUserOpen(false)}
            >
              Hủy bỏ
            </Button>
            <Button type="submit" variant="primary">
              Tạo tài khoản
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Modal: Cập nhật vai trò */}
      <Dialog open={isEditRoleOpen} onClose={() => setIsEditRoleOpen(false)}>
        <DialogHeader>
          <DialogTitle>Phân quyền vai trò RBAC</DialogTitle>
          <DialogDescription>
            Thay đổi cấp độ quyền hạn cho:{" "}
            <span className="text-on-surface font-semibold">
              {selectedUser?.name} ({selectedUser?.email})
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          {["User", "Developer", "Security Auditor", "Admin"].map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                selectedUser?.role === role
                  ? "border-primary bg-primary/10 text-on-surface"
                  : "border-white/10 bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
              }`}
            >
              <div>
                <div className="text-sm font-semibold text-on-surface">{role}</div>
                <div className="text-xs text-on-surface-variant mt-0.5">
                  {role === "Admin"
                    ? "Toàn quyền quản trị hệ thống, token và logs."
                    : role === "Developer"
                    ? "Quản lý API Key, Webhook và tích hợp SDK."
                    : role === "Security Auditor"
                    ? "Kiểm toán bảo mật và xem telemetry stream."
                    : "Truy cập thông tin người dùng cơ bản."}
                </div>
              </div>
              {selectedUser?.role === role && (
                <span className="material-symbols-outlined text-primary text-xl">
                  check_circle
                </span>
              )}
            </button>
          ))}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsEditRoleOpen(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}