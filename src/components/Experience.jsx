import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { experience, education } from "../data";
import { Section, Reveal, CertLinks } from "./ui";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Where I have worked"
      title="Experience & Education"
      subtitle="Internships with certificates you can open and verify."
      tone="slate"
    >
      <div className="space-y-6 border-l-2 border-indigo-200 pl-6 sm:pl-8">
        {experience.map((e, i) => (
          <Reveal key={e.role} delay={i * 100}>
            <div className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg">
              <span className="absolute -left-[2.15rem] top-6 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white ring-4 ring-slate-50 sm:-left-[2.65rem]">
                <Briefcase size={14} />
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900">{e.role}</h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  <Calendar size={12} /> {e.period}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-indigo-600">{e.company}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {e.points.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
              <CertLinks
                file={e.certificate}
                verifyUrl={e.verifyUrl}
                label="View internship certificate"
                title={`${e.company} - internship certificate`}
              />
            </div>
          </Reveal>
        ))}

        <Reveal delay={200}>
          <div className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg">
            <span className="absolute -left-[2.15rem] top-6 flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-600 text-white ring-4 ring-slate-50 sm:-left-[2.65rem]">
              <GraduationCap size={14} />
            </span>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900">{education.school}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-semibold text-fuchsia-700">
                <Calendar size={12} /> {education.period}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-fuchsia-600">{education.degree}</p>
            <p className="mt-1 text-sm text-slate-600">{education.place}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
