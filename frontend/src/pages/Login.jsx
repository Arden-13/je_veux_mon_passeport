import './authForms.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const nextErrors = {}
    const trimmedIdentifier = identifier.trim()

    if (!trimmedIdentifier) {
      nextErrors.identifier = 'Veuillez saisir votre email ou votre numéro de téléphone.'
    } else if (trimmedIdentifier.includes('@')) {
      if (!emailPattern.test(trimmedIdentifier)) {
        nextErrors.identifier = 'L’adresse e-mail n’est pas valide.'
      }
    } else {
      const cleanedPhone = trimmedIdentifier.replace(/\s+/g, '')
      if (!/^\d{8,15}$/.test(cleanedPhone)) {
        nextErrors.identifier = 'Le numéro de téléphone doit contenir entre 8 et 15 chiffres.'
      }
    }

    if (!password) {
      nextErrors.password = 'Le mot de passe est obligatoire.'
    } else if (password.length < 8) {
      nextErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.'
    }

    return nextErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    // TODO: appel API de connexion quand le backend sera prêt
    navigate('/demande/type')
  }

  return (
    <div className="container page auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Se connecter</h1>
        <p>Bienvenue ! Connectez-vous à votre espace.</p>

        <label htmlFor="identifier">Email ou numéro de téléphone *</label>
        <input
          id="identifier"
          name="identifier"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value)
            if (errors.identifier) {
              setErrors((prev) => ({ ...prev, identifier: '' }))
            }
          }}
          placeholder="Ex. : jean@exemple.com"
          required
          className={errors.identifier ? 'input-error' : ''}
          aria-invalid={!!errors.identifier}
          aria-describedby={errors.identifier ? 'identifier-error' : undefined}
        />
        {errors.identifier && <span id="identifier-error" className="field-error" role="alert">{errors.identifier}</span>}

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
        {errors.password && <span id="password-error" className="field-error" role="alert">{errors.password}</span>}

        <button type="submit" className="btn btn-primary">Se connecter</button>

        <p className="auth-switch">
          Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
        </p>
      </form>
    </div>
  )
}