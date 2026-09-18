"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CodeBlock from "./CodeBlock";

const OPTIONS = [
  {
    name: "showEdges",
    where: "Fiber3DMesh",
    body: "Draws a second, unlit wireframe pass over the shaded surface the shaded-fill-plus-visible-edges look seen in three.js's own geometry viewers. Ignored if the material's wireframe is already true (that mode is lines-only).",
    code: `Fiber3DMesh(
  geometry: Fiber3DTorus(radius: 1.0, tube: 0.4),
  material: const Fiber3DStandardMaterial(color: 0x3366ff),
  showEdges: true,
)`,
  },
  {
    name: "material.wireframe",
    where: "Fiber3DStandardMaterial / Fiber3DBasicMaterial",
    body: "Renders lines only no filled triangles at all.",
    code: `Fiber3DStandardMaterial(
  color: 0x3366ff,
  wireframe: true,
),
  ---
  OR
  ---
  Fiber3DBasicMaterial(
  color: 0x3366ff,
  wireframe: true,
)`,
  },
  {
    name: "material.flatShading",
    where: "Fiber3DStandardMaterial",
    body: "false (default): smooth, interpolated per-vertex normals. true: one flat normal per triangle the faceted, low-poly \"gem\" look. Pure shading-mode toggle; the underlying geometry data is untouched.",
    code: `Fiber3DStandardMaterial(
  color: 0x3366ff,
  flatShading: true,
)`,
  },
  {
    name: "enablePinchScale",
    where: "Fiber3DMesh",
    body: "Opt-in two-finger pinch-to-scale on that mesh, off by default. Anchored to the scale at gesture start so it never compounds mid-gesture, and clamped by minPinchScale/maxPinchScale so it can't shrink to invisible or grow unbounded.",
    code: `Fiber3DMesh(
  geometry: Fiber3DSphere(radius: 1.2),
  material: const Fiber3DStandardMaterial(color: 0x3366ff),
  enablePinchScale: true,
  minPinchScale: 0.4,
  maxPinchScale: 2.5,
)`,
  },
  {
    name: "skyColor / groundColor",
    where: "Fiber3DCanvas",
    body: "A cheap fake-environment light (same technique as three.js's HemisphereLight)  blends two flat colors by each surface's normal direction so undersides aren't pure black. Not a rendered sky or ground plane, purely a lighting tint. Pass 0x000000 / 0x000000 to disable.",
    code: `Fiber3DCanvas(
  skyColor: 0x87A6C4,
  groundColor: 0x3B3A35,
  // ...
)`,
  },
  {
    name: "orbitEnabled",
    where: "Fiber3DCanvas",
    body: "Drag to orbit the camera, pinch to zoom, when no mesh under the gesture claims it first.",
    code: `Fiber3DCanvas(
  orbitEnabled: true,
  // ...
)`,
  },
];

export default function ApiReference() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll("[data-api]");
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
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
      id="api"
      ref={containerRef}
      className="px-5 sm:px-8 md:px-12 py-20 border-b border-border"
    >
      <p className="font-mono text-xs text-text-dim mb-3">// api reference</p>
      <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-4">
        Key API Options
      </h2>
      <p className="font-sans text-sm sm:text-base text-text-dim max-w-2xl mb-12 leading-relaxed">
        The most commonly used options, what they actually do, and a
        copy-pasteable example for each.
      </p>

      <div className="flex flex-col gap-8 max-w-3xl">
        {OPTIONS.map((opt) => (
          <div key={opt.name} data-api className="border border-border bg-panel p-5">
            <div className="flex items-baseline flex-wrap gap-x-3 mb-2">
              <h3 className="font-mono text-sm text-accent-2">{opt.name}</h3>
              <span className="font-mono text-[11px] text-text-dim">{opt.where}</span>
            </div>
            <p className="font-sans text-sm text-text-dim leading-relaxed mb-4">
              {opt.body}
            </p>
            <CodeBlock code={opt.code} />
          </div>
        ))}
      </div>
    </section>
  );
}