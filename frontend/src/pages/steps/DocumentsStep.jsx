import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEnrollment } from '../../context/EnrollmentContext'
import { validateFile } from '../../utils/validators'
import './DocumentsStep.css'

const DOCUMENTS = [
  { key: 'acteNaissance', icon: '📄', title: 'Acte de naissance', hint: 'Document original ou copie légalisée' },
  { key: 'cni', icon: '🆔', title: "Carte nationale d'identité", hint: 'Recto et verso (un seul fichier)' },
  { key: 'justificatifDomicile', icon: '🏠', title: 'Justificatif de domicile', hint: 'Facture de moins de 3 mois' },
  { key: 'photo', icon: '📷', title: "Photo d'identité", hint: 'Récente (moins de 6 mois), fond uni' },
]

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

export default function DocumentsStep() {
  const { data, update } = useEnrollment()
  const [errors, setErrors] = useState({})
  const documents = data.documents || {}

  function handleChange(key, event) {
    const file = event.target.files[0]
    event.target.value = '' // permet de rechoisir le même fichier
    if (!file) return
    const error = validateFile(file)
    setErrors((e) => ({ ...e, [key]: error }))
    if (!error) update('documents', { [key]: { name: file.name, size: file.size, file } })
  }

  function handleRemove(key) {
    update('documents', { [key]: null })
    setErrors((e) => ({ ...e, [key]: null }))
  }

  return (
    <div className="docs">
      <p className="docs-intro">
        Téléchargez les documents requis au format PDF, JPG ou PNG (5 Mo maximum par fichier).
      </p>
      <ul className="docs-list">
        {DOCUMENTS.map(({ key, icon, title, hint }) => {
          const doc = documents[key]
          const inputId = `doc-${key}`
          return (
            <li className="docs-row" key={key}>
              <span className="docs-icon" aria-hidden="true">{icon}</span>
              <div className="docs-info">
                <strong>{title} <span aria-hidden="true">*</span></strong>
                <span className="docs-hint">{hint}</span>
                {doc && <span className="docs-file">{doc.name} ({formatSize(doc.size)})</span>}
                {errors[key] && <span className="docs-error" role="alert">{errors[key]}</span>}
              </div>
              <div className="docs-actions">
                <span className={doc ? 'docs-status docs-ok' : 'docs-status'}>{doc ? '✓ Envoyé' : 'Manquant'}</span>
                <input
                  id={inputId}
                  className="docs-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleChange(key, e)}
                />
                <label htmlFor={inputId} className="docs-upload">{doc ? 'Remplacer' : 'Télécharger'}</label>
                {doc && (
                  <button type="button" className="docs-remove" onClick={() => handleRemove(key)}>
                    Retirer
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
      <p className="docs-tip">
        <strong>Conseil :</strong> assurez-vous que vos documents sont lisibles et bien orientés.
      </p>
      <div className="docs-nav">
        <Link to="/demande/profession" className="docs-back">← Précédent</Link>
        <Link to="/demande/recapitulatif" className="btn btn-primary">Suivant →</Link>
      </div>
    </div>
  )
}
