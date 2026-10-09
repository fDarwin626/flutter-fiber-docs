import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import GuideSection from "@/components/GuideSection";

export const metadata: Metadata = {
  title: "Text in shape | flutter_fiber",
  description:
    "Put text and numbers on 3D shapes in flutter_fiber with Fiber3DTextTexture, including a dice example with a different number on each face.",
};

const SINGLE = `final texture = await Fiber3DTextTexture.render(
  text: 'Hello',
  fontSize: 64,
  color: const Color(0xFFFFFFFF),
  backgroundColor: const Color(0xFF3366FF),
);

Fiber3DMesh(
  geometry: Fiber3DPlane(width: 2, height: 1),
  material: Fiber3DStandardMaterial(color: 0xffffff, map: texture),
  showEdges: false,
)`;

const DICE = `import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_fiber/flutter_fiber.dart';

void main() => runApp(const DiceShapeDemo());

class DiceShapeDemo extends StatefulWidget {
  const DiceShapeDemo({super.key});

  @override
  State<DiceShapeDemo> createState() => _DiceShapeDemoState();
}

/// One cube face: position (half-extent already applied), a rotation
/// about x and y, and the text to show on it.
class _FaceSpec {
  final double x, y, z;
  final double rotX, rotY;
  final String label;
  const _FaceSpec(this.x, this.y, this.z, this.rotX, this.rotY, this.label);
}

class _DiceShapeDemoState extends State<DiceShapeDemo> {
  static const _half = 0.9; // half of a 1.8-unit cube

  static final List<_FaceSpec> _faces = [
    _FaceSpec(0, 0, _half, 0, 0, '1'), // +Z (Fiber3DPlane's default facing)
    _FaceSpec(_half, 0, 0, 0, pi / 2, '2'), // +X
    _FaceSpec(0, _half, 0, -pi / 2, 0, '3'), // +Y
    _FaceSpec(0, -_half, 0, pi / 2, 0, '4'), // -Y
    _FaceSpec(-_half, 0, 0, 0, -pi / 2, '5'), // -X
    _FaceSpec(0, 0, -_half, 0, pi, '6'), // -Z
  ];

  List<Fiber3DTexture>? _textures;

  @override
  void initState() {
    super.initState();
    // Render one texture per face, then rebuild once all are ready.
    Future.wait(
      _faces.map(
        (f) => Fiber3DTextTexture.render(
          text: f.label,
          fontSize: 140,
          color: const Color(0xFF1A1A1A),
          backgroundColor: const Color(0xFFF5F5F5),
        ),
      ),
    ).then((textures) {
      if (!mounted) return;
      setState(() => _textures = textures);
    });
  }

  @override
  Widget build(BuildContext context) {
    final textures = _textures;

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: const Text('flutter_fiber: text-in-shape (dice)')),
        body: Fiber3DCanvas(
          backgroundColor: 0x303130,
          camera: Fiber3DCamera(
            position: const Fiber3DVector3(0, 0, 5),
            target: const Fiber3DVector3.zero(),
          ),
          orbitEnabled: true,
          lights: const [
            Fiber3DAmbientLight(color: 0xffffff, intensity: 0.6),
            Fiber3DPointLight(
              color: 0xffffff,
              intensity: 3.0,
              position: Fiber3DVector3(3, 4, 5),
            ),
          ],
          children: textures == null
              ? const []
              : [
                  // The group spins all six faces together as one die.
                  Fiber3DGroup(
                    onFrame: (elapsed, delta, transform) {
                      final t = delta.inMicroseconds / 1e6;
                      transform.rotation.y += t;
                      transform.rotation.x += t * 0.4;
                    },
                    children: [
                      for (var i = 0; i < _faces.length; i++)
                        Fiber3DMesh(
                          geometry: Fiber3DPlane(width: 1.8, height: 1.8),
                          material: Fiber3DStandardMaterial(
                            map: textures[i],
                            roughness: 0.6,
                            metalness: 0.0,
                          ),
                          showEdges: false,
                          hitRadius: 1.0,
                          onFrame: (elapsed, delta, transform) {
                            final f = _faces[i];
                            transform.position.set(f.x, f.y, f.z);
                            transform.rotation.x = f.rotX;
                            transform.rotation.y = f.rotY;
                            transform.rotation.z = 0.0;
                          },
                        ),
                    ],
                  ),
                ],
        ),
      ),
    );
  }
}`;

const PARAMS = [
  { name: "text", def: "required", desc: "The string to draw." },
  { name: "fontSize", def: "48", desc: "Logical font size." },
  { name: "color", def: "white", desc: "Text color (a dart:ui Color)." },
  { name: "backgroundColor", def: "transparent", desc: "Fill behind the text." },
  { name: "fontFamily", def: "null", desc: "Optional font family." },
  { name: "fontWeight", def: "FontWeight.normal", desc: "Weight of the text." },
  { name: "textAlign", def: "TextAlign.center", desc: "Alignment of the text." },
  { name: "padding", def: "16", desc: "Logical padding around the text." },
  { name: "pixelRatio", def: "2.0", desc: "Rasterization scale. Higher = sharper." },
];

export default function TextInShapePage() {
  return (
    <>
      <GuideSection id="what" kicker="text in shape" title="Text in shape">
        <p>
          <code className="text-accent-2">Fiber3DTextTexture.render</code>{" "}
          draws a string (letters or numbers) into a texture. Assign that
          texture to{" "}
          <code className="text-accent-2">Fiber3DStandardMaterial.map</code>{" "}
          and the text appears on the shape&apos;s surface.
        </p>
        <p>
          <span className="text-accent-2">One mesh shows one text.</span> A
          mesh takes exactly one material, and a material holds one texture,
          so a single mesh can&apos;t show a different text on each face. A{" "}
          <code className="text-accent-2">Fiber3DBox</code> shows the same
          texture on all six faces. To put different text on each face, build
          the shape out of separate flat{" "}
          <code className="text-accent-2">Fiber3DPlane</code> meshes, one per
          face, each with its own texture. The dice example below does this
          with six planes.
        </p>
      </GuideSection>

      <GuideSection id="demo" kicker="demo" title="Demo">
        <video
          src="/videos/dice_number_in_shape_screen.mp4"
          muted
          autoPlay
          loop
          playsInline
          controls
          className="w-full max-w-sm border border-border bg-black"
        />
        <p className="font-mono text-xs">
          A die made of six Fiber3DPlane faces, each showing a different
          number rendered with Fiber3DTextTexture.
        </p>
      </GuideSection>

      <GuideSection id="usage" kicker="how to use it" title="How to use it">
        <p>
          <span className="text-accent-2">One text on one shape.</span> Render
          the texture (it is asynchronous, so wait for it), then use it as the{" "}
          <code className="text-accent-2">map</code>:
        </p>
        <CodeBlock code={SINGLE} />
        <p>
          <span className="text-accent-2">Different text on each face.</span>{" "}
          Each face is its own{" "}
          <code className="text-accent-2">Fiber3DPlane</code> (a flat square
          that faces +Z by default). The code renders six textures, then
          places six planes half a cube-width out from the center, each
          rotated to face outward. Wrapping them in a{" "}
          <code className="text-accent-2">Fiber3DGroup</code> lets the whole
          die spin as one object. A complete scene:
        </p>
        <CodeBlock code={DICE} />
      </GuideSection>

      <GuideSection id="params" kicker="parameters" title="Parameters">
        <p>
          All parameters of{" "}
          <code className="text-accent-2">Fiber3DTextTexture.render</code>:
        </p>
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
            Render the textures before showing the mesh. In the dice example
            the canvas has no children until all six textures are ready.
          </li>
          <li>
            The texture&apos;s size follows the text plus padding. Size the
            surface you map it on with a matching aspect ratio (for example a{" "}
            <code className="text-accent-2">Fiber3DPlane</code>) to avoid
            stretching.
          </li>
          <li>
            Only <code className="text-accent-2">Fiber3DStandardMaterial</code>{" "}
            accepts textures.
          </li>
          <li>
            Use <code className="text-accent-2">color: 0xffffff</code> (the
            default) on the material to show the texture untinted.
          </li>
        </ul>
      </GuideSection>
    </>
  );
}