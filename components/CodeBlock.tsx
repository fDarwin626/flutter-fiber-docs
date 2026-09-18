"use client";

import { useState } from "react";

export default function CodeBlock({
  code,
  language = "dart",
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border border-border bg-panel">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="font-mono text-[11px] text-text-dim">{language}</span>
        <button
          onClick={handleCopy}
          className="font-mono text-[11px] text-text-dim hover:text-accent-2 transition-colors"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="px-4 py-4 overflow-x-auto">
        <code className="font-mono text-xs sm:text-sm text-text leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}