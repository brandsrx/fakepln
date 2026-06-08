"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChatInput from "@/components/ChatInput";
import ChatMessage, { Message } from "@/components/ChatMessage";
import { useChat } from "@/context/chat-context";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEdit3,
  FiHome,
  FiMessageSquare,
  FiSearch,
  FiShield,
} from "react-icons/fi";
import Link from "next/link";

const START_MESSAGE_KEY = "verox:start-message";

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getAssistantTextFromJson(data: any) {
  return (
    data?.botResponse ??
    data?.message ??
    data?.response ??
    data?.raw?.choices?.[0]?.message?.content ??
    "No se recibió respuesta de Verox."
  );
}

export default function ChatPage() {
  const { message: pendingMessage, setMessage: setPendingMessage } = useChat();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");

  const bootstrapped = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const sendMessage = useCallback(
    async (rawMessage: string) => {
      const cleanMessage = rawMessage.trim();

      if (!cleanMessage || isStreaming) return;

      const userMessage: Message = {
        id: createId(),
        role: "user",
        content: cleanMessage,
        status: "done",
      };

      const assistantId = createId();

      const assistantMessage: Message = {
        id: assistantId,
        role: "assistant",
        content: "Analizando la noticia...",
        status: "streaming",
      };

      const history = messagesRef.current
        .filter((message) => message.status !== "error")
        .map(({ role, content }) => ({ role, content }));

      setMessages((current) => [...current, userMessage, assistantMessage]);
      setInput("");
      setError("");
      setIsStreaming(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: cleanMessage,
            history,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.message ?? "No se pudo completar el análisis.");
        }

        const contentType = response.headers.get("content-type") ?? "";

        // Si el backend todavía responde JSON normal
        if (contentType.includes("application/json")) {
          const data = await response.json();
          const botResponse = getAssistantTextFromJson(data);

          setMessages((current) =>
            current.map((message) =>
              message.id === assistantId
                ? {
                    ...message,
                    content: botResponse,
                    status: "done",
                  }
                : message
            )
          );

          return;
        }

        // Si el backend responde streaming real
        if (!response.body) {
          throw new Error("No se recibió cuerpo de respuesta.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let assistantContent = "";
        let firstChunk = true;

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          if (!chunk) continue;

          assistantContent += chunk;

          setMessages((current) =>
            current.map((message) =>
              message.id === assistantId
                ? {
                    ...message,
                    content: firstChunk ? chunk : assistantContent,
                    status: "streaming",
                  }
                : message
            )
          );

          firstChunk = false;
        }

        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: assistantContent || "No se recibió respuesta de Verox.",
                  status: "done",
                }
              : message
          )
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ocurrió un error inesperado al conectar con Verox.";

        setError(errorMessage);

        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  status: "error",
                  content: `**No pude completar el análisis.**\n\n${errorMessage}`,
                }
              : message
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming]
  );

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    const storedMessage =
      typeof window !== "undefined"
        ? sessionStorage.getItem(START_MESSAGE_KEY)
        : "";

    const initialMessage = pendingMessage?.trim() || storedMessage?.trim() || "";

    if (!initialMessage) return;

    sessionStorage.removeItem(START_MESSAGE_KEY);
    setPendingMessage("");

    void sendMessage(initialMessage);
  }, [pendingMessage, sendMessage, setPendingMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setError("");
    setIsStreaming(false);
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-[#f8fafc] text-slate-900">
      <aside className="hidden w-72 shrink-0 border-r border-slate-200/80 bg-white/80 p-3 backdrop-blur-xl md:flex md:flex-col">
        <Link
          href="/"
          className="mb-3 flex items-center gap-2 rounded-xl px-3 py-3 text-lg font-semibold text-[#0a2540] transition hover:bg-slate-50"
        >
          <span>Ver</span>
          <span className="text-indigo-600">ox</span>
        </Link>

        <button
          type="button"
          onClick={resetChat}
          disabled={isStreaming}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiEdit3 className="h-4 w-4" />
          Nuevo chat
        </button>

        <div className="mt-4 space-y-2">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Navegación
          </p>

          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
          >
            <FiHome className="h-4 w-4" />
            Inicio
          </Link>

          <div className="flex items-center gap-3 rounded-xl bg-slate-950 px-3 py-2.5 text-sm font-medium text-white shadow-sm">
            <FiMessageSquare className="h-4 w-4 text-indigo-300" />
            Chat de análisis
          </div>
        </div>

        <div className="mt-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
            {isStreaming ? (
              <FiSearch className="h-4 w-4 animate-pulse text-indigo-600" />
            ) : (
              <FiCheckCircle className="h-4 w-4 text-emerald-500" />
            )}
            {isStreaming ? "Generando respuesta..." : "Listo para analizar"}
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Pega una noticia o titular y Verox te dará un veredicto probable con recomendaciones.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
          <Link href="/" className="text-lg font-semibold text-[#0a2540]">
            Ver<span className="text-indigo-600">ox</span>
          </Link>

          <button
            type="button"
            onClick={resetChat}
            disabled={isStreaming}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 disabled:opacity-60"
          >
            Nuevo
          </button>
        </header>

        <div className="border-b border-slate-100 bg-white/90 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0a2540] text-white shadow-sm">
                <FiShield className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-sm font-semibold text-slate-950">
                  Verox
                </h1>
                <p className="truncate text-xs text-slate-500">
                  {isStreaming
                    ? "Analizando y redactando la respuesta..."
                    : "Asistente de análisis de desinformación"}
                </p>
              </div>
            </div>

            <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:inline-flex">
              PLN en español
            </span>
          </div>
        </div>

        {error && (
          <div className="mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-3xl items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            {messages.length === 0 && (
              <div className="flex min-h-[55vh] items-center justify-center">
                <div className="max-w-xl text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
                    <FiShield className="h-6 w-6" />
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                    Analiza una noticia con Verox
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Pega una noticia, titular o texto informativo. Verox evaluará señales de desinformación y generará una respuesta clara.
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            <div ref={bottomRef} />
          </div>
        </div>

        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={() => void sendMessage(input)}
          disabled={isStreaming}
        />
      </div>
    </div>
  );
}