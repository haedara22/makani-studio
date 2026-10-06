import Image from "next/image";
import { FaIdBadge } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
export const navLinks = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "advertisements",
    href: "/advertisements",
  },
  {
    name: "resume",
    href: "/resume",
  },
  {
    name: "courses",
    href: "/courses",
  },
  {
    name: "contact",
    href: "/contact",
  },
  {
    name: "articles",
    href: "/articles",
  },
];
export const stats = [
  {
    num: 16,
    text: "Years of Experience",
  },
  {
    num: 30,
    text: "Projects Completed",
  },
  {
    num: 10,
    text: "Technologies mastered",
  },
  {
    num: 41,
    text: "The age",
  },
];
export const about = {
  title: "Aboute me",
  description:
    "I'm a full stack developer with a passion for building scalable and efficient applications.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Mais Mustafa Kejani",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+963) 937 944 041",
    },
    {
      fieldName: "Experience",
      fieldValue: "16+ Years",
    },
    {
      fieldName: "WhatsApp",
      fieldValue: "(+963) 937 944 041",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Syrian",
    },
    {
      fieldName: "Email",
      fieldValue: "maiskejani2222@gmail.com",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Languages",
      fieldValue: "Arabic , English",
    },
  ],
};
export const experience = {
  icon: <FaIdBadge />,
  title: "My experience",
  description:
    "I am an Architectural Engineer with extensive experience in both design and construction fields.",
  items: [
    {
      company: "Tartous University ",
      position: "Teacher",
      duration: "10 Years",
    },
    {
      company: "Porto Tartous ",
      position: "Architecture ",
      duration: "2 Years",
    },
    {
      company: "Abc Company ",
      position: "Architecture ",
      duration: "2 Year",
    },
    {
      company: "Shop Drawing Designer ",
      position: "Architecture ",
      duration: "16 Years",
    },
    {
      company: "Building Contractor ",
      position: "contractor ",
      duration: "6 Years",
    },
  ],
};
export const education = {
  icon: <FaGraduationCap />,
  title: "My education",
  description:
    "I have a Bachelor's degree in Computer Science from the University of Latakia.",
  items: [
    {
      institution: "University of Latakia",
      degree: "Architectural Engineering Certificate",
      duration: "2009",
    },
  ],
};
export const skills = {
  title: "My skills",
  description:
    "AutoCAD (2D & 3D drafting and detailing) Revit (BIM modeling and documentation) 3ds Max with V-Ray (3D visualization and rendering) Photoshop (post-production and presentation) SketchUp (conceptual modeling) Lumion / Enscape (real-time rendering and animations)",
  skilList: [
    {
      icon: (
        <Image
          src="/asset/AutoCad-removebg-preview.png"
          alt=""
          width={100}
          height={50}
        />
      ),
      name: "AutoCAD",
    },
    {
      icon: (
        <Image
          src="/asset/Revit-removebg-preview.png"
          alt=""
          width={100}
          height={50}
        />
      ),
      name: "Revit",
    },
    {
      icon: (
        <Image
          src="/asset/lumion-removebg-preview.png"
          alt=""
          width={100}
          height={50}
        />
      ),
      name: "Lumion",
    },
    {
      icon: (
        <Image
          src="/asset/3DMax-removebg-preview.png"
          alt=""
          width={100}
          height={50}
        />
      ),
      name: "3ds Max",
    },
    {
      icon: (
        <Image
          src="/asset/vray-removebg-preview (1).png"
          alt=""
          width={100}
          height={50}
        />
      ),
      name: "V-Ray",
    },
    {
      icon: (
        <Image
          src="/asset/freedrawing-removebg-preview.png"
          alt=""
          width={100}
          height={50}
        />
      ),
      name: "Free drawing",
    },
  ],
};