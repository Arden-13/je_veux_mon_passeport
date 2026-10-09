import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEnrollment } from '../context/EnrollmentContext'
import { useAuth } from '../context/AuthContext'
import { saveApplicationStep } from '../services/applicationApi'
import { getFlow } from '../utils/demandeConfig'

// Gère les valeurs, les erreurs et le passage à l'étape suivante d'un formulaire d'étape.
// L'étape suivante et l'étape précédente dépendent du type de demande.
export default function useStepForm({ step, initial, validate }) {
  const { data, update } = useEnrollment()
  const { token } = useAuth()
  const navigate = useNavigate()
  const flow = getFlow(data)
  const [values, setValues] = useState(() => ({
    ...initial,
    ...Object.fromEntries(
      Object.entries(data[step] || {}).filter(([, value]) => value !== undefined && value !== null),
    ),
  }))
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  // Propriétés à donner à chaque <input> : {...field('nom')}
  const field = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange,
    className: 'field-input',
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  async function onSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const application = await saveApplicationStep({
        step,
        values,
        savedValues: data[step],
        application: data.application,
        token,
      })
      update(step, values)
      if (step === 'identite') update('application', application)
      navigate(flow.nextPath(step))
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return {
    values,
    setValues,
    errors,
    field,
    setErrors,
    onChange,
    onSubmit,
    submitError,
    submitting,
    previousPath: flow.previousPath(step),
  }
}
