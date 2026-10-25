import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { profile, navLinks as NAV } from "../data";
import { GithubIcon, LinkedinIcon } from "./Icons";

const YEAR = new Date().getFullYear();

export function BackToTop() {
  const [show, setShow] = useState(
    () => typeof window !== "undefined" && window.scrollY > 600
  );

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#home"
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={20} />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-white">{profile.name}</p>
            <p className="text-sm">{profile.role}</p>
          </div>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {NAV.map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}`} className="transition hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-lg border border-white/10 p-2.5 transition hover:bg-white/10 hover:text-white"
            >
              <GithubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg border border-white/10 p-2.5 transition hover:bg-white/10 hover:text-white"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs">
          © {YEAR} {profile.name}. Built with React and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
