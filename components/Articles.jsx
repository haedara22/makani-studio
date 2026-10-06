"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/variants';
import Image from "next/image";

const Articles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}api/articles?per_page=10&page=1`;
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const list =
          Array.isArray(json?.data?.data) ? json.data.data :
          Array.isArray(json?.data)       ? json.data       :
          Array.isArray(json)             ? json             :
          [];

        setArticles(list);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Autoplay (اختياري) — علّق عليه لو ما بدك
  useEffect(() => {
    if (articles.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 6000);
    return () => clearInterval(id);
  }, [articles.length]);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));

  const goToSlide = (index) => setCurrentIndex(index);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="w-full text-center py-20 text-gray-500">
        لا توجد مقالات حالياً
      </div>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* العنوان */}
        <motion.h1
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="text-primaryText font-black text-center mb-10 md:mb-14
                     text-3xl sm:text-4xl md:text-5xl tracking-tight"
        >
          Articles
        </motion.h1>

        {/* السلايدر */}
        <div className="relative w-full">

          {/* إطار الكارد */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 bg-white">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {articles.map((article, index) => (
  <Link
    href={`/articles/${article.id}`}   // ← كان "/articles" فقط، الأفضل يروح لصفحة المقال
    key={article.id ?? index}
    className="min-w-full group block"
  >
    <article className="flex flex-col items-center justify-center
                        min-h-[380px] sm:min-h-[440px] md:min-h-[500px]
                        bg-gradient-to-br from-primary to-primary/90
                        transition-colors duration-300 overflow-hidden">

      {/* ✅ الصورة */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-100">
        {article.thumbnail ? (
          <Image
            src={article.thumbnail}
            alt={article.title || "article"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1100px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            لا توجد صورة
          </div>
        )}
      </div>

      {/* ✅ المحتوى */}
      <div className="flex flex-col items-center justify-center
                      gap-3 px-6 sm:px-10 md:px-16
                      py-8 md:py-10 flex-1 w-full">
        <motion.h3
          variants={fadeIn("up", 0.15)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="text-primaryText font-bold text-center
                     text-lg sm:text-xl md:text-2xl lg:text-3xl
                     leading-snug max-w-3xl line-clamp-2"
        >
          {article.title}
        </motion.h3>

        <motion.p
          variants={fadeIn("up", 0.25)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="text-primaryText/70 text-center
                     text-sm sm:text-base md:text-lg
                     leading-relaxed line-clamp-3 max-w-2xl"
        >
          {article.content}
        </motion.p>

        <span className="mt-2 inline-flex items-center gap-2
                         text-accent-gold font-semibold
                         text-sm sm:text-base
                         transition-transform duration-300
                         group-hover:translate-x-1">
          اقرأ المزيد
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </article>
  </Link>
))}
            </div>
          </div>

          {/* أزرار Prev / Next — Overlay */}
          {articles.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20
                           w-10 h-10 sm:w-12 sm:h-12
                           flex items-center justify-center
                           rounded-full bg-white/90 backdrop-blur
                           text-primaryText shadow-lg
                           ring-1 ring-black/5
                           transition-all duration-300
                           hover:bg-white hover:scale-110 hover:shadow-xl
                           active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20
                           w-10 h-10 sm:w-12 sm:h-12
                           flex items-center justify-center
                           rounded-full bg-white/90 backdrop-blur
                           text-primaryText shadow-lg
                           ring-1 ring-black/5
                           transition-all duration-300
                           hover:bg-white hover:scale-110 hover:shadow-xl
                           active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots Indicators */}
        {articles.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300
                  ${currentIndex === index
                    ? "w-8 bg-accent-gold"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;