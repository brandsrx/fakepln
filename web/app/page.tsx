import LandingHero from "@/components/LandingHero";
import { FiBookOpen, FiCheckCircle, FiMessageSquare, FiShield } from "react-icons/fi";

const steps = [
  {
    icon: FiMessageSquare,
    title: "Pega la noticia",
    description: "Inicia desde el texto real: titular, publicación, nota o fragmento informativo.",
  },
  {
    icon: FiShield,
    title: "Verox analiza",
    description: "El asistente evalúa señales lingüísticas y presenta un veredicto probable.",
  },
  {
    icon: FiBookOpen,
    title: "Verifica mejor",
    description: "Recibe criterios prácticos para contrastar la información con fuentes confiables.",
  },
];

const capabilities = [
  "Detecta lenguaje sensacionalista o poco verificable.",
  "Explica el resultado sin afirmar certezas absolutas.",
  "Mantiene la conversación para preguntas de seguimiento.",
  "Renderiza respuestas claras con formato markdown.",
];

export default function Home() {
  return (
    <>
      <LandingHero />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-indigo-600 ring-1 ring-slate-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold text-[#0a2540]">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f9fc] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Experiencia Verox</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a2540] sm:text-4xl">
              Un solo asistente para analizar, explicar y conversar.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              La interfaz está diseñada para que el usuario no tenga que interpretar
              detalles técnicos. Verox responde con criterio, mantiene el contexto y
              recomienda verificación responsable.
            </p>
          </div>

          <div className="rounded-3xl border border-white bg-white/90 p-3 shadow-xl shadow-slate-900/8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {capabilities.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                    <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
