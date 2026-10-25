import { ArrowRight, ArrowDown, Download, MapPin } from "lucide-react";
import { profile, projects, experience, certifications } from "../data";
import { useTyping, useCountUp } from "../hooks/useAnimations";
import { GithubIcon, LinkedinIcon } from "./Icons";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Stat({ value, label }) {
  const n = useCountUp(value, true);
  return (
    <div>
      <p className="text-3xl font-extrabold text-white">{n}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>
    </div>
  );
}

function CodeCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 blur-2xl" />
      <div className="float-slow relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 font-mono text-xs text-slate-400">akilesh.js</span>
        </div>
        <div className="space-y-0.5 overflow-x-auto p-5 font-mono text-[13px] leading-6 text-slate-300">
          <div>
            <span className="text-fuchsia-400">const</span>{" "}
            <span className="text-sky-300">developer</span> = {"{"}
          </div>
          <div className="pl-5">
            role: <span className="text-emerald-300">&quot;Full Stack Developer&quot;</span>,
          </div>
          <div className="pl-5">
            stack: [<span className="text-emerald-300">&quot;MongoDB&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;Express&quot;</span>,
          </div>
          <div className="pl-12">
            <span className="text-emerald-300">&quot;React&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;Node.js&quot;</span>],
          </div>
          <div className="pl-5">
            also: [<span className="text-emerald-300">&quot;Python&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;AI/ML&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;IoT&quot;</span>],
          </div>
          <div className="pl-5">
            location: <span className="text-emerald-300">&quot;{profile.location}&quot;</span>,
          </div>
          <div className="pl-5">
            openToWork: <span className="text-amber-300">true</span>,
          </div>
          <div>{"};"}</div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const typed = useTyping(profile.roles);
  const roleText = reduceMotion ? profile.roles[0] : typed;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 pb-24 pt-32 text-white sm:pt-36"
    >
      {/* decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-200 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to Associate Software Engineer roles
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </h1>

          <p className="mt-4 h-9 text-xl font-semibold text-slate-200 sm:text-2xl">
            <span>{roleText}</span>
            <span className="cursor-blink ml-0.5 text-indigo-400">|</span>
          </p>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
            {profile.tagline}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={15} /> {profile.location}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-indigo-50"
            >
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-lg border border-white/20 bg-white/5 p-3 text-white transition hover:bg-white/10"
            >
              <GithubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg border border-white/20 bg-white/5 p-3 text-white transition hover:bg-white/10"
            >
              <LinkedinIcon />
            </a>
          </div>

          <div className="mt-12 flex gap-10 border-t border-white/10 pt-6">
            <Stat value={projects.length} label="Projects" />
            <Stat value={experience.length} label="Internships" />
            <Stat value={certifications.length} label="Certifications" />
          </div>
        </div>

        <CodeCard />
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-slate-400 transition hover:text-white sm:block"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  );
}
