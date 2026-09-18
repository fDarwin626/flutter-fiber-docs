"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { id: "hero", label: "flutter_fiber" },
  { id: "why", label: "Why" },
  { id: "install", label: "Install & Quick Start" },
  { id: "shapes", label: "Shape Gallery" },
  { id: "composing", label: "Composing Shapes" },
  { id: "api", label: "API Reference" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "roadmap", label: "Roadmap" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const NavContent = (
    <>
      <div className="px-5 py-5 border-b border-border">
        <span className="font-mono text-sm text-accent-2">flutter_fiber</span>
      </div>
      <ul className="flex-1 overflow-y-auto py-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="block px-5 py-2 font-mono text-xs text-text-dim hover:text-accent-2 hover:bg-bg transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="px-5 py-4 border-t border-border">
        <a
          href="https://pub.dev/packages/flutter_fiber"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-xs font-mono text-text-dim hover:text-accent-2 transition-colors"
        >
          pub.dev →
        </a>
        <a
          href="https://github.com/fDarwin626/flutter_fiber"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-xs font-mono text-text-dim hover:text-accent-2 transition-colors mt-1"
        >
          GitHub →
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 border-r border-border bg-panel flex-col">
        {NavContent}
      </nav>

      {/* Mobile floating circular menu button */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={`md:hidden fixed z-50 w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
          open
            ? "top-3 left-44 bg-transparent border-transparent"
            : "top-5 left-5 bg-panel border-border"
        }`}      
        >
        <span className="relative w-4 h-4">
          <span
            className={`absolute left-0 top-1/2 h-[1.5px] w-4 bg-text transition-all duration-300 ${
              open ? "rotate-45 translate-y-0" : "-translate-y-[5px]"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-[1.5px] w-4 bg-text transition-all duration-300 ${
              open ? "-rotate-45 translate-y-0" : "translate-y-[5px]"
            }`}
          />
        </span>
      </button>

      {/* Mobile backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile drawer */}
      <nav
        className={`md:hidden fixed top-0 left-0 bottom-0 w-60 border-r border-border bg-panel z-40 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {NavContent}
      </nav>
    </>
  );
}