import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEnrollment } from '../../context/EnrollmentContext'
import useDemande from '../../hooks/useDemande'
import { getMissing } from '../../utils/dossier'
import './RecapitulatifStep.css'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/api'


// Les lignes affichées dépendent du type de demande
const SECTIONS = [
  {
    step: 'identite',
    title: 'Informations personnelles',
    rows: (c) => [
      ['Nom', 'nom'],
      ['Prénoms', 'prenoms'],
      ['Date de naissance', 'dateNaissance'],
      ['Lieu de naissance', 'lieuNaissance'],
      ['Sexe', 'sexe'],
      ['Nationalité', 'nationalite'],
      ...(c.identite.cni ? [["Carte d'identité", 'numeroCni']] : []),
      ...(c.identite.passeportActuel
        ? [['Passeport actuel', 'numeroPasseport'], ["Date d'expiration", 'dateExpirationPasseport']]
        : []),
    ],
  },
  {
    step: 'famille',
    title: 'Famille',
    rows: (c) => [
      ['Père', 'nomPere'],
      ['Mère', 'nomMere'],
      ...(c.famille.situation ? [['Situation matrimoniale', 'situationMatrimoniale']] : []),
      ...(c.famille.enfants ? [['Enfants', 'aEnfants']] : []),
      ...(c.famille.consentement ? [['Consentement des parents', 'consentementParents']] : []),
    ],
  },
  {
    step: 'adresse',
    title: 'Adresse et contact',
    rows: () => [['Adresse', 'rue'], ['Ville', 'ville'], ['Pays', 'pays'], ['Téléphone', 'telephone'], ['E-mail', 'email']],
  },
  { step: 'profession', title: 'Profession', rows: () => [['Profession', 'profession'], ['Employeur', 'employeur']] },
]

const formatDate = (iso) => (iso ? iso.split('-').reverse().join('/') : '')

// Valeur affichée pour une ligne du récapitulatif
function displayValue(key, raw, sectionData) {
  if (key === 'dateNaissance' || key === 'dateExpirationPasseport') return formatDate(raw)
  if (key === 'aEnfants' && raw === 'Oui') return `Oui (${sectionData?.nombreEnfants || '?'})`
  return raw
}

export default function RecapitulatifStep() {
  const { data, update } = useEnrollment()
  const { token } = useAuth()

  const navigate = useNavigate()
  const { config, steps, documents, previousPath } = useDemande()

  const [certified, setCertified] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const missing = getMissing(data)
  const canSubmit = missing.length === 0 && certified
  const sections = SECTIONS.filter((s) =>
    steps.some((st) => st.id === s.step)
  )

  async function submit(e) {
    e.preventDefault()
    if (!canSubmit) return

    const trackingNumber = data.application?.trackingNumber
    if (!token || !trackingNumber) {
      setSubmitError('Session ou numéro de dossier manquant. Reprenez la création du dossier.')
      return
    }

    try {
      setSubmitting(true)
      setSubmitError('')
      await api(`/applications/${encodeURIComponent(trackingNumber)}/submit`, {
        method: 'PATCH',
        token,
        body: { isCertified: true },
      })
      update('application', { status: 'submitted', submittedAt: new Date().toISOString() })
      navigate('/confirmation')
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="recap" onSubmit={submit}>
      <div className="recap-summary">
        <div>
          <span className="recap-kicker">Résumé de votre demande</span>
          <p>
            Type de demande : <strong>{config.label}</strong>
          </p>
        </div>
        <Link to="/demande/type" className="recap-edit-link">Modifier</Link>
      </div>

      <p className="recap-intro">Vérifiez vos informations avant de valider votre demande.</p>

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
        {sections.map((s) => (
          <section className="recap-card" key={s.step}>
            <header>
              <h2>{s.title}</h2>
              <Link to={`/demande/${s.step}`}>Modifier</Link>
            </header>
            <dl>
              {s.rows(config).map(([label, key]) => {
                const value = displayValue(key, data[s.step]?.[key], data[s.step])
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
            {documents.map((d) => {
              const doc = data.documents?.[d.key]
              return (
                <li key={d.key} className={doc ? 'recap-ok' : 'recap-ko'}>
                  {doc ? '✓' : '✗'} {d.title}
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
      {submitError && <div className="recap-alert" role="alert">{submitError}</div>}

      <div className="step-nav">
        <Link to={previousPath('recapitulatif')} className="step-back">← Précédent</Link>
        <button type="submit" className="btn btn-primary" disabled={!canSubmit || submitting}>
          {submitting ? 'Envoi…' : 'Valider et soumettre →'}
        </button>
      </div>
    </form>
  )
}
