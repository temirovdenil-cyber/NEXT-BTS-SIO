"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const stars = [1, 2, 3, 4, 5];

export default function AvisPage() {
  const [avis, setAvis] = useState([]);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [page, setPage] = useState("liste");
  const [connecte, setConnecte] = useState(false);
  const [avisAModifier, setAvisAModifier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [envoi, setEnvoi] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setConnecte(Boolean(localStorage.getItem("token")));
    chargerAvis();
  }, []);

  const chargerAvis = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/avis`
      );

      const data = await response.json();

      setAvis(data.reviews || []);
    } catch {
      setMessage("Impossible de charger les avis.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setRating(5);
    setAvisAModifier(null);
  };

  const ouvrirFormulaire = () => {
    resetForm();
    setPage("deposer");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const ouvrirModification = (avisSelectionne) => {
    setAvisAModifier(avisSelectionne);
    setTitre(avisSelectionne.name || "");
    setDescription(avisSelectionne.description || "");
    setRating(avisSelectionne.rating || 5);
    setPage("modifier");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fermerFormulaire = () => {
    resetForm();
    setPage("liste");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      setEnvoi(true);
      setMessage("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add/avis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: titre,
            date: new Date().toISOString(),
            rating,
            description,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        setMessage(result.message || "Impossible de publier cet avis.");
        return;
      }

      await chargerAvis();
      resetForm();
      setPage("liste");
    } catch {
      setMessage("Une erreur réseau est survenue.");
    } finally {
      setEnvoi(false);
    }
  };

  const handleModifier = async (event) => {
    event.preventDefault();

    if (!avisAModifier) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setEnvoi(true);
      setMessage("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/avis/${avisAModifier.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: titre,
            date: avisAModifier.date,
            rating,
            description,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        setMessage(result.message || "Impossible de modifier cet avis.");
        return;
      }

      await chargerAvis();
      resetForm();
      setPage("liste");
    } catch {
      setMessage("Une erreur réseau est survenue.");
    } finally {
      setEnvoi(false);
    }
  };

  const handleSupprimer = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cet avis ?"
    );

    if (!confirmation) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/avis/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        setMessage(result.message || "Impossible de supprimer cet avis.");
        return;
      }

      setAvis((avisActuels) =>
        avisActuels.filter((avisItem) => avisItem.id !== id)
      );
    } catch {
      setMessage("Une erreur réseau est survenue.");
    }
  };

  const moyenne =
    avis.length > 0
      ? (
          avis.reduce(
            (total, avisItem) => total + Number(avisItem.rating || 0),
            0
          ) / avis.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl" />

        <div className="page-container relative">
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                Avis étudiants
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight tracking-[-0.045em] sm:text-6xl">
                Découvrez les expériences de la communauté.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Consultez les retours des étudiants et partagez votre propre
                expérience avec les autres membres.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {connecte ? (
                  <button
                    type="button"
                    onClick={ouvrirFormulaire}
                    className="button-primary"
                  >
                    Déposer un avis
                    <span aria-hidden="true">+</span>
                  </button>
                ) : (
                  <Link href="/login" className="button-primary">
                    Se connecter pour publier
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("liste-avis")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
                >
                  Voir tous les avis
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <p className="text-3xl font-black">{avis.length}</p>
                <p className="mt-1 text-sm text-slate-300">
                  Avis publiés
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <p className="text-3xl font-black">{moyenne} / 5</p>
                <p className="mt-1 text-sm text-slate-300">
                  Note moyenne
                </p>
              </div>

              <div className="col-span-2 rounded-3xl bg-cyan-300 p-6 text-slate-950 sm:col-span-1">
                <p className="text-3xl font-black">100 %</p>
                <p className="mt-1 text-sm font-semibold">
                  Expériences partagées
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-container py-16">
        {message && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {message}
          </div>
        )}

        {page === "liste" && (
          <div id="liste-avis">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="section-label">Témoignages</p>

                <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Les derniers avis
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-slate-500">
                  Parcourez les expériences publiées par les membres de la
                  plateforme.
                </p>
              </div>

              {connecte && (
                <button
                  type="button"
                  onClick={ouvrirFormulaire}
                  className="button-primary shrink-0"
                >
                  Ajouter un avis
                </button>
              )}
            </div>

            {loading ? (
              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-72 animate-pulse rounded-[28px] bg-slate-200"
                  />
                ))}
              </div>
            ) : avis.length === 0 ? (
              <div className="mt-12 rounded-[32px] border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
                  ✦
                </div>

                <h3 className="mt-6 text-2xl font-black text-slate-950">
                  Aucun avis pour le moment
                </h3>

                <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-500">
                  Soyez la première personne à partager une expérience avec la
                  communauté.
                </p>

                {connecte && (
                  <button
                    type="button"
                    onClick={ouvrirFormulaire}
                    className="button-primary mt-7"
                  >
                    Publier le premier avis
                  </button>
                )}
              </div>
            ) : (
              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {avis.map((avisItem) => (
                  <article
                    key={avisItem.id}
                    className="group flex min-h-72 flex-col rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-slate-200/70"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-lg font-black text-violet-700">
                          {avisItem.name?.[0]?.toUpperCase() || "A"}
                        </div>

                        <div>
                          <h3 className="font-black text-slate-950">
                            {avisItem.name}
                          </h3>

                          <p className="mt-1 text-xs font-medium text-slate-400">
                            Avis étudiant
                          </p>
                        </div>
                      </div>

                      <div
                        className="flex shrink-0 gap-0.5"
                        aria-label={`${avisItem.rating} étoiles sur 5`}
                      >
                        {stars.map((star) => (
                          <span
                            key={star}
                            className={
                              star <= avisItem.rating
                                ? "text-violet-600"
                                : "text-slate-200"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="mt-7 flex-1 leading-7 text-slate-600">
                      {avisItem.description}
                    </p>

                    {connecte && (
                      <div className="mt-7 flex gap-3 border-t border-slate-100 pt-5">
                        <button
                          type="button"
                          onClick={() => ouvrirModification(avisItem)}
                          className="rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-100"
                        >
                          Modifier
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSupprimer(avisItem.id)}
                          className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {page === "deposer" && (
          <AvisForm
            title="Partagez votre expérience."
            subtitle="Votre avis aidera les autres étudiants à mieux comprendre votre expérience."
            titre={titre}
            setTitre={setTitre}
            description={description}
            setDescription={setDescription}
            rating={rating}
            setRating={setRating}
            onSubmit={handleSubmit}
            onCancel={fermerFormulaire}
            submitLabel="Publier mon avis"
            loading={envoi}
          />
        )}

        {page === "modifier" && avisAModifier && (
          <AvisForm
            title="Modifiez votre avis."
            subtitle="Mettez à jour votre titre, votre description ou votre note."
            titre={titre}
            setTitre={setTitre}
            description={description}
            setDescription={setDescription}
            rating={rating}
            setRating={setRating}
            onSubmit={handleModifier}
            onCancel={fermerFormulaire}
            submitLabel="Enregistrer les modifications"
            loading={envoi}
          />
        )}
      </section>
    </div>
  );
}

function AvisForm({
  title,
  subtitle,
  titre,
  setTitre,
  description,
  setDescription,
  rating,
  setRating,
  onSubmit,
  onCancel,
  submitLabel,
  loading,
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
      <div>
        <p className="section-label">Votre témoignage</p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-lg text-lg leading-8 text-slate-500">
          {subtitle}
        </p>

        <button
          type="button"
          onClick={onCancel}
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-violet-700 hover:text-violet-900"
        >
          <span aria-hidden="true">←</span>
          Retour aux avis
        </button>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-10"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="titre" className="form-label">
              Titre de l’avis
            </label>

            <input
              id="titre"
              type="text"
              value={titre}
              required
              maxLength={100}
              placeholder="Exemple : une très bonne expérience"
              onChange={(event) => setTitre(event.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="description" className="form-label">
                Votre expérience
              </label>

              <span className="text-xs font-semibold text-slate-400">
                {description.length} / 1000
              </span>
            </div>

            <textarea
              id="description"
              value={description}
              required
              rows={7}
              maxLength={1000}
              placeholder="Décrivez votre expérience en quelques phrases..."
              onChange={(event) => setDescription(event.target.value)}
              className="form-input min-h-48 resize-none"
            />
          </div>

          <fieldset>
            <legend className="form-label">
              Votre note
            </legend>

            <div className="flex gap-2">
              {stars.map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  aria-label={`Attribuer ${star} étoile${star > 1 ? "s" : ""}`}
                  className={`text-4xl transition hover:scale-110 ${
                    star <= rating
                      ? "text-violet-600"
                      : "text-slate-200 hover:text-violet-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <p className="mt-2 text-sm font-semibold text-slate-500">
              {rating} étoile{rating > 1 ? "s" : ""} sur 5
            </p>
          </fieldset>

          <div className="flex flex-col gap-3 pt-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="button-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Enregistrement..." : submitLabel}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="button-secondary"
            >
              Annuler
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}