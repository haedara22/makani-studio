"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "cookie-universal";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const cookie = Cookie();

  useEffect(() => {
    // جلب المستخدم من LocalStorage أو API إذا كان موجودًا
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData, token) => {
    cookie.set("student", token);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    cookie.remove("student");
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
