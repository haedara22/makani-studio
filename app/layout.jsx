import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import Footer from "@/components/Footer";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "ميس كيجاني | كورسات الهندسة المعمارية",
  description:
    "كورسات احترافية في الهندسة المعمارية والتصميم ثلاثي الأبعاد بإشراف الأستاذة ميس كيجاني.",
  keywords: ["الهندسة المعمارية", "كورسات معمارية", "ميس كيجاني", "Revit", "AutoCAD", "3ds Max"],
  openGraph: {
    title: "ميس كيجاني | كورسات الهندسة المعمارية",
    description: "كورسات احترافية في الهندسة المعمارية والتصميم ثلاثي الأبعاد.",
    images: ["/og-image.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={inter.variable}>
      <body className="antialiased">
        <Header />
        <StairTransition />
        <PageTransition>
          <AuthProvider>{children}</AuthProvider>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}