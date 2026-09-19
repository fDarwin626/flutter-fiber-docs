"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CodeBlock from "./CodeBlock";

const QUICK_START = `import 'package:flutter/material.dart';
import 'package:flutter_fiber/flutter_fiber.dart';


void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('flutter_fiber')),
        body: Fiber3DCanvas(
          backgroundColor: 0x1e1e1e,
          camera: Fiber3DCamera(
            position: const Fiber3DVector3(0, 0, 5),
            target: const Fiber3DVector3.zero(),
          ),
          orbitEnabled: true, // drag to orbit, pinch to zoom
          lights: [
            const Fiber3DAmbientLight(color: 0xffffff, intensity: 0.6),
            Fiber3DPointLight(
              color: 0xffffff,
              intensity: 3.0,
              position: const Fiber3DVector3(3, 4, 5),
            ),
          ],
          children: [
            Fiber3DMesh(
              geometry: Fiber3DTorusKnot(radius: 1.0, tube: 0.3),
              material: const Fiber3DStandardMaterial(
                color: 0x3366ff,
                roughness: 0.5,
                metalness: 0.2,
              ),
              onFrame: (elapsed, delta, transform) {
                final t = delta.inMicroseconds / 1e6;
                transform.rotation.y += t;
                transform.rotation.x += t * 0.4;
              },
            ),
          ],
        ),
      ),
    );
  }
}`;

export default function Install() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const blocks = containerRef.current.querySelectorAll("[data-block]");
    gsap.fromTo(
      blocks,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
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
      id="install"
      ref={containerRef}
      className="px-5 sm:px-8 md:px-12 py-20 border-b border-border"
    >
      <p className="font-mono text-xs text-text-dim mb-3">// install & quick start</p>
      <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-8">
        Install & Quick Start
      </h2>

      <div data-block className="max-w-2xl mb-4">
        <p className="font-sans text-sm text-text-dim mb-3">
          Add the package with the Flutter CLI:
        </p>
        <CodeBlock language="bash" code="flutter pub add flutter_fiber" />
      </div>

      <div data-block className="max-w-2xl mb-10">
        <p className="font-sans text-sm text-text-dim mb-3">
          Or add it manually to <code className="text-accent-2">pubspec.yaml</code>:
        </p>
        <CodeBlock
          language="yaml"
          code={`dependencies:\n  flutter_fiber: ^0.1.3`}
        />
      </div>

      <div data-block className="max-w-2xl mb-6">
        <p className="font-sans text-sm text-text-dim">
          <span className="text-accent-2">Platform support:</span> Android is
          the primary, fully supported target. iOS is experimental and
          physical-device-only no simulator support, since Apple deprecated
          OpenGL ES.
        </p>
      </div>

      <div data-block className="max-w-2xl mb-10 border border-border bg-panel p-5">
        <p className="font-sans text-sm text-text-dim mb-3">
          <span className="text-accent-2">Required Android manifest fix</span>{" "}
          <span className="text-text-dim">(temporary, will be removed in a future release):</span>{" "}
          flutter_fiber&apos;s native OpenGL binding bundles its own small manifest,
          which currently conflicts with your app&apos;s <code className="text-accent-2">android:label</code>.
          Add <code className="text-accent-2">tools:replace=&quot;android:label&quot;</code> to your{" "}
          <code className="text-accent-2">android/app/src/main/AndroidManifest.xml</code>&apos;s{" "}
          <code className="text-accent-2">&lt;application&gt;</code> tag, and the{" "}
          <code className="text-accent-2">xmlns:tools</code> namespace to the root{" "}
          <code className="text-accent-2">&lt;manifest&gt;</code> tag:
        </p>
        <CodeBlock
          language="xml"
          code={`<manifest xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:tools="http://schemas.android.com/tools">
                <application
                    android:label="your_app_name"
                    android:name="\${applicationName}"
                    android:icon="@mipmap/ic_launcher"
                    tools:replace="android:label">
                    <!-- ...rest of your existing <application> content stays unchanged... -->
                </application>
            </manifest>`}
        />
        <p className="font-sans text-xs text-text-dim mt-3">
          Without this, the build fails with a manifest merge error:{" "}
          <code className="text-accent-2">Attribute application@label value=(...) is also present at [com.futouapp:threeegl...]</code>.
        </p>
      </div>
      <div data-block className="max-w-3xl">
        <p className="font-sans text-sm text-text-dim mb-3">
          A complete, working scene a lit, shaded, animated, orbit-controllable
          object in one file:
        </p>
        <CodeBlock code={QUICK_START} />
      </div>
    </section>
  );
}