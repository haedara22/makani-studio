"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import Cookie from "cookie-universal";
import axios from "axios";
import VideoPlayer from "@/components/VideoPlayer";
import Loading from "@/app/Loading";

const Page = () => {
  const params = useParams();
  const courseId = Number(params.id);

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);

  const cookies = Cookie();
  const token = cookies.get("student");

  // ... (الأكواد المستوردة والـ state كما هي)

  useEffect(() => {
    async function fetchMyCourses() {
      try {
        if (!token) {
          setError("⚠️ You must be logged in to access lessons.");
          setLoading(false);
          return;
        } // 1. ✅ جلب الكورسات ذات الحالة "paid" فقط // ملاحظة: تم افتراض أن الـ API تدعم فلتر ?status=paid

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/myCourses?status=paid`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();

        if (!json.status) {
          throw new Error("An error occurred while loading the courses.");
        }

        console.log("Course ID (from URL):", courseId);
        console.log("API Response (JSON):", json.data[0].id);
        console.log("API Response (JSON):", json.data); // 2. ✅ التصحيح: البحث عن الكورس المطابق للـ ID داخل كائن course الفرعي
        const foundSubscription = json.data[0]
          ? json.data.find((c) => c.id == courseId)
          : null;

        console.log("Found Subscription Object:", foundSubscription);

        if (!foundSubscription) {
          throw new Error(
            "❌ This course was not found or access is denied. Please ensure the payment is approved."
          );
        }

        const foundCourseData = foundSubscription;

        setCourse(foundCourseData);
        setLessons(foundCourseData.lessons || []);
      } catch (err) {
        setError(err.message || "An error occurred while loading data.");
      } finally {
        setLoading(false);
      }
    }

    if (courseId) fetchMyCourses();
  }, [courseId, token]);

  // ... (بقية الكود handleLessonClick و JSX كما هو)
  // 🟡 عند الضغط على الدرس
  async function handleLessonClick(lessonId) {
    const selected = lessons.find((l) => l.id === lessonId);
    if (!selected) return;

    try {
      setVideoLoading(true);
      setError(null);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/lesson-details/${lessonId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      const newSelectedLesson = {
        id: lessonId,
        content_type: selected.content_type,
        title: selected.title,
        url: null,
        text: null,
      };

      if (selected.content_type === "video") {
        if (!data.video_url)
          throw new Error("The video link could not be retrieved.");
        newSelectedLesson.url = data.video_url;
      } else if (selected.content_type === "file") {
        if (!data.file_url)
          throw new Error("The file link could not be retrieved.");
        newSelectedLesson.url = data.file_url;
      } else if (selected.content_type === "text") {
        if (!data.content_text)
          throw new Error("There is no text content to display.");
        newSelectedLesson.text = data.content_text;
      }

      setSelectedLesson(newSelectedLesson);
    } catch (err) {
      setError(err.message || "An error occurred while loading the content.");
    } finally {
      setVideoLoading(false);
    }
  }

  if (loading) return <Loading content={"⏳ Loading data..."} />;
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="font-['Poppins'] min-h-screen">
      {/* 🔹 تفاصيل الكورس */}
      {course && (
        <section className="flex items-center justify-center bg-black bg-opacity-20 py-16">
          <div className="flex flex-col md:flex-row w-[90vw] p-10 bg-white border-gray-300 rounded-xl border-2">
            <Image
              width={556}
              height={400}
              className="w-full md:w-[556px] h-[60vh] object-cover mb-6 md:mb-0 md:mr-6 rounded-xl"
              src={course.thumbnail}
              alt={course.title}
            />
            <div>
              <h1 className="text-[36px] font-semibold text-black">
                {course.title}
              </h1>
              <p className="max-w-[500px] text-[#7f7f7f] text-sm mt-4 leading-[21px]">
                {course.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 🔹 قائمة الدروس */}
      <section className="max-w-6xl mb-20 px-6 py-12 mx-auto">
        <h2 className="mb-6 text-2xl font-semibold text-primaryText">
          📚 Lessons
        </h2>
        {lessons.length === 0 ? (
          <p className="text-gray-500">There are no lessons yet</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                onClick={() => handleLessonClick(lesson.id)}
                className={`p-4 bg-white border rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer transition ${
                  selectedLesson?.id === lesson.id
                    ? "border-accent-Default bg-blue-50"
                    : ""
                }`}
              >
                <h3 className="text-lg text-accent-Default font-semibold">
                  {lesson.order_number}. {lesson.title}
                </h3>
                <p className="text-sm text-primaryText">
                  type {lesson.content_type}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 🔹 عرض محتوى الدرس */}
      {selectedLesson && (
        <section className="max-w-4xl mx-auto pb-20 px-6">
          <h3 className="text-xl text-accent-Default font-semibold mb-3 text-center">
            🧾 {selectedLesson.title}
          </h3>

          {videoLoading ? (
            <p className="text-center text-gray-500">Loading content...</p>
          ) : selectedLesson.content_type === "video" ? (
            <VideoPlayer videoUrl={selectedLesson.url} token={token} />
          ) : selectedLesson.content_type === "file" ? (
            <div className="text-center mt-6">
              <p className="mb-3 text-gray-700">📁 This lesson is a file</p>
              <a
                href={selectedLesson.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-gold text-primaryText px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Download/View file
              </a>
              {selectedLesson.url.endsWith(".pdf") && (
                <iframe
                  src={selectedLesson.url}
                  className="w-full h-[600px] mt-6 border rounded-lg"
                  title="file preview"
                ></iframe>
              )}
            </div>
          ) : selectedLesson.content_type === "text" ? (
            <div className="bg-white shadow p-6 rounded-lg mt-6 border">
              <p
                className="text-gray-800 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: selectedLesson.text }}
              ></p>
            </div>
          ) : null}
        </section>
      )}
    </div>
  );
};

export default Page;
