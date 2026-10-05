import './authForms.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', terms: false })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password.length < 8) return setError('Le mot de passe doit contenir au moins 8 caractères.')
    if (!form.terms) return setError("Vous devez accepter les conditions d'utilisation.")
    setError('')
    // TODO: appel API d'inscription quand le backend sera prêt
    navigate('/demande/type')
  }

  return (
    <div className="container page auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Créer un compte</h1>
        <p>Accédez à votre espace personnel pour suivre votre demande.</p>

        <label htmlFor="fullName">Nom complet *</label>
        <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Ex. : Jean Dupont" required />

        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Ex. : jean@exemple.com" required />

        <label htmlFor="password">Mot de passe *</label>
        <PasswordInput
          id="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Minimum 8 caractères"
        />

        <label className="auth-terms">
          <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
          J'accepte les conditions d'utilisation et la politique de confidentialité
        </label>

        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="btn btn-primary">S'inscrire</button>

        <p className="auth-switch">
          Déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
      </form>
    </div>
  )
}