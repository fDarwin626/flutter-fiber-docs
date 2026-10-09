export type NavSection = { id: string; label: string };
export type Topic = { slug: string; label: string; sections: NavSection[] };

export const HOME_SECTIONS: NavSection[] = [
  { id: "hero", label: "flutter_fiber" },
  { id: "why", label: "Why" },
  { id: "install", label: "Install & Quick Start" },
  { id: "shapes", label: "Shape Gallery" },
  { id: "composing", label: "Composing Shapes" },
  { id: "api", label: "API Reference" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "roadmap", label: "Roadmap" },
];

export const TOPICS: Topic[] = [
  {
    slug: "gltf",
    label: "glTF / GLB models",
    sections: [
      { id: "what", label: "What it is" },
      { id: "demo", label: "Demo" },
      { id: "usage", label: "How to use it" },
      { id: "api", label: "API reference" },
      { id: "limits", label: "Supported & limits" },
    ],
  },
  {
    slug: "materials",
    label: "Materials",
    sections: [
      { id: "what", label: "What it is" },
      { id: "demo", label: "Demo" },
      { id: "usage", label: "How to use it" },
      { id: "list", label: "The materials" },
      { id: "tips", label: "Tips & limits" },
    ],
  },
  {
    slug: "clearcoat",
    label: "Clearcoat",
    sections: [
      { id: "what", label: "What it is" },
      { id: "demo", label: "Demo" },
      { id: "usage", label: "How to use it" },
      { id: "params", label: "Parameters" },
      { id: "tips", label: "Tips & limits" },
    ],
  },
  {
    slug: "hemisphere-light",
    label: "Hemisphere light",
    sections: [
      { id: "what", label: "What it is" },
      { id: "demo", label: "Demo" },
      { id: "usage", label: "How to use it" },
      { id: "params", label: "Parameters" },
      { id: "tips", label: "Tips & limits" },
    ],
  },
  {
    slug: "vertex-colors",
    label: "Vertex colors",
    sections: [
      { id: "what", label: "What it is" },
      { id: "demo", label: "Demo" },
      { id: "usage", label: "How to use it" },
      { id: "tips", label: "Tips & limits" },
    ],
  },
  {
    slug: "photo-in-shape",
    label: "Photo in shape",
    sections: [
      { id: "what", label: "What it is" },
      { id: "demo", label: "Demo" },
      { id: "usage", label: "How to use it" },
      { id: "shapes", label: "Choosing a shape" },
      { id: "tips", label: "Tips & limits" },
    ],
  },
  {
    slug: "lottie-in-shape",
    label: "Lottie in shape",
    sections: [
      { id: "what", label: "What it is" },
      { id: "demo", label: "Demo" },
      { id: "usage", label: "How to use it" },
      { id: "params", label: "Parameters" },
      { id: "tips", label: "Tips & limits" },
    ],
  },
  {
    slug: "text-in-shape",
    label: "Text in shape",
    sections: [
      { id: "what", label: "What it is" },
      { id: "demo", label: "Demo" },
      { id: "usage", label: "How to use it" },
      { id: "params", label: "Parameters" },
      { id: "tips", label: "Tips & limits" },
    ],
  },
];