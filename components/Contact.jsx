"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [settings, setSettings] = useState({
    phone: "(+963) 937-944-041",
    email: "maiskejani2222@gmail.com",
    address:
      "Tartous - Al-Thawra Street - Opposite Cleopatra Hotel - Next to Al-Diyafa Metal Works - Beside Al-Anwar Kindergarten",
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
  const [status, setStatus] = useState({ type: "", text: "" });

  /* ---------- Fetch Settings ---------- */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
        const res = await fetch(`${base}/api/site-setting`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch site settings");

        const data = await res.json();
        setSettings((prev) => ({
          phone: data?.data?.phone || prev.phone,
          email: data?.data?.email || prev.email,
          address: data?.data?.address || prev.address,
        }));
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- Submit Message ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });

    try {
      const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
      const form = new FormData();
      form.append("name", `${formData.firstname} ${formData.lastname}`.trim());
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("msg", `${formData.service} - ${formData.message}`);

      const response = await fetch(`${base}/api/contact/send-message`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });

      const result = await response.json();
      if (response.ok && result.status) {
        setStatus({ type: "success", text: "Your message has been sent successfully!" });
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setStatus({ type: "error", text: "Failed to send. Please try again." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", text: "An error occurred while sending." });
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icon: <FaPhoneAlt />, title: "Phone", description: settings.phone },
    { icon: <FaEnvelope />, title: "Email", description: settings.email },
    { icon: <FaMapMarkerAlt />, title: "Address", description: settings.address },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ---------- Heading ---------- */}
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-primaryText font-black text-3xl sm:text-4xl md:text-5xl mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-primaryText/60 text-base md:text-lg max-w-2xl mx-auto">
            We're here to answer your questions. Feel free to reach out.
          </p>
          <div className="w-24 h-1 bg-accent-gold rounded-full mx-auto mt-6" />
        </motion.div>

        {/* ---------- Grid ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ============ Info + Map ============ */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-lg ring-1 ring-black/5 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-primaryText mb-6">
                Contact Information
              </h3>

              <ul className="flex flex-col gap-6">
                {info.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="shrink-0 w-12 h-12 md:w-14 md:h-14
                                    flex items-center justify-center
                                    rounded-xl bg-accent-gold text-white
                                    text-lg md:text-xl
                                    shadow-md
                                    transition-transform duration-300
                                    group-hover:scale-110 group-hover:rotate-3">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primaryText/60 uppercase tracking-wide mb-1">
                        {item.title}
                      </p>
                      <p className="text-primaryText font-medium text-sm md:text-base break-words leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden">
              <iframe
                width="100%"
                height="300"
                className="w-full block"
                title="map"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6667.462!2d34.781533!3d25.887025!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15217e76b01567ef%3A0xfefb26c1df11c668!2s!5e0!3m2!1sar!2s!4v1722345678901!5m2!1sar!2s"
              />
            </div>
          </motion.div>

          {/* ============ Form ============ */}
          <motion.form
            onSubmit={handleSubmit}
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="lg:col-span-7 bg-white rounded-2xl shadow-lg ring-1 ring-black/5 p-6 md:p-10 flex flex-col gap-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primaryText mb-2">
                Send Us a Message
              </h3>
              <p className="text-primaryText/60 text-sm md:text-base">
                We'll get back to you as soon as possible.
              </p>
            </div>

            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstname" className="text-sm font-semibold text-primaryText">
                  First Name
                </label>
                <Input
                  id="firstname"
                  name="firstname"
                  type="text"
                  className="h-11 text-primaryText placeholder:text-primaryText/40 focus-visible:ring-2 focus-visible:ring-accent-gold"
                  placeholder="Enter your first name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lastname" className="text-sm font-semibold text-primaryText">
                  Last Name
                </label>
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="h-11 text-primaryText placeholder:text-primaryText/40 focus-visible:ring-2 focus-visible:ring-accent-gold"
                  placeholder="Enter your last name"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-primaryText">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="h-11 text-primaryText placeholder:text-primaryText/40 focus-visible:ring-2 focus-visible:ring-accent-gold"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-semibold text-primaryText">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="h-11 text-primaryText placeholder:text-primaryText/40 focus-visible:ring-2 focus-visible:ring-accent-gold"
                  placeholder="+963 9XX XXX XXX"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-primaryText">
                Your Message
              </label>
              <Textarea
                id="message"
                name="message"
                className="min-h-[160px] text-primaryText placeholder:text-primaryText/40 focus-visible:ring-2 focus-visible:ring-accent-gold resize-none"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto md:self-start
                         px-8 h-12
                         bg-accent-Default hover:bg-accent-hover
                         text-white font-semibold
                         rounded-xl shadow-md
                         transition-all duration-300
                         hover:shadow-lg hover:scale-[1.02]
                         active:scale-95
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>

            {/* Status Message */}
            {status.text && (
              <div
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium
                  ${status.type === "success"
                    ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                    : "bg-red-50 text-red-700 ring-1 ring-red-200"
                  }`}
              >
                <span className="text-lg">
                  {status.type === "success" ? "✓" : "✕"}
                </span>
                {status.text}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;