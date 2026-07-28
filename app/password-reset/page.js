'use client'
import Link from 'next/link'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ResetPasswordContent() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
        
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token, 
          nouveauMotDePasse: password 
        })
      })

      if (response.ok) {
        alert('Mot de passe réinitialisé avec succès !')
        document.location.href = '/login'
      }

    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">

      <div className="flex items-center justify-between px-8 py-4">
        <div className="text-white font-bold text-xl">
          MY DIGITAL SCHOOL
        </div>

        <Link href="/" className="text-white">
          Retour à l&apos;accueil
        </Link>
      </div>


      <div className="flex flex-1 items-center justify-center">

        <div className="bg-[#1a1a2e] rounded-2xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-white mb-2">
            Nouveau mot de passe
          </h1>

          <p className="text-gray-400 mb-8">
            Choisissez un nouveau mot de passe sécurisé.
          </p>


          <form onSubmit={handleSubmit} className="space-y-4">


            <div>
              <label className="block text-white text-sm mb-2">
                Nouveau mot de passe
              </label>

              <div className="relative">

                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Créez un mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0a1a] text-white px-4 py-3 rounded-lg border border-indigo-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  👁
                </button>

              </div>
            </div>



            <div>

              <label className="block text-white text-sm mb-2">
                Confirmer le mot de passe
              </label>

              <div className="relative">

                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirmez votre mot de passe"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0a0a1a] text-white px-4 py-3 rounded-lg border border-indigo-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  👁
                </button>

              </div>

            </div>



            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-3 rounded-lg"
            >
              Réinitialiser
            </button>


          </form>



          <div className="text-center mt-4">
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 text-sm">
              Retour à la connexion
            </Link>
          </div>


        </div>

      </div>

    </div>
  )
}



export default function ResetPassword() {

  return (

    <Suspense fallback={
      <div className="text-white">
        Chargement...
      </div>
    }>

      <ResetPasswordContent />

    </Suspense>

  )


}