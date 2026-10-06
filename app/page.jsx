'use client'
import { useEffect, useState } from "react";
import AboutUs from "@/components/AboutMe";
import Articles from "@/components/Articles";
import Contact from "@/components/Contact";
import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import { MdOutlineArchitecture } from "react-icons/md";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { motion } from 'framer-motion'
import { fadeIn } from "@/variants";
import Footer from "@/components/Footer";
import Advertisements from "@/components/Advertisements";
import WelcomeVideo from "@/components/WelcomeVideo";

export default function Home() {
  const [showDown, setShowDown] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const halfPage = document.body.scrollHeight / 4;

      // يظهر سهم النزول لما المستخدم فوق النص التحتاني (قبل منتصف الصفحة)
      setShowDown(scrollY < halfPage);

      // يظهر سهم الصعود لما المستخدم نازل تحت شوي
      setShowUp(scrollY > 1100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // تشغيله أول مرة عند التحميل

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative h-full overflow-x-hidden">
      <WelcomeVideo />
      {/* Hero Section */}
      <Hero />

      {/* Background Icons */}
      <MdOutlineArchitecture className="absolute md:w-[400px] md:h-[400px] md:flex z-[60] opacity-10 hidden rotate-[50deg] text-primaryText top-5 right-[-30px]" />
      <TfiRulerAlt2 className="absolute md:w-[400px] md:h-[400px] w-[200px] h-[200px] opacity-10 z-10 rotate-[80deg] text-primaryText top-8 left-[60px] md:left-[100px]" />

      {/* محتوى الموقع */}
      <AboutUs />
      <Advertisements />
      <Courses />
      <Contact />
      <Articles />

      {/* سهم للنزول */}
      {showDown && (
        <motion.button variants={fadeIn("top", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }} 
          onClick={scrollToBottom}
          className="fixed bottom-5 right-[20px] md:right-[100px] z-50 bg-primaryText text-white p-3 rounded-full shadow-lg hover:bg-opacity-80 transition"
        >
          <FaArrowDown className="w-5 h-5" />
        </motion.button>
      )}

      {/* سهم للرجوع للأعلى */}
      {showUp && (
        <motion.button variants={fadeIn("bottom", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }} 
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 bg-primaryText text-white p-3 rounded-full shadow-lg hover:bg-opacity-80 transition"
        >
          <FaArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </section>
  );
}
