import { useEnrollment } from '../context/EnrollmentContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './authForms.css'

const TYPES = [
  {
    id: 'adulte',
    icon: '/assets/adulte.png',
    title: 'Passeport biométrique pour adulte',
    text: 'Pour les personnes âgées de 18 ans et plus.',
  },
  {
    id: 'mineur',
    icon: '/assets/enfant.png',
    title: 'Passeport biométrique pour mineur',
    text: 'Pour les enfants de moins de 18 ans.',
  },
  {
    id: 'renouvellement',
    icon: '/assets/renouvelable.png',
    title: 'Renouvellement',
    text: 'Pour un passeport expiré ou bientôt expiré.',
  },
]

export default function RequestType() {
  const navigate = useNavigate()
  // const [selected, setSelected] = useState('adulte')
const { data, update } = useEnrollment()
const [selected, setSelected] = useState(data.type?.choix ?? 'adulte')

  const handleContinue = () => {
    // TODO: enregistrer `selected` dans EnrollmentContext (à brancher quand on aura vu le contexte)
    update('type', { choix: selected })
    navigate('/demande/identite') // à vérifier : nom exact de la première étape dans Enrollment.jsx
  }

  return (
    <div className="container page">
      <h1 className="rt-title">Type de demande</h1>
      <p className="rt-subtitle">Sélectionnez le type de passeport que vous souhaitez demander.</p>

      <div className="rt-grid" role="radiogroup" aria-label="Type de demande">
        {TYPES.map((t) => (
          <label key={t.id} className={selected === t.id ? 'rt-card rt-selected' : 'rt-card'}>
            <input
              type="radio"
              name="requestType"
              value={t.id}
              checked={selected === t.id}
              onChange={() => setSelected(t.id)}
            />
            <span className="rt-icon" aria-hidden="true">
              <img src={t.icon} alt="" />
            </span>
            <strong>{t.title}</strong>
            <span className="rt-text">{t.text}</span>
          </label>
        ))}
      </div>

      <div className="rt-info">
        <strong>Bon à savoir</strong>
        <p>Le passeport biométrique est valable 10 ans pour les adultes et 5 ans pour les mineurs.</p>
      </div>

      <div className="rt-actions">
        <button type="button" className="btn btn-primary" onClick={handleContinue}>
          Continuer →
        </button>
      </div>
    </div>
  )
}