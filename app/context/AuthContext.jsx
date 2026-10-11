"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "cookie-universal";

const AuthContext = createContext();

const COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 يوم
  sameSite: "lax",
  // secure: true, // فعّلها على HTTPS فقط
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const cookie = Cookie();

  // ✅ قراءة التوكن والمستخدم عند التحميل
  useEffect(() => {
    const savedToken = cookie.get("student");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, tokenValue) => {
    // ✅ حفظ الكوكي مع maxAge
    cookie.set("student", tokenValue, COOKIE_OPTIONS);

    // ✅ حفظ المستخدم في localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // ✅ حفظ في State
    setUser(userData);
    setToken(tokenValue);
  };

  const logout = () => {
    cookie.remove("student", { path: "/" });
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}