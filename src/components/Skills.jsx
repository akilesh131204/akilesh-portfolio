import {
  Code, Layers, Globe, Wrench, Cpu,
  Puzzle, Users, MessageSquare, Rocket, Clock,
} from "lucide-react";
import { skills, softSkills } from "../data";
import { Section, Reveal, Chip } from "./ui";

const TECH_ICONS = { code: Code, layers: Layers, globe: Globe, wrench: Wrench, cpu: Cpu };
const SOFT_ICONS = {
  puzzle: Puzzle,
  users: Users,
  message: MessageSquare,
  rocket: Rocket,
  clock: Clock,
};

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="What I know"
      title="Skills"
      subtitle="The technologies I build with, and the soft skills I bring to a team."
      tone="slate"
    >
      <Reveal>
        <h3 className="mb-5 text-lg font-bold text-slate-900">Technical Skills</h3>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => {
          const Icon = TECH_ICONS[s.icon] || Code;
          return (
            <Reveal key={s.group} delay={i * 70}>
              <div className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Icon size={20} />
                  </span>
                  <h4 className="font-semibold text-slate-900">{s.group}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <h3 className="mb-5 mt-14 text-lg font-bold text-slate-900">Soft Skills</h3>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {softSkills.map((s, i) => {
          const Icon = SOFT_ICONS[s.icon] || Puzzle;
          return (
            <Reveal key={s.title} delay={i * 70}>
              <div className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-fuchsia-50 text-fuchsia-600">
                  <Icon size={20} />
                </span>
                <h4 className="mt-4 font-semibold text-slate-900">{s.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
