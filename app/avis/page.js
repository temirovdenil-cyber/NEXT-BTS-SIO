
'use client'
import Link from 'next/link'
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
  setConnecte(Boolean(token))

  fetch('http://localhost:5000/avis')
    .then(res => res.json())
    .then(data => setAvis(data.reviews || []))
    .catch(err => console.error('Erreur:', err))
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      await fetch('http://localhost:5000/add/avis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: titre, date: new Date().toISOString(), rating, description })
      })
      const res = await fetch('http://localhost:5000/avis')
      const data = await res.json()
      setAvis(data.reviews || [])
      setPage('liste')
      setMenuOpen(false)
    } catch (err) {
      console.error('Erreur:', err)
    }
  }
  const handleModifier = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      await fetch(`http://localhost:5000/autoriser/avis/${avisAModifier.id}`, {
     method: 'PUT',
    headers: {
   'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: titre || avisAModifier.name, date: avisAModifier.date, rating: rating || avisAModifier.rating, description: description || avisAModifier.description })
      })
      const res = await fetch('http://localhost:5000/avis')
      const data = await res.json()
      setAvis(data.reviews || [])
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
      await fetch(`http://localhost:5000/avis/${id}`, {
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d2b] via-[#1a1a4e] to-[#0d0d2b] flex flex-col md:flex-row">
      <div className="hidden md:flex w-64 bg-black/30 backdrop-blur border-r border-white/10 flex-col justify-between py-8 px-6">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
            <span className="text-white font-bold">MY DIGITAL SCHOOL</span>
          </div>
          <nav className="space-y-1">
            <button onClick={() => setPage('liste')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-colors ${page === 'liste' ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🏠 Accueil</button>
            <button onClick={() => setPage('liste')} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors">📬 Avis</button>
            {connecte && (
              <button onClick={() => setPage('deposer')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-colors ${page === 'deposer' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>✏️ Déposer un avis</button>
            )}
          </nav>
        </div>
        <div>
          {connecte ? (
            <div>
              <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 border border-white/10 mb-3">
                <div className="w-9 h-9 bg-indigo-500/30 rounded-full flex items-center justify-center text-white text-sm">👤</div>
                <div>
                  <div className="text-white text-sm font-medium">Mon profil</div>
                  <div className="text-gray-400 text-xs">Connecté</div>
                </div>
              </div>
              <button onClick={handleDeconnexion} className="w-full text-red-400 hover:text-red-300 text-sm text-center">Se déconnecter</button>
            </div>
          ) : (
            <a href="/login" className="w-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium py-2 px-4 rounded-xl text-center block">Se connecter</a>
          )}
        </div>
      </div>
      <div className="md:hidden bg-black/30 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-500 rounded-full"></div>
          <span className="text-white font-bold text-sm">MY DIGITAL SCHOOL</span>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-xl">☰</button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black/50 backdrop-blur px-6 py-4 space-y-1 border-b border-white/10">
          <button onClick={() => { setPage('liste'); setMenuOpen(false) }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 text-sm">🏠 Accueil</button>
          <button onClick={() => { setPage('liste'); setMenuOpen(false) }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 text-sm">📬 Avis</button>
          {connecte && (
            <button onClick={() => { setPage('deposer'); setMenuOpen(false) }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white bg-indigo-500 text-sm">✏️ Déposer un avis</button>
          )}
          {!connecte && (
            <Link href="/login" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white bg-indigo-500 text-sm">🔑 Se connecter</Link>
          )}
        </div>
      )}
      <div className="flex-1 p-6 md:p-10">
        {page === 'liste' && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Les avis</h1>
              {!connecte && (
                <Link href="/login" className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium py-2 px-4 rounded-xl">Se connecter</Link>
              )}
            </div>
            <p className="text-gray-400 text-sm mb-8">Découvrez les avis de nos étudiants</p>
            {avis.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">📭</div>
                <p className="text-gray-400">Aucun avis pour le moment.</p>
                {connecte && (
                  <button onClick={() => setPage('deposer')} className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm">Soyez le premier à laisser un avis →</button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {avis.map((a) => (
                  <div key={a.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-white">{a.name}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => (
    <span key={s} className={s <= a.rating ? 'text-indigo-400' : 'text-gray-600'}>★</span>                       ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{a.description}</p>
                    {connecte && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setAvisAModifier(a); setTitre(a.name); setDescription(a.description); setRating(a.rating); setPage('modifier') }}
                          className="text-xs bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 px-3 py-1 rounded-lg transition-colors"
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          onClick={() => handleSupprimer(a.id)}
                          className="text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 px-3 py-1 rounded-lg transition-colors"
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {page === 'deposer' && (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Laisser un avis</h1>
            <p className="text-gray-400 text-sm mb-8">Partagez votre expérience avec les autres.</p>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Titre de l'avis</label>
                <input type="text" placeholder="Ex : service au top !" onChange={(e) => setTitre(e.target.value)} className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-400 placeholder:text-gray-500" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Votre avis</label>
                <textarea placeholder="Décrivez votre expérience en détail..." rows={6} maxLength={1000} onChange={(e) => setDescription(e.target.value)} className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-400 placeholder:text-gray-500 resize-none" />
                <div className="text-right text-gray-500 text-xs mt-1">{description.length}/1000</div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Votre note</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className={`text-3xl transition-colors ${star <= rating ? 'text-indigo-400' : 'text-gray-600 hover:text-gray-400'}`}>★</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-3 rounded-xl transition-colors">Publier mon avis</button>
                <button type="button" onClick={() => setPage('liste')} className="px-6 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-colors">Annuler</button>
              </div>
            </form>
          </div>
        )}
        {page === 'modifier' && avisAModifier && (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Modifier l&apos;avis</h1>
            <p className="text-gray-400 text-sm mb-8">Modifiez votre avis.</p>
            <form onSubmit={handleModifier} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Titre de l&apos;avis</label>
                <input type="text" defaultValue={avisAModifier.name} onChange={(e) => setTitre(e.target.value)} className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Votre avis</label>
                <textarea defaultValue={avisAModifier.description} rows={6} maxLength={1000} onChange={(e) => setDescription(e.target.value)} className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-400 resize-none" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Votre note</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className={`text-3xl transition-colors ${star <= rating ? 'text-indigo-400' : 'text-gray-600 hover:text-gray-400'}`}>★</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-3 rounded-xl transition-colors">Sauvegarder</button>
                <button type="button" onClick={() => { setPage('liste'); setAvisAModifier(null) }} className="px-6 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-colors">Annuler</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
