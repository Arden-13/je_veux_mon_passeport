import '../pages/authForms.css'
import { useState } from 'react'

export default function PasswordInput({ id, name, value, onChange, placeholder, error }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="auth-password">
      <input
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={error ? 'input-error' : ''}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button
        type="button"
        className="auth-eye"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
      >
        {visible ? <img src="/assets/cacher.png" alt="" /> : <img src="/assets/oeil.png" alt="" />}
      </button>
    </div>
  )
}