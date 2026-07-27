'use client'
import { useState } from 'react'
import { Login } from '@/services/login'
import Toast from '@/components/toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    try {
      const { response, result } = await Login({ email, password })
      if (response.ok) {
        localStorage.setItem('token', result.token)
        document.location.href = '/avis'
      } else {
        setMessage(result.message || 'Identifiants incorrects.')
        setError(true)
        setTimeout(() => setError(false), 3000)
      }
    } catch (err) {
      setMessage('Erreur réseau, veuillez réessayer.')
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {message && error && <Toast message={message} />}

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
        Tu cherches une école du digital ? Découvre nos 20 formations dans 17 campus
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Image gauche */}
        <div className="hidden md:flex w-1/2 bg-purple-50 items-center justify-center p-12">
          <img src="/image-login.png" alt="login" className="max-w-md w-full object-contain" />
        </div>

        {/* Formulaire droite */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Bienvenue !</h1>
          <p className="text-cyan-500 font-medium mb-8">Connectez-vous pour continuer</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
              <input type="email" placeholder="Entrez votre mail" onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Mot de passe</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Entrez votre mot de passe" onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 placeholder:text-gray-400" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">👁</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 accent-purple-600" />
                <label htmlFor="remember" className="text-gray-600 text-sm">Se souvenir de moi</label>
              </div>
              <a href="/password-forgot" className="text-purple-600 hover:text-purple-800 text-sm font-medium">Mot de passe oublié ?</a>
            </div>
            <button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-colors shadow-md">Se connecter</button>
          </form>

          <p className="text-gray-500 text-center mt-6 text-sm">
            Pas de compte ? <a href="/register" className="text-purple-600 hover:text-purple-800 font-semibold">S'inscrire</a>
          </p>
        </div>
      </div>
    </div>
  )
}
