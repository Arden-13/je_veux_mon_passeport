import { Link } from 'react-router-dom'
import FormField from '../../components/FormField'
import useStepForm from '../../hooks/useStepForm'

function validate(v) {
  const e = {}
  if (!v.nomPere.trim()) e.nomPere = 'Le nom du père est obligatoire.'
  if (!v.nomMere.trim()) e.nomMere = 'Le nom de la mère est obligatoire.'
  return e
}

export default function FamilleStep() {
  const { errors, field, onSubmit } = useStepForm({
    step: 'famille',
    initial: { nomPere: '', nomMere: '' },
    validate,
    next: '/demande/adresse',
  })

  return (
    <form className="step-form" onSubmit={onSubmit} noValidate>
      <p>Indiquez le nom de vos parents, comme sur votre acte de naissance.</p>
      <div className="field-grid">
        <FormField id="nomPere" label="Nom et prénoms du père" required error={errors.nomPere}>
          <input {...field('nomPere')} autoComplete="off" />
        </FormField>
        <FormField id="nomMere" label="Nom et prénoms de la mère" required error={errors.nomMere}>
          <input {...field('nomMere')} autoComplete="off" />
        </FormField>
      </div>
      <div className="step-nav">
        <Link to="/demande/identite" className="step-back">← Précédent</Link>
        <button type="submit" className="btn btn-primary">Suivant →</button>
      </div>
    </form>
  )
}
