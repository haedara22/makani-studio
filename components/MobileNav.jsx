"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";
import { navLinks } from "@/app/data";
import Cookie from "cookie-universal";
import { Button } from "./ui/button";
import { FaBookOpen } from "react-icons/fa";

const MobileNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const cookies = Cookie();
    const token = cookies.get("student");
    setIsLoggedIn(!!token);
  }, [pathname]);

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
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <CiMenuFries className="text-[32px] text-accent-Default " />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center ">
        <div className=" mt-20 mb-10 text-2xl center text-">
          <Link href="/">
            <Image
              alt="logo"
              width={200}
              height={20}
              className="max-w-[70%] max-h-[75px] mx-auto "
              src="/asset/Primary_logo.png"
            />
          </Link>
        </div>
        <nav className="flex flex-col items-center justify-center gap-4">
          {navLinks.map((link, index) => {
            return (
              <Link
                href={link.href}
                key={index}
                className={`${
                  link.href === pathname &&
                  "text-accent-Default border-b-2 border-accent-Default"
                }text-xl capitalize text-primaryText transition-all hover:text-accent-Default`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        {/* زر login/logout */}
        {!isLoggedIn ? (
          <Link href="/login">
            <Button className="bg-accent-gold text-primaryText/70">
              LogIn
            </Button>
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-5">
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
