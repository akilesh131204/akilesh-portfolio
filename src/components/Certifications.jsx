import { Award, Calendar } from "lucide-react";
import { certifications } from "../data";
import { Section, Reveal, CertLinks } from "./ui";

export default function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Credentials"
      title="Certifications"
      subtitle="Click View certificate to open the original, or Verify online where the issuer provides a link."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 80}>
            <div className="flex h-full gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
                <Award size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold leading-snug text-slate-900">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{c.issuer}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar size={12} /> {c.date}
                </p>
                <CertLinks file={c.file} verifyUrl={c.verifyUrl} title={c.title} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
