'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Stats from "./Stats";
import { motion } from 'framer-motion';
import { fadeIn } from "@/variants";
import { Button } from "./ui/button";
import Link from "next/link";

const AboutMe = () => {
  // 🟢 الحالة الافتراضية
  const [aboutData, setAboutData] = useState({
    name: "Mrs. Mais Kijani",
    bio: "I am an Architectural Engineer with experience in design, shop drawings, and construction. I have worked with Abco Company, Porto Tartous, and as a university instructor at Tartous University. In addition to my role as a freelancer, I am skilled in using AutoCAD, Revit, 3ds Max, V-Ray, Photoshop, SketchUp, and Lumion/Enscape, combining creativity with technical accuracy in architectural projects.",
  });

  // 🔵 جلب البيانات من API
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/site-setting`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch About data");

        const data = await res.json();

        // ✳️ غيّر الحقول هنا حسب استجابة API الفعلية
        setAboutData({
          name: data?.data?.site_name || "Mrs. Mais Kijani",
          bio:
            "I am an Architectural Engineer with experience in design, shop drawings, and construction. I have worked with Abco Company, Porto Tartous, and as a university instructor at Tartous University. In addition to my role as a freelancer, I am skilled in using AutoCAD, Revit, 3ds Max, V-Ray, Photoshop, SketchUp, and Lumion/Enscape, combining creativity with technical accuracy in architectural projects.",
        });
      } catch (error) {
        console.error("Error fetching About data:", error);
      }
    };

    fetchAbout();
  }, []);

  return (
    <div className="w-full p-20 bg-white min-h-[100vh]">
      <motion.h1
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="text-primaryText font-black text-center mb-10 text-[30px]"
      >
        About<span className="ml-2">Me</span>
      </motion.h1>

      <motion.div
        variants={fadeIn("top", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-col items-center justify-center gap-7"
      >
        <Image
          src="/asset/edited-photo.png"
          alt=""
          className="sm:w-[20rem] sm:h-[20rem] xs:w-[14rem] xs:h-[14rem] w-[15rem] h-[15rem] rounded-[50%] object-contain"
          width={400}
          height={750}
        />

        <motion.div
          variants={fadeIn("top", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col items-center justify-center gap-3 text-primaryText"
        >
          {/* 🟢 الاسم الديناميكي */}
          <h1 className="text-[20px] text-accent-Default ">{aboutData.name}</h1>

          {/* 🟢 النبذة التعريفية */}
          <p className="text-center md:w-[500px] w-[300px] line-clamp-4 ">
            {aboutData.bio}
          </p>

          <Link href={"/resume"}>
            <Button className="bg-accent-gold text-primaryText/70">
              Read more
            </Button>
          </Link>
        </motion.div>

        <Stats />
      </motion.div>
    </div>
  );
};

export default AboutMe;
