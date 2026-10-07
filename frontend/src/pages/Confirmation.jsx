import { useEnrollment } from '../context/EnrollmentContext'

export default function Confirmation() {
  const { data } = useEnrollment()

  return (
    <div className="container page">
      <h1>Confirmation de votre demande</h1>
      <p>Votre demande a été transmise.</p>
      {data.application?.trackingNumber && (
        <p>Votre numéro de suivi : <strong>{data.application.trackingNumber}</strong></p>
      )}
    </div>
  )
}
