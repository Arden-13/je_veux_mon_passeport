import { Link } from 'react-router-dom'
import { useEnrollment } from '../context/EnrollmentContext'
import useDemande from '../hooks/useDemande'
import { formatLongDate, isSubmitted, statusIndex } from '../utils/application'

// Les 5 étapes sont dans le même ordre que STATUSES (utils/constants.js)
const trackingSteps = {
  adulte: [
    { title: 'Demande enregistrée', description: 'Votre demande a bien été reçue.' },
    { title: 'Vérification des documents', description: 'Vos documents sont en cours de vérification.' },
    { title: 'Contrôle administratif', description: 'Votre dossier est en cours de contrôle.' },
    { title: 'Traitement et impression', description: 'Votre passeport est en cours de préparation.' },
    { title: 'Retrait du passeport', description: 'Votre passeport est disponible.' },
  ],
  mineur: [
    { title: 'Demande enregistrée', description: 'La demande du mineur a bien été reçue.' },
    { title: 'Vérification des documents', description: 'Les documents du mineur et des parents sont vérifiés.' },
    { title: 'Contrôle administratif', description: 'Le dossier est en cours de contrôle.' },
    { title: 'Traitement et impression', description: 'Le passeport du mineur est en préparation.' },
    { title: 'Retrait du passeport', description: 'Le passeport est disponible.' },
  ],
  renouvellement: [
    { title: 'Demande enregistrée', description: 'Votre demande de renouvellement a bien été reçue.' },
    { title: 'Vérification des documents', description: 'Les documents nécessaires au renouvellement sont vérifiés.' },
    { title: 'Ancien passeport vérifié', description: 'Les informations de votre ancien passeport sont contrôlées.' },
    { title: 'Traitement et impression', description: 'Votre nouveau passeport est en cours de préparation.' },
    { title: 'Retrait du passeport', description: 'Votre nouveau passeport est disponible.' },
  ],
}

// Page de suivi : tout vient de data.application (trackingNumber, status, submittedAt)
export default function Tracking() {
  const { data } = useEnrollment()
  const { type, config } = useDemande()
  const application = data.application

  if (!isSubmitted(application)) {
    return (
      <div className="container page">
        <h1>Suivi de votre dossier</h1>
        <p>{application?.trackingNumber ? "Votre dossier n'a pas encore été envoyé." : 'Aucun dossier à suivre pour le moment.'}</p>
        <Link to={application?.trackingNumber ? '/demande/recapitulatif' : '/demande/type'} className="btn btn-primary">
          {application?.trackingNumber ? 'Revenir au récapitulatif' : 'Commencer une demande'}
        </Link>
      </div>
    )
  }

  const steps = trackingSteps[type]
  // Étape en cours = celle qui suit le statut atteint (toutes terminées si le passeport est à retirer)
  const currentStep = statusIndex(application.status) + 1

  return (
    <div className="container page">
      <h1>Suivi de votre dossier</h1>
      <div style={{ maxWidth: 760 }}>
        <p>
          Référence : <strong>{application.trackingNumber}</strong> · {config.label} · déposé le{' '}
          {formatLongDate(application.submittedAt) || '—'}
        </p>

        <section className="tracking-card" id="suivi">
          <h2>Suivi de votre demande</h2>
          <p>Vous pouvez suivre l'avancement de votre dossier à tout moment.</p>

          <div className="timeline">
            {steps.map((step, index) => (
              <div
                className={`timeline-step ${
                  index < currentStep ? 'completed' : index === currentStep ? 'active' : 'pending'
                }`}
                key={step.title}
              >
                <div className="step-circle">
                  {index < currentStep ? '✓' : index === currentStep ? '●' : '○'}
                </div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p>
          <Link to="/confirmation">Voir la confirmation et le récépissé</Link>
        </p>
      </div>
    </div>
  )
}
