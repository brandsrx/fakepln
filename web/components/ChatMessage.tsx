"use client";

import { FiCpu, FiUser } from "react-icons/fi";
import MarkdownMessage from "@/components/MarkdownMessage";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  status?: "streaming" | "error" | "done";
};

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0a2540] text-white shadow-sm">
          <FiCpu className="h-4 w-4" />
        </div>
      )}

      <div
        className={`max-w-[min(720px,88%)] rounded-2xl border px-4 py-3 text-sm leading-7 shadow-sm sm:px-5 ${
          isUser
            ? "border-indigo-500 bg-[#635bff] text-white"
            : message.status === "error"
              ? "border-rose-200 bg-rose-50 text-rose-900"
              : "border-slate-200 bg-white text-slate-700"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : message.content ? (
          <MarkdownMessage content={message.content} />
        ) : (
          <div className="flex items-center gap-2 text-slate-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            Analizando...
          </div>
        )}
      </div>

      {isUser && (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200">
          <FiUser className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
