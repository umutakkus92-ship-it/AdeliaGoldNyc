"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export interface Slide {
  tone: "light" | "dark";
  desktop: string;
  mobile: string;
  alt: string;
  kicker: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
}

/** Homepage slider — same markup, images, copy, timing and controls as the prototype. */
export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
  }, []);
  const start = useCallback(() => {
    stop();
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setI((x) => (x + 1) % slides.length), 4000);
  }, [slides.length, stop]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return (
    <section className="hero-img" aria-roledescription="carousel" aria-label="Featured" onMouseEnter={stop} onMouseLeave={start}>
      <div className="hero-slides">
        {slides.map((s, k) => {
          const on = k === i;
          const H = k === 0 ? "h1" : "h2";
          return (
            <div
              key={k}
              className={`hero-slide hs-${s.tone}${on ? " on" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${slides.length}`}
              aria-hidden={!on}
            >
              <div className="hero-media">
                <picture>
                  <source media="(max-width:760px)" srcSet={s.mobile} />
                  {/* eslint-disable-next-line @next/next/no-img-element -- art-directed <picture> keeps the prototype's crops */}
                  <img src={s.desktop} width={2400} height={960} alt={s.alt} loading={k === 0 ? "eager" : "lazy"} fetchPriority={k === 0 ? "high" : "auto"} />
                </picture>
              </div>
              <div className="hero-text">
                <div className="kicker">{s.kicker}</div>
                <H>{s.title}</H>
                <p>{s.text}</p>
                <div className="ctas">
                  <Link className="btn" href={s.cta.href} tabIndex={on ? 0 : -1}>
                    {s.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hero-nums">
        {slides.map((_, k) => (
          <button
            key={k}
            className={k === i ? "on" : ""}
            aria-label={`Show slide ${k + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              setI(k);
              start();
            }}
          >
            {String(k + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
}
