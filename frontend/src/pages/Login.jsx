import './authForms.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'

export default function Login() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: appel API de connexion quand le backend sera prêt
    navigate('/demande/type')
  }

  return (
    <div className="container page auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Se connecter</h1>
        <p>Bienvenue ! Connectez-vous à votre espace.</p>

        <label htmlFor="identifier">Email ou numéro de téléphone *</label>
        <input
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Ex. : jean@exemple.com"
          required
        />

        <label htmlFor="password">Mot de passe *</label>
        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Votre mot de passe"
        />

        <button type="submit" className="btn btn-primary">Se connecter</button>

        <p className="auth-switch">
          Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
        </p>
      </form>
    </div>
  )
}