import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import GuideSection from "@/components/GuideSection";

export const metadata: Metadata = {
  title: "Vertex colors | flutter_fiber",
  description:
    "Give every vertex of a flutter_fiber shape its own color with the geometry colors list, for per-face or gradient coloring.",
};

const SNIPPET = `final box = Fiber3DBox(width: 1.4, height: 1.4, depth: 1.4);

// three doubles (r, g, b in 0..1) for every vertex
box.colors = [ /* ... */ ];`;

const DEMO = `import 'package:flutter/material.dart';
import 'package:flutter_fiber/flutter_fiber.dart';

void main() => runApp(const VertexColorDemo());

class VertexColorDemo extends StatefulWidget {
  const VertexColorDemo({super.key});

  @override
  State<VertexColorDemo> createState() => _VertexColorDemoState();
}

class _VertexColorDemoState extends State<VertexColorDemo> {
  late final Fiber3DBox _coloredBox;
  late final Fiber3DBox _plainBox;

  @override
  void initState() {
    super.initState();

    // Fiber3DBox builds its faces in the order +X, -X, +Y, -Y, +Z, -Z,
    // with 4 vertices per face, so one color per face is 4 repeats each.
    const faceColors = [
      [1.0, 0.2, 0.2], // +X red
      [0.2, 1.0, 0.2], // -X green
      [0.2, 0.4, 1.0], // +Y blue
      [1.0, 1.0, 0.2], // -Y yellow
      [1.0, 0.2, 1.0], // +Z magenta
      [0.2, 1.0, 1.0], // -Z cyan
    ];

    _coloredBox = Fiber3DBox(width: 1.4, height: 1.4, depth: 1.4)
      ..colors = [
        for (final c in faceColors)
          for (var i = 0; i < 4; i++) ...c,
      ];
    _plainBox = Fiber3DBox(width: 1.4, height: 1.4, depth: 1.4);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: const Color(0xFF1A1A1A),
        body: Fiber3DCanvas(
          backgroundColor: 0x1A1A1A,
          camera: Fiber3DCamera(
            position: const Fiber3DVector3(0, 0, 6),
            target: const Fiber3DVector3.zero(),
          ),
          orbitEnabled: true,
          lights: const [
            Fiber3DAmbientLight(color: 0xffffff, intensity: 0.7),
            Fiber3DPointLight(
              color: 0xffffff,
              intensity: 2.5,
              position: Fiber3DVector3(3, 4, 5),
            ),
          ],
          children: [
            // Left: per-face vertex colors, white material.
            Fiber3DMesh(
              geometry: _coloredBox,
              material: Fiber3DStandardMaterial(color: 0xffffff, roughness: 0.6),
              showEdges: false,
              onFrame: (elapsed, delta, transform) {
                transform.position.set(-1.2, 0, 0);
                final t = elapsed.inMicroseconds / 1e6;
                transform.rotation.y = t * 0.5;
                transform.rotation.x = t * 0.2;
              },
            ),
            // Right: no colors set, so just the material's orange.
            Fiber3DMesh(
              geometry: _plainBox,
              material: Fiber3DStandardMaterial(color: 0xff8800, roughness: 0.6),
              showEdges: false,
              onFrame: (elapsed, delta, transform) {
                transform.position.set(1.2, 0, 0);
                final t = elapsed.inMicroseconds / 1e6;
                transform.rotation.y = t * 0.5;
                transform.rotation.x = t * 0.2;
              },
            ),
          ],
        ),
      ),
    );
  }
}`;

export default function VertexColorsPage() {
  return (
    <>
      <GuideSection id="what" kicker="vertex colors" title="Vertex colors">
        <p>
          Every geometry has an optional{" "}
          <code className="text-accent-2">colors</code> list: three doubles
          (red, green, blue, each 0 to 1) for every vertex. When it is set, it
          multiplies the material color per vertex. When it is{" "}
          <code className="text-accent-2">null</code>, the mesh renders with
          the material color alone.
        </p>
        <p>
          Use it for per-face coloring, gradients across a surface, or any
          shape where the color is baked into the geometry.
        </p>
      </GuideSection>

      <GuideSection id="demo" kicker="demo" title="Demo">
        <video
          src="/videos/colormanager_screen.mp4"
          muted
          autoPlay
          loop
          playsInline
          controls
          className="w-full max-w-sm border border-border bg-black"
        />
        <p className="font-mono text-xs">
          Left: a box with a different color on each face, using a white
          material. Right: a plain box with no colors set, showing only its
          orange material color.
        </p>
      </GuideSection>

      <GuideSection id="usage" kicker="how to use it" title="How to use it">
        <p>
          Assign a list to <code className="text-accent-2">colors</code> on any
          geometry after creating it:
        </p>
        <CodeBlock code={SNIPPET} />
        <p>
          <code className="text-accent-2">Fiber3DBox</code> builds its faces in
          the order +X, -X, +Y, -Y, +Z, -Z with 4 vertices per face (at the
          default single segment), so repeating one color 4 times per face
          gives six flat-colored faces. A complete scene:
        </p>
        <CodeBlock code={DEMO} />
      </GuideSection>

      <GuideSection id="tips" kicker="tips & limits" title="Tips & limits">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Vertex colors multiply the material color. Use{" "}
            <code className="text-accent-2">color: 0xffffff</code> on the
            material to see the vertex colors untinted.
          </li>
          <li>
            Provide exactly three values per vertex. Colors are interpolated
            across each triangle, so different colors at neighboring vertices
            give a smooth gradient.
          </li>
          <li>
            Create the geometry once (for example in{" "}
            <code className="text-accent-2">initState</code>) rather than in{" "}
            <code className="text-accent-2">build</code>, and set{" "}
            <code className="text-accent-2">colors</code> before the mesh first
            renders. Geometry is uploaded to the GPU once per mesh; to change
            it later, give the mesh a new Key.
          </li>
          <li>
            Works with the Standard, Lambert, Phong, Toon and Matcap materials.
          </li>
          <li>
            glTF models that carry float{" "}
            <code className="text-accent-2">COLOR_0</code> vertex colors have
            them applied automatically when loaded.
          </li>
        </ul>
      </GuideSection>
    </>
  );
}