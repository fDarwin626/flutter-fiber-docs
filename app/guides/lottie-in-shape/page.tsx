import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import GuideSection from "@/components/GuideSection";

export const metadata: Metadata = {
  title: "Lottie in shape | flutter_fiber",
  description:
    "Play a Lottie animation, or any live Flutter widget, on a 3D shape in flutter_fiber with Fiber3DWidgetTexture.",
};

const SETUP = `flutter pub add lottie`;

const PUBSPEC = `flutter:
  assets:
    - assets/lottie/your_animation.json`;

const STATE = `import 'dart:typed_data';
import 'package:flutter/services.dart' show rootBundle;
import 'package:flutter_fiber/flutter_fiber.dart';
import 'package:lottie/lottie.dart';

// A 1x1 white placeholder, shown until the first frame is captured.
final Fiber3DTexture _texture = Fiber3DTexture.raw(
  Uint8List.fromList([255, 255, 255, 255]),
  1,
  1,
);
Uint8List? _lottieBytes;

@override
void initState() {
  super.initState();
  rootBundle.load('assets/lottie/your_animation.json').then((data) {
    if (!mounted) return;
    setState(() {
      _lottieBytes = data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);
    });
  });
}`;

const BUILD = `// A Stack holds the canvas and the widget texture side by side.
Stack(
  children: [
    Fiber3DCanvas(
      // camera, lights, orbitEnabled ... as usual
      children: [
        Fiber3DMesh(
          geometry: Fiber3DPlane(width: 2, height: 2),
          material: Fiber3DStandardMaterial(
            map: _texture,
            roughness: 1.0,
            metalness: 0.0,
          ),
          showEdges: false,
          // Keeps the canvas rendering so it keeps re-reading the texture.
          onFrame: (elapsed, delta, transform) {},
        ),
      ],
    ),
    if (_lottieBytes != null)
      Fiber3DWidgetTexture(
        texture: _texture,
        child: Lottie.memory(_lottieBytes!),
      ),
  ],
)`;

const PARAMS = [
  { name: "child", def: "required", desc: "The widget to capture (here, the Lottie animation)." },
  { name: "texture", def: "required", desc: "The Fiber3DTexture that is updated with each captured frame." },
  { name: "width", def: "256", desc: "Off-screen render width in logical pixels. Larger = sharper, but slower." },
  { name: "height", def: "256", desc: "Off-screen render height in logical pixels." },
  { name: "fps", def: "30", desc: "How often the widget is captured, independent of the child's own animation rate." },
];

export default function LottieInShapePage() {
  return (
    <>
      <GuideSection id="what" kicker="lottie in shape" title="Lottie in shape">
        <p>
          <code className="text-accent-2">Fiber3DWidgetTexture</code> renders
          any Flutter widget off-screen and copies it into a texture many
          times a second. Put that texture on a shape and the shape shows the
          widget live. This is how you put a Lottie animation, a video player,
          a chart or an animated counter onto a 3D surface.
        </p>
        <p>
          flutter_fiber has no Lottie dependency. Your app brings whichever
          package produces the widget. This page uses the{" "}
          <code className="text-accent-2">lottie</code> package, but any widget
          works the same way.
        </p>
      </GuideSection>

      <GuideSection id="demo" kicker="demo" title="Demo">
        <video
          src="/videos/lottie_in_shape_screen.mp4"
          muted
          autoPlay
          loop
          playsInline
          controls
          className="w-full max-w-sm border border-border bg-black"
        />
        <p className="font-mono text-xs">
          A Lottie animation playing live on a Fiber3DPlane.
        </p>
      </GuideSection>

      <GuideSection id="usage" kicker="how to use it" title="How to use it">
        <p>
          Replace <code className="text-accent-2">your_animation.json</code>{" "}
          with your own Lottie file.
        </p>
        <p>
          <span className="text-accent-2">1. Add the Lottie package</span> and
          your animation file:
        </p>
        <CodeBlock language="bash" code={SETUP} />
        <CodeBlock language="yaml" code={PUBSPEC} />
        <p>
          <span className="text-accent-2">2. Create a placeholder texture and load the file.</span>{" "}
          The texture starts as one white pixel and is replaced by the real
          animation as soon as the first frame is captured. In a{" "}
          <code className="text-accent-2">State</code> class:
        </p>
        <CodeBlock code={STATE} />
        <p>
          <span className="text-accent-2">3. Build the scene.</span> Put a{" "}
          <code className="text-accent-2">Stack</code> around the canvas and
          add <code className="text-accent-2">Fiber3DWidgetTexture</code> as
          its sibling, with the animation as its{" "}
          <code className="text-accent-2">child</code>. The mesh that shows it
          uses the same texture as its <code className="text-accent-2">map</code>:
        </p>
        <CodeBlock code={BUILD} />
      </GuideSection>

      <GuideSection id="params" kicker="parameters" title="Parameters">
        <p>
          Parameters of{" "}
          <code className="text-accent-2">Fiber3DWidgetTexture</code>:
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
            <code className="text-accent-2">Fiber3DWidgetTexture</code> must be
            a direct child of a <code className="text-accent-2">Stack</code>.
            It keeps the widget painted off-screen, out of sight, so it can be
            captured.
          </li>
          <li>
            Give the mesh an <code className="text-accent-2">onFrame</code>,
            even an empty one. Without any registered{" "}
            <code className="text-accent-2">onFrame</code> the canvas stops
            rendering after one frame and never picks up the texture&apos;s
            updates.
          </li>
          <li>
            A larger <code className="text-accent-2">width</code> /{" "}
            <code className="text-accent-2">height</code> gives a sharper
            texture but costs more per capture. Match the aspect ratio of the
            surface you map it on (the default 256 x 256 suits a square plane).
          </li>
          <li>
            <code className="text-accent-2">fps</code> only controls how often
            the widget is sampled. A lower value saves work; the animation
            itself keeps its own speed.
          </li>
          <li>
            Only <code className="text-accent-2">Fiber3DStandardMaterial</code>{" "}
            accepts textures, and the texture is lit like any surface.
          </li>
          <li>
            For text that never changes, use{" "}
            <Link href="/guides/text-in-shape" className="text-accent-2 hover:underline">
              Text in shape
            </Link>{" "}
            instead: it rasterizes once, with no per-frame cost.
          </li>
        </ul>
      </GuideSection>
    </>
  );
}