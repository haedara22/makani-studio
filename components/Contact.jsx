"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  // ✅ حالة لتخزين إعدادات الموقع القادمة من لوحة التحكم
  const [settings, setSettings] = useState({
    phone: "(+963) 937-944-041",
    email: "maiskejani2222@gmail.com",
    address:
      "طرطوس - شارع الثورة - مقابل فندق كليوباترا - دخلة صاج الضيافة - جانب روضة الانوار",
  });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // ✅ اجلب الإعدادات من API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/site-setting`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch site settings");

        const data = await res.json();

        // تأكد من وجود بيانات الهاتف والإيميل والعنوان
        setSettings({
          phone: data?.data?.phone || settings.phone,
          email: data?.data?.email || settings.email,
          address: data?.data?.address || settings.address,
        });
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };

    fetchSettings();
  }, []); // 👈 يستدعي مرة واحدة عند تحميل الصفحة

  // 📨 معالجة الإدخال في النموذج
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 📨 إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const form = new FormData();
      form.append("name", `${formData.firstname} ${formData.lastname}`);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("msg", `${formData.service} - ${formData.message}`);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/contact/send-message`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: form,
        }
      );

      const result = await response.json();
      if (response.ok && result.status) {
        setStatus("✅ Message sent successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setStatus("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ An error occurred while sending the message.");
    } finally {
      setLoading(false);
    }
  };

  // 🧭 قائمة المعلومات تُحدَّث ديناميكياً من settings
  const info = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      description: settings.phone,
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: settings.email,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      description: settings.address,
    },
  ];

  return (
    <section className="relative py-10 md:py-20 text-gray-600 body-font">
      <motion.h1
        variants={fadeIn("left", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="text-primaryText font-black text-center text-[32px] mb-12"
      >
        Contact Us
      </motion.h1>

      <div className="container flex flex-col xl:flex-row gap-10 mx-auto px-6">
        {/* 🗺️ Map & Info */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="relative flex flex-col items-center justify-start bg-white rounded-xl shadow-md lg:w-1/2 overflow-hidden"
        >
          <iframe
            width="100%"
            height="350"
            className="w-full"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6667.462!2d34.781533!3d25.887025!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15217e76b01567ef%3A0xfefb26c1df11c668!2s!5e0!3m2!1sar!2s!4v1722345678901!5m2!1sar!2s"
          />
          <ul className="flex flex-col gap-8 p-8 w-full">
            {info.map((item, i) => (
              <li key={i} className="flex items-center gap-5">
                <div className="w-[52px] h-[52px] bg-accent-hover text-accent-Default rounded-md flex items-center justify-center">
                  <div className="text-[24px]">{item.icon}</div>
                </div>
                <div>
                  <p className="text-primaryText font-semibold">{item.title}</p>
                  <h3 className="text-primaryText/70">{item.description}</h3>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 📨 Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col gap-6 p-8 bg-white rounded-xl shadow-md lg:w-1/2"
        >
          <h3 className="text-3xl text-accent-Default font-bold mb-2">
            Let's Work Together
          </h3>
          <p className="text-primaryText/70 mb-4">
            We would love to hear your feedback or questions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="firstname"
              type="text"
              className="text-primaryText placeholder:text-primaryText"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <Input
              name="lastname"
              type="text"
              className="text-primaryText placeholder:text-primaryText"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              className="text-primaryText placeholder:text-primaryText"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              type="text"
              className="text-primaryText placeholder:text-primaryText"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <Textarea
            name="message"
            className="h-[200px] border-none outline-none placeholder:text-primaryText text-primaryText"
            placeholder="Type your message here..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            className="max-w-40 bg-accent-Default hover:bg-accent-hover text-black hover:text-white"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>

          {status && (
            <p
              className={`mt-2 text-sm ${
                status.startsWith("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {status}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
