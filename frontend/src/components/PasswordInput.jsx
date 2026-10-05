import '../pages/authForms.css'
import { useState } from 'react'

export default function PasswordInput({ id, value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="auth-password">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
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