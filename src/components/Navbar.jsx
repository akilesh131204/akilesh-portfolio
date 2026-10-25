import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile, navLinks as NAV } from "../data";
import { useActiveSection, useScrolled } from "../hooks/useAnimations";

const SECTION_IDS = ["home", ...NAV.map(([, id]) => id)];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(20);
  const active = useActiveSection(SECTION_IDS);
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white">
            AM
          </span>
          <span className={`font-bold ${solid ? "text-slate-900" : "text-white"}`}>
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV.map(([label, id]) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative text-sm font-medium transition ${
                    solid
                      ? isActive
                        ? "text-indigo-600"
                        : "text-slate-600 hover:text-indigo-600"
                      : isActive
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded bg-indigo-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 lg:inline-block"
        >
          Hire Me
        </a>

        <button
          className={`rounded-md p-2 lg:hidden ${solid ? "text-slate-800" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-slate-200 bg-white px-5 py-3 lg:hidden">
          {NAV.map(([label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={`block py-2.5 text-sm font-medium ${
                  active === id ? "text-indigo-600" : "text-slate-700"
                }`}
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
