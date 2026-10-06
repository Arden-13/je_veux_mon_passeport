import './FormField.css'

// Libellé + champ + message d'erreur, réutilisable dans toutes les étapes
export default function FormField({ id, label, required, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
