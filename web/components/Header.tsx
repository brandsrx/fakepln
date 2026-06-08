"use client"

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/chat", label: "Chat" },
  { href: "/equipo", label: "Equipo" },
];

export default function HeaderPublic() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[#0a2540]">Ver</span>
            <span className="text-indigo-600 transition-colors duration-200 group-hover:text-indigo-500">
              ox
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-x-8">
          {NAV_LINKS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors duration-200",
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-500 hover:text-[#0a2540]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/brandsrx/fakepln"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-x-2 bg-[#0a2540] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all duration-200 shadow-sm shadow-slate-400/50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaGithub className="h-4 w-4 text-slate-300 group-hover:text-white transition-colors" />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
