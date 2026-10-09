import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import GuideSection from "@/components/GuideSection";

export const metadata: Metadata = {
  title: "glTF / GLB models | flutter_fiber",
  description:
    "Load and display glTF / GLB 3D models in Flutter with flutter_fiber: how to load a file, frame it, and what is supported.",
};

const PUBSPEC = `flutter:
  assets:
    - assets/YOUR_MODEL.glb`;

const VIEWER = `import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:flutter_fiber/flutter_fiber.dart';

class ModelViewer extends StatefulWidget {
  const ModelViewer({super.key});

  @override
  State<ModelViewer> createState() => _ModelViewerState();
}

class _ModelViewerState extends State<ModelViewer> {
  Fiber3DGltfScene? _scene;
  Object? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final data = await rootBundle.load('assets/YOUR_MODEL.glb');
      final bytes = data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);
      final scene = await Fiber3DGltfLoader.loadGlb(bytes);
      if (!mounted) return;
      setState(() => _scene = scene);
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = e);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_error != null) return Center(child: Text('Failed to load model:\\n$_error'));
    final scene = _scene;
    if (scene == null) return const Center(child: CircularProgressIndicator());

    return Fiber3DCanvas(
      backgroundColor: 0x1a1a1a,
      toneMapping: Fiber3DToneMapping.acesFilmic,
      camera: Fiber3DCamera(
        position: const Fiber3DVector3(0, 2, 8),
        target: const Fiber3DVector3.zero(),
      ),
      orbitEnabled: true,
      lights: const [
        Fiber3DAmbientLight(color: 0xffffff, intensity: 0.3),
        Fiber3DPointLight(
          color: 0xffffff,
          intensity: 3.0,
          position: Fiber3DVector3(4, 5, 5),
        ),
        Fiber3DPointLight(
          color: 0xffffff,
          intensity: 1.5,
          position: Fiber3DVector3(-4, 2, -2),
        ),
      ],
      children: [Fiber3DGltfModel(scene: scene, scale: 1.0)],
    );
  }
}`;

const SPIN = `Fiber3DGroup(
  onFrame: (elapsed, delta, transform) {
    final t = delta.inMicroseconds / 1e6;
    transform.rotation.y += t * 0.5;
  },
  children: [Fiber3DGltfModel(scene: scene, scale: 1.0)],
)`;

const EMBEDDED = `final text = await rootBundle.loadString('assets/YOUR_MODEL.gltf');
final scene = await Fiber3DGltfLoader.loadEmbeddedGltf(text);`;

const API_ROWS = [
  {
    sig: "Fiber3DGltfLoader.loadGlb(Uint8List bytes)",
    desc: "Parses a binary .glb. Returns Future<Fiber3DGltfScene>.",
  },
  {
    sig: "Fiber3DGltfLoader.loadEmbeddedGltf(String jsonText)",
    desc: "Parses a .gltf whose buffers and images are all base64 data URIs. You read the file text yourself. Returns Future<Fiber3DGltfScene>.",
  },
  {
    sig: "Fiber3DGltfModel(scene:, scale:)",
    desc: "Widget that adds a loaded scene to the canvas. scale (default 1.0) is a uniform scale applied to the whole model.",
  },
];

const SUPPORTED = [
  ".glb, and .gltf with embedded (data URI) buffers and images; PNG and JPEG images embedded in the file.",
  "The node hierarchy, with translation / rotation / scale or a single matrix per node.",
  "Triangle meshes with POSITION, NORMAL, TEXCOORD_0 and float COLOR_0 attributes, indexed or not.",
  "The metallic-roughness material: base color factor and texture, metallic and roughness factors, the combined metallic-roughness texture, emissiveFactor, and alphaMode BLEND (as transparency).",
  "KHR_materials_clearcoat (clearcoat factors) and KHR_materials_emissive_strength.",
];

const NOT_SUPPORTED = [
  "External .bin or image files referenced by URI.",
  "Primitives with more than 65,535 vertices (the loader throws a FormatException).",
  "Non-triangle primitives (lines, points, strips, fans) are skipped. Skinning, morph targets, animations, cameras and lights in the file are ignored.",
  "Normal, emissive and occlusion textures; alphaMode MASK (treated as opaque); texture wrap modes and UV transforms; normalized (non-float) vertex colors.",
  "Other KHR_materials_* extensions (specular, transmission and the rest) are ignored, so glass built with transmission renders as a plain alpha blend.",
  "There is no depth-sorted transparency pass, so a model with many alpha-blended parts can show sorting artifacts.",
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function GltfPage() {
  return (
    <>
      <GuideSection id="what" kicker="glTF / GLB models" title="Loading 3D models">
        <p>
          Besides procedural shapes, flutter_fiber loads finished 3D models in
          glTF 2.0 format: a binary <code className="text-accent-2">.glb</code>,
          or a <code className="text-accent-2">.gltf</code> with its data
          embedded. A loaded model keeps its node hierarchy, PBR materials and
          textures, and sits in a <code className="text-accent-2">Fiber3DCanvas</code>{" "}
          like any other shape, lit by the same lights and environment.
        </p>
        <p>
          Loading is two steps: parse the file into a{" "}
          <code className="text-accent-2">Fiber3DGltfScene</code>, then place
          that scene in the canvas with the{" "}
          <code className="text-accent-2">Fiber3DGltfModel</code> widget.
        </p>
      </GuideSection>

      <GuideSection id="demo" kicker="demo" title="Demo">
        <video
          src="/videos/car_screen.mp4"
          muted
          autoPlay
          loop
          playsInline
          controls
          className="w-full max-w-sm border border-border bg-black"
        />
        <p className="font-mono text-xs">
          A 30-material car model loaded from a .glb with the code below, lit
          with ACES Filmic tone mapping and the default procedural sky.
        </p>
      </GuideSection>

      <GuideSection id="usage" kicker="how to use it" title="How to use it">
        <p>
          1. Put the model in your app and declare it under{" "}
          <code className="text-accent-2">flutter: assets:</code> in{" "}
          <code className="text-accent-2">pubspec.yaml</code>:
        </p>
        <CodeBlock language="yaml" code={PUBSPEC} />
        <p>
          2. Load the bytes, parse them, and show the scene. This is a complete
          widget you can drop into your app:
        </p>
        <CodeBlock code={VIEWER} />
        <p>
          <span className="text-accent-2">Scale and framing.</span> glTF files
          disagree on real-world units (meters versus centimeters is common),
          so a model can arrive far smaller or larger than your camera expects.
          Use <code className="text-accent-2">Fiber3DGltfModel.scale</code> and
          the camera distance to frame it.
        </p>
        <p>
          <span className="text-accent-2">Rotating or moving a model.</span>{" "}
          Wrap it in a <code className="text-accent-2">Fiber3DGroup</code> and
          drive that group&apos;s transform in{" "}
          <code className="text-accent-2">onFrame</code>:
        </p>
        <CodeBlock code={SPIN} />
        <p>
          <span className="text-accent-2">A .gltf with embedded data.</span>{" "}
          Read the file as text and use{" "}
          <code className="text-accent-2">loadEmbeddedGltf</code>:
        </p>
        <CodeBlock code={EMBEDDED} />
      </GuideSection>

      <GuideSection id="api" kicker="api reference" title="API reference">
        <div className="border border-border bg-panel">
          {API_ROWS.map((row) => (
            <div
              key={row.sig}
              className="p-5 border-b border-border last:border-b-0"
            >
              <h3 className="font-mono text-sm text-accent-2 mb-2 break-words">
                {row.sig}
              </h3>
              <p>{row.desc}</p>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection id="limits" kicker="supported & limits" title="Supported & limits">
        <h3 className="font-mono text-sm text-accent-2">Supported</h3>
        <BulletList items={SUPPORTED} />
        <h3 className="font-mono text-sm text-accent-2 mt-4">Not supported (yet)</h3>
        <BulletList items={NOT_SUPPORTED} />
      </GuideSection>
    </>
  );
}