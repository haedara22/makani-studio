"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookie from "cookie-universal";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+966"); // 🇸🇦 الافتراضي السعودية
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cookie = Cookie();
  const router = useRouter();

  // 📱 قائمة رموز الدول الأساسية (يمكنك إضافة المزيد)
  const countryCodes = [
    { code: "+963", name: "سوريا SY" },
    { code: "+966", name: "السعودية 🇸🇦" },
    { code: "+20", name: "مصر 🇪🇬" },
    { code: "+971", name: "الإمارات 🇦🇪" },
    { code: "+965", name: "الكويت 🇰🇼" },
    { code: "+974", name: "قطر 🇶🇦" },
    { code: "+962", name: "الأردن 🇯🇴" },
    { code: "+1", name: "الولايات المتحدة 🇺🇸" },
    { code: "+44", name: "المملكة المتحدة 🇬🇧" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const phonePattern = /^[0-9]{6,14}$/;
    if (!phonePattern.test(phone)) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);

    try {
      const fullPhone = `${countryCode}${phone}`; // ✅ دمج الرمز مع الرقم

      const formData = new FormData();
      formData.append("name", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", fullPhone);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/register`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        const message =
          data.message ||
          "Registration failed. Please check your details.";
        throw new Error(message);
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
        alert("Account created successfully!");
      } else {
        alert("Account created successfully! Please log in.");
        router.push("/login");
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-20 overflow-hidden bg-white rounded-lg shadow-md">
      <div className="px-6 py-4">
        <h3 className="mt-3 text-xl font-medium text-center text-gray-600">
          Welcome
        </h3>
        <p className="mt-1 text-center text-gray-500">
          Create a new account
        </p>

        <form onSubmit={handleSubmit}>
          {/* اسم المستخدم */}
          <div className="flex items-center mt-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full py-3 bg-white text-primaryText border outline-none rounded-lg px-7"
              placeholder="Username"
              required
            />
          </div>

          {/* البريد الإلكتروني */}
          <div className="flex items-center mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full py-3 bg-white text-primaryText border outline-none rounded-lg px-7"
              placeholder="Email address"
              required
            />
          </div>

          {/* رقم الجوال مع رمز الدولة */}
          <div className="flex items-center mt-4 gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-1/3 py-3 px-2 bg-gray-50 border text-gray-700 rounded-lg outline-none"
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-2/3 py-3 bg-white border text-primaryText outline-none rounded-lg px-4"
              placeholder="Phone number"
              required
            />
          </div>

          {/* كلمة المرور */}
          <div className="flex items-center mt-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full py-3 bg-white border text-primaryText outline-none rounded-lg px-7"
              placeholder="Password"
              required
            />
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="flex items-center mt-4">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full py-3 bg-white border text-primaryText outline-none rounded-lg px-7"
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* عرض الأخطاء */}
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

          {/* زر التسجيل */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-primaryText hover:text-primaryText/60 capitalize bg-yellow-400 rounded-lg"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-primaryText hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
