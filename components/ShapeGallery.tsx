"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CodeBlock from "./CodeBlock";

const SHAPES: { name: string; video?: string; code: string }[] = [
{ name: "Box", video: "box_screen.mp4", code: "Fiber3DBox(width: 1.4, height: 1.4, depth: 1.4)" },
  { name: "Capsule", video: "capsule_screen.mp4", code: "Fiber3DCapsule(radius: 0.6, height: 1.2)" },
  { name: "Cone", video: "cone_screen.mp4", code: "Fiber3DCone(radius: 1.0, height: 1.8, radialSegments: 32)" },
  { name: "Cylinder", video: "cylinder_screen.mp4", code: "Fiber3DCylinder(radiusTop: 0.8, radiusBottom: 0.8, height: 1.8)" },
  { name: "Icosahedron", video: "icos_sphere.mp4", code: "Fiber3DIcosahedron(radius: 1.2)" },
  {
    name: "Lathe (basket)",
    video: "screen_record_lathe.mp4",
    code: `Fiber3DLathe(
  points: const [
    [0.0, -0.9],
    [0.5, -0.85],
    [0.85, -0.5],
    [0.95, 0.0],
    [0.85, 0.5],
    [0.5, 0.85],
  ],
  segments: 24,
)`,
  },
  { name: "Ring", video: "ring_screen.mp4", code: "Fiber3DRing(innerRadius: 0.5, outerRadius: 1.2)" },
  { name: "Sphere", video: "sphere_screen.mp4", code: "Fiber3DSphere(radius: 1.2)" },
  { name: "Torus (donut)", video: "torus_screen.mp4", code: "Fiber3DTorus(radius: 1.0, tube: 0.4)" },
  { name: "Torus Knot", video: "torusknot_screen.mp4", code: "Fiber3DTorusKnot(radius: 1.0, tube: 0.3)" },
  { name: "Circle", video: "cycle_box.mp4", code: "Fiber3DCircle(radius: 1.2, segments: 32)" },
  { name: "Plane", code: "Fiber3DPlane(width: 2, height: 2)" },
  { name: "Dodecahedron", code: "Fiber3DDodecahedron(radius: 1.1)" },
  { name: "Octahedron", video: "ocatedeon_screen.mp4", code: "Fiber3DOctahedron(radius: 1.2)" },
  { name: "Tetrahedron", video: "tetrahedron_screen.mp4", code: "Fiber3DTetrahedron(radius: 1.2)" },
  {
    name: "Polyhedron (custom)",
    code: `Fiber3DPolyhedron(
  // flat [x, y, z, x, y, z, ...] vertex list
  const [1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0],
  // triangles, as indices into the vertex list above
  const [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1],
  radius: 1.2,
  detail: 0,
)`,
  },
  { name: "Star", video: "star_screen.mp4", code: "Fiber3DStar(outerRadius: 1.2, innerRadius: 0.5, points: 5, depth: 0.3)" },
  { name: "Wedge (ramp)", code: "Fiber3DWedge(width: 1.5, height: 1.0, depth: 1.5)" },
  { name: "Prism (hexagonal)", video: "prism_screen.mp4", code: "Fiber3DPrism(radius: 1.1, height: 1.6, sides: 6)" },
  { name: "Spring", video: "spring_screen.mp4", code: "Fiber3DSpring(radius: 0.8, tubeRadius: 0.15, turns: 4, pitch: 0.5)" },
  { name: "Chamfered Box", video: "chamfered_box_screen.mp4", code: "Fiber3DChamferedBox(width: 1.4, height: 1.4, depth: 1.4, chamferAmount: 0.4)" },
  {
    name: "Arrow (widget)",
    video: "arrow_screen.mp4",
    code: `// Fiber3DArrow is a widget, not a geometry:
// place it directly in children, not inside Fiber3DMesh.
Fiber3DArrow(
  length: 2.0,
  shaftMaterial: material,
  headMaterial: material,
)`,
  },
];

// Shapes with a video first, then shapes without one.
const ORDERED_SHAPES = [
  ...SHAPES.filter((s) => s.video),
  ...SHAPES.filter((s) => !s.video),
];

export default function ShapeGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll("[data-shape-card]");
    gsap.fromTo(
      cards,
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
      id="shapes"
      ref={containerRef}
      className="px-5 sm:px-8 md:px-12 py-20 border-b border-border"
    >
      <p className="font-mono text-xs text-text-dim mb-3">// shape gallery</p>
      <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-4">
        Shape Gallery
      </h2>
      <p className="font-sans text-sm sm:text-base text-text-dim max-w-2xl mb-12 leading-relaxed">
        Every shape below is generated live in the example app clone the
        repo and run it to page through all of them interactively, with
        toggles for wireframe edges and flat/smooth shading.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {ORDERED_SHAPES.map((shape) => (
          <div key={shape.name} data-shape-card>
            <h3 className="font-mono text-sm text-accent-2 mb-3">{shape.name}</h3>
            {shape.video && (
              <video
                src={`/videos/${shape.video}`}
                muted
                autoPlay
                loop
                playsInline
                controls
                className="w-full border border-border mb-3 bg-black"
              />
            )}
            <CodeBlock code={shape.code} />
          </div>
        ))}
      </div>

    </section>
  );
}