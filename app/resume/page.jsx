"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fadeIn } from "@/variants";
import { education, experience, skills } from "../data";

const Resume = () => {
  const [settings, setSettings] = useState({
    phone: "",
    whatsapp: "",
    email: "",
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/site-setting`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch settings");

        const data = await res.json();
        const s = data?.data || {};
        setSettings({
          name: s.site_name || "",
          phone: s.phone || "",
          whatsapp: s.whatsapp || "",
          email: s.email || "",
        });
      } catch (error) {
        console.error("❌ Error fetching settings:", error);
      }
    }

    fetchSettings();
  }, []);

  const about = {
    title: "About me",
    description:
      "I'm a full stack developer with a passion for building scalable and efficient applications.",
    info: [
      { fieldName: "Name", fieldValue: settings.name || "_" },
      { fieldName: "Phone", fieldValue: settings.phone || "—" },
      { fieldName: "Experience", fieldValue: "16+ Years" },
      { fieldName: "WhatsApp", fieldValue: settings.phone || "—" },
      { fieldName: "Nationality", fieldValue: "Syrian" },
      { fieldName: "Email", fieldValue: settings.email || "—" },
      { fieldName: "Freelance", fieldValue: "Available" },
      { fieldName: "Languages", fieldValue: "Arabic , English" },
    ],
  };

  return (
    <div className="min-h-[110vh] flex items-center justify-center py-12 xl:py-10">
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          {/* LEFT SIDE */}
          <motion.div
            className="w-full max-w-[380px] xl:mx-0"
            variants={fadeIn("right", 0.2)}
            initial="show"
            animate="show"
          >
            <TabsList className="flex flex-col gap-6 mx-auto xl:flex-col">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="about">About me</TabsTrigger>
            </TabsList>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="show"
            animate="show"
            className="min-h-[70vh] w-full"
          >
            {/* EXPERIENCE */}
            <TabsContent value="experience">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold text-primaryText">
                  {experience.title}
                </h3>
                <p className="max-w-[600px] text-primaryText/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <motion.ul
                    variants={fadeIn("left", 0.3)}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 lg:grid-col-2 gap-[30px]"
                  >
                    {experience.items.map((item, index) => (
                      <li
                        key={index}
                        className="bg-white h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-accent-Default">{item.duration}</span>
                        <h3 className="text-xl max-w-[260px] text-primaryText text-center lg:text-left">
                          {item.position}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent-Default"></span>
                          <p className="text-primaryText/60">{item.company}</p>
                        </div>
                      </li>
                    ))}
                  </motion.ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* EDUCATION */}
            <TabsContent value="education">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold text-primaryText">
                  {education.title}
                </h3>
                <p className="max-w-[600px] text-primaryText/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-col-2 gap-[30px]">
                    {education.items.map((item, index) => (
                      <li
                        key={index}
                        className="bg-white h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-accent-Default">{item.duration}</span>
                        <h3 className="text-xl max-w-[260px] text-primaryText text-center lg:text-left">
                          {item.degree}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent-Default"></span>
                          <p className="text-primaryText/60">{item.institution}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* SKILLS */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold text-primaryText">
                    {skills.title}
                  </h3>
                  <p className="max-w-[600px] text-primaryText/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-2 sm:grid-cols-3 xl:gap-[30px] gap-4">
                    {skills.skilList.map((item, index) => (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full relative h-[150px] bg-white rounded-xl flex justify-center items-center group">
                              <div className="text-6xl text-primaryText z-10 rounded-[10px]">
                                {item.icon}
                              </div>
                              <div className="w-full h-full transition-all rounded-[10px] ease-in-out absolute top-0 left-0 duration-500 group-hover:bg-accent-gold"></div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize text-primaryText">{item.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* ABOUT */}
            <TabsContent value="about" className="w-full text-center xl:text-left">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold text-primaryText">{about.title}</h3>
                <p className="max-w-[600px] text-primaryText/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid mx-auto xl:mx-0 grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[628px]">
                  {about.info.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center gap-4 xl:justify-start"
                    >
                      <span className="text-primaryText font-medium">
                        {item.fieldName}:
                      </span>
                      <span className="text-xl text-primaryText/50">
                        {item.fieldValue}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default Resume;
