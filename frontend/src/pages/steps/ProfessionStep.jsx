import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '../../components/FormField'
import useStepForm from '../../hooks/useStepForm'
import useDemande from '../../hooks/useDemande'
import { useEnrollment } from '../../context/EnrollmentContext'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/api'

export default function ProfessionStep() {
  const { nextPath } = useDemande()
  const { data, update } = useEnrollment()
  const { token } = useAuth()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState('')
  // Étape facultative : aucun champ obligatoire
  const { values, errors, field, previousPath } = useStepForm({
    step: 'profession',
    initial: { profession: '', employeur: '' },
    validate: () => ({}),
  })

  async function handleSubmit(e) {
    e.preventDefault()

    const trackingNumber = data.application?.trackingNumber
    if (!token || !trackingNumber) {
      setSubmitError('Session ou numéro de dossier manquant. Reprenez la création du dossier.')
      return
    }

    try {
      setSubmitError('')
      await api(`/applications/${encodeURIComponent(trackingNumber)}/profession`, {
        method: 'PATCH',
        token,
        body: {
          profession: values.profession.trim(),
          employer: values.employeur.trim(),
        },
      })
      update('profession', values)
      navigate(nextPath('profession'))
    } catch (error) {
      setSubmitError(error.message)
    }
  }

  return (
    <form className="step-form" onSubmit={handleSubmit} noValidate>
      <p>Cette étape est facultative.</p>
      {submitError && <p role="alert">{submitError}</p>}
      <div className="field-grid">
        <FormField id="profession" label="Profession" error={errors.profession}>
          <input {...field('profession')} />
        </FormField>
        <FormField id="employeur" label="Employeur" error={errors.employeur}>
          <input {...field('employeur')} />
        </FormField>
      </div>
      <div className="step-nav">
        <Link to={previousPath} className="step-back">← Précédent</Link>
        <button type="submit" className="btn btn-primary">Suivant →</button>
      </div>
    </form>
  )
}
