import { useState } from "react";
import { Mail, MapPin, Send, Loader2, Check } from "lucide-react";
import { profile } from "../data";
import { Section, Reveal } from "./ui";
import { GithubIcon, LinkedinIcon } from "./Icons";

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
      className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-600 hover:shadow-md"
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

export default function Contact() {
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
      eyebrow="Contact"
      title="Get In Touch"
      subtitle="Open to Associate Software Engineer roles. Fill in the form and your message will reach my inbox."
      tone="slate"
    >
      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal className="space-y-4 lg:col-span-2">
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
        </Reveal>

        <Reveal delay={120} className="lg:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
        </Reveal>
      </div>
    </Section>
  );
}
