import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import GuideSection from "@/components/GuideSection";

export const metadata: Metadata = {
  title: "Clearcoat | flutter_fiber",
  description:
    "Add a glossy lacquer layer (car paint, varnish) on top of a material in flutter_fiber with clearcoat and clearcoatRoughness.",
};

const MINIMAL = `Fiber3DStandardMaterial(
  color: 0xcc1111,
  roughness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.03,
)`;

const DEMO = `import 'package:flutter/material.dart';
import 'package:flutter_fiber/flutter_fiber.dart';

void main() => runApp(const ClearcoatDemo());

class ClearcoatDemo extends StatelessWidget {
  const ClearcoatDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: const Text('flutter_fiber: clearcoat')),
        body: Fiber3DCanvas(
          backgroundColor: 0x303130,
          toneMapping: Fiber3DToneMapping.acesFilmic,
          camera: Fiber3DCamera(
            position: const Fiber3DVector3(0, 0, 5),
            target: const Fiber3DVector3.zero(),
          ),
          orbitEnabled: true,
          lights: const [
            Fiber3DAmbientLight(color: 0xffffff, intensity: 0.3),
            Fiber3DPointLight(
              color: 0xffffff,
              intensity: 3.0,
              position: Fiber3DVector3(3, 4, 5),
            ),
          ],
          children: [
            // Left: base paint only, no clearcoat.
            Fiber3DMesh(
              geometry: Fiber3DSphere(radius: 0.9),
              material: Fiber3DStandardMaterial(
                color: 0xcc1111,
                roughness: 0.5,
                metalness: 0.0,
              ),
              showEdges: false,
              onFrame: (elapsed, delta, transform) {
                transform.position.set(-1.3, 0, 0);
              },
            ),
            // Right: the same paint with a clearcoat on top.
            Fiber3DMesh(
              geometry: Fiber3DSphere(radius: 0.9),
              material: Fiber3DStandardMaterial(
                color: 0xcc1111,
                roughness: 0.5,
                metalness: 0.0,
                clearcoat: 1.0,
                clearcoatRoughness: 0.03,
              ),
              showEdges: false,
              onFrame: (elapsed, delta, transform) {
                transform.position.set(1.3, 0, 0);
              },
            ),
          ],
        ),
      ),
    );
  }
}`;

const GLASS = `Fiber3DStandardMaterial(
  color: 0xffffff,
  roughness: 0.05,
  opacity: 0.35,
  transparent: true,
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
)`;

const PARAMS = [
  {
    name: "clearcoat",
    def: "0.0",
    desc: "Strength of the lacquer layer. 0.0 = none, 1.0 = full.",
  },
  {
    name: "clearcoatRoughness",
    def: "0.0",
    desc: "Roughness of the coat layer itself. 0.0 gives a sharp, mirror-like glint; higher values blur it. The base layer keeps its own roughness.",
  },
];

export default function ClearcoatPage() {
  return (
    <>
      <GuideSection id="what" kicker="clearcoat" title="Clearcoat">
        <p>
          Clearcoat adds a thin, glossy lacquer layer on top of a material,
          like the clear coat on car paint or varnish on wood. The base layer
          keeps its own look (it can be rough or matte), and the coat adds a
          second, sharper reflection above it.
        </p>
        <p>
          It is a property of{" "}
          <code className="text-accent-2">Fiber3DStandardMaterial</code>. The
          coat reflects the scene&apos;s environment and lights. The canvas
          uses a procedural sky by default, so it works with no extra setup.
        </p>
      </GuideSection>

      <GuideSection id="demo" kicker="demo" title="Demo">
        <video
          src="/videos/clearcoat_screen.mp4"
          muted
          autoPlay
          loop
          playsInline
          controls
          className="w-full max-w-sm border border-border bg-black"
        />
        <p className="font-mono text-xs">
          Five metal spheres with roughness stepped from 0.0 to 1.0, shown
          against a checkerboard test environment so the reflections are easy
          to see. The roughest sphere also has a clearcoat, so it keeps a
          sharp reflection over its blurry base; the other four have none.
        </p>
      </GuideSection>

      <GuideSection id="usage" kicker="how to use it" title="How to use it">
        <p>
          Set <code className="text-accent-2">clearcoat</code> (and optionally{" "}
          <code className="text-accent-2">clearcoatRoughness</code>) on a
          standard material:
        </p>
        <CodeBlock code={MINIMAL} />
        <p>
          A complete scene that compares the same red paint without a clearcoat
          (left) and with one (right). Drag to orbit and watch the sharp
          highlight on the right sphere:
        </p>
        <CodeBlock code={DEMO} />
      </GuideSection>

      <GuideSection id="params" kicker="parameters" title="Parameters">
        <div className="border border-border bg-panel">
          {PARAMS.map((p) => (
            <div
              key={p.name}
              className="p-5 border-b border-border last:border-b-0"
            >
              <div className="flex items-baseline flex-wrap gap-x-3 mb-2">
                <h3 className="font-mono text-sm text-accent-2">{p.name}</h3>
                <span className="font-mono text-[11px] text-text-dim">
                  Fiber3DStandardMaterial · default {p.def}
                </span>
              </div>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection id="tips" kicker="tips & limits" title="Tips & limits">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Only <code className="text-accent-2">Fiber3DStandardMaterial</code>{" "}
            has a clearcoat. The other materials do not.
          </li>
          <li>
            The coat follows the surface&apos;s own normals. There is no
            separate clearcoat normal map.
          </li>
          <li>
            glTF models that use <code className="text-accent-2">KHR_materials_clearcoat</code>{" "}
            get their clearcoat factors applied automatically when loaded.
          </li>
          <li>
            Clearcoat combines with transparency for a glassy look. A single
            transparent surface renders correctly; there is no depth-sorted
            transparency yet, so several overlapping transparent meshes can
            show sorting artifacts.
          </li>
        </ul>
        <CodeBlock code={GLASS} />
      </GuideSection>
    </>
  );
}