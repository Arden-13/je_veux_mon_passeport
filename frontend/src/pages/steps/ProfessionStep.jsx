import { Link } from 'react-router-dom'
import FormField from '../../components/FormField'
import useStepForm from '../../hooks/useStepForm'

export default function ProfessionStep() {
  // Étape facultative : aucun champ obligatoire
  const { errors, field, onSubmit, previousPath, submitError, submitting } = useStepForm({
    step: 'profession',
    initial: { profession: '', employeur: '' },
    validate: () => ({}),
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
      {submitError && <p className="field-error" role="alert">{submitError}</p>}
      <div className="step-nav">
        <Link to={previousPath} className="step-back">← Précédent</Link>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Enregistrement…' : 'Suivant →'}
        </button>
      </div>
    </form>
  )
}
