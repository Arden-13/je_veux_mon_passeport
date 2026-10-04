import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEnrollment } from '../context/EnrollmentContext'

// Gère les valeurs, les erreurs et le passage à l'étape suivante d'un formulaire d'étape
export default function useStepForm({ step, initial, validate, next }) {
  const { data, update } = useEnrollment()
  const navigate = useNavigate()
  const [values, setValues] = useState({ ...initial, ...data[step] })
  const [errors, setErrors] = useState({})

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

  function onSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    update(step, values)
    navigate(next)
  }

  return { values, errors, field, onSubmit }
}
