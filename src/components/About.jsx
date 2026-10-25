import { useState } from "react";
import { MapPin, GraduationCap, Briefcase, Mail, Download, Send } from "lucide-react";
import { profile, education } from "../data";
import { Section, Reveal } from "./ui";

function Portrait() {
  const [failed, setFailed] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="relative mx-auto w-64 sm:w-72">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
      {failed ? (
        <div className="relative flex aspect-[4/5] w-full items-center justify-center rounded-3xl bg-indigo-600 text-6xl font-extrabold text-white shadow-xl ring-4 ring-white">
          {initials}
        </div>
      ) : (
        <img
          src={profile.photo}
          alt={`${profile.name} - profile photo`}
          onError={() => setFailed(true)}
          className="relative aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-xl ring-4 ring-white"
        />
      )}
      <div className="absolute -bottom-5 -left-4 rounded-xl bg-white px-4 py-2.5 shadow-lg ring-1 ring-slate-200">
        <p className="text-xs text-slate-500">B.E. Computer Science</p>
        <p className="text-sm font-semibold text-slate-900">Class of 2026</p>
      </div>
    </div>
  );
}

function Fact({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="break-words text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" eyebrow="Who I am" title="About Me" tone="slate">
      <div className="grid items-center gap-14 md:grid-cols-[auto_1fr]">
        <Reveal>
          <Portrait />
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-4 text-lg leading-relaxed text-slate-700">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Fact icon={<MapPin size={18} />} label="Location" value={profile.location} />
            <Fact
              icon={<GraduationCap size={18} />}
              label="Education"
              value={`${education.degree}, ${education.period}`}
            />
            <Fact icon={<Briefcase size={18} />} label="Focus" value={profile.role} />
            <Fact icon={<Mail size={18} />} label="Email" value={profile.email} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-indigo-600 hover:text-indigo-600"
            >
              <Send size={16} /> Get In Touch
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
