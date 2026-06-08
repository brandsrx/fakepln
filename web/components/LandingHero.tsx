"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@/context/chat-context";
import { FiArrowRight, FiCheckCircle, FiCpu, FiSearch, FiShield } from "react-icons/fi";

const START_MESSAGE_KEY = "verox:start-message";

const proofPoints = [
  "Análisis en español",
  "Respuesta conversacional",
  "Recomendaciones de verificación",
];

export default function LandingHero() {
  const router = useRouter();
  const { setMessage } = useChat();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanText = text.trim();
    if (!cleanText) {
      setError("Pega una noticia, titular o fragmento para analizar.");
      return;
    }

    setMessage(cleanText);
    sessionStorage.setItem(START_MESSAGE_KEY, cleanText);
    setError("");
    router.push("/chat");
  }

  return (
    <section className="relative overflow-hidden bg-[#f6f9fc]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,37,64,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,37,64,0.05)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute left-1/2 top-0 h-[520px] w-[880px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,91,255,0.22),rgba(20,184,166,0.10)_42%,transparent_68%)] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pb-24 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm shadow-slate-200/70 backdrop-blur">
              <FiShield className="h-4 w-4 text-indigo-600" />
              Verox analiza señales de desinformación en segundos
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-[#0a2540] sm:text-5xl lg:text-6xl">
              Analiza noticias con una IA clara, seria y conversacional.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Pega un titular, publicación o nota informativa. Verox revisa el texto,
              explica el veredicto probable y te guía para verificarlo con criterio.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {proofPoints.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200"
                >
                  <FiCheckCircle className="h-4 w-4 text-emerald-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/82 p-3 shadow-2xl shadow-slate-900/12 backdrop-blur">
            <form
              onSubmit={handleSubmit}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#0a2540]">Consulta inicial</p>
                  <p className="mt-1 text-sm text-slate-500">Pega aquí el texto que quieres revisar.</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FiSearch className="h-5 w-5" />
                </div>
              </div>

              <textarea
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                  if (error) setError("");
                }}
                rows={8}
                placeholder="Ejemplo: Una publicación afirma que una nueva ley elimina todos los impuestos desde mañana..."
                className="mt-5 block w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-base leading-7 text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-h-5 text-sm text-rose-600">{error}</div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#635bff] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-[#5448ee] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!text.trim()}
                >
                  Analizar noticia
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="grid gap-3 p-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/86 p-4">
                <FiCpu className="h-5 w-5 text-teal-600" />
                <p className="mt-3 text-sm font-semibold text-[#0a2540]">Flujo inteligente</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Del análisis técnico a una explicación clara en un solo chat.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/86 p-4">
                <FiShield className="h-5 w-5 text-indigo-600" />
                <p className="mt-3 text-sm font-semibold text-[#0a2540]">Criterio responsable</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Veredictos probables, confianza y pasos de verificación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
