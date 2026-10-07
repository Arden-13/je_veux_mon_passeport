import './authForms.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import { supabase } from '../supabaseClient'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const nextErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'L’adresse e-mail est obligatoire.'
    } else if (!emailPattern.test(email.trim())) {
      nextErrors.email = 'L’adresse e-mail n’est pas valide.'
    }

    if (!password) {
      nextErrors.password = 'Le mot de passe est obligatoire.'
    } else if (password.length < 8) {
      nextErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.'
    }

    return nextErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        setFormError(error.message)
        return
      }

      if (!data.session) {
        setFormError('Aucune session reçue. Vérifie ton adresse e-mail.')
        return
      }

      navigate('/demande/type')
    } catch {
      setFormError('Impossible de contacter le service. Réessaie.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container page auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Se connecter</h1>
        <p>Bienvenue ! Connectez-vous à votre espace.</p>

        {formError && (
          <p role="alert" className="field-error">{formError}</p>
        )}

        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: '' }))
            }
          }}
          placeholder="Ex. : jean@exemple.com"
          required
          className={errors.email ? 'input-error' : ''}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className="field-error" role="alert">
            {errors.email}
          </span>
        )}

        <label htmlFor="password">Mot de passe *</label>
        <PasswordInput
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: '' }))
            }
          }}
          placeholder="Votre mot de passe"
          error={errors.password}
        />
        {errors.password && (
          <span id="password-error" className="field-error" role="alert">
            {errors.password}
          </span>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Connexion en cours…' : 'Se connecter'}
        </button>

        <p className="auth-switch">
          Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
        </p>
      </form>
    </div>
  )
}