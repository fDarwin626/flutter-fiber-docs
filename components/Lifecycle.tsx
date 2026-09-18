"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BEHAVIORS = [
  {
    title: "Off-screen pause",
    body: "Rendering pauses when the canvas scrolls off-screen, and resumes automatically when it's visible again.",
  },
  {
    title: "Background pause",
    body: "Rendering pauses when the app is backgrounded, and resumes on foreground no wasted GPU or battery while the user is elsewhere.",
  },
  {
    title: "Idle-frame stop",
    body: "The render loop fully stops not just throttles once nothing is animating and no gesture is in progress. It wakes on the next onFrame registration or touch.",
  },
  {
    title: "Full disposal",
    body: "All GPU resources buffers, shaders, the GL context itself are released on dispose. No manual cleanup required.",
  },
];

export default function Lifecycle() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll("[data-life]");
    gsap.fromTo(
      items,
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
      id="lifecycle"
      ref={containerRef}
      className="px-5 sm:px-8 md:px-12 py-20 border-b border-border"
    >
      <p className="font-mono text-xs text-text-dim mb-3">// lifecycle</p>
      <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-4">
        Lifecycle
      </h2>
      <p className="font-sans text-sm sm:text-base text-text-dim max-w-2xl mb-12 leading-relaxed">
        Fiber3DCanvas manages its own GPU and battery cost automatically
        nothing to wire up yourself.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {BEHAVIORS.map((b) => (
          <div key={b.title} data-life className="border border-border bg-panel p-5">
            <h3 className="font-mono text-sm text-accent-2 mb-2">{b.title}</h3>
            <p className="font-sans text-sm text-text-dim leading-relaxed">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}