import { STATUSES } from './constants'

// Statuts renvoyés par le backend -> libellés affichés au citoyen.
// Si le backend utilise d'autres codes, les ajouter ici.
const STATUS_LABELS = {
  draft: 'Brouillon',
  brouillon: 'Brouillon',
  submitted: 'Demande enregistrée',
}
const DRAFT_STATUSES = ['draft', 'brouillon']

export function getStatusLabel(status) {
  return STATUS_LABELS[status] ?? status
}

// Le dossier existe (il a une référence) et il a été envoyé (ce n'est plus un brouillon)
export function isSubmitted(application) {
  return Boolean(application?.trackingNumber) && Boolean(application?.status) && !DRAFT_STATUSES.includes(application.status)
}

// Ex. : "3 octobre 2026"
export function formatLongDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Position du statut dans la liste des 5 statuts de suivi (0 à 4)
export function statusIndex(status) {
  return Math.max(0, STATUSES.indexOf(getStatusLabel(status)))
}
