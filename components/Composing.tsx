"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CodeBlock from "./CodeBlock";

const TRAIN_CODE = `import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_fiber/src/renderer/fiber3d_canvas.dart';
import 'package:flutter_fiber/src/core/fiber3d_group.dart';
import 'package:flutter_fiber/src/core/fiber3d_mesh.dart';
import 'package:flutter_fiber/src/core/fiber3d_vector3.dart';
import 'package:flutter_fiber/src/material/fiber3d_standard_material.dart';
import 'package:flutter_fiber/src/light/fiber3d_ambient_light.dart';
import 'package:flutter_fiber/src/light/fiber3d_point_light.dart';
import 'package:flutter_fiber/src/camera/fiber3d_camera.dart';
import 'package:flutter_fiber/src/geometry/fiber3d_box.dart';
import 'package:flutter_fiber/src/geometry/fiber3d_cone.dart';
import 'package:flutter_fiber/src/geometry/fiber3d_cylinder.dart';

void main() {
  runApp(const FiberTrainDemo());
}

class FiberTrainDemo extends StatelessWidget {
  const FiberTrainDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: const Text('flutter_fiber toy train (composed shapes)'),
          backgroundColor: const Color(0xFF828282),
        ),
        body: Fiber3DCanvas(
          backgroundColor: 0x87ceeb,
          camera: Fiber3DCamera(
            position: const Fiber3DVector3(0, 1.0, 7),
            target: const Fiber3DVector3(0, 0.3, 0),
          ),
          orbitEnabled: true,
          lights: [
            const Fiber3DAmbientLight(color: 0xffffff, intensity: 0.7),
            Fiber3DPointLight(
              color: 0xffffff,
              intensity: 3.0,
              position: const Fiber3DVector3(3, 4, 5),
            ),
            Fiber3DPointLight(
              color: 0xffffff,
              intensity: 1.2,
              position: const Fiber3DVector3(-3, 2, -2),
            ),
          ],
          children: const [_ToyTrain()],
        ),
      ),
    );
  }
}

/// Cab (box), boiler (horizontal cylinder), chimney (nested group), and
/// six wheels — one Fiber3DGroup, whole train spins as one turntable
/// unit while each wheel also spins independently about its own axle.
class _ToyTrain extends StatelessWidget {
  const _ToyTrain();

  @override
  Widget build(BuildContext context) {
    return Fiber3DGroup(
      onFrame: (elapsed, delta, transform) {
        final t = delta.inMicroseconds / 1e6;
        transform.rotation.y += t * 0.3;
      },
      children: const [
        _TrainBody(),
        _TrainBoiler(),
        _Chimney(),
        _Wheel(axleX: 1.0, radius: 0.32, side: 1),
        _Wheel(axleX: 1.0, radius: 0.32, side: -1),
        _Wheel(axleX: -0.9, radius: 0.5, side: 1),
        _Wheel(axleX: -0.9, radius: 0.5, side: -1),
        _Wheel(axleX: 0, radius: 0.32, side: 1),
        _Wheel(axleX: 0, radius: 0.32, side: -1),
      ],
    );
  }
}

class _TrainBody extends StatelessWidget {
  const _TrainBody();
  @override
  Widget build(BuildContext context) {
    return Fiber3DMesh(
      geometry: Fiber3DBox(width: 1.6, height: 1.4, depth: 1.3),
      material: const Fiber3DStandardMaterial(
        color: 0xcc1111,
        roughness: 0.4,
        metalness: 0.3,
        flatShading: true,
      ),
      onFrame: (elapsed, delta, transform) {
        transform.position.set(-0.9, 0.8, 0);
      },
    );
  }
}

class _TrainBoiler extends StatelessWidget {
  const _TrainBoiler();
  @override
  Widget build(BuildContext context) {
    return Fiber3DMesh(
      geometry: Fiber3DCylinder(
        radiusTop: 0.5,
        radiusBottom: 0.5,
        height: 2.0,
        radialSegments: 24,
      ),
      material: const Fiber3DStandardMaterial(
        color: 0xcc1111,
        roughness: 0.4,
        metalness: 0.3,
        flatShading: true,
      ),
      onFrame: (elapsed, delta, transform) {
        transform.rotation.z = -pi / 2;
        transform.position.set(0.6, 0.5, 0);
      },
    );
  }
}

class _Chimney extends StatelessWidget {
  const _Chimney();
  @override
  Widget build(BuildContext context) {
    return Fiber3DGroup(
      children: [
        Fiber3DMesh(
          geometry: Fiber3DCylinder(
            radiusTop: 0.12,
            radiusBottom: 0.14,
            height: 0.35,
            radialSegments: 16,
          ),
          material: const Fiber3DStandardMaterial(
            color: 0x1a1a1a,
            roughness: 0.5,
            metalness: 0.4,
            flatShading: true,
          ),
          onFrame: (elapsed, delta, transform) {
            transform.position.set(1.0, 1.175, 0);
          },
        ),
        Fiber3DMesh(
          geometry: Fiber3DCone(radius: 0.16, height: 0.18, radialSegments: 16),
          material: const Fiber3DStandardMaterial(
            color: 0x1a1a1a,
            roughness: 0.5,
            metalness: 0.4,
            flatShading: true,
          ),
          onFrame: (elapsed, delta, transform) {
            transform.position.set(1.0, 1.44, 0);
          },
        ),
      ],
    );
  }
}

class _Wheel extends StatelessWidget {
  final double axleX;
  final double radius;
  final int side;

  const _Wheel({required this.axleX, required this.radius, required this.side});

  @override
  Widget build(BuildContext context) {
    const wheelThickness = 0.28;
    const bodyHalfDepth = 0.5;

    return Fiber3DMesh(
      geometry: Fiber3DCylinder(
        radiusTop: radius,
        radiusBottom: radius,
        height: wheelThickness,
        radialSegments: 20,
      ),
      material: const Fiber3DStandardMaterial(
        color: 0x1a3d33,
        roughness: 0.5,
        metalness: 0.3,
        flatShading: true,
      ),
      onFrame: (elapsed, delta, transform) {
        final z = side * (bodyHalfDepth + wheelThickness / 2);
        final y = radius;
        transform.position.set(axleX, y, z);
        transform.rotation.x = pi / 2;
        final t = delta.inMicroseconds / 1e6;
        transform.rotation.y += t * 4;
      },
    );
  }
}`;

export default function Composing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll("[data-compose]");
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
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
      id="composing"
      ref={containerRef}
      className="px-5 sm:px-8 md:px-12 py-20 border-b border-border"
    >
      <p className="font-mono text-xs text-text-dim mb-3">// composing shapes</p>
      <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-4">
        Combining Shapes with Fiber3DGroup
      </h2>
      <p className="font-sans text-sm sm:text-base text-text-dim max-w-2xl mb-10 leading-relaxed">
        Primitives aren&apos;t just decoration they&apos;re building blocks. Group
        several meshes to move, rotate, and scale them together as one
        composite object, the same way most real 3D content is actually built.
        This toy train combines a box, two cylinders, and a cone into one
        rigid group that spins as a whole, while each wheel also spins
        independently about its own axle.
      </p>

      <div data-compose className="max-w-2xl mb-8">
        <video
          src="/videos/train_toy_screenshot.mp4"
          muted
          autoPlay
          loop
          playsInline
          controls
          className="w-full border border-border bg-black"
        />
      </div>

      <div data-compose className="max-w-3xl">
        <CodeBlock code={TRAIN_CODE} />
      </div>
    </section>
  );
}