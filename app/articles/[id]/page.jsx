"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants"; // تأكد من أن هذا المسار صحيح
import Loading from "../../Loading"; // تأكد من أن هذا المسار صحيح
// قد تحتاج لاستيراد أي مكونات أخرى تستخدمها في التصميم (مثل Button)

const ArticleDetailsPage = () => {
  // 1. جلب الـ ID من الرابط
  const params = useParams();
  const articleId = params.id; // سيكون string، يمكن تحويله إلى Number إذا لزم الأمر

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticleDetails() {
      if (!articleId) return;

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/articles/${articleId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch article details. Status: " + res.status);
        }

        const json = await res.json();
        
        const articleData = json.data;

        if (!articleData) {
            throw new Error("Article not found.");
        }

        setArticle(articleData);

      } catch (err) {
        console.error("Error fetching article:", err);
        setError(err.message || "حدث خطأ أثناء تحميل تفاصيل المقالة.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticleDetails();
  }, [articleId]);

  if (loading) {
    return <Loading content={"⏳ Loading Article..."} />;
  }

  if (error) {
    return (
      <div className="min-h-screen p-10 text-center text-xl text-red-600">
        ❌ {error}
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="min-h-screen p-10 text-center text-xl text-gray-500">
        المقالة المطلوبة غير متوفرة.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          className="bg-white p-8 rounded-xl shadow-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-primaryText mb-6 border-b pb-4">
            {article.title}
          </h1>

          {article.thumbnail && (
            <div className="relative w-full h-80 sm:h-96 md:h-[500px] mb-8 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={article.thumbnail}
                alt={article.title}
                layout="fill"
                objectFit="cover"
                className="transition duration-500 hover:scale-105"
              />
            </div>
          )}

          {/* محتوى المقالة */}
          <div className="prose max-w-none text-lg text-gray-700 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;