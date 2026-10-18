import { useState, useEffect } from "react";
import {
  Mail, MapPin, ExternalLink, Download, Menu, X, ArrowRight,
  Briefcase, GraduationCap, Award, Send, Loader2, Check, FileText,
} from "lucide-react";
import {
  profile, skills, projects, experience, education, certifications,
} from "./data";

/* Set to true later, after adding public/images/profile.jpg */
const SHOW_PHOTO = false;

/* ---------- small helpers ---------- */
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-20">
    <div className="mx-auto max-w-6xl px-5">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>}
        <div className="mt-4 h-1 w-12 rounded-full bg-indigo-600" />
      </div>
      {children}
    </div>
  </section>
);

const Chip = ({ children }) => (
  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
    {children}
  </span>
);

/* ---------- certificate viewer (pop-up on the same page) ---------- */
function CertModal({ file, title, onClose }) {
  const [failed, setFailed] = useState(false);
  const isPdf = file.toLowerCase().endsWith(".pdf");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative max-h-full w-full max-w-4xl overflow-auto rounded-xl bg-white p-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
          <div className="flex shrink-0 items-center gap-2">
            {!failed && (
              <a
                href={file}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
              >
                <ExternalLink size={13} /> Open in new tab
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close certificate"
              className="rounded-md p-1.5 text-slate-600 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {failed ? (
          <div className="rounded-lg bg-red-50 p-6 text-sm text-red-700">
            <p className="font-semibold">Certificate file not found.</p>
            <p className="mt-1">
              The site looked for <code className="rounded bg-red-100 px-1">{file}</code> but
              could not load it. Check that the file exists in the public folder with exactly this name.
            </p>
          </div>
        ) : isPdf ? (
          <iframe src={file} title={title} className="h-[75vh] w-full rounded-lg" />
        ) : (
          <img
            src={file}
            alt={title}
            onError={() => setFailed(true)}
            className="mx-auto h-auto max-h-[78vh] w-auto max-w-full rounded-lg"
          />
        )}
      </div>
    </div>
  );
}

/* Clickable certificate links (viewer + optional online verification) */
function CertLinks({ file, verifyUrl, label = "View certificate", title = "Certificate" }) {
  const [open, setOpen] = useState(false);
  if (!file && !verifyUrl) return null;
  const linkClass =
    "inline-flex items-center gap-1.5 rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:border-indigo-600 hover:bg-indigo-100";
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {file && (
        <button type="button" onClick={() => setOpen(true)} className={linkClass}>
          <FileText size={14} /> {label}
        </button>
      )}
      {verifyUrl && (
        <a href={verifyUrl} target="_blank" rel="noreferrer" className={linkClass}>
          <ExternalLink size={14} /> Verify online
        </a>
      )}
      {open && <CertModal file={file} title={title} onClose={() => setOpen(false)} />}
    </div>
  );
}

/* ---------- navbar ---------- */
const NAV = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#home" className="text-lg font-bold text-slate-900">
          {profile.name}
        </a>
        <ul className="hidden gap-7 md:flex">
          {NAV.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="text-sm font-medium text-slate-600 transition hover:text-indigo-600">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="rounded-md p-2 text-slate-700 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <ul className="border-t border-slate-200 bg-white px-5 py-3 md:hidden">
          {NAV.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-slate-700"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

/* ---------- hero ---------- */
function ProfilePhoto() {
  const [failed, setFailed] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="order-first md:order-last">
      <div className="relative mx-auto h-44 w-44 sm:h-60 sm:w-60 md:h-72 md:w-72">
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-indigo-200" />
        {failed ? (
          <div className="relative flex h-full w-full items-center justify-center rounded-3xl bg-indigo-600 text-6xl font-extrabold text-white shadow-lg">
            {initials}
          </div>
        ) : (
          <img
            src={profile.photo}
            alt={`${profile.name} portrait`}
            onError={() => setFailed(true)}
            className="relative h-full w-full rounded-3xl object-cover object-top shadow-lg ring-4 ring-white"
          />
        )}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="bg-gradient-to-b from-indigo-50 to-slate-50 pt-20 pb-20">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 px-5 ${
          SHOW_PHOTO ? "md:grid-cols-[1fr_auto]" : ""
        }`}
      >
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
            <MapPin size={14} /> {profile.location}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Hi, I'm <span className="text-indigo-600">{profile.name}</span>
          </h1>
          <p className="mt-3 text-xl font-semibold text-slate-700 sm:text-2xl">{profile.role}</p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-indigo-600 hover:text-indigo-600"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-lg border border-slate-300 bg-white p-3 text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
            >
              <GithubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg border border-slate-300 bg-white p-3 text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>

        {SHOW_PHOTO && <ProfilePhoto />}
      </div>
    </section>
  );
}

/* ---------- about ---------- */
function About() {
  return (
    <Section id="about" title="About Me">
      <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-slate-700">
        {profile.about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}

/* ---------- skills ---------- */
function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="Technologies I use to build and ship projects.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div key={s.group} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              {s.group}
            </h3>
            <div className="flex flex-wrap gap-2">
              {s.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- projects ---------- */
/* Shows the WHOLE screenshot (no cropping) inside a fixed 16:10 frame. */
function ProjectImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="aspect-[16/10] w-full border-b border-slate-200 bg-white">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 to-slate-100 px-4 text-center text-sm font-medium text-indigo-700">
          {alt}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <ProjectImage src={p.image} alt={`${p.title} screenshot`} />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
          <span className="text-xs font-medium text-slate-500">{p.year}</span>
        </div>
        <p className="text-sm font-medium text-indigo-600">{p.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.summary}</p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {p.highlights.map((h, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>

        {p.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3 pt-1">
            {p.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className={
                  l.type === "live"
                    ? "inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    : "inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-indigo-600 hover:text-indigo-600"
                }
              >
                {l.type === "live" ? <ExternalLink size={15} /> : <GithubIcon size={15} />}
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Three projects that show full-stack, AI and embedded work."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </Section>
  );
}

/* ---------- experience ---------- */
function Experience() {
  return (
    <Section id="experience" title="Experience" subtitle="Internships, with certificates you can open and verify.">
      <div className="space-y-6 border-l-2 border-indigo-200 pl-6">
        {experience.map((e) => (
          <div key={e.role} className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="absolute -left-[34px] top-6 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
              <Briefcase size={13} />
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900">{e.role}</h3>
              <span className="text-sm text-slate-500">{e.period}</span>
            </div>
            <p className="text-sm font-medium text-indigo-600">{e.company}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {e.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
            <CertLinks
              file={e.certificate}
              verifyUrl={e.verifyUrl}
              label="View internship certificate"
              title={`${e.company} - internship certificate`}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- education & certifications ---------- */
function Education() {
  return (
    <Section id="education" title="Education & Certifications">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-indigo-600">
            <GraduationCap size={20} />
            <h3 className="font-semibold">Education</h3>
          </div>
          <p className="text-lg font-bold text-slate-900">{education.school}</p>
          <p className="text-sm text-slate-700">{education.degree}</p>
          <p className="mt-1 text-sm text-slate-500">
            {education.place} · {education.period}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-indigo-600">
            <Award size={20} />
            <h3 className="font-semibold">Certifications</h3>
          </div>
          <ul className="space-y-5">
            {certifications.map((c) => (
              <li key={c.title}>
                <p className="text-sm font-semibold text-slate-900">{c.title}</p>
                <p className="text-xs text-slate-500">{c.issuer}</p>
                <CertLinks file={c.file} verifyUrl={c.verifyUrl} title={c.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- contact ---------- */
const EMPTY_FORM = { name: "", email: "", subject: "", message: "", _gotcha: "" };

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100";

const Field = ({ id, label, hint, children }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-800">
      {label}
    </label>
    {children}
    {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
  </div>
);

const prettyUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "");

function ContactLink({ href, icon, label, detail, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-600"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-900">{label}</span>
        <span className="block truncate text-xs text-slate-500">{detail}</span>
      </span>
    </a>
  );
}

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const notConfigured = profile.formEndpoint.includes("YOUR_FORM_ID");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Honeypot: real visitors never see or fill this hidden field.
    if (form._gotcha) return;

    if (form.message.trim().length < 10) {
      setStatus("error");
      setError("Please write a message of at least 10 characters.");
      return;
    }

    if (notConfigured) {
      setStatus("error");
      setError(
        `The contact form is not connected yet. Please email me directly at ${profile.email}.`
      );
      return;
    }

    setStatus("sending");
    try {
      const name = form.name.trim();
      const subject = form.subject.trim();

      const res = await fetch(profile.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email: form.email.trim(), // the visitor's own address (used as reply-to)
          subject,
          message: form.message.trim(),
          _subject: `Portfolio message: ${subject || "New enquiry"} (from ${name})`,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
      setError(
        `Your message could not be sent. Please try again, or email me directly at ${profile.email}.`
      );
    }
  };

  const sending = status === "sending";

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Open to Associate Software Engineer roles. Fill in the form and your message will reach my inbox."
    >
      <div className="grid gap-8 lg:grid-cols-5">
        {/* contact details */}
        <div className="space-y-4 lg:col-span-2">
          <ContactLink
            href={`mailto:${profile.email}`}
            icon={<Mail size={18} />}
            label="Email"
            detail={profile.email}
          />
          <ContactLink
            href={profile.linkedin}
            icon={<LinkedinIcon />}
            label="LinkedIn"
            detail={prettyUrl(profile.linkedin)}
            external
          />
          <ContactLink
            href={profile.github}
            icon={<GithubIcon />}
            label="GitHub"
            detail={prettyUrl(profile.github)}
            external
          />
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <MapPin size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-900">Location</span>
              <span className="block text-xs text-slate-500">{profile.location}</span>
            </span>
          </div>
        </div>

        {/* form / success panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
          {status === "success" ? (
            <div className="flex flex-col items-center py-10 text-center" role="status">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Check size={28} />
              </span>
              <h3 className="text-xl font-bold text-slate-900">Message sent</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-600">
                Thank you for reaching out. I will reply to the email address you provided.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-indigo-600 hover:text-indigo-600"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Your name">
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="e.g. Priya Sharma"
                    autoComplete="name"
                    required
                    disabled={sending}
                    className={inputClass}
                  />
                </Field>
                <Field id="email" label="Your email" hint="I will reply to this address.">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    disabled={sending}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field id="subject" label="Subject">
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="e.g. Job opportunity at our company"
                  required
                  disabled={sending}
                  className={inputClass}
                />
              </Field>

              <Field id="message" label="Message">
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me a little about what you have in mind..."
                  required
                  disabled={sending}
                  className={inputClass}
                />
              </Field>

              {/* Honeypot field for spam bots (hidden from people) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_gotcha">Leave this field empty</label>
                <input
                  id="_gotcha"
                  name="_gotcha"
                  value={form._gotcha}
                  onChange={onChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {sending ? "Sending..." : "Send Message"}
              </button>

              <div aria-live="polite">
                {status === "error" && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ---------- app ---------- */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {profile.name}. Built with React and Tailwind CSS.
      </footer>
    </>
  );
}
