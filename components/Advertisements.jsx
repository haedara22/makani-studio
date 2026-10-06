'use client'
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from 'framer-motion'
import { fadeIn } from "@/variants";
import Loading from "@/app/Loading";

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
          setAds(data.data?.data); // نفترض أن البيانات موجودة في data.data
        } catch (err) {
          setError("فشل في تحميل الإعلانات.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchAds();
    }, []);
  
    if (loading) return <Loading content={"⏳ Loading Advertisements..."} />;
    if (error) return <div>{error}</div>;
  
  
  return (
    <div className="md:p-20 p-10">
      <div id="features" className="max-w-6xl mx-auto text-center">
        <motion.p variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }} className="text-[30px] font-black text-primaryText mb-3">Advertisements</motion.p>
        <motion.h2 variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }} className="text-xl md:text-2xl font-bold tracking-tight font-display text-slate-900">
          Writing has never been so easy
        </motion.h2>

        {/* الخدمات */}
        <ul className="flex md:flex-row md:flex-wrap flex-col gap-6 mt-16 items-center justify-center text-center text-slate-700">
          {ads.slice(0, 3).map((ad,index) => {
            return (
             <Link href={`/advertisements/${ad.id}`} key={ad.id}>
              <motion.li variants={fadeIn("top", index/3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
                key={ad.id}
                className="md:px-6 relative md:w-[30vw] w-[90vw] px-2 py-8 flex flex-col items-center bg-white shadow-sm rounded-xl"
              >
                <h3 className="absolute bg-accent-gold w-[200px] px-10 text-primaryText font-bold -top-6 mx-auto my-3 ">
                  {ad.start_date}
                </h3>
                <p className="mt-1.5 text-lg font-bold line-clamp-1 leading-6 text-secondary-500">
                  {ad.title}
                </p>
              </motion.li>
             </Link>
            );
          })}
        </ul>

        {/* زر show more */}
        <Link href="/services">
          <Button className="mt-5 bg-accent-gold text-primaryText/70">Show more</Button>
        </Link>
      </div>
    </div>
  );
};

export default Advertisements;
