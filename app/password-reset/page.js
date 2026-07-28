"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("Le lien de réinitialisation est invalide ou incomplet.");
      return;
    }

    if (password.length < 6) {
      setMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            nouveauMotDePasse: password,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();

        setMessage(
          result.message ||
            "Impossible de réinitialiser le mot de passe. Le lien est peut-être expiré."
        );

        return;
      }

      setSuccess(true);
    } catch {
      setMessage("Une erreur réseau est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-[calc(100vh-80px)] bg-slate-50">
        <div className="page-container flex min-h-[calc(100vh-80px)] items-center justify-center py-14">
          <div className="w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50 sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl text-green-700">
              ✓
            </div>

            <p className="section-label mt-7">Mot de passe modifié</p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Votre mot de passe a été réinitialisé.
            </h1>

            <p className="mt-4 leading-7 text-slate-500">
              Vous pouvez maintenant vous connecter avec votre nouveau mot de
              passe.
            </p>

            <Link href="/login" className="button-primary mt-8 w-full">
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50">
      <div className="page-container grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="rounded-[36px] bg-violet-700 p-12 text-white">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
              Nouveau mot de passe
            </p>

            <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight">
              Sécurisez à nouveau votre compte.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-violet-100">
              Choisissez un nouveau mot de passe suffisamment long et différent
              de vos anciens mots de passe.
            </p>

            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 font-black text-slate-950">
                  1
                </div>

                <p className="font-semibold">
                  Utilisez au moins 6 caractères
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 font-black text-slate-950">
                  2
                </div>

                <p className="font-semibold">
                  Évitez les mots de passe trop simples
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 font-black text-slate-950">
                  3
                </div>

                <p className="font-semibold">
                  Gardez votre mot de passe confidentiel
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-10">
          <p className="section-label">Réinitialisation</p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Choisissez un nouveau mot de passe.
          </h2>

          <p className="mt-3 leading-7 text-slate-500">
            Entrez votre nouveau mot de passe puis confirmez-le.
          </p>

          {message && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-9 space-y-6">
            <div>
              <label htmlFor="password" className="form-label">
                Nouveau mot de passe
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
                  className="form-input pr-20"
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
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Confirmez votre mot de passe"
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  className="form-input pr-20"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={
                    showConfirm
                      ? "Masquer la confirmation"
                      : "Afficher la confirmation"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500 hover:text-violet-700"
                >
                  {showConfirm ? "Masquer" : "Voir"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Réinitialisation..."
                : "Réinitialiser le mot de passe"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Vous souhaitez revenir en arrière ?{" "}
            <Link
              href="/login"
              className="font-bold text-violet-700 hover:text-violet-900"
            >
              Retour à la connexion
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function ResetPasswordLoading() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50">
      <div className="page-container flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="rounded-2xl bg-white px-8 py-6 font-semibold text-slate-600 shadow-lg">
          Chargement...
        </div>
      </div>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}