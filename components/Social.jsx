"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaTelegram, FaWhatsapp } from "react-icons/fa";

const Social = ({ containerStyles, iconStyles }) => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/site-setting`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch site settings");

        const data = await res.json();
        const s = data?.data || {};
        // ✅ هنا نكوّن مصفوفة الروابط بناءً على ما يعود من الـ API
        const socialLinks = [
          s.facebook && {
            path: s.facebook,
            icon: <FaFacebook />,
          },
          s.instagram && {
            path: s.instagram,
            icon: <FaInstagram />,
          },
          s.linkedin && {
            path: s.linkedin,
            icon: <FaWhatsapp />,
          },
          s.twitter && {
            path: s.twitter,
            icon: <FaTelegram />,
          },
        ].filter(Boolean); // 👈 لحذف العناصر الفارغة

        setSocials(socialLinks);
      } catch (error) {
        console.error("Error fetching socials:", error);
      }
    };

    fetchSocials();
  }, []);

  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className={iconStyles}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Social;
