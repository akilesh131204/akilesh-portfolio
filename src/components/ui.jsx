import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink, FileText } from "lucide-react";
import { useReveal } from "../hooks/useAnimations";

/* Fades and slides its children in when they scroll into view. */
export function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* Page section with a consistent heading. tone = "white" | "slate" */
export function Section({ id, eyebrow, title, subtitle, tone = "white", children }) {
  return (
    <section
      id={id}
      className={`${tone === "slate" ? "bg-slate-50" : "bg-white"} py-20 sm:py-24`}
    >
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-600">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
          <div className="mt-5 h-1 w-14 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500" />
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export const Chip = ({ children }) => (
  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
    {children}
  </span>
);

/* ---------- certificate viewer (pop-up on the same page) ---------- */
function CertModal({ file, title, onClose }) {
  const [failed, setFailed] = useState(false);
  const isPdf = file.toLowerCase().endsWith(".pdf");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative max-h-full w-full max-w-4xl overflow-auto rounded-xl bg-white p-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
          <div className="flex shrink-0 items-center gap-2">
            {!failed && (
              <a
                href={file}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
              >
                <ExternalLink size={13} /> Open in new tab
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close certificate"
              className="rounded-md p-1.5 text-slate-600 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {failed ? (
          <div className="rounded-lg bg-red-50 p-6 text-sm text-red-700">
            <p className="font-semibold">Certificate file not found.</p>
            <p className="mt-1">
              The site looked for <code className="rounded bg-red-100 px-1">{file}</code> but
              could not load it. Check that the file exists in the public folder with exactly this name.
            </p>
          </div>
        ) : isPdf ? (
          <iframe src={file} title={title} className="h-[75vh] w-full rounded-lg" />
        ) : (
          <img
            src={file}
            alt={title}
            onError={() => setFailed(true)}
            className="mx-auto h-auto max-h-[78vh] w-auto max-w-full rounded-lg"
          />
        )}
      </div>
    </div>
  );
}

/* Clickable certificate links (viewer + optional online verification). */
export function CertLinks({ file, verifyUrl, label = "View certificate", title = "Certificate" }) {
  const [open, setOpen] = useState(false);
  if (!file && !verifyUrl) return null;
  const linkClass =
    "inline-flex items-center gap-1.5 rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:border-indigo-600 hover:bg-indigo-100";
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {file && (
        <button type="button" onClick={() => setOpen(true)} className={linkClass}>
          <FileText size={14} /> {label}
        </button>
      )}
      {verifyUrl && (
        <a href={verifyUrl} target="_blank" rel="noreferrer" className={linkClass}>
          <ExternalLink size={14} /> Verify online
        </a>
      )}
      {/* Rendered into <body> so the pop-up always covers the whole screen,
          even when the card around the button is animated or transformed. */}
      {open &&
        createPortal(
          <CertModal file={file} title={title} onClose={() => setOpen(false)} />,
          document.body
        )}
    </div>
  );
}