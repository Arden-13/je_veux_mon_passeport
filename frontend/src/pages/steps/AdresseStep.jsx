import { Link } from 'react-router-dom'
import FormField from '../../components/FormField'
import useStepForm from '../../hooks/useStepForm'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^\+?\d{8,15}$/

function validate(v) {
  const e = {}
  if (!v.rue.trim()) e.rue = "L'adresse de résidence est obligatoire."
  if (!v.ville.trim()) e.ville = 'La ville est obligatoire.'
  if (!v.pays.trim()) e.pays = 'Le pays est obligatoire.'
  if (!v.telephone.trim()) e.telephone = 'Le numéro de téléphone est obligatoire.'
  else if (!PHONE.test(v.telephone.replace(/[\s.-]/g, ''))) e.telephone = 'Numéro invalide (8 à 15 chiffres, avec + facultatif).'
  if (!v.email.trim()) e.email = "L'adresse e-mail est obligatoire."
  else if (!EMAIL.test(v.email.trim())) e.email = "L'adresse e-mail n'est pas valide."
  return e
}

export default function AdresseStep() {
  const { errors, field, onSubmit, previousPath } = useStepForm({
    step: 'adresse',
    initial: { rue: '', ville: '', pays: 'Congo', telephone: '', email: '' },
    validate,
  })

  return (
    <form className="step-form" onSubmit={onSubmit} noValidate>
      <p>Indiquez où vous habitez et comment vous joindre.</p>
      <div className="field-grid">
        <FormField id="rue" label="Adresse de résidence" required error={errors.rue}>
          <input {...field('rue')} placeholder="Rue, numéro, quartier" autoComplete="street-address" />
        </FormField>
        <FormField id="ville" label="Ville" required error={errors.ville}>
          <input {...field('ville')} placeholder="Ex. : Brazzaville" autoComplete="address-level2" />
        </FormField>
        <FormField id="pays" label="Pays" required error={errors.pays}>
          <input {...field('pays')} autoComplete="country-name" />
        </FormField>
        <FormField id="telephone" label="Téléphone" required error={errors.telephone}>
          <input type="tel" {...field('telephone')} placeholder="+242 ..." autoComplete="tel" />
        </FormField>
        <FormField id="email" label="Adresse e-mail" required error={errors.email}>
          <input type="email" {...field('email')} placeholder="nom@exemple.com" autoComplete="email" />
        </FormField>
      </div>
      <div className="step-nav">
        <Link to={previousPath} className="step-back">← Précédent</Link>
        <button type="submit" className="btn btn-primary">Suivant →</button>
      </div>
    </form>
  )
}
