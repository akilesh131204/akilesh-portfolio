import { Download, ExternalLink, Eye, FileText } from "lucide-react";
import { profile } from "../data";
import { Section, Reveal } from "./ui";

const CONTENTS = [
  "Career objective",
  "Technical skills",
  "Internships",
  "Projects",
  "Certifications",
  "Education",
];

export default function Resume() {
  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="View or Download My Resume"
      subtitle="A one-page resume you can read right here or save as a PDF."
    >
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <Reveal>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <FileText size={22} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{profile.name}</h3>
            <p className="text-sm text-slate-600">{profile.role}</p>

            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {CONTENTS.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={profile.resume}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                <Download size={16} /> Download PDF
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-indigo-600 hover:text-indigo-600"
              >
                <ExternalLink size={16} /> Open in New Tab
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-600">
              <Eye size={14} /> Resume preview
            </div>
            <iframe
              src={`${profile.resume}#view=FitH`}
              title="Resume preview"
              className="h-[560px] w-full bg-slate-100 sm:h-[680px]"
            />
            <p className="border-t border-slate-200 px-4 py-2.5 text-xs text-slate-500">
              If the preview does not load on your device, use the Download or Open buttons.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
