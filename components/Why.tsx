"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const REASONS = [
  {
    title: "Data-driven, live app-state 3D",
    body: "Every shape is Dart data, not a loaded file. A fitness app's progress ring can thicken with weekly activity, a fintech dashboard's shape can shift with portfolio risk driven by the same state that drives the rest of your UI.",
  },
  {
    title: "Composable primitives",
    body: "Fiber3DGroup chains multiple shapes into one rigid composite a capsule + two spheres becomes a limb, a cone + cylinder + sphere becomes a party hat built directly in widget code, animated as one unit or independently per part.",
  },
  {
    title: "No bundled engine",
    body: "No WebView, no Filament-class native engine shipped just for one 3D object. A thin OpenGL ES binding and plain Dart math real APK/IPA size and battery savings when you only need one thing to render.",
  },
  {
    title: "Full pipeline ownership",
    body: "Shader compilation, buffer upload, lighting, and lifecycle are plain Dart and GLSL you can read and patch yourself not a black box waiting on someone else's engine team.",
  },
];

export default function Why() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll("[data-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      id="why"
      ref={containerRef}
      className="min-h-screen px-5 sm:px-8 md:px-12 py-20 border-b border-border"
    >
      <p className="font-mono text-xs text-text-dim mb-3">// why</p>
      <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-4">
        3D built from Dart data, not loaded from a file
      </h2>
      <p className="font-sans text-base sm:text-lg text-text-dim max-w-2xl mb-12 leading-relaxed">
        Most 3D-on-Flutter packages point a viewer at a finished{" "}
        <code className="text-accent-2 font-mono text-sm">.glb</code> file
        either a WebView running three.js, or a bundled native engine. That&apos;s
        great when you already have a finished asset. flutter_fiber is for
        everything before and beyond that.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {REASONS.map((reason) => (
          <div
            key={reason.title}
            data-card
            className="border border-border bg-panel p-5"
          >
            <h3 className="font-mono text-sm text-accent-2 mb-2">
              {reason.title}
            </h3>
            <p className="font-sans text-sm text-text-dim leading-relaxed">
              {reason.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}