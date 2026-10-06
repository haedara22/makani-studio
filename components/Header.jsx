"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import Image from "next/image";
import Cookie from "cookie-universal";
import { usePathname } from "next/navigation";
import { FaBookOpen } from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logo, setLogo] = useState("/asset/Primary_logo.png"); // 👈 الافتراضي
  const pathname = usePathname();

  useEffect(() => {
    const cookies = Cookie();
    const token = cookies.get("student");
    setIsLoggedIn(!!token);
  }, [pathname]);

  // ✅ اجلب إعدادات الموقع
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/site-setting`, {
          cache: "no-store", // 👈 يمنع التخزين المؤقت
          headers: {
            Accept: "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch site settings");
        const data = await res.json();
        // تأكد من وجود مسار اللوغو
        if (data?.data?.logo) {
          setLogo(`${data.data.logo}`);
        }
      } catch (error) {
        console.error("Error loading site settings:", error);
      }
    };

    fetchSiteSettings();
  }, []);

  const handleLogout = async () => {
    const cookies = Cookie();
    const token = cookies.get("student");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Logout failed", await res.json());
      }
    } catch (err) {
      console.error("Network error during logout", err);
    } finally {
      cookies.remove("student");
      setIsLoggedIn(false);
      window.location.href = "/login";
    }
  };

  return (
    <header className="py-2 text-primaryText sticky top-0 bg-neutral-100 shadow-sm shadow-primaryText/20 z-[100]">
      <div className="container flex items-center justify-between mx-auto">
        {/* logo */}
        <Link href="/">
          <Image
            alt="logo"
            width={200}
            height={20}
            className="max-w-[70%] max-h-[65px] object-contain"
            src={logo}
            priority
          />
        </Link>

        {/* desktop nav */}
        <div className="items-center hidden gap-8 xl:flex">
          <Nav />

          {!isLoggedIn ? (
            <Link href="/login">
              <Button className="bg-accent-gold text-primaryText/70">
                LogIn
              </Button>
            </Link>
          ) : (
            <div className="flex flex-row items-center gap-5">
              <Button
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </Button>
                      <Link href={"/myCourses"}>
              <FaBookOpen className="text-primaryText text-[40px] transition-all duration-500 hover:rotate-12 hover:text-accent-Default hover:drop-shadow-[0_0_10px_#ff6b00]" />
            </Link>
            </div>
          )}
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
