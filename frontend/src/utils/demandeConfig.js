// Règles du formulaire selon le type de demande.
// Pour changer ce que demande un type (étapes, champs, documents), on modifie uniquement ce fichier.
import { STEPS } from './constants'

// Type utilisé quand aucun choix n'a été fait.
// Astuce de test : remplacez par 'mineur' ou 'renouvellement' pour voir les autres parcours.
export const TYPE_DEFAUT = 'adulte'

// Les documents que l'on peut demander
const DOC = {
  acteNaissance: { key: 'acteNaissance', title: 'Acte de naissance', hint: 'Document original ou copie légalisée', icon: '📄' },
  cni: { key: 'cni', title: "Carte nationale d'identité", hint: 'Recto et verso (un seul fichier)', icon: '🆔' },
  justificatifDomicile: { key: 'justificatifDomicile', title: 'Justificatif de domicile', hint: 'Facture de moins de 3 mois', icon: '🏠' },
  photo: { key: 'photo', title: "Photo d'identité", hint: 'Récente (moins de 6 mois), fond uni', icon: '📷' },
  passeportActuel: { key: 'passeportActuel', title: 'Passeport actuel', hint: "Scan de la page des informations", icon: '🛂' },
  cniPere: { key: 'cniPere', title: "Pièce d'identité du père", hint: 'Recto et verso (un seul fichier)', icon: '🆔' },
  cniMere: { key: 'cniMere', title: "Pièce d'identité de la mère", hint: 'Recto et verso (un seul fichier)', icon: '🆔' },
}

export const REQUEST_CONFIG = {
  adulte: {
    label: 'Passeport biométrique pour adulte',
    steps: ['identite', 'famille', 'adresse', 'profession', 'documents', 'recapitulatif'],
    identite: { cni: true, passeportActuel: false },
    famille: { situation: true, enfants: true, consentement: false },
    documents: ['acteNaissance', 'cni', 'justificatifDomicile', 'photo'],
  },
  mineur: {
    label: 'Passeport biométrique pour mineur',
    steps: ['identite', 'famille', 'adresse', 'documents', 'recapitulatif'],
    identite: { cni: false, passeportActuel: false },
    famille: { situation: false, enfants: false, consentement: true },
    documents: ['acteNaissance', 'justificatifDomicile', 'photo', 'cniPere', 'cniMere'],
  },
  renouvellement: {
    label: 'Renouvellement',
    steps: ['identite', 'adresse', 'documents', 'recapitulatif'],
    identite: { cni: true, passeportActuel: true },
    famille: { situation: false, enfants: false, consentement: false },
    documents: ['passeportActuel', 'cni', 'justificatifDomicile', 'photo'],
  },
}

// Le type choisi par la personne 1 est enregistré avec update('type', { choix })
export function getRequestType(data) {
  const choix = data?.type?.choix
  return REQUEST_CONFIG[choix] ? choix : TYPE_DEFAUT
}

export function calculateAge(iso) {
  const birth = new Date(iso)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

// Tout ce qu'il faut savoir sur le parcours du type de demande en cours
export function getFlow(data) {
  const type = getRequestType(data)
  const config = REQUEST_CONFIG[type]
  const ids = config.steps
  return {
    type,
    config,
    steps: ids.map((id) => STEPS.find((s) => s.id === id)),
    documents: config.documents.map((key) => DOC[key]),
    firstPath: `/demande/${ids[0]}`,
    nextPath: (id) => {
      const i = ids.indexOf(id)
      return i >= 0 && i < ids.length - 1 ? `/demande/${ids[i + 1]}` : '/confirmation'
    },
    previousPath: (id) => {
      const i = ids.indexOf(id)
      return i > 0 ? `/demande/${ids[i - 1]}` : '/demande/type'
    },
  }
}
