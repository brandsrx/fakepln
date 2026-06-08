"use client";

import ReactMarkdown from "react-markdown";

export default function MarkdownMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-slate-950">{children}</strong>,
        ul: ({ children }) => <ul className="mb-3 ml-5 list-disc space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="mb-3 ml-5 list-decimal space-y-1">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        h1: ({ children }) => <h1 className="mb-3 text-xl font-semibold text-[#0a2540]">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-3 text-lg font-semibold text-[#0a2540]">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-2 text-base font-semibold text-[#0a2540]">{children}</h3>,
        blockquote: ({ children }) => (
          <blockquote className="mb-3 border-l-4 border-indigo-200 bg-indigo-50/70 py-2 pl-4 text-slate-700">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.92em] text-slate-800">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
