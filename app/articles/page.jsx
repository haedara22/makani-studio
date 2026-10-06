"use client";
import React, { useEffect, useState } from "react";
import { fadeIn } from "@/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Loading from "../Loading";
const Page = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/articles?per_page=10&page=1`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const json = await res.json();
        // Laravel غالباً بيرجع { data: { data: [...] } }
        setArticles(Array.isArray(json.data?.data) ? json.data.data : []);
        console.log(json.data?.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) return <Loading content={"⏳ Loading Articles..."} />

  return (
    <div className="min-h-screen w-full">
      <section className="flex flex-col justify-center max-w-7xl px-4 py-10 mx-auto sm:px-6">
        <motion.h2
          variants={fadeIn("right", 0.2)}
          initial="show"
          animate="show"
          className="mb-6 text-2xl font-bold text-accent-Default md:text-3xl"
        >
          More Articles
        </motion.h2>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          className="w-[90vw] mx-auto "
        >
          {articles.map((article, index) => (
            <SwiperSlide key={article.id || index}>
              <Link href={`/articles/${article.id}`}>
                <motion.div
                  variants={fadeIn("right", 0.2)}
                  initial="show"
                  animate="show"
                  className="cursor-pointer flex flex-col justify-between h-[500px] border rounded-lg shadow-md bg-white"
                >
                  <div className="w-full h-[300px]">
                  <Image
  src={article.thumbnail}
  alt={article.title}
  width={400}
  height={300}
  className="object-contain h-full w-full rounded-t-lg bg-gray-100"
/>
                  </div>
                  <div className="flex flex-col px-4 py-3 h-[40%]">
                    <p className="md:text-xl text-xl font-semibold text-primaryText">
                      {article.title}
                    </p>
                    <p className="text-primaryText/70 line-clamp-3">
                      {article.content}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Page;
