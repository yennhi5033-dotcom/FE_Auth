import React, { createContext, useContext, useState, useEffect } from "react";
import { getMeApi, loginApi, registerApi, logoutApi, changePasswordApi } from "../server/api/apiAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null); // { type: "success" | "error" | "loading", title: "", message: "" }

  const showToast = (type, title, message, duration = 4000) => {
    setToast({ type, title, message });
    if (duration > 0) {
      setTimeout(() => {
        setToast((prev) => (prev?.title === title ? null : prev));
      }, duration);
    }
  };

  const hideToast = () => setToast(null);

  // Load initial user from token / localStorage
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error(e);
        }
      }

      if (token) {
        try {
          const res = await getMeApi();
          if (res?.user) {
            setUser(res.user);
            localStorage.setItem("user", JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn("Could not fetch current user:", err.message);
          // if invalid token, clear
          if (err.status === 401) {
            setUser(null);
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await loginApi({ email, password });
    if (res?.user) {
      setUser(res.user);
    }
    return res;
  };

  const register = async (name, email, password, role = "user") => {
    const res = await registerApi({ name, email, password, role });
    return res;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    const res = await changePasswordApi({ oldPassword, newPassword });
    return res;
  };

  const setAuthUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        changePassword,
        setAuthUser,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

