"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { fadeIn } from '@/variants';

const Articles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          "https://test.course.start-tech.ae/api/articles?per_page=10&page=1",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const json = await res.json();
        // Laravel غالباً بيرجع { data: { data: [...] } }
        setArticles(Array.isArray(json.data?.data) ? json.data.data : []);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) return <p className="text-center py-10">Loading articles...</p>;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full relative bg-white max-h-[100vh] md:p-20 p-10 flex flex-col items-center gap-5">
      <motion.h1 variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}  className="text-primaryText font-black text-center mb-10 text-[30px]">
        Articles
      </motion.h1>

      <div className="relative w-full max-w-[85vw] overflow-hidden">
        {/* Slider wrapper */}
        <div 
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {articles.map((article, index) => (
            <Link
            href={"/articles"}
              key={index}
              className="min-w-full px-10 py-3 font-normal md:h-[20vh] max-h-[40vh] rounded-lg md:px-20 bg-primary"
            >
              <motion.div  variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}  className="flex flex-col items-center">
                <h3 className="mb-2 md:text-xl text-center text-sm font-semibold leading-snug text-primaryText">
                  {article.title}
                </h3>
              <motion.p  variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}  className="text-primaryText/30 line-clamp-2 ">{article.content}</motion.p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dots Indicators */}
      <div className="flex mt-4 space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-accent-hover" : "bg-gray-300"
            }`}
          />
        ))}
         {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute px-3 py-2 translate-x-[57px]  md:translate-x-[67px] md:translate-y-[40%] text-primaryText/60 translate-y-[110px] bg-accent-gold transition-all ease-in-out duration-200 hover:text-primaryText rounded left-2 top-1/2 hover:bg-accent-Default/40"
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          className="absolute px-3 py-2  -translate-x-[57px]   md:-translate-x-[75px] md:translate-y-[40%] translate-y-[110px] text-primaryText/60 bg-accent-gold transition-all ease-in-out duration-200 hover:text-primaryText rounded right-2 top-1/2 hover:bg-accent-Default/40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Articles;
