import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEnrollment } from '../context/EnrollmentContext'
import useDemande from '../hooks/useDemande'
import { formatLongDate, getStatusLabel, isSubmitted } from '../utils/application'

// Page affichée juste après l'envoi du dossier.
// Les informations viennent de data.application : trackingNumber, status, submittedAt
export default function Confirmation() {
  const { data } = useEnrollment()
  const { config } = useDemande()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const application = data?.application

  if (!isSubmitted(application)) {
    const hasDraft = Boolean(application?.trackingNumber)
    return (
      <div className="container page">
        <h1>Confirmation de votre demande</h1>
        <p>
          {hasDraft
            ? "Votre dossier n'a pas encore été envoyé."
            : "Aucune demande n'a été envoyée pour le moment."}
        </p>
        <Link
          to={hasDraft ? '/demande/recapitulatif' : '/demande/type'}
          className="btn btn-primary"
        >
          {hasDraft ? 'Revenir au récapitulatif' : 'Commencer une demande'}
        </Link>
      </div>
    )
  }

  const { trackingNumber, submittedAt } = application
  const statusLabel = getStatusLabel(application.status)
  const submittedDate = formatLongDate(submittedAt) || '—'
  const identity = data?.identite

  async function copyReference() {
    try {
      await navigator.clipboard.writeText(trackingNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // La copie n'est pas possible dans ce navigateur : on ne fait rien
    }
  }

  function downloadReceipt() {
    const lines = ['RÉCÉPISSÉ DE DEMANDE', '', `Numéro de récépissé : ${trackingNumber}`]
    if (identity?.nom) {
      lines.push(`Demandeur : ${identity.nom} ${identity.prenoms ?? ''}`.trim())
    }
    lines.push(
      `Date de soumission : ${submittedDate}`,
      `Type de demande : ${config.label}`,
      `Statut : ${statusLabel}`,
    )
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${trackingNumber}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container page">
      <h1>Confirmation de votre demande</h1>
      <div style={{ maxWidth: 760 }}>
        <section className="confirmation-card">
          <div className="confirmation-header">
            <span className="success-icon">✓</span>
            <div>
              <h2>Votre demande a bien été enregistrée !</h2>
              <p>
                Nous vous remercions pour votre confiance. Votre dossier a été enregistré avec
                succès.
              </p>
            </div>
          </div>

          <div className="receipt">
            <div>
              <span>Numéro de récépissé</span>
              <strong>{trackingNumber}</strong>
            </div>
            <button type="button" onClick={copyReference}>
              {copied ? 'Copié !' : 'Copier'}
            </button>
          </div>

          <div className="request-info">
            <div className="info-item">
              <span>Date de soumission</span>
              <strong>{submittedDate}</strong>
            </div>
            <div className="info-item">
              <span>Type de demande</span>
              <strong>{config.label}</strong>
            </div>
            <div className="info-item">
              <span>Statut actuel</span>
              <strong>{statusLabel}</strong>
            </div>
          </div>

          <div className="actions">
            <button type="button" onClick={downloadReceipt}>
              Télécharger le récépissé
            </button>
            <button type="button" onClick={() => navigate('/suivi')}>
              Suivre mon dossier
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}