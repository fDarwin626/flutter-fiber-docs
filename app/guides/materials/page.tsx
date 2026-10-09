import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import GuideSection from "@/components/GuideSection";

export const metadata: Metadata = {
  title: "Materials | flutter_fiber",
  description:
    "The six flutter_fiber materials (Standard, Lambert, Phong, Toon, Matcap, Basic): what each looks like, its parameters, and how to choose.",
};

const ASSIGN = `Fiber3DMesh(
  geometry: Fiber3DTorusKnot(radius: 1.1, tube: 0.35),
  material: Fiber3DPhongMaterial(
    color: 0xcc4433,
    specular: 0xffffff,
    shininess: 80.0,
  ),
)`;

const MATERIALS = [
  {
    name: "Fiber3DStandardMaterial",
    desc: "Physically based: roughness and metalness, with environment reflections. The only material that takes textures, clearcoat and transparency. Use it for realistic surfaces, metals, glass, textured objects and glTF models. It is not const.",
    params: [
      "color (0xffffff)",
      "roughness (1.0)",
      "metalness (0.0)",
      "emissive (0x000000)",
      "emissiveIntensity (1.0)",
      "wireframe (false)",
      "flatShading (false)",
      "map, roughnessMap, metalnessMap (null)",
      "envMapIntensity (1.0)",
      "clearcoat (0.0)",
      "clearcoatRoughness (0.0)",
      "opacity (1.0)",
      "transparent (false)",
    ],
    code: `Fiber3DStandardMaterial(
  color: 0x2255cc,
  roughness: 0.15,
  metalness: 0.6,
)`,
  },
  {
    name: "Fiber3DLambertMaterial",
    desc: "Matte diffuse lighting only, with no highlight. Cheap and non-shiny.",
    params: [
      "color (0xffffff)",
      "emissive (0x000000)",
      "emissiveIntensity (1.0)",
      "wireframe (false)",
      "flatShading (false)",
    ],
    code: `Fiber3DLambertMaterial(
  color: 0x33aa77,
  flatShading: true,
)`,
  },
  {
    name: "Fiber3DPhongMaterial",
    desc: "Diffuse plus a classic Blinn-Phong highlight. A higher shininess gives a smaller, sharper highlight.",
    params: [
      "everything in Lambert",
      "specular (0x111111): highlight color",
      "shininess (30.0)",
    ],
    code: `Fiber3DPhongMaterial(
  color: 0xcc4433,
  specular: 0xffffff,
  shininess: 80.0,
)`,
  },
  {
    name: "Fiber3DToonMaterial",
    desc: "Direct light is stepped into discrete bands for a cel-shaded cartoon look. There is no specular term and no gradient-map option yet.",
    params: [
      "color (0xffffff)",
      "emissive (0x000000)",
      "emissiveIntensity (1.0)",
      "wireframe (false)",
      "flatShading (false)",
    ],
    code: `Fiber3DToonMaterial(color: 0xffaa22)`,
  },
  {
    name: "Fiber3DMatcapMaterial",
    desc: "Shading comes from the view-space normal and ignores the scene's lights, so the shading stays fixed relative to the camera as the shape spins. Custom matcap textures are not supported yet.",
    params: [
      "color (0xffffff)",
      "wireframe (false)",
      "flatShading (false)",
    ],
    code: `Fiber3DMatcapMaterial(color: 0xdddddd)`,
  },
  {
    name: "Fiber3DBasicMaterial",
    desc: "No lighting at all: it always renders its flat color. Good for markers and helpers.",
    params: ["color (0xffffff)", "wireframe (false)"],
    code: `Fiber3DBasicMaterial(color: 0x3366ff)`,
  },
];

export default function MaterialsPage() {
  return (
    <>
      <GuideSection id="what" kicker="materials" title="Materials">
        <p>
          A material decides how a shape&apos;s surface looks and how it
          reacts to light. flutter_fiber has six, from a fully physically based
          one down to a flat unlit color. Every mesh takes exactly one material.
        </p>
        <p>
          They can be mixed freely: different shapes in the same scene can use
          different materials, and all of them draw correctly together.
        </p>
      </GuideSection>

      <GuideSection id="demo" kicker="demo" title="Demo">
        <video
          src="/videos/texture_main_screen.mp4"
          muted
          autoPlay
          loop
          playsInline
          controls
          className="w-full max-w-sm border border-border bg-black"
        />
        <p className="font-mono text-xs">
          Every material in one lit scene: a Phong torus knot in the center, a
          Lambert torus (left), a Standard sphere (right), a Toon octahedron
          (front left), a Matcap cone (front right), and a row of metal
          Standard spheres with roughness from 0.05 to 1.0 along the bottom.
        </p>
      </GuideSection>

      <GuideSection id="usage" kicker="how to use it" title="How to use it">
        <p>
          Pass a material to the{" "}
          <code className="text-accent-2">material</code> parameter of{" "}
          <code className="text-accent-2">Fiber3DMesh</code>. To change a
          shape&apos;s look, change that one line:
        </p>
        <CodeBlock code={ASSIGN} />
        <p>
          Colors are <code className="text-accent-2">0xRRGGBB</code> integers.
          Every material except the Standard one can be written{" "}
          <code className="text-accent-2">const</code>.
        </p>
        <div className="border border-border bg-panel overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border text-text-dim">
                <th className="p-3 font-normal">Material</th>
                <th className="p-3 font-normal">Lighting</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3 text-accent-2">Standard</td>
                <td className="p-3">Physically based, with environment reflections</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-accent-2">Lambert</td>
                <td className="p-3">Matte diffuse only</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-accent-2">Phong</td>
                <td className="p-3">Diffuse plus a glossy highlight</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-accent-2">Toon</td>
                <td className="p-3">Stepped, cel-shaded bands</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 text-accent-2">Matcap</td>
                <td className="p-3">From the view-space normal, no scene lights</td>
              </tr>
              <tr>
                <td className="p-3 text-accent-2">Basic</td>
                <td className="p-3">None: always its flat color</td>
              </tr>
            </tbody>
          </table>
        </div>
      </GuideSection>

      <GuideSection id="list" kicker="the materials" title="The materials">
        {MATERIALS.map((m) => (
          <div key={m.name} className="border border-border bg-panel p-5">
            <h3 className="font-mono text-sm text-accent-2 mb-2">{m.name}</h3>
            <p className="mb-4">{m.desc}</p>
            <p className="font-mono text-[11px] text-text-dim mb-2">
              Parameters (defaults)
            </p>
            <ul className="font-mono text-xs list-disc pl-5 space-y-1 mb-4">
              {m.params.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <CodeBlock code={m.code} />
          </div>
        ))}
      </GuideSection>

      <GuideSection id="tips" kicker="tips & limits" title="Tips & limits">
        <ul className="list-disc pl-5 space-y-2">
          <li>One material per mesh. There is no per-face material.</li>
          <li>
            Only <code className="text-accent-2">Fiber3DStandardMaterial</code>{" "}
            supports textures and transparency. The other materials render
            fully opaque. The hemisphere light also affects the Standard
            material only.
          </li>
          <li>
            Matcap and Basic ignore the scene&apos;s lights. Lambert, Phong
            and Toon respond to ambient and point lights.
          </li>
          <li>
            The Standard material adds environment reflections by default.
            Set <code className="text-accent-2">envMapIntensity: 0.0</code> to
            turn them off for a pure light-only look, as the demo does for its
            sphere and roughness row.
          </li>
          <li>
            More on the Standard material:{" "}
            <Link href="/guides/clearcoat" className="text-accent-2 hover:underline">
              Clearcoat
            </Link>
            ,{" "}
            <Link href="/guides/photo-in-shape" className="text-accent-2 hover:underline">
              Photo in shape
            </Link>{" "}
            and{" "}
            <Link href="/guides/text-in-shape" className="text-accent-2 hover:underline">
              Text in shape
            </Link>
            .
          </li>
        </ul>
      </GuideSection>
    </>
  );
}