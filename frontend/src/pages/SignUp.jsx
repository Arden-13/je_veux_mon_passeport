import './authForms.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import { supabase } from '../supabaseClient'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignUp() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', terms: false })
  const [errors, setErrors] = useState({})
  
  const [formError, setFormError] = useState('')
  const [confirmationSent, setConfirmationSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const nextValue = type === 'checkbox' ? checked : value
    setForm((prev) => ({ ...prev, [name]: nextValue }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Le nom complet est obligatoire.'
    } else if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Le nom complet est trop court.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'L’adresse e-mail est obligatoire.'
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'L’adresse e-mail n’est pas valide.'
    }

    if (!form.password) {
      nextErrors.password = 'Le mot de passe est obligatoire.'
    } else if (form.password.length < 8) {
      nextErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.'
    } else if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/\d/.test(form.password)) {
      nextErrors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.'
    }

    if (!form.terms) {
      nextErrors.terms = "Vous devez accepter les conditions d'utilisation."
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
    const { error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
      emailRedirectTo: `${window.location.origin}/email-confirme`,
      data: {
        full_name: form.fullName.trim(),
      },
    },
    })

    if (error) {
      setFormError(error.message)
      return
    }

    setConfirmationSent(true)
  } catch {
    setFormError('Impossible de contacter le service. Réessaie.')
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <div className="container page auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Créer un compte</h1>
        <p>Accédez à votre espace personnel pour suivre votre demande.</p>

        {formError && <p role="alert" className="field-error">{formError}</p>}

        {confirmationSent && (
          <p role="status">
            Compte créé. Vérifie ta boîte mail pour confirmer ton adresse.
          </p>
        )}

        <label htmlFor="fullName">Nom complet *</label>
        <input
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Ex. : Jean Dupont"
          required
          className={errors.fullName ? 'input-error' : ''}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && <span id="fullName-error" className="field-error" role="alert">{errors.fullName}</span>}

        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Ex. : jean@exemple.com"
          required
          className={errors.email ? 'input-error' : ''}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <span id="email-error" className="field-error" role="alert">{errors.email}</span>}

        <label htmlFor="password">Mot de passe *</label>
        <PasswordInput
          id="password"
          name="password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          placeholder="Minimum 8 caractères"
          error={errors.password}
        />
        {errors.password && <span id="password-error" className="field-error" role="alert">{errors.password}</span>}

        <label className={`auth-terms ${errors.terms ? 'input-error' : ''}`}>
          <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
          J'accepte les conditions d'utilisation et la politique de confidentialité
        </label>
        {errors.terms && <span className="field-error" role="alert">{errors.terms}</span>}

        <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || confirmationSent}>
            {isSubmitting ? 'Inscription en cours…' : 'S’inscrire'}
        </button>

        <p className="auth-switch">
          Déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
      </form>
    </div>
  )
}