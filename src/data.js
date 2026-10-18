export const profile = {
  name: "Akilesh M",
  role: "Full Stack Developer (MERN)",
  location: "Coimbatore, Tamil Nadu",
  email: "akilesh.131204@gmail.com",
  github: "https://github.com/akilesh131204",
  linkedin: "https://linkedin.com/in/akilesh-madanagopal",
  resume: "/Akilesh_M_Resume.pdf",
  formEndpoint: "https://formspree.io/f/mwlvarrz",
  tagline:
    "I build end-to-end web applications with React, Node.js, Express and MongoDB, and I enjoy projects that connect software with AI and IoT.",
  about: [
    "I am a Computer Science and Engineering graduate (B.E., 2026) from Sri Ramakrishna Engineering College, Coimbatore, focused on full-stack development with the MERN stack.",
    "My flagship project, Eventify, is a deployed event management platform with role-based access, online payments, image uploads and email notifications. I have also built an AI-based interview proctoring system and an IoT gas safety monitor.",
    "I am looking for an Associate Software Engineer role where I can build reliable, user-friendly products.",
  ],
};

export const skills = [
  { group: "Languages", items: ["JavaScript", "Python", "C", "SQL"] },
  { group: "MERN Stack", items: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"] },
  { group: "Web", items: ["HTML", "CSS", "Bootstrap", "Tailwind CSS", "UI/UX Design"] },
  { group: "Tools & Platforms", items: ["Git", "GitHub", "Figma", "Jira", "Excel", "Jupyter Notebook", "Netlify", "Render"] },
  { group: "AI & IoT", items: ["PyTorch", "OpenCV", "YOLOv8", "Whisper", "Flask", "Socket.IO", "Arduino", "Blynk IoT"] },
];

export const projects = [
  {
    id: "eventify",
    title: "Eventify",
    subtitle: "Online Event Management Platform",
    year: "2026",
    image: "/images/eventify.jpg",
    featured: true,
    summary:
      "A full-stack MERN platform where organizers publish events, attendees book and pay online, and admins manage the whole system.",
    highlights: [
      "Role-based access control for admin, organizer and attendee users, built on REST APIs.",
      "Razorpay payment integration for ticket booking.",
      "Cloudinary image uploads for event media.",
      "Brevo email notifications, a forgot-password flow and a support ticket system.",
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Razorpay", "Cloudinary", "Brevo"],
    links: [
      { label: "Live Demo", url: "https://akilesh-eventify.netlify.app", type: "live" },
      // Replace with the exact Eventify repository URL
      { label: "GitHub", url: "https://github.com/akilesh131204", type: "code" },
    ],
  },
  {
    id: "interview-detection",
    title: "AI-Assisted Cheating Detection",
    subtitle: "Detection System for Virtual Interviews",
    year: "2026",
    image: "/images/interview.jpg",
    summary:
      "A multimodal proctoring system that watches video and audio during online interviews and flags suspicious behaviour to the interviewer in real time.",
    highlights: [
      "Face and gaze detection with YOLOv8 (96% true-positive rate).",
      "AI-generated voice detection with a CNN (97.2%).",
      "React interviewer dashboard with live risk meters and fraud alerts over Socket.IO.",
    ],
    tech: ["Python", "Flask", "Socket.IO", "React.js", "OpenCV", "YOLOv8", "PyTorch", "Whisper", "SQLite"],
    links: [
      // Replace with the exact repository URL, or delete this line if the repo is private
      { label: "GitHub", url: "https://github.com/akilesh131204", type: "code" },
    ],
  },
  {
    id: "gas-leakage",
    title: "Capacity Level & Leakage Detection",
    subtitle: "Automatic IoT Gas Safety Monitor",
    year: "2024",
    image: "/images/gas.jpg",
    summary:
      "An IoT device that tracks how much LPG is left in a cylinder and warns the user about leaks, both on the device and on their phone.",
    highlights: [
      "MQ-5 gas sensor detects LPG leaks; a load cell tracks cylinder weight.",
      "Alerts sent to a mobile app through Blynk, with local LCD and LED warnings.",
      "A low-gas threshold warns the user before the cylinder runs empty.",
    ],
    tech: ["Arduino UNO", "ESP8266", "MQ-5 Sensor", "Load Cell", "LCD", "Blynk IoT"],
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
    issuer: "HCL GUVI · June 2026",
    file: "/certificates/guvi-fullstack.jpg",
    verifyUrl: "https://v2.zenclass.in/certificateDownload/djroZTLyjnBeN3ar?download=true",
  },
  {
    title: "Introduction to MongoDB (For Students)",
    issuer: "MongoDB · March 2025",
    file: "/certificates/mongodb-intro.jpg",
    verifyUrl: "",
  },
  {
    title: "Oracle APEX Cloud Developer Certified Professional",
    issuer: "Oracle University · May 2025",
    file: "/certificates/oracle-apex.jpg",
    verifyUrl: "",
  },
  {
    title: "Generative AI with Diffusion Models",
    issuer: "NVIDIA · September 2025",
    file: "/certificates/nvidia-diffusion.jpg",
    verifyUrl: "",
  },
];