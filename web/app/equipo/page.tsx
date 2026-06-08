import { FiGithub, FiLinkedin, FiTwitter, FiCode, FiCpu } from "react-icons/fi";
import Link from "next/link";

const team = [
  {
    name: "Ramiro Brandon Mamani Quisbert",
    role: "Desarrollador Full Stack & Modelo PLN",
    description:
      "Responsable del desarrollo web, integración del chatbot, conexión con Hugging Face y OpenRouter, además del entrenamiento y adaptación del modelo Transformer para el análisis de noticias falsas.",
    initials: "RB",
    icon: FiCode,
    social: {
      github: "https://github.com/brandsrx",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Ian Ezequiel Salinas Condori",
    role: "Investigación, Dataset & Evaluación",
    description:
      "Responsable del apoyo en la investigación del problema, organización del dataset, pruebas del chatbot y evaluación de resultados para validar el desempeño del sistema.",
    initials: "IS",
    icon: FiCpu,
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

export default function EquipoPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#f8fafc]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur">
            Equipo del proyecto FakePLN
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[#0a2540] sm:text-5xl">
            Personas detrás de Verox
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Un proyecto académico de Procesamiento del Lenguaje Natural enfocado
            en la detección de noticias falsas mediante modelos Transformer,
            una interfaz web moderna y una experiencia conversacional clara.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {team.map((member) => {
            const Icon = member.icon;

            return (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-violet-500 opacity-80" />

                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a2540] to-indigo-700 text-2xl font-bold text-white shadow-lg shadow-indigo-900/20">
                    {member.initials}
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-indigo-600 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-7">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#0a2540]">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-indigo-600">
                    {member.role}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {member.description}
                  </p>
                </div>

                <div className="mt-7 flex items-center gap-3">
                  <Link
                    href={member.social.github}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-800 hover:shadow-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub de ${member.name}`}
                  >
                    <FiGithub className="h-4 w-4" />
                  </Link>

                  <Link
                    href={member.social.linkedin}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-800 hover:shadow-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <FiLinkedin className="h-4 w-4" />
                  </Link>

                  <Link
                    href={member.social.twitter}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-800 hover:shadow-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Twitter de ${member.name}`}
                  >
                    <FiTwitter className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-20 max-w-5xl overflow-hidden rounded-3xl bg-[#0a2540] p-8 text-center shadow-2xl shadow-slate-900/20 sm:p-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Verox: análisis inteligente contra la desinformación
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              El proyecto combina un modelo Transformer especializado en PLN
              con una experiencia conversacional para ayudar a identificar
              señales de noticias falsas en textos en español.
            </p>

            <div className="mt-8">
              <Link
                href="https://github.com/brandsrx/fakepln"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-[#0a2540] shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                <FiGithub className="h-5 w-5" />
                Ver repositorio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}