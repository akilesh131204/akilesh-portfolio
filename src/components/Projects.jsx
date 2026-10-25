import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { projects } from "../data";
import { Section, Reveal, Chip } from "./ui";
import { GithubIcon } from "./Icons";

const FILTERS = [
  ["all", "All Projects"],
  ["mern", "MERN Stack"],
  ["ai-iot", "AI & IoT"],
];

/* Shows the WHOLE screenshot (no cropping) inside the frame. */
function ProjectImage({ src, alt, fill }) {
  const [failed, setFailed] = useState(false);
  const frame = fill
    ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[340px]"
    : "aspect-[16/10]";
  return (
    <div className={`${frame} w-full border-b border-slate-200 bg-white lg:border-b-0`}>
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

function LinkButton({ link }) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition";
  if (link.type === "live") {
    return (
      <a href={link.url} target="_blank" rel="noreferrer" className={`${base} bg-indigo-600 text-white hover:bg-indigo-700`}>
        <ExternalLink size={15} /> {link.label}
      </a>
    );
  }
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={`${base} border border-slate-300 text-slate-800 hover:border-indigo-600 hover:text-indigo-600`}
    >
      {link.type === "code" ? <GithubIcon size={15} /> : <ExternalLink size={15} />}
      {link.label}
    </a>
  );
}

function ProjectCard({ p }) {
  const featured = Boolean(p.featured);
  const links = p.links.filter((l) => l.url);
  // Reminder chips are only shown while running locally (npm run dev).
  const missing = import.meta.env.DEV ? p.links.filter((l) => !l.url && l.required) : [];

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        featured ? "lg:col-span-2 lg:flex-row" : ""
      }`}
    >
      <div className={`relative ${featured ? "lg:w-1/2" : ""}`}>
        <ProjectImage src={p.image} alt={`${p.title} screenshot`} fill={featured} />
        <span className="absolute left-3 top-3 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {p.badge}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            {p.year}
          </span>
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

        <div className="mt-5 space-y-2.5">
          {p.stack.map((row) => (
            <div key={row.label} className="flex flex-wrap items-center gap-2">
              <span className="w-[4.5rem] shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {row.label}
              </span>
              {row.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          ))}
        </div>

        {(links.length > 0 || missing.length > 0) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {links.map((l) => (
              <LinkButton key={l.label} link={l} />
            ))}
            {missing.map((l) => (
              <span
                key={l.label}
                className="rounded-lg border border-dashed border-amber-400 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800"
              >
                Add the {l.label} link in src/data.js (this reminder shows only on your computer)
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <Section
      id="projects"
      eyebrow="My work"
      title="Projects"
      subtitle="A deployed MERN capstone project, plus AI and IoT projects built during my degree."
    >
      <Reveal>
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {FILTERS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === key
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-indigo-600 hover:text-indigo-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-2">
        {shown.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </Section>
  );
}
