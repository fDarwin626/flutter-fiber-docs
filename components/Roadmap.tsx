"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  {
    title: "GLTF / GLB loading",
    body: "Reading a .glb's JSON + binary buffers directly into the same positions / normals / indices format the procedural geometry classes already produce so a loaded mesh and a procedural mesh are indistinguishable once in buffer form. No changes to the existing render pipeline required.",
  },
  {
    title: "Text and logo extrusion",
    body: "A 2D path/curve subsystem the same category of work behind three.js's ExtrudeGeometry/TextGeometry to turn a font outline or SVG-style shape into a real 3D object, procedurally, at runtime.",
  },
  {
    title: "Expanded PBR & lighting",
    body: "Additional material features (clearcoat, sheen, transmission) and a baked-cubemap environment-lighting tier, once loaded-texture infrastructure exists.",
  },
];

export default function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll("[data-road]");
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
      id="roadmap"
      ref={containerRef}
      className="px-5 sm:px-8 md:px-12 py-20"
    >
      <p className="font-mono text-xs text-text-dim mb-3">// roadmap</p>
      <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-4">
        Roadmap
      </h2>
      <p className="font-sans text-sm sm:text-base text-text-dim max-w-2xl mb-12 leading-relaxed">
        If you already have a finished 3D model to show off, this isn&apos;t
        (yet) the package for that. Here&apos;s what&apos;s next.
      </p>

      <div className="flex flex-col gap-4 max-w-2xl">
        {ITEMS.map((item) => (
          <div key={item.title} data-road className="border border-border bg-panel p-5">
            <h3 className="font-mono text-sm text-accent-2 mb-2">{item.title}</h3>
            <p className="font-sans text-sm text-text-dim leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>

      <footer className="mt-20 pt-8 border-t border-border">
        <p className="font-mono text-xs text-text-dim">
          MIT License free to use, modify, and ship in commercial products.
        </p>
        <p className="font-mono text-xs text-text-dim mt-2">
          Built by Darwin (
          <a
            href="https://github.com/fDarwin626"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-2 hover:underline"
          >
            CoCoNuT-sTuDiOs
          </a>
          )
        </p>
      </footer>
    </section>
  );
}