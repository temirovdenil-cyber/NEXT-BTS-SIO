'use client'
import { useState } from 'react'
import { Register } from '@/services/register'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    try {
      const { response } = await Register({ username: name, email, password })
      if (response.ok) {
        document.location.href = '/login'
      }
    } catch (err) {
      console.log('Erreur réseau', err)
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
        20 formations • 100% certifiées par l'état • 17 campus • Cours en présentiel
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Colonne gauche - info */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-purple-50 to-cyan-50 flex-col items-center justify-center p-12 gap-8">
          <img src="/image-register.png" alt="register" className="max-w-sm w-full object-contain" />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Rejoins la communauté</h2>
            <p className="text-gray-500 text-sm">Plus de 10 000 étudiants nous font confiance</p>
          </div>
        </div>

        {/* Formulaire droite */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Créer votre compte</h1>
          <p className="text-gray-500 mb-8 text-sm">Tu cherches une école du digital en France ? Découvre les formations MyDigitalSchool dans nos 17 campus</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Nom complet</label>
              <input type="text" placeholder="Entrez votre nom" onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
              <input type="email" placeholder="Entrez votre mail" onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Mot de passe</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Créez un mot de passe" onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 placeholder:text-gray-400" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">👁</button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Confirmer le mot de passe</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} placeholder="Confirmez votre mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 placeholder:text-gray-400" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">👁</button>
              </div>
            </div>
            <button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-colors shadow-md">S'inscrire</button>
          </form>

          <p className="text-gray-500 text-center mt-6 text-sm">
            Déjà un compte ? <a href="/login" className="text-purple-600 hover:text-purple-800 font-semibold">Se connecter</a>
          </p>
        </div>
      </div>
    </div>
  )
}
