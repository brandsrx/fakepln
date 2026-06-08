import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a2540] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-lg font-bold text-white">
              Ver<span className="text-indigo-400">ox</span>
            </Link>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-xs">
              Asistente de detección de noticias falsas impulsado por
              inteligencia artificial y procesamiento de lenguaje natural.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Inicio" },
                { href: "/chat", label: "Chat" },
                { href: "/equipo", label: "Equipo" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tecnologías
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Next.js 16</li>
              <li>Procesamiento de Lenguaje Natural</li>
              <li>Modelos de Machine Learning</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Verox. Todos los derechos
            reservados.
          </p>
          <p className="text-sm text-slate-500">
            Hecho con{" "}
            <span className="text-indigo-400" aria-label="amor">
              &hearts;
            </span>{" "}
            por el equipo Verox
          </p>
        </div>
      </div>
    </footer>
  );
}
