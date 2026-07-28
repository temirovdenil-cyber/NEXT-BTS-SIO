"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "Avis",
    href: "/avis",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [connecte, setConnecte] = useState(false);

  useEffect(() => {
    setConnecte(Boolean(localStorage.getItem("token")));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setConnecte(false);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <nav className="page-container">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-700 text-sm font-black text-white">
              M
            </div>

            <div>
              <p className="text-sm font-black tracking-tight text-slate-950 sm:text-base">
                MY DIGITAL SCHOOL
              </p>
              <p className="text-xs font-medium text-violet-700">
                Avis étudiants
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-violet-100 text-violet-800"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {connecte ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Déconnexion
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Connexion
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-2xl text-slate-700 md:hidden"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              ))}

              {connecte ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Déconnexion
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Connexion
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl bg-violet-700 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}