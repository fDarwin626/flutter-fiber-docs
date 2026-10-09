import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import GuideSection from "@/components/GuideSection";

export const metadata: Metadata = {
  title: "Photo in shape | flutter_fiber",
  description:
    "Wrap any image (a photo, logo or map) onto a 3D shape in flutter_fiber using Fiber3DTexture and the material's map.",
};

const PUBSPEC = `flutter:
  assets:
    - assets/images/your_image.png`;

const LOAD = `import 'package:flutter/services.dart' show rootBundle;
import 'package:flutter_fiber/flutter_fiber.dart';

Fiber3DTexture? _texture;

@override
void initState() {
  super.initState();
  _loadTexture();
}

Future<void> _loadTexture() async {
  final data = await rootBundle.load('assets/images/your_image.png');
  final bytes = data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);

  final texture = Fiber3DTexture(bytes);
  await texture.ensureDecoded(); // texture.isReady is now true

  if (!mounted) return;
  setState(() => _texture = texture);
}`;

const USE = `// In build(): wait until the texture is ready.
final texture = _texture;
if (texture == null) {
  return const Center(child: CircularProgressIndicator());
}

// Then, inside your Fiber3DCanvas children:
Fiber3DMesh(
  geometry: Fiber3DSphere(radius: 1.8, widthSegments: 64, heightSegments: 48),
  material: Fiber3DStandardMaterial(
    color: 0xffffff, // white = show the image untinted
    roughness: 0.85,
    map: texture,
  ),
  showEdges: false,
  onFrame: (elapsed, delta, transform) {
    transform.rotation.y = elapsed.inMicroseconds / 1e6 * 0.25; // slow spin
  },
)`;

const BOX = `Fiber3DMesh(
  geometry: Fiber3DBox(width: 1.0, height: 1.0, depth: 1.0),
  material: Fiber3DStandardMaterial(
    color: 0xffffff,
    roughness: 0.6,
    map: texture,
  ),
  showEdges: false,
)`;

export default function PhotoInShapePage() {
  return (
    <>
      <GuideSection id="what" kicker="photo in shape" title="Photo in shape">
        <p>
          Any image (a photo, a logo, a map) can be wrapped onto a 3D shape.
          You give flutter_fiber the image bytes, it decodes them into a{" "}
          <code className="text-accent-2">Fiber3DTexture</code>, and you assign
          that texture to the{" "}
          <code className="text-accent-2">map</code> of a{" "}
          <code className="text-accent-2">Fiber3DStandardMaterial</code>. The
          shape&apos;s surface then shows the image, lit like any other
          surface.
        </p>
        <p>
          There is no image-loading dependency. The package takes raw bytes
          from wherever you get them (app assets, a file, the network) and
          decodes them with Flutter&apos;s own image codec.
        </p>
      </GuideSection>

      <GuideSection id="demo" kicker="demo" title="Demo">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <video
              src="/videos/earth_photo_in_shape_screen.mp4"
              muted
              autoPlay
              loop
              playsInline
              controls
              className="w-full border border-border bg-black"
            />
            <p className="font-mono text-xs mt-3">
              A world image wrapped around a Fiber3DSphere.
            </p>
          </div>
          <div>
            <video
              src="/videos/photo_in_shape_logo_screen.mp4"
              muted
              autoPlay
              loop
              playsInline
              controls
              className="w-full border border-border bg-black"
            />
            <p className="font-mono text-xs mt-3">
              A logo on a Fiber3DBox. The same image appears on every face.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection id="usage" kicker="how to use it" title="How to use it">
        <p>
          Replace <code className="text-accent-2">your_image.png</code> with
          your own file. The three steps are the same for every shape.
        </p>
        <p>
          <span className="text-accent-2">1. Add the image to your app</span>{" "}
          and declare it under{" "}
          <code className="text-accent-2">flutter: assets:</code> in your{" "}
          <code className="text-accent-2">pubspec.yaml</code>:
        </p>
        <CodeBlock language="yaml" code={PUBSPEC} />
        <p>
          <span className="text-accent-2">2. Load and decode it.</span>{" "}
          Decoding is asynchronous, so wait for{" "}
          <code className="text-accent-2">ensureDecoded()</code> before using
          the texture. In a{" "}
          <code className="text-accent-2">State</code> class:
        </p>
        <CodeBlock code={LOAD} />
        <p>
          <span className="text-accent-2">3. Use it as the material&apos;s map</span>{" "}
          on any shape. Here it is on a sphere. The surrounding canvas, camera
          and lights are set up as in{" "}
          <Link href="/#install" className="text-accent-2 hover:underline">
            Install &amp; Quick Start
          </Link>
          :
        </p>
        <CodeBlock code={USE} />
      </GuideSection>

      <GuideSection id="shapes" kicker="choosing a shape" title="Choosing a shape">
        <p>
          <span className="text-accent-2">Sphere (a globe or ball).</span> The
          sphere wraps the image around itself, so use a wide image with a 2:1
          ratio, like a flat world map (an equirectangular image). Raise{" "}
          <code className="text-accent-2">widthSegments</code> and{" "}
          <code className="text-accent-2">heightSegments</code> for a smoother
          surface.
        </p>
        <p>
          <span className="text-accent-2">Box (a logo, a label).</span> Each of
          the six faces shows the whole image. Swap the geometry in step 3:
        </p>
        <CodeBlock code={BOX} />
        <p>
          <span className="text-accent-2">A flat picture.</span> Use a{" "}
          <code className="text-accent-2">Fiber3DPlane</code> with the same
          width-to-height ratio as the image, so it isn&apos;t stretched.
        </p>
        <p>
          <span className="text-accent-2">A different image on each face.</span>{" "}
          One mesh holds one material, and so one image. To show a different
          image on each face, build the shape from separate planes, one per
          face, each with its own texture. The{" "}
          <Link
            href="/guides/text-in-shape"
            className="text-accent-2 hover:underline"
          >
            Text in shape
          </Link>{" "}
          page shows this with a six-sided die. It works the same way for
          images.
        </p>
      </GuideSection>

      <GuideSection id="tips" kicker="tips & limits" title="Tips & limits">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Use <code className="text-accent-2">color: 0xffffff</code> to show
            the image untinted. The material color multiplies the image, so any
            other color tints it.
          </li>
          <li>
            With color management on (the default), the image is treated as
            sRGB, so its colors match the original file.
          </li>
          <li>
            The image is lit like any surface, so a dark image stays dark. If
            it looks too dim, raise the ambient light intensity or use a
            brighter image.
          </li>
          <li>
            Only <code className="text-accent-2">Fiber3DStandardMaterial</code>{" "}
            accepts textures. Images use the geometry&apos;s first UV set,
            linear filtering and clamp-to-edge wrapping, with no mipmaps. An
            image shown much smaller than its pixel size can look noisy, so
            resize large sources to roughly the size they will appear.
          </li>
          <li>
            The decoded image is uploaded to the GPU once and is released when
            the canvas is disposed.
          </li>
        </ul>
      </GuideSection>
    </>
  );
}