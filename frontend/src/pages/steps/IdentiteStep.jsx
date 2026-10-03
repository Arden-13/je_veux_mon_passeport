import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEnrollment } from '../../context/EnrollmentContext'
import FormField from '../../components/FormField'

const EMPTY = {
  nom: '',
  prenoms: '',
  dateNaissance: '',
  lieuNaissance: '',
  sexe: '',
  nationalite: 'Congolaise',
  numeroCni: '',
}

function validate(v) {
  const e = {}
  if (!v.nom.trim()) e.nom = 'Le nom est obligatoire.'
  if (!v.prenoms.trim()) e.prenoms = 'Les prénoms sont obligatoires.'
  if (!v.dateNaissance) e.dateNaissance = 'La date de naissance est obligatoire.'
  else if (new Date(v.dateNaissance) > new Date()) e.dateNaissance = 'La date ne peut pas être dans le futur.'
  if (!v.lieuNaissance.trim()) e.lieuNaissance = 'Le lieu de naissance est obligatoire.'
  if (!v.sexe) e.sexe = 'Choisissez une option.'
  if (!v.numeroCni.trim()) e.numeroCni = "Le numéro de la carte d'identité est obligatoire."
  return e
}

export default function IdentiteStep() {
  const { data, update } = useEnrollment()
  const navigate = useNavigate()
  const [values, setValues] = useState({ ...EMPTY, ...data.identite })
  const [errors, setErrors] = useState({})

  const change = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const field = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: change,
    className: 'field-input',
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  function submit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    update('identite', values)
    navigate('/demande/famille')
  }

  return (
    <form className="step-form" onSubmit={submit} noValidate>
      <p>Renseignez vos informations d'identité comme sur votre acte de naissance.</p>
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
              <input type="radio" id="sexe" name="sexe" value="Masculin" checked={values.sexe === 'Masculin'} onChange={change} />
              Masculin
            </label>
            <label>
              <input type="radio" name="sexe" value="Féminin" checked={values.sexe === 'Féminin'} onChange={change} />
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
        <FormField id="numeroCni" label="Numéro de la carte d'identité" required error={errors.numeroCni}>
          <input {...field('numeroCni')} />
        </FormField>
      </div>
      <div className="step-nav">
        <Link to="/demande/type" className="step-back">← Précédent</Link>
        <button type="submit" className="btn btn-primary">Suivant →</button>
      </div>
    </form>
  )
}
