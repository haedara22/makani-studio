"use client";

import { useEffect, useState } from "react";

export default function WelcomeVideo() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const hasSeenVideo = localStorage.getItem("welcomeVideoShown");
    if (!hasSeenVideo) {
      setShowVideo(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("welcomeVideoShown", "true");
    setShowVideo(false);
  };

  if (!showVideo) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-3xl">
        <video
          src="/asset/Default.mp4"
          autoPlay
          controls
          className="rounded-2xl shadow-lg w-full"
          onEnded={handleClose}
        />
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-white/70 hover:bg-white text-black px-3 py-1 rounded-lg"
        >
          تخطي
        </button>
      </div>
    </div>
  );
}
