'use client'
import { useState, useEffect } from 'react'

export default function Avis() {
  const [avis, setAvis] = useState([])
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState(5)
  const [page, setPage] = useState('liste')
  const [menuOpen, setMenuOpen] = useState(false)
  const [connecte, setConnecte] = useState(false)
  const [avisAModifier, setAvisAModifier] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setConnecte(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis`)
      .then(res => res.json())
      .then(data => setAvis(data.reviews || []))
      .catch(err => console.error('Erreur:', err))
  }, [])

  const rechargerAvis = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis`)
    const data = await res.json()
    setAvis(data.reviews || [])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add/avis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: titre, date: new Date().toISOString(), rating, description })
      })
      await rechargerAvis()
      setPage('liste')
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const handleModifier = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis/${avisAModifier.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: titre || avisAModifier.name, date: avisAModifier.date, rating: rating || avisAModifier.rating, description: description || avisAModifier.description })
      })
      await rechargerAvis()
      setPage('liste')
      setAvisAModifier(null)
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const handleSupprimer = async (id) => {
    if (!confirm('Supprimer cet avis ?')) return
    const token = localStorage.getItem('token')
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setAvis(avis.filter(a => a.id !== id))
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const handleDeconnexion = () => {
    localStorage.removeItem('token')
    setConnecte(false)
    setPage('liste')
  }

  const NavLinks = () => (
    <>
      <button onClick={() => { setPage('liste'); setMenuOpen(false) }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-colors ${page === 'liste' ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>🏠 Accueil</button>
      <button onClick={() => { setPage('liste'); setMenuOpen(false) }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors">📬 Tous les avis</button>
      {connecte && (
        <button onClick={() => { setPage('deposer'); setMenuOpen(false) }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-colors ${page === 'deposer' ? 'bg-purple-700 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>✏️ Déposer un avis</button>
      )}
      {!connecte && (
        <a href="/login" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm bg-purple-700 text-white font-medium hover:bg-purple-800 transition-colors">🔑 Se connecter</a>
      )}
    </>
  )

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">

      {/* Sidebar desktop */}
      <div className="hidden md:flex w-64 bg-gray-50 border-r border-gray-200 flex-col justify-between py-8 px-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <span className="font-bold text-gray-800">MY DIGITAL SCHOOL</span>
          </div>
          <div className="h-1 bg-cyan-400 rounded-full mb-8"></div>
          <nav className="space-y-1">
            <NavLinks />
          </nav>
        </div>
        <div>
          {connecte ? (
            <div>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200 mb-3 shadow-sm">
                <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 text-sm font-bold">👤</div>
                <div>
                  <div className="text-gray-800 text-sm font-medium">Mon profil</div>
                  <div className="text-green-500 text-xs">● Connecté</div>
                </div>
              </div>
              <button onClick={handleDeconnexion} className="w-full text-red-500 hover:text-red-700 text-sm text-center py-2">Se déconnecter</button>
            </div>
          ) : (
            <a href="/login" className="w-full bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium py-2 px-4 rounded-xl text-center block transition-colors">Se connecter</a>
          )}
        </div>
      </div>

      {/* Navbar mobile */}
      <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-purple-700 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="font-bold text-gray-800 text-sm">MY DIGITAL SCHOOL</span>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 text-xl">☰</button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-50 px-6 py-4 space-y-1 border-b border-gray-200">
          <NavLinks />
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">

        {/* Bande cyan */}
        <div className="bg-cyan-400 py-2 px-8 text-center text-white text-sm font-medium hidden md:block">
          20 formations • 100% certifiées par l'état • 17 campus • Cours en présentiel
        </div>

        <div className="flex-1 p-6 md:p-10">

          {/* Liste des avis */}
          {page === 'liste' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Les avis</h1>
                {connecte && (
                  <button onClick={() => setPage('deposer')} className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium py-2 px-4 rounded-xl transition-colors">+ Déposer un avis</button>
                )}
              </div>
              <div className="h-1 w-16 bg-cyan-400 rounded-full mb-6"></div>
              <p className="text-gray-500 text-sm mb-8">Découvrez les avis de nos étudiants</p>

              {avis.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="text-4xl mb-4">📭</div>
                  <p className="text-gray-500 font-medium">Aucun avis pour le moment.</p>
                  {connecte && (
                    <button onClick={() => setPage('deposer')} className="mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium">Soyez le premier à laisser un avis →</button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {avis.map((a) => (
                    <div key={a.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 text-xs font-bold">{a.name?.[0]?.toUpperCase()}</div>
                          <span className="font-semibold text-gray-800 text-sm">{a.name}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <span key={s} className={s <= a.rating ? 'text-purple-500' : 'text-gray-300'}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{a.description}</p>
                      {connecte && (
                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                          <button onClick={() => { setAvisAModifier(a); setTitre(a.name); setDescription(a.description); setRating(a.rating); setPage('modifier') }} className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg transition-colors font-medium">✏️ Modifier</button>
                          <button onClick={() => handleSupprimer(a.id)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition-colors font-medium">🗑️ Supprimer</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Déposer un avis */}
          {page === 'deposer' && (
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Laisser un avis</h1>
              <div className="h-1 w-16 bg-cyan-400 rounded-full mb-6"></div>
              <p className="text-gray-500 text-sm mb-8">Partagez votre expérience avec les autres.</p>
              <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50 rounded-2xl border border-gray-200 p-8">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Titre de l'avis</label>
                  <input type="text" placeholder="Ex : service au top !" onChange={(e) => setTitre(e.target.value)} className="w-full bg-white text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 placeholder:text-gray-400" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Votre avis</label>
                  <textarea placeholder="Décrivez votre expérience en détail..." rows={6} maxLength={1000} onChange={(e) => setDescription(e.target.value)} className="w-full bg-white text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 placeholder:text-gray-400 resize-none" />
                  <div className="text-right text-gray-400 text-xs mt-1">{description.length}/1000</div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Votre note</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)} className={`text-3xl transition-colors ${star <= rating ? 'text-purple-500' : 'text-gray-300 hover:text-gray-400'}`}>★</button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-colors shadow-md">Publier mon avis</button>
                  <button type="button" onClick={() => setPage('liste')} className="px-6 bg-white hover:bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl transition-colors border border-gray-200">Annuler</button>
                </div>
              </form>
            </div>
          )}

          {/* Modifier un avis */}
          {page === 'modifier' && avisAModifier && (
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Modifier l'avis</h1>
              <div className="h-1 w-16 bg-cyan-400 rounded-full mb-6"></div>
              <form onSubmit={handleModifier} className="space-y-5 bg-gray-50 rounded-2xl border border-gray-200 p-8">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Titre</label>
                  <input type="text" defaultValue={avisAModifier.name} onChange={(e) => setTitre(e.target.value)} className="w-full bg-white text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Votre avis</label>
                  <textarea defaultValue={avisAModifier.description} rows={6} maxLength={1000} onChange={(e) => setDescription(e.target.value)} className="w-full bg-white text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 resize-none" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Note</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)} className={`text-3xl transition-colors ${star <= rating ? 'text-purple-500' : 'text-gray-300 hover:text-gray-400'}`}>★</button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-colors shadow-md">Sauvegarder</button>
                  <button type="button" onClick={() => { setPage('liste'); setAvisAModifier(null) }} className="px-6 bg-white hover:bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl transition-colors border border-gray-200">Annuler</button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
