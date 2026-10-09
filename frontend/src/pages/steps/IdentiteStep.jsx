import { Link } from 'react-router-dom'
import FormField from '../../components/FormField'
import useStepForm from '../../hooks/useStepForm'
import useDemande from '../../hooks/useDemande'
import { calculateAge } from '../../utils/demandeConfig'

const INITIAL = {
  nom: '',
  prenoms: '',
  dateNaissance: '',
  lieuNaissance: '',
  sexe: '',
  nationalite: 'Congolaise',
  numeroCni: '',
  numeroPasseport: '',
  dateExpirationPasseport: '',
}

function validate(v, type, config) {
  const e = {}
  if (!v.nom.trim()) e.nom = 'Le nom est obligatoire.'
  if (!v.prenoms.trim()) e.prenoms = 'Les prénoms sont obligatoires.'
  if (!v.dateNaissance) e.dateNaissance = 'La date de naissance est obligatoire.'
  else if (new Date(v.dateNaissance) > new Date()) e.dateNaissance = 'La date ne peut pas être dans le futur.'
  else {
    const age = calculateAge(v.dateNaissance)
    if (type === 'adulte' && age < 18) e.dateNaissance = 'Pour un passeport adulte, le demandeur doit avoir 18 ans ou plus.'
    if (type === 'mineur' && age >= 18) e.dateNaissance = 'Pour un passeport mineur, le demandeur doit avoir moins de 18 ans.'
  }
  if (!v.lieuNaissance.trim()) e.lieuNaissance = 'Le lieu de naissance est obligatoire.'
  if (!v.sexe) e.sexe = 'Choisissez une option.'
  if (config.identite.cni && !v.numeroCni.trim()) e.numeroCni = "Le numéro de la carte d'identité est obligatoire."
  if (config.identite.passeportActuel) {
    if (!v.numeroPasseport.trim()) e.numeroPasseport = 'Le numéro du passeport actuel est obligatoire.'
    if (!v.dateExpirationPasseport) e.dateExpirationPasseport = "La date d'expiration est obligatoire."
  }
  return e
}

export default function IdentiteStep() {
  const { type, config } = useDemande()
  const { values, errors, field, onChange, onSubmit, previousPath, submitError, submitting } = useStepForm({
    step: 'identite',
    initial: INITIAL,
    validate: (v) => validate(v, type, config),
  })

  const intro =
    type === 'mineur'
      ? "Renseignez les informations de l'enfant, comme sur son acte de naissance."
      : type === 'renouvellement'
        ? "Renseignez vos informations d'identité et celles de votre passeport actuel."
        : "Renseignez vos informations d'identité comme sur votre acte de naissance."

  return (
    <form className="step-form" onSubmit={onSubmit} noValidate>
      <p>{intro}</p>
      <div className="field-grid">
        <FormField id="nom" label="Nom" required error={errors.nom}>
          <input {...field('nom')} placeholder="Ex. : MOUNGABIO" autoComplete="family-name" />
        </FormField>
        <FormField id="prenoms" label="Prénoms" required error={errors.prenoms}>
          <input {...field('prenoms')} placeholder="Ex. : Christ" autoComplete="given-name" />
        </FormField>
        <FormField id="dateNaissance" label="Date de naissance" required error={errors.dateNaissance}>
          <input type="date" {...field('dateNaissance')} autoComplete="bday" />
        </FormField>
        <FormField id="lieuNaissance" label="Lieu de naissance" required error={errors.lieuNaissance}>
          <input {...field('lieuNaissance')} placeholder="Ex. : Brazzaville" />
        </FormField>
        <fieldset className="field-radios">
          <legend>Sexe <span aria-hidden="true">*</span></legend>
          <div className="radios">
            <label>
              <input type="radio" id="sexe" name="sexe" value="Masculin" checked={values.sexe === 'Masculin'} onChange={onChange} />
              Masculin
            </label>
            <label>
              <input type="radio" name="sexe" value="Féminin" checked={values.sexe === 'Féminin'} onChange={onChange} />
              Féminin
            </label>
          </div>
          {errors.sexe && <span className="field-error" role="alert">{errors.sexe}</span>}
        </fieldset>
        <FormField id="nationalite" label="Nationalité" required>
          <select {...field('nationalite')}>
            <option>Congolaise</option>
            <option>Autre</option>
          </select>
        </FormField>
        {config.identite.cni && (
          <FormField id="numeroCni" label="Numéro de la carte d'identité" required error={errors.numeroCni}>
            <input {...field('numeroCni')} />
          </FormField>
        )}
        {config.identite.passeportActuel && (
          <>
            <FormField id="numeroPasseport" label="Numéro du passeport actuel" required error={errors.numeroPasseport}>
              <input {...field('numeroPasseport')} />
            </FormField>
            <FormField id="dateExpirationPasseport" label="Date d'expiration du passeport" required error={errors.dateExpirationPasseport}>
              <input type="date" {...field('dateExpirationPasseport')} />
            </FormField>
          </>
        )}
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
