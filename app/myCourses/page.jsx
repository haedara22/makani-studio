"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookie from "cookie-universal";
import { Button } from "@/components/ui/button"; // إذا كنت تستخدم أزرار جاهزة
import Image from "next/image";
import Link from "next/link";
import Loading from "../Loading";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
export default function MyCourses() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("paid"); // الحالة الحالية (مدفوعة افتراضياً)
  const cookie = Cookie();

// ... (الأكواد المستوردة والـ state كما هي)

  useEffect(() => {
    const token = cookie.get("student");

    if (!token) {
      // خزّن الوجهة المطلوبة قبل تسجيل الدخول
      localStorage.setItem("redirectAfterLogin", pathname);
      router.replace("/login");
      return;
    }

    async function fetchCourses() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/myCourses?status=${status}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          console.error("HTTP error:", res.status);
          throw new Error("فشل في جلب الكورسات");
        }

        // ✅ التصحيح: قراءة الـ JSON مرة واحدة وتخزينها
        const json = await res.json(); 
        
        // ✅ استخدام الـ json المُخزّن للطباعة والـ state
        console.log("Fetched Courses JSON:", json); 
        
        setCourses(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [router, pathname, status]);

// ... (بقية الكود كما هو)
  if (loading) return <Loading content={"Please wait ..."} />

  return (
    <div className="w-full min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-accent-Default mb-6">📚 My Courses</h1>

      {/* أزرار التبديل بين الحالات */}
      <div className="flex gap-3 mb-8">
        <Button
        className="text-primaryText bg-accent-gold"
          onClick={() => setStatus("paid")}
          variant={status === "paid" ? "default" : "outline"}
        >
          Paid
        </Button>
        <Button
        className="text-primaryText"
          onClick={() => setStatus("pending")}
          variant={status === "pending" ? "default" : "outline"}
        >
          pending
        </Button>
      </div>

      {/* عرض الكورسات */}
      {courses.length === 0 ? (
        <p className="text-gray-500">There are no courses in this case.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            status === "paid" ? (             <Link href={`/myCourses/${course.id}`} key={course.id}>
            <motion.div
            variants={fadeIn("up", course.id * 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            key={course.id}
            className="flex flex-col max-w-full max-h-full rounded-lg"
          >
            <div className="relative z-10 px-8 pt-6 top-6">
              <Image
                width={500}
                height={500}
                className="sm:w-[18rem] sm:h-[18rem] xs:w-[14rem] xs:h-[14rem] w-[8rem] h-[8rem] mx-auto object-cover rounded-full outline outline-[1rem] outline-lightOrange/10 shadow-4xl"
                src={course.thumbnail}
                alt={course.title}
              />
            </div>

            <div className="flex items-center justify-between w-full gap-4 px-6 pt-10 rounded-xl bg-lightOrange/10">
              <h2 className="mt-8 min-h-[60px] text-sm text-center text-primaryText sm:text-sm font-black">
                {course.title}
              </h2>
              <h3 className="px-2 py-1 text-sm text-white bg-accent-Default sm:text-lg rounded-3xl">
                {course.price}
              </h3>
            </div>
          </motion.div>
            </Link>
           ) : <motion.div
            variants={fadeIn("up", course.id * 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            key={course.id}
            className="flex flex-col max-w-full max-h-full rounded-lg"
          >
            <div className="relative z-10 px-8 pt-6 top-6">
              <Image
                width={500}
                height={500}
                className="sm:w-[18rem] sm:h-[18rem] xs:w-[14rem] xs:h-[14rem] w-[8rem] h-[8rem] mx-auto object-cover rounded-full outline outline-[1rem] outline-lightOrange/10 shadow-4xl"
                src={course.thumbnail}
                alt={course.title}
              />
            </div>

            <div className="flex items-center justify-between w-full gap-4 px-6 pt-10 rounded-xl bg-lightOrange/10">
              <h2 className="mt-8 min-h-[60px] text-sm text-center text-primaryText sm:text-sm font-black">
                {course.title}
              </h2>
              <h3 className="px-2 py-1 text-sm text-white bg-accent-Default sm:text-lg rounded-3xl">
                {course.price}
              </h3>
            </div>
          </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
