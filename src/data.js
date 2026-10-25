/* ==========================================================================
   All portfolio content lives in this file.
   Links left as "" are hidden on the live site. While you run the site
   locally (npm run dev), required-but-empty links show an amber reminder.
   ========================================================================== */

export const profile = {
  name: "Akilesh M",
  role: "Full Stack Developer (MERN)",
  roles: [
    "Full Stack Developer (MERN)",
    "React & Node.js Developer",
    "AI & IoT Project Builder",
  ],
  location: "Coimbatore, Tamil Nadu",
  email: "akilesh.131204@gmail.com",
  github: "https://github.com/akilesh131204",
  linkedin: "https://linkedin.com/in/akilesh-madanagopal",
  resume: "/Akilesh_M_Resume.pdf",
  photo: "/images/profile.jpg",
  formEndpoint: "https://formspree.io/f/mwlvarrz",
  tagline:
    "I build end-to-end web applications with React, Node.js, Express and MongoDB, and I enjoy projects that connect software with AI and IoT.",
  about: [
    "I am a Computer Science and Engineering graduate (B.E., 2026) from Sri Ramakrishna Engineering College, Coimbatore, focused on full-stack development with the MERN stack.",
    "My flagship project, Eventify, is a deployed event management platform with role-based access, online payments, image uploads and email notifications. I have also built an AI-based interview proctoring system and an IoT gas safety monitor.",
    "I am looking for an Associate Software Engineer role where I can build reliable, user-friendly products.",
  ],
};

/* ---------- navigation (label, section id) ---------- */
export const navLinks = [
  ["About", "about"],
  ["Resume", "resume"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Certifications", "certifications"],
  ["Contact", "contact"],
];

/* ---------- skills ---------- */
/* icon must be one of: code, layers, globe, wrench, cpu */
export const skills = [
  { group: "Languages", icon: "code", items: ["JavaScript", "Python", "C", "SQL"] },
  { group: "MERN Stack", icon: "layers", items: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"] },
  { group: "Web", icon: "globe", items: ["HTML", "CSS", "Bootstrap", "Tailwind CSS", "UI/UX Design"] },
  { group: "Tools & Platforms", icon: "wrench", items: ["Git", "GitHub", "Figma", "Jira", "Excel", "Jupyter Notebook", "Netlify", "Render"] },
  { group: "AI & IoT", icon: "cpu", items: ["PyTorch", "OpenCV", "YOLOv8", "Whisper", "Flask", "Socket.IO", "Arduino", "Blynk IoT"] },
];

/* icon must be one of: puzzle, users, message, rocket, clock */
export const softSkills = [
  {
    title: "Problem Solving",
    icon: "puzzle",
    text: "Worked through four rounds of evaluator feedback on Eventify, fixing access control, payment and email flows.",
  },
  {
    title: "Teamwork",
    icon: "users",
    text: "Built engineering projects such as the gas leakage monitor in a three-member team.",
  },
  {
    title: "Communication",
    icon: "message",
    text: "Wrote technical project reports and submitted a project paper to an IEEE conference.",
  },
  {
    title: "Quick Learning",
    icon: "rocket",
    text: "Moved between MERN, AI/ML and embedded IoT projects, picking up new tools for each.",
  },
  {
    title: "Time Management",
    icon: "clock",
    text: "Balanced coursework, internships and project milestones through to final-year submission.",
  },
];

/* ---------- projects ---------- */
/* category: "mern" or "ai-iot". links type: "live", "code" or "api". */
export const projects = [
  {
    id: "eventify",
    title: "Eventify",
    subtitle: "Online Event Management Platform",
    badge: "MERN Stack · Capstone Project",
    category: "mern",
    featured: true,
    year: "2026",
    image: "/images/eventify.jpg",
    summary:
      "A full-stack MERN platform where organizers publish events, attendees book and pay online, and admins manage the whole system. The frontend is deployed on Netlify and the backend API on Render.",
    highlights: [
      "Role-based access control for admin, organizer and attendee users, built on REST APIs.",
      "Razorpay payment integration for ticket booking.",
      "Cloudinary image uploads for event media.",
      "Brevo email notifications, a forgot-password flow and a support ticket system.",
    ],
    stack: [
      { label: "Frontend", items: ["React.js"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
      { label: "Database", items: ["MongoDB"] },
      { label: "Services", items: ["Razorpay", "Cloudinary", "Brevo"] },
    ],
    links: [
      { label: "Live Demo", url: "https://akilesh-eventify.netlify.app", type: "live" },
      // ADD: the exact GitHub URL of the Eventify FRONTEND repository
      { label: "Frontend Code", url: "https://github.com/akilesh131204/eventify-mern", type: "code", required: true },
      // ADD: the exact GitHub URL of the Eventify BACKEND repository
      { label: "Backend Code", url: "https://github.com/akilesh131204/eventify-mern", type: "code", required: true },
      
    ],
  },
  {
    id: "interview-detection",
    title: "AI-Assisted Cheating Detection",
    subtitle: "Detection System for Virtual Interviews",
    badge: "Python · AI/ML · React",
    category: "ai-iot",
    year: "2026",
    image: "/images/interview.jpg",
    summary:
      "A multimodal proctoring system that watches video and audio during online interviews and flags suspicious behaviour to the interviewer in real time.",
    highlights: [
      "Face and gaze detection with YOLOv8 (96% true-positive rate).",
      "AI-generated voice detection with a CNN (97.2%).",
      "React interviewer dashboard with live risk meters and fraud alerts over Socket.IO.",
    ],
    stack: [
      { label: "Frontend", items: ["React.js"] },
      { label: "Backend", items: ["Python", "Flask", "Socket.IO", "SQLite"] },
      { label: "AI / ML", items: ["OpenCV", "YOLOv8", "PyTorch", "Whisper"] },
    ],
    links: [
      // ADD: the exact GitHub URL of this project's repository
      { label: "GitHub", url: "https://github.com/akilesh131204/AI-Cheating-Detection-System", type: "code", required: true },
    ],
  },
  {
    id: "gas-leakage",
    title: "Capacity Level & Leakage Detection",
    subtitle: "Automatic IoT Gas Safety Monitor",
    badge: "IoT · Embedded",
    category: "ai-iot",
    year: "2024",
    image: "/images/gas.jpg",
    summary:
      "An IoT device that tracks how much LPG is left in a cylinder and warns the user about leaks, both on the device and on their phone.",
    highlights: [
      "MQ-5 gas sensor detects LPG leaks; a load cell tracks cylinder weight.",
      "Alerts sent to a mobile app through Blynk, with local LCD and LED warnings.",
      "A low-gas threshold warns the user before the cylinder runs empty.",
    ],
    stack: [
      { label: "Hardware", items: ["Arduino UNO", "ESP8266", "MQ-5 Sensor", "Load Cell", "LCD"] },
      { label: "Software", items: ["Blynk IoT"] },
    ],
    links: [],
  },
];

/*
  CERTIFICATE LINKS
  - certificate / file: image inside public/certificates (opens in the on-page viewer)
  - verifyUrl: the issuer's online verification link (optional, strongest proof)
  Set a value to "" if you do not have it; the link will not be shown.
*/
export const experience = [
  {
    role: "Full Stack Web Developer Intern",
    company: "QONO Technologies Pvt Ltd, Coimbatore",
    period: "5 – 20 June 2024",
    points: [
      "Worked across areas of web development with a focus on the MERN stack.",
      "Designed responsive, mobile-first web interfaces using HTML, CSS and Bootstrap.",
      "Maintained web application components and improved page-load consistency across browsers.",
    ],
    certificate: "/certificates/qono-internship.jpg",
    verifyUrl: "",
  },
  {
    role: "Data Analytics Intern",
    company: "Mindnotix Software Solutions, Coimbatore",
    period: "23 Dec 2024 – 4 Jan 2025",
    points: [
      "Cleaned and analyzed datasets using Python, SQL and Excel to extract business insights.",
      "Built data visualizations and summary reports to support data-driven decisions.",
    ],
    certificate: "/certificates/mindnotix-internship.jpg",
    verifyUrl: "",
  },
];

export const education = {
  school: "Sri Ramakrishna Engineering College",
  degree: "B.E. Computer Science and Engineering",
  place: "Coimbatore, Tamil Nadu",
  period: "2022 – 2026",
};

export const certifications = [
  {
    title: "Full Stack Development Course with AI Tools (IIT-M Pravartak Certified)",
    issuer: "HCL GUVI",
    date: "June 2026",
    file: "/certificates/guvi-fullstack.jpg",
    verifyUrl: "https://v2.zenclass.in/certificateDownload/djroZTLyjnBeN3ar?download=true",
  },
  {
    title: "Introduction to MongoDB (For Students)",
    issuer: "MongoDB",
    date: "March 2025",
    file: "/certificates/mongodb-intro.jpg",
    verifyUrl: "",
  },
  {
    title: "Oracle APEX Cloud Developer Certified Professional",
    issuer: "Oracle University",
    date: "May 2025",
    file: "/certificates/oracle-apex.jpg",
    verifyUrl: "",
  },
  {
    title: "Generative AI with Diffusion Models",
    issuer: "NVIDIA",
    date: "September 2025",
    file: "/certificates/nvidia-diffusion.jpg",
    verifyUrl: "",
  },
];
