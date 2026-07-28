import Link from "next/link";

const stats = [
  {
    value: "100 %",
    label: "Avis authentiques",
  },
  {
    value: "5 étoiles",
    label: "Système de notation",
  },
  {
    value: "24 h / 24",
    label: "Accessible en ligne",
  },
];

const features = [
  {
    number: "01",
    title: "Consultez les expériences",
    description:
      "Découvrez les retours partagés par les étudiants et les membres de la communauté.",
  },
  {
    number: "02",
    title: "Partagez votre avis",
    description:
      "Publiez facilement votre expérience et attribuez une note sur cinq.",
  },
  {
    number: "03",
    title: "Modifiez vos publications",
    description:
      "Retrouvez, mettez à jour ou supprimez vos avis depuis votre espace.",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-white">
      <section className="relative">
        <div className="absolute left-[-100px] top-20 h-72 w-72 rounded-full bg-cyan-200/60 blur-3xl" />
        <div className="absolute right-[-100px] top-0 h-96 w-96 rounded-full bg-violet-200/70 blur-3xl" />

        <div className="page-container relative grid min-h-[720px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-800">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              La plateforme des avis étudiants
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
              Les expériences étudiantes méritent d’être
              <span className="text-violet-700"> partagées.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Consultez les avis de la communauté MyDigitalSchool, découvrez
              différentes expériences et partagez votre propre opinion.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/avis"
                className="button-primary"
              >
                Découvrir les avis
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/register"
                className="button-secondary"
              >
                Créer un compte
              </Link>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[36px] bg-violet-700 p-4 shadow-2xl shadow-violet-200">
              <div className="rounded-[28px] bg-white p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-violet-700">
                      Dernier avis
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Une expérience enrichissante
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-xl">
                    ✦
                  </div>
                </div>

                <div className="mt-8 flex gap-1 text-2xl text-violet-600">
                  ★★★★★
                </div>

                <p className="mt-6 text-base leading-7 text-slate-600">
                  Une plateforme claire, facile à utiliser et permettant de
                  découvrir rapidement les retours des autres étudiants.
                </p>

                <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 font-black text-violet-700">
                    D
                  </div>

                  <div>
                    <p className="font-bold text-slate-950">
                      Étudiant MyDigitalSchool
                    </p>
                    <p className="text-sm text-slate-500">
                      Avis publié récemment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 hidden rounded-3xl bg-cyan-400 p-6 shadow-xl lg:block">
              <p className="text-3xl font-black text-slate-950">4,8 / 5</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                Note moyenne
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-24 text-white">
        <div className="page-container">
          <div className="max-w-3xl">
            <p className="section-label text-cyan-300">Fonctionnement</p>
            <h2 className="section-title text-white">
              Une plateforme simple, lisible et utile.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="rounded-[28px] border border-white/10 bg-white/5 p-8"
              >
                <p className="text-sm font-black text-cyan-300">
                  {feature.number}
                </p>

                <h3 className="mt-12 text-2xl font-black">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="page-container">
          <div className="rounded-[36px] bg-cyan-300 px-8 py-14 sm:px-14 lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-800">
                Votre expérience compte
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Rejoignez la communauté et partagez votre avis.
              </h2>
            </div>

            <Link
              href="/register"
              className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-4 font-bold text-white transition hover:bg-violet-800 lg:mt-0"
            >
              Commencer maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}