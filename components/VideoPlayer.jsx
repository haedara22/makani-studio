"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

export default function VideoPlayer({ videoUrl, token }) {
  const videoRef = useRef(null);
  const [currentObjectUrl, setCurrentObjectUrl] = useState(null);
  const { user } = useAuth(); // ✅ جلب بيانات المستخدم من الـ Context

  useEffect(() => {
    async function fetchVideo() {
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
        setCurrentObjectUrl(null);
      }

      try {
        const response = await axios.get(videoUrl, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = response.headers["content-type"] || "video/mp4";
        const videoBlob = new Blob([response.data], { type: contentType });
        const newObjectUrl = URL.createObjectURL(videoBlob);

        setCurrentObjectUrl(newObjectUrl);

        if (videoRef.current) {
          videoRef.current.src = newObjectUrl;
          videoRef.current.load();
        }
      } catch (error) {
        console.error("❌ خطأ في تحميل الفيديو الموثق:", error);
      }
    }

    if (videoUrl && token) {
      fetchVideo();
    }

    return () => {
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, [videoUrl, token]);

  return (
    <div className="relative w-full max-h-[100vh] overflow-hidden rounded-lg shadow">
      {/* 🎥 مشغل الفيديو */}
      <video
        ref={videoRef}
        controls
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-auto rounded-lg"
      >
        <p>لا يمكن تحميل الفيديو. تأكد من اتصالك.</p>
      </video>

      {/* 💧 اسم المستخدم والإيميل كعلامة مائية */}
      {user && (
        <div
          className="absolute top-4 left-4 text-white text-sm bg-black/40 px-3 py-1 rounded-md pointer-events-none select-none"
        >
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs opacity-80">{user.email}</p>
        </div>
      )}

      {/* ✨ نسخة متحركة (اختياري): اسم المستخدم يتحرك كعلامة مائية */}
      {user && (
        <div
          className="absolute bottom-10 left-0 w-full text-center text-white/40 text-xs animate-watermarkMove pointer-events-none select-none"
        >
          {user.name} • {user.email}
        </div>
      )}

      {/* 💡 أنماط الحركة */}
      <style jsx>{`
        @keyframes watermarkMove {
          0% {
            transform: translateX(-50%);
          }
          50% {
            transform: translateX(50%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-watermarkMove {
          animation: watermarkMove 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
