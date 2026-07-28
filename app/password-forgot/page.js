"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();

        setMessage(
          result.message || "Impossible d’envoyer le lien de réinitialisation."
        );

        return;
      }

      setEnvoye(true);
    } catch {
      setMessage("Une erreur réseau est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50">
      <div className="page-container grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="rounded-[36px] bg-slate-950 p-12 text-white">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
              Sécurité du compte
            </p>

            <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight">
              Récupérez rapidement l’accès à votre compte.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Entrez votre adresse email et nous vous enverrons un lien pour
              choisir un nouveau mot de passe.
            </p>

           <div className="mt-10 h-24" />
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-10">
          {envoye ? (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-3xl">
                ✉
              </div>

              <p className="section-label mt-7">Email envoyé</p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                Vérifiez votre boîte mail.
              </h2>

              <p className="mt-4 leading-7 text-slate-500">
                Un lien de réinitialisation a été envoyé à l’adresse{" "}
                <span className="font-bold text-slate-800">{email}</span>.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Pensez également à vérifier vos courriers indésirables.
              </p>

              <Link href="/login" className="button-primary mt-8 w-full">
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <>
              <p className="section-label">Mot de passe oublié</p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                Réinitialisez votre mot de passe.
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                Indiquez l’adresse email associée à votre compte.
              </p>

              {message && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {message}
                </div>
              )}

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

                <button
                  type="submit"
                  disabled={loading}
                  className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Envoi en cours..." : "Envoyer le lien"}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-500">
                Vous vous souvenez de votre mot de passe ?{" "}
                <Link
                  href="/login"
                  className="font-bold text-violet-700 hover:text-violet-900"
                >
                  Se connecter
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}