"use client";

import Link from "next/link";
import { useState } from "react";
import Toast from "@/components/toast";
import { Login } from "@/services/login";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const { response, result } = await Login({
        email,
        password,
      });

      if (response.ok) {
        localStorage.setItem("token", result.token);
        window.location.href = "/avis";
        return;
      }

      setMessage(result.message || "Identifiants incorrects.");
      setError(true);
    } catch {
      setMessage("Erreur réseau, veuillez réessayer.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50">
      {message && error && <Toast message={message} />}

      <div className="page-container grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="rounded-[36px] bg-violet-700 p-12 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
              Espace étudiant
            </p>

            <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight">
              Retrouvez votre espace et vos avis.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-violet-100">
              Connectez-vous pour publier, modifier et gérer vos expériences
              partagées avec la communauté.
            </p>

            <img
              src="/image-login.png"
              alt="Illustration de connexion"
              className="mx-auto mt-10 max-h-80 w-full object-contain"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-10">
          <p className="section-label">Connexion</p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Bon retour parmi nous.
          </h2>

          <p className="mt-3 leading-7 text-slate-500">
            Entrez vos identifiants pour accéder à votre compte.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 space-y-6">
            <div>
              <label htmlFor="email" className="form-label">
                Adresse email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                required
                autoComplete="email"
                placeholder="prenom.nom@email.com"
                onChange={(event) => setEmail(event.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>

                <Link
                  href="/password-forgot"
                  className="text-sm font-semibold text-violet-700 hover:text-violet-900"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  autoComplete="current-password"
                  placeholder="Votre mot de passe"
                  onChange={(event) => setPassword(event.target.value)}
                  className="form-input pr-14"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500 hover:text-violet-700"
                >
                  {showPassword ? "Masquer" : "Voir"}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-violet-700"
              />
              Se souvenir de moi
            </label>

            <button
              type="submit"
              disabled={loading}
              className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Vous n’avez pas encore de compte ?{" "}
            <Link
              href="/register"
              className="font-bold text-violet-700 hover:text-violet-900"
            >
              S’inscrire
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}