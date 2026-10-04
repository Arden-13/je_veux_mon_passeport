import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEnrollment } from '../../context/EnrollmentContext'
import { DOCUMENT_LABELS, getMissing } from '../../utils/dossier'
import './RecapitulatifStep.css'

const SECTIONS = [
  {
    step: 'identite',
    title: 'Informations personnelles',
    rows: [
      ['Nom', 'nom'],
      ['Prénoms', 'prenoms'],
      ['Date de naissance', 'dateNaissance'],
      ['Lieu de naissance', 'lieuNaissance'],
      ['Sexe', 'sexe'],
      ['Nationalité', 'nationalite'],
      ["Carte d'identité", 'numeroCni'],
    ],
  },
  { step: 'famille', title: 'Famille', rows: [['Père', 'nomPere'], ['Mère', 'nomMere']] },
  {
    step: 'adresse',
    title: 'Adresse et contact',
    rows: [['Adresse', 'rue'], ['Ville', 'ville'], ['Pays', 'pays'], ['Téléphone', 'telephone'], ['E-mail', 'email']],
  },
  { step: 'profession', title: 'Profession', rows: [['Profession', 'profession'], ['Employeur', 'employeur']] },
]

const formatDate = (iso) => (iso ? iso.split('-').reverse().join('/') : '')

export default function RecapitulatifStep() {
  const { data } = useEnrollment()
  const navigate = useNavigate()
  const [certified, setCertified] = useState(false)
  const missing = getMissing(data)
  const canSubmit = missing.length === 0 && certified

  function submit(e) {
    e.preventDefault()
    if (!canSubmit) return
    // TODO (tâche T15) : envoyer le dossier à l'API et récupérer la référence
    navigate('/confirmation')
  }

  return (
    <form className="recap" onSubmit={submit}>
      <p>Vérifiez vos informations avant de valider.</p>

      {missing.length > 0 && (
        <div className="recap-alert" role="alert">
          <strong>Votre dossier est incomplet</strong>
          <ul>
            {missing.map((m) => (
              <li key={`${m.step}-${m.label}`}>
                <Link to={`/demande/${m.step}`}>{m.label}</Link> : à compléter
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="recap-grid">
        {SECTIONS.map((s) => (
          <section className="recap-card" key={s.step}>
            <header>
              <h2>{s.title}</h2>
              <Link to={`/demande/${s.step}`}>Modifier</Link>
            </header>
            <dl>
              {s.rows.map(([label, key]) => {
                const raw = data[s.step]?.[key]
                const value = key === 'dateNaissance' ? formatDate(raw) : raw
                return (
                  <div key={key}>
                    <dt>{label}</dt>
                    <dd>{value || '—'}</dd>
                  </div>
                )
              })}
            </dl>
          </section>
        ))}
        <section className="recap-card">
          <header>
            <h2>Documents</h2>
            <Link to="/demande/documents">Modifier</Link>
          </header>
          <ul className="recap-docs">
            {Object.entries(DOCUMENT_LABELS).map(([key, label]) => {
              const doc = data.documents?.[key]
              return (
                <li key={key} className={doc ? 'recap-ok' : 'recap-ko'}>
                  {doc ? '✓' : '✗'} {label}
                  {doc && <span className="recap-file"> ({doc.name})</span>}
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <label className="recap-certify">
        <input type="checkbox" checked={certified} onChange={(e) => setCertified(e.target.checked)} />
        Je certifie l'exactitude des informations fournies et je valide ma demande.
      </label>
      {!canSubmit && (
        <p className="recap-hint" aria-live="polite">
          Complétez le dossier et cochez la case pour pouvoir valider.
        </p>
      )}

      <div className="step-nav">
        <Link to="/demande/documents" className="step-back">← Précédent</Link>
        <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
          Valider et soumettre →
        </button>
      </div>
    </form>
  )
}
