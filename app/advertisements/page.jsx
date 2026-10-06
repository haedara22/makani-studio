"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeIn } from "@/variants";

const Advertisements = () => {
  const [ads, setAds] = useState([]); // تخزين الإعلانات في حالة
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  // جلب الإعلانات من الـ API
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/announcements?per_page=10&page=1`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data.data?.data)
        setAds(data.data?.data); // نفترض أن البيانات موجودة في data.data
      } catch (err) {
        setError("فشل في تحميل الإعلانات.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="min-h-[110vh] items-center flex flex-col gap-7 py-12 xl:py-10">
      <h1 className="mb-6 text-2xl md:text-start text-center font-bold text-accent-Default md:text-3xl">
       All ads are reliable
      </h1>
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-[20px]">
          {ads.map((ad, index) => (
            <Link key={ad.id} href={`/advertisements/${ad.id}`}>
              <motion.li
                variants={fadeIn("top", index / 3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className="md:px-6 relative w-[70vw] mx-auto shadow-md px-2 py-8 flex flex-col items-center cursor-pointer bg-white rounded-xl"
              >
                {ad.icon ? ad.icon : null} {/* إذا كان هناك أيقونة */}
                <h3 className="absolute bg-accent-gold w-[200px] text-center px-10 text-primaryText font-bold -top-4 mx-auto my-3">
                  {ad.start_date}
                </h3>
                <p className="mt-1.5 text-lg font-bold line-clamp-1 text-primaryText">
                  {ad.title}
                </p>
              </motion.li>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advertisements;
