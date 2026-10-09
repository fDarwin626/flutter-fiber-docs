import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import GuideSection from "@/components/GuideSection";

export const metadata: Metadata = {
  title: "Hemisphere light | flutter_fiber",
  description:
    "Soft sky-and-ground lighting for flutter_fiber scenes with Fiber3DHemisphereLight: a cheap way to keep undersides from going black.",
};

const MINIMAL = `Fiber3DCanvas(
  lights: const [
    Fiber3DHemisphereLight(
      skyColor: 0x88aaff,
      groundColor: 0x443322,
      intensity: 1.0,
    ),
    Fiber3DPointLight(
      color: 0xffffff,
      intensity: 3.0,
      position: Fiber3DVector3(3, 4, 5),
    ),
  ],
  // ...
)`;

const DEMO = `import 'package:flutter/material.dart';
import 'package:flutter_fiber/flutter_fiber.dart';

void main() => runApp(const HemisphereLightDemo());

/// Only a hemisphere light: no ambient, no point light, and environment
/// reflections switched off (envMapIntensity: 0.0), so the sky/ground tint
/// is the only thing you see.
class HemisphereLightDemo extends StatelessWidget {
  const HemisphereLightDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: const Text('flutter_fiber: HemisphereLight')),
        body: Fiber3DCanvas(
          backgroundColor: 0x202020,
          camera: Fiber3DCamera(
            position: const Fiber3DVector3(0, 0, 6),
            target: const Fiber3DVector3.zero(),
          ),
          orbitEnabled: true,
          lights: const [
            Fiber3DHemisphereLight(
              skyColor: 0x4488ff,      // blue on surfaces facing up
              groundColor: 0xaa5522,   // orange-brown on surfaces facing down
              intensity: 1.0,
              direction: Fiber3DVector3(0, 1, 0), // "up"
            ),
          ],
          children: [
            Fiber3DMesh(
              geometry: Fiber3DSphere(radius: 1.1),
              material: Fiber3DStandardMaterial(
                color: 0xffffff,
                roughness: 1.0,
                metalness: 0.0,
                envMapIntensity: 0.0,
              ),
              showEdges: false,
              onFrame: (elapsed, delta, transform) {
                transform.position.set(-1.6, 0, 0);
                transform.rotation.y += (delta.inMicroseconds / 1e6) * 0.4;
              },
            ),
            Fiber3DMesh(
              geometry: Fiber3DChamferedBox(
                width: 1.7,
                height: 1.7,
                depth: 1.7,
                chamferAmount: 0.3,
              ),
              material: Fiber3DStandardMaterial(
                color: 0xffffff,
                roughness: 1.0,
                metalness: 0.0,
                envMapIntensity: 0.0,
              ),
              showEdges: false,
              onFrame: (elapsed, delta, transform) {
                transform.position.set(1.6, 0, 0);
                transform.rotation.y += (delta.inMicroseconds / 1e6) * 0.4;
              },
            ),
          ],
        ),
      ),
    );
  }
}`;

const PARAMS = [
  {
    name: "skyColor",
    def: "0xffffff",
    desc: "Color blended onto surfaces that face toward direction (the \"sky\" side).",
  },
  {
    name: "groundColor",
    def: "0x444444",
    desc: "Color blended onto surfaces that face away from direction (the \"ground\" side).",
  },
  {
    name: "intensity",
    def: "1.0",
    desc: "Strength of the light.",
  },
  {
    name: "direction",
    def: "Fiber3DVector3(0, 1, 0)",
    desc: "World-space direction that counts as \"up\". Pass a normalized vector (length 1).",
  },
];

export default function HemisphereLightPage() {
  return (
    <>
      <GuideSection id="what" kicker="hemisphere light" title="Hemisphere light">
        <p>
          A hemisphere light is a soft, position-less light that blends two
          colors by which way a surface faces: a sky color on surfaces facing
          up and a ground color on surfaces facing down, blending through the
          middle. It is a cheap way to get natural-looking shading and to keep
          the undersides of shapes from going pure black.
        </p>
        <p>
          It has no position and no falloff. It lights the whole scene evenly,
          like ambient light that has a direction. It replaces the{" "}
          <code className="text-accent-2">skyColor</code> /{" "}
          <code className="text-accent-2">groundColor</code> parameters that{" "}
          <code className="text-accent-2">Fiber3DCanvas</code> had in 0.1.x.
        </p>
      </GuideSection>

      <GuideSection id="demo" kicker="demo" title="Demo">
        <video
          src="/videos/hemisphere_light_screen.mp4"
          muted
          autoPlay
          loop
          playsInline
          controls
          className="w-full max-w-sm border border-border bg-black"
        />
        <p className="font-mono text-xs">
          A sphere and a chamfered box lit by a hemisphere light only: the
          blue sky color on top, the orange-brown ground color underneath, and
          a blend through the middle.
        </p>
      </GuideSection>

      <GuideSection id="usage" kicker="how to use it" title="How to use it">
        <p>
          Add a <code className="text-accent-2">Fiber3DHemisphereLight</code>{" "}
          to the canvas&apos;s <code className="text-accent-2">lights</code>{" "}
          list. In practice you will combine it with other lights:
        </p>
        <CodeBlock code={MINIMAL} />
        <p>
          The demo below uses only a hemisphere light, with no other light and
          environment reflections turned off, so you can see the sky and
          ground tint on its own:
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
                  default {p.def}
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
            Only the first hemisphere light in the list is used. Extra ones are
            ignored.
          </li>
          <li>
            It affects <code className="text-accent-2">Fiber3DStandardMaterial</code>{" "}
            only. The other materials ignore it.
          </li>
          <li>
            The direction is in world space, so the sky color stays on top no
            matter how a shape rotates.
          </li>
          <li>
            In the demo, <code className="text-accent-2">envMapIntensity: 0.0</code>{" "}
            switches off the material&apos;s environment reflections so the
            hemisphere tint is the only light you see. In a real scene you
            normally leave it at its default.
          </li>
          <li>
            Subtle colors (a pale blue sky and a warm dark ground) look
            natural. The strong blue and orange in the demo are there to make
            the effect obvious.
          </li>
        </ul>
      </GuideSection>
    </>
  );
}