import { useEffect, useRef, useState } from "react";

/* Becomes true the first time the element scrolls into view. */
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* Returns the id of the section that is currently under the navbar. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  return active;
}

/* True once the page has been scrolled past `offset` pixels. */
export function useScrolled(offset = 20) {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > offset
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

/* Types the given words one after another, deleting each before the next. */
export function useTyping(words, speed = 70, pause = 1600) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && text === word) delay = pause;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((n) => n + 1);
        return;
      }
      setText(
        deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
      );
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

/* Counts from 0 up to `target` once `run` is true. */
export function useCountUp(target, run = true, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return undefined;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, duration]);

  return value;
}
