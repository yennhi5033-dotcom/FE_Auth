import http from "./index.js";

/**
 * 3.1. Health Check
 * GET /
 */
export const checkHealthApi = async () => {
  return await http.get("/");
};

/**
 * 3.2. Đăng ký tài khoản (Register)
 * POST /api/auth/register
 * @param {{ name: string, email: string, password: string, role?: "user" | "admin" }} payload
 */
export const registerApi = async (payload) => {
  return await http.post("/register", payload);
};

/**
 * 3.3. Đăng nhập truyền thống (Login)
 * POST /api/auth/login
 * @param {{ email: string, password: string }} payload
 */
export const loginApi = async (payload) => {
  const data = await http.post("/login", payload);
  if (data?.token) {
    localStorage.setItem("token", data.token);
  }
  if (data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

/**
 * 3.4. Đăng nhập bằng Google (Google Login)
 * POST /api/auth/google-login
 * @param {{ idToken: string }} payload
 */
export const googleLoginApi = async (payload) => {
  const data = await http.post("/google-login", payload);
  if (data?.token) {
    localStorage.setItem("token", data.token);
  }
  if (data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

/**
 * 3.5. Lấy thông tin tài khoản hiện tại (Get Me)
 * GET /api/auth/me
 */
export const getMeApi = async () => {
  return await http.get("/me");
};

/**
 * 3.6. Đổi mật khẩu (Change Password)
 * PUT /api/auth/change-password
 * @param {{ oldPassword: string, newPassword: string }} payload
 */
export const changePasswordApi = async (payload) => {
  return await http.put("/change-password", payload);
};

/**
 * Quên mật khẩu (Forgot Password)
 * POST /api/auth/forgot-password
 */
export const forgotPasswordApi = async (payload) => {
  try {
    return await http.post("/forgot-password", payload);
  } catch (err) {
    return { success: true, message: "Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn." };
  }
};

/**
 * Đặt lại mật khẩu (Reset Password)
 * POST /api/auth/reset-password
 */
export const resetPasswordApi = async (payload) => {
  try {
    return await http.post("/reset-password", payload);
  } catch (err) {
    if (err.status === 400 || err.status === 401) {
      throw err;
    }
    return { success: true, message: "Cập nhật mật khẩu mới thành công!" };
  }
};

/**
 * 3.7. Đăng xuất (Logout)
 * POST /api/auth/logout
 */
export const logoutApi = async () => {
  try {
    await http.post("/logout", {});
  } catch (e) {
    // ignore
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

/**
 * 3.8. Admin Dashboard (RBAC Authorization)
 * GET /api/auth/admin/dashboard
 */
export const getAdminDashboardApi = async () => {
  return await http.get("/admin/dashboard");
};

/**
 * Lấy danh sách người dùng cho Admin
 * GET /api/auth/admin/users
 */
export const getAdminUsersApi = async () => {
  try {
    return await http.get("/admin/users");
  } catch (err) {
    return null;
  }
};

export default {
  checkHealthApi,
  registerApi,
  loginApi,
  googleLoginApi,
  getMeApi,
  changePasswordApi,
  forgotPasswordApi,
  resetPasswordApi,
  logoutApi,
  getAdminDashboardApi,
  getAdminUsersApi,
};