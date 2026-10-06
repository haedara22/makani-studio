"use client";
import { ads } from "@/app/data";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
const AdCard = () => {
  const params = useParams();
  const id = parseInt(params.id);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const ad = ads.find((a) => a.id === id);

  
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
        console.log(data.data?.data);
        setAds(data.data?.data); 
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
    <motion.div
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      animate="show"
      className="max-w-md min-h-[50vh] mx-auto bg-white flex gap-2 flex-col items-center shadow-lg rounded-2xl overflow-hidden border border-gray-200"
    >
      <div className="z-10 w-full">
        <Image
          src={ad.thumbnail}
          alt=""
          width={500}
          height={400}
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{ad.title}</h2>
        <p className="text-primaryText/60 mb-3">{ad.content}</p>
        <p className="text-sm text-gray-400">
          📅 Published on: {ad.start_date}
        </p>
        <p className="text-sm text-gray-400">📅 Day ends: {ad.end_date}</p>
      </div>
    </motion.div>
  );
};

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-5 p-6">
      <AdCard />
      <Link href={"/contact"}>
        <Button className="bg-accent-gold text-primaryText">
          Contact the center
        </Button>
      </Link>
    </div>
  );
};

export default page;
