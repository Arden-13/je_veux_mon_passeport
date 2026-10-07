import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '../../components/FormField'
import useStepForm from '../../hooks/useStepForm'
import useDemande from '../../hooks/useDemande'
import { useEnrollment } from '../../context/EnrollmentContext'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/api'

const SITUATIONS = ['Célibataire', 'Marié(e)', 'Divorcé(e)']
const NOMBRES = Array.from({ length: 10 }, (_, i) => String(i + 1))

function validate(v, rules) {
  const e = {}
  if (!v.nomPere.trim()) e.nomPere = 'Le nom du père est obligatoire.'
  if (!v.nomMere.trim()) e.nomMere = 'Le nom de la mère est obligatoire.'
  if (rules.situation && !v.situationMatrimoniale) e.situationMatrimoniale = 'Choisissez votre situation matrimoniale.'
  if (rules.enfants) {
    if (!v.aEnfants) e.aEnfants = 'Indiquez si vous avez des enfants.'
    else if (v.aEnfants === 'Oui' && !v.nombreEnfants) e.nombreEnfants = "Indiquez le nombre d'enfants."
  }
  if (rules.consentement && !v.consentementParents) e.consentementParents = 'Le consentement des deux parents est obligatoire.'
  return e
}

export default function FamilleStep() {
  const { config, nextPath } = useDemande()
  const { data, update } = useEnrollment()
  const { token } = useAuth()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState('')
  const rules = config.famille
  const { values, setValues, errors, field, onChange, setErrors, previousPath } = useStepForm({
    step: 'famille',
    initial: { nomPere: '', nomMere: '', situationMatrimoniale: '', aEnfants: '', nombreEnfants: '', consentementParents: '' },
    validate: (v) => validate(v, rules),
  })

  // Si on choisit « Non », on efface le nombre d'enfants
  function chooseEnfants(e) {
    onChange(e)
    if (e.target.value === 'Non') setValues((v) => ({ ...v, nombreEnfants: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const found = validate(values, rules)
    setErrors(found)

    const firstError = Object.keys(found)[0]
    if (firstError) {
      document.getElementById(firstError)?.focus()
      return
    }

    const trackingNumber = data.application?.trackingNumber
    if (!token || !trackingNumber) {
      setSubmitError('Session ou numéro de dossier manquant. Reprenez la création du dossier.')
      return
    }

    try {
      setSubmitError('')
      await api(`/applications/${encodeURIComponent(trackingNumber)}/family`, {
        method: 'PATCH',
        token,
        body: {
          fatherFullName: values.nomPere.trim(),
          motherFullName: values.nomMere.trim(),
        },
      })

      update('famille', values)
      navigate(nextPath('famille'))
    } catch (error) {
      setSubmitError(error.message)
    }
  }

  return (
    <form className="step-form" onSubmit={handleSubmit} noValidate>
      <p>
        {rules.consentement
          ? "Indiquez le nom des parents de l'enfant, comme sur son acte de naissance."
          : 'Indiquez le nom de vos parents, comme sur votre acte de naissance, puis votre situation familiale.'}
      </p>
      {submitError && <p role="alert">{submitError}</p>}
      <div className="field-grid">
        <FormField id="nomPere" label="Nom et prénoms du père" required error={errors.nomPere}>
          <input {...field('nomPere')} autoComplete="off" />
        </FormField>
        <FormField id="nomMere" label="Nom et prénoms de la mère" required error={errors.nomMere}>
          <input {...field('nomMere')} autoComplete="off" />
        </FormField>

        {rules.situation && (
          <fieldset className="field-radios">
            <legend>Situation matrimoniale <span aria-hidden="true">*</span></legend>
            <div className="radios">
              {SITUATIONS.map((s, i) => (
                <label key={s}>
                  <input
                    type="radio"
                    id={i === 0 ? 'situationMatrimoniale' : undefined}
                    name="situationMatrimoniale"
                    value={s}
                    checked={values.situationMatrimoniale === s}
                    onChange={onChange}
                  />
                  {s}
                </label>
              ))}
            </div>
            {errors.situationMatrimoniale && (
              <span className="field-error" role="alert">{errors.situationMatrimoniale}</span>
            )}
          </fieldset>
        )}

        {rules.enfants && (
          <fieldset className="field-radios">
            <legend>Avez-vous des enfants ? <span aria-hidden="true">*</span></legend>
            <div className="radios">
              {['Non', 'Oui'].map((choice, i) => (
                <label key={choice}>
                  <input
                    type="radio"
                    id={i === 0 ? 'aEnfants' : undefined}
                    name="aEnfants"
                    value={choice}
                    checked={values.aEnfants === choice}
                    onChange={chooseEnfants}
                  />
                  {choice}
                </label>
              ))}
            </div>
            {errors.aEnfants && <span className="field-error" role="alert">{errors.aEnfants}</span>}
          </fieldset>
        )}

        {rules.enfants && values.aEnfants === 'Oui' && (
          <FormField id="nombreEnfants" label="Nombre d'enfants" required error={errors.nombreEnfants}>
            <select {...field('nombreEnfants')}>
              <option value="">Choisir</option>
              {NOMBRES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </FormField>
        )}

        {rules.consentement && (
          <div style={{ gridColumn: '1 / -1', display: 'grid', gap: 6 }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 14 }}>
              <input
                type="checkbox"
                id="consentementParents"
                name="consentementParents"
                checked={values.consentementParents === 'Oui'}
                onChange={(e) => setValues((v) => ({ ...v, consentementParents: e.target.checked ? 'Oui' : '' }))}
              />
              Les deux parents consentent à cette demande de passeport pour leur enfant.
            </label>
            {errors.consentementParents && (
              <span className="field-error" role="alert">{errors.consentementParents}</span>
            )}
          </div>
        )}
      </div>
      <div className="step-nav">
        <Link to={previousPath} className="step-back">← Précédent</Link>
        <button type="submit" className="btn btn-primary">Suivant →</button>
      </div>
    </form>
  )
}
