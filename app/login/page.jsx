"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from "cookie-universal";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth(); // ✅ استدعاء الدالة من الـ Context

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cookie = Cookie();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("password", form.password);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/login`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        credentials: "omit",
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = "Login failed. Check your credentials.";
        if (res.status === 419) {
          errorMessage = "Login failed (419 CSRF Error).";
        } else if (res.status === 401) {
          errorMessage = "البريد الإلكتروني أو كلمة المرور خاطئة.";
        } else if (data.errors) {
          errorMessage = Object.values(data.errors).flat().join(", ");
        } else if (data.message) {
          errorMessage = data.message;
        }
        throw new Error(errorMessage);
      }

      const token = data.data?.token;
      const userData = data.data?.user;

      if (token && userData) {
        // ✅ حفظ المستخدم في السياق العام (global context)
        login(userData, token);

        const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        router.replace(redirectTo);
      } else {
        setError("Login successful, but user data missing.");
      }
    } catch (err) {
      setError(err.message || "Network Error: Could not connect to API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto my-20 overflow-hidden bg-white rounded-lg shadow-md">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <Image
            alt="logo"
            width={200}
            height={20}
            src="/asset/Primary_logo.png"
          />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600">
          Welcome Back
        </h3>

        <p className="mt-1 text-center text-gray-500">
          Login or create account
        </p>

        <form onSubmit={handleLogin}>
          <div className="w-full mt-4">
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              name="email"
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white rounded-lg outline-none"
            />
          </div>

          <div className="w-full mt-4">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              name="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white rounded-lg outline-none"
            />
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
          )}

          <div className="flex items-center justify-between mt-4">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-500"
            >
              Forget Password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium tracking-wide capitalize bg-yellow-400 text-primaryText/70 rounded-lg hover:text-primaryText"
            >
              {loading ? "جاري الدخول..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50">
        <span className="text-sm text-gray-600">Don't have an account? </span>
        <Link
          href="/signup"
          className="mx-2 text-sm font-bold text-primaryText hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
