import { Link } from 'react-router-dom'
import FormField from '../../components/FormField'
import useStepForm from '../../hooks/useStepForm'

export default function ProfessionStep() {
  // Étape facultative : aucun champ obligatoire
  const { errors, field, onSubmit } = useStepForm({
    step: 'profession',
    initial: { profession: '', employeur: '' },
    validate: () => ({}),
    next: '/demande/documents',
  })

  return (
    <form className="step-form" onSubmit={onSubmit} noValidate>
      <p>Cette étape est facultative.</p>
      <div className="field-grid">
        <FormField id="profession" label="Profession" error={errors.profession}>
          <input {...field('profession')} />
        </FormField>
        <FormField id="employeur" label="Employeur" error={errors.employeur}>
          <input {...field('employeur')} />
        </FormField>
      </div>
      <div className="step-nav">
        <Link to="/demande/adresse" className="step-back">← Précédent</Link>
        <button type="submit" className="btn btn-primary">Suivant →</button>
      </div>
    </form>
  )
}
