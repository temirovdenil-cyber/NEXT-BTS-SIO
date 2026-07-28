"use client";

import Link from "next/link";
import { useState } from "react";
import { Register } from "@/services/register";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const { response, result } = await Register({
        username: name,
        email,
        password,
      });

      if (response.ok) {
        window.location.href = "/login";
        return;
      }

      setMessage(result?.message || "Impossible de créer le compte.");
    } catch {
      setMessage("Erreur réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50">
      <div className="page-container grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-10">
          <p className="section-label">Inscription</p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Créez votre espace étudiant.
          </h1>

          <p className="mt-3 leading-7 text-slate-500">
            Rejoignez la plateforme pour publier et gérer vos avis.
          </p>

          {message && (
            <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-9 space-y-5">
            <div>
              <label htmlFor="name" className="form-label">
                Nom complet
              </label>

              <input
                id="name"
                type="text"
                value={name}
                required
                autoComplete="name"
                placeholder="Votre nom complet"
                onChange={(event) => setName(event.target.value)}
                className="form-input"
              />
            </div>

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
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Au moins 6 caractères"
                  onChange={(event) => setPassword(event.target.value)}
                  className="form-input pr-14"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500 hover:text-violet-700"
                >
                  {showPassword ? "Masquer" : "Voir"}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirmation du mot de passe
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  required
                  autoComplete="new-password"
                  placeholder="Confirmez votre mot de passe"
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  className="form-input pr-14"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500 hover:text-violet-700"
                >
                  {showConfirm ? "Masquer" : "Voir"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Création..." : "Créer mon compte"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Vous possédez déjà un compte ?{" "}
            <Link
              href="/login"
              className="font-bold text-violet-700 hover:text-violet-900"
            >
              Se connecter
            </Link>
          </p>
        </div>

        <div className="hidden lg:block">
          <div className="rounded-[36px] bg-cyan-300 p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-800">
              Rejoignez la communauté
            </p>

            <h2 className="mt-6 text-5xl font-black leading-tight tracking-tight text-slate-950">
              Votre avis peut aider les autres étudiants.
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-700">
              Partagez votre expérience et consultez les retours des membres de
              la communauté.
            </p>
            <div className="mt-10 h-24" />
          </div>
        </div>
      </div>
    </section>
  );
}