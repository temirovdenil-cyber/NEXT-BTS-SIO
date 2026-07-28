'use client'
import { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [envoye, setEnvoye] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      setEnvoye(true)
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="font-bold text-gray-800 text-lg">MY DIGITAL SCHOOL</span>
        </div>
        <a href="/" className="text-purple-700 hover:text-purple-900 text-sm font-medium">← Retour à l'accueil</a>
      </header>

      {/* Bande cyan */}
      <div className="bg-cyan-400 py-2 px-8 text-center text-white text-sm font-medium">
        20 formations • 100% certifiées par l'état • 17 campus
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Colonne gauche */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-gray-900 to-gray-800 flex-col items-start justify-center p-16 gap-6">
          <img src="/image-forgot.png" alt="forgot" className="max-w-xs w-full object-contain mb-4" />
          <h2 className="text-4xl font-bold text-white">Mot de passe oublié</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Entrez votre mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
          <a href="/login" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">← Retour à la connexion</a>
        </div>

        {/* Formulaire droite */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12">
          <div className="md:hidden mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mot de passe oublié</h1>
            <p className="text-gray-500 text-sm">Entrez votre mail pour recevoir un lien de réinitialisation.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            {envoye ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✉️</div>
                <h2 className="text-gray-900 font-bold text-xl mb-2">Email envoyé !</h2>
                <p className="text-gray-500 text-sm mb-6">Vérifiez votre boite mail pour le lien de réinitialisation.</p>
                <a href="/login" className="text-purple-600 hover:text-purple-800 font-medium text-sm">Retour à la connexion →</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                  <input type="email" placeholder="Entrez votre mail" onChange={(e) => setEmail(e.target.value)} className="w-full bg-white text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 placeholder:text-gray-400" />
                </div>
                <button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-colors shadow-md">Envoyer le lien</button>
                <div className="text-center">
                  <a href="/login" className="text-purple-600 hover:text-purple-800 text-sm font-medium">Retour à la connexion</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
