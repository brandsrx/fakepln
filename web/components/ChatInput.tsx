"use client";

import { useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 220)}px`;
  }, [value]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="bg-gradient-to-t from-white via-white/95 to-white/70 px-4 pb-5 pt-3 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-[1.35rem] border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Escribe una pregunta o pega otra noticia..."
          className="max-h-[220px] min-h-11 flex-1 resize-none overflow-y-auto bg-transparent px-3 py-3 text-[15px] leading-6 text-slate-900 outline-none placeholder:text-slate-400"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#635bff] text-white shadow-md shadow-indigo-600/20 transition hover:bg-[#5448ee] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Enviar mensaje"
        >
          <FiSend className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
