import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import Link from "next/link";

const team = [
  {
    name: "Brandon Sánchez",
    role: "Líder de Proyecto & Desarrollador Full Stack",
    description:
      "Ingeniero de software especializado en aplicaciones web modernas con Next.js y procesamiento de lenguaje natural.",
    image: null,
    initials: "BS",
    social: {
      github: "https://github.com/brandsrx",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "María García",
    role: "Científica de Datos & NLP",
    description:
      "Especialista en procesamiento de lenguaje natural y modelos de machine learning para detección de desinformación.",
    image: null,
    initials: "MG",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Carlos López",
    role: "Investigador & Analista",
    description:
      "Investigador en desinformación con experiencia en análisis de medios y verificación de fuentes digitales.",
    image: null,
    initials: "CL",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

export default function EquipoPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a2540]">
            Nuestro Equipo
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Conoce a las personas detrás de FakePLN, comprometidas con la lucha
            contra la desinformación.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="group rounded-2xl bg-white border border-slate-200/80 p-8 card-hover"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white text-2xl font-bold shadow-sm">
                {member.initials}
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-[#0a2540]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-indigo-600">
                  {member.role}
                </p>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  {member.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href={member.social.github}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub de ${member.name}`}
                >
                  <FiGithub className="h-4 w-4" />
                </Link>
                <Link
                  href={member.social.linkedin}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn de ${member.name}`}
                >
                  <FiLinkedin className="h-4 w-4" />
                </Link>
                <Link
                  href={member.social.twitter}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Twitter de ${member.name}`}
                >
                  <FiTwitter className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-2xl bg-[#0a2540] p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            ¿Quieres contribuir?
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            FakePLN es un proyecto de código abierto. Si te apasiona la lucha
            contra la desinformación, ¡nos encantaría tu ayuda!
          </p>
          <div className="mt-8">
            <Link
              href="https://github.com/brandsrx/fakepln"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all duration-200 hover:-translate-y-0.5"
            >
              <FiGithub className="h-5 w-5" />
              Contribuir en GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
