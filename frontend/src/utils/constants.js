// Les 6 étapes du formulaire (ordre de la maquette)
export const STEPS = [
  { id: 'identite', label: 'Identité' },
  { id: 'famille', label: 'Famille' },
  { id: 'adresse', label: 'Adresse' },
  { id: 'profession', label: 'Profession' },
  { id: 'documents', label: 'Documents' },
  { id: 'recapitulatif', label: 'Récapitulatif' },
]

// Statuts d'un dossier (frise de suivi)
export const STATUSES = [
  'Demande enregistrée',
  'Vérification des documents',
  'Contrôle administratif',
  'Traitement et impression',
  'Retrait du passeport',
]

export const REQUEST_TYPES = [
  { id: 'adulte', label: 'Passeport biométrique pour adulte' },
  { id: 'renouvellement', label: 'Renouvellement' },
]
