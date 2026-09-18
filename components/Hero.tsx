"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll("[data-anim]");
    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="md:min-h-screen flex flex-col justify-start md:justify-center px-5 sm:px-8 md:px-12 pt-24 pb-12 md:pt-0 md:pb-0 border-b border-border"    >
      <p
        data-anim
        className="font-mono text-[11px] sm:text-xs text-text-dim mb-4"
      >
        // a native, declarative 3D package for Flutter
      </p>

      <h1
        data-anim
        className="font-mono text-3xl sm:text-4xl md:text-6xl font-bold text-text mb-6 flex items-center flex-nowrap"
      >
        <img
          src="/Flutter_icon.png"
          alt="Flutter"
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 mr-2 sm:mr-3 shrink-0"
        />
        <span className="whitespace-nowrap">
          flutter<span className="text-accent">_</span>fiber
        </span>
      </h1>

      <p
        data-anim
        className="font-sans text-base sm:text-lg text-text-dim max-w-xl mb-10 leading-relaxed"
      >
        Inspired by react-three-fiber. Procedural geometry, PBR lighting,
        grouping, and animation built from Dart data. No asset pipeline.
        No WebView. No bundled engine.
      </p>

      <div
        data-anim
        className="border border-border bg-panel px-4 sm:px-5 py-4 max-w-md font-mono text-xs sm:text-sm overflow-x-auto"
      >
        <span className="text-success">$</span>{" "}
        <span className="text-text whitespace-nowrap">flutter pub add flutter_fiber</span>
        <span className="inline-block w-2 h-4 bg-accent-2 ml-1 animate-pulse align-middle" />
      </div>

      <div data-anim className="flex flex-wrap gap-3 mt-8">
        <a
          href="#install"
          className="border border-border px-5 py-2 font-mono text-sm text-text hover:border-accent hover:text-accent transition-colors"
        >
          Get Started
        </a>
        <a
          href="https://github.com/fDarwin626/flutter_fiber"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border px-5 py-2 font-mono text-sm text-text-dim hover:border-accent hover:text-accent transition-colors"
        >
          View on GitHub
        </a>
      </div>
    </section>
  );
}