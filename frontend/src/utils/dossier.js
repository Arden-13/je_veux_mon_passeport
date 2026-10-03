// Ce qu'il faut pour qu'un dossier soit complet (utilisé par le récapitulatif)
const REQUIRED_FIELDS = {
  identite: [
    ['nom', 'Nom'],
    ['prenoms', 'Prénoms'],
    ['dateNaissance', 'Date de naissance'],
    ['lieuNaissance', 'Lieu de naissance'],
    ['sexe', 'Sexe'],
    ['numeroCni', "Numéro de la carte d'identité"],
  ],
  famille: [
    ['nomPere', 'Nom du père'],
    ['nomMere', 'Nom de la mère'],
  ],
  adresse: [
    ['rue', 'Adresse de résidence'],
    ['ville', 'Ville'],
    ['pays', 'Pays'],
    ['telephone', 'Téléphone'],
    ['email', 'Adresse e-mail'],
  ],
}

export const DOCUMENT_LABELS = {
  acteNaissance: 'Acte de naissance',
  cni: "Carte nationale d'identité",
  justificatifDomicile: 'Justificatif de domicile',
  photo: "Photo d'identité",
}

// Retourne la liste de ce qui manque : [{ step, label }]
export function getMissing(data) {
  const missing = []
  for (const [step, fields] of Object.entries(REQUIRED_FIELDS)) {
    for (const [key, label] of fields) {
      if (!String(data[step]?.[key] ?? '').trim()) missing.push({ step, label })
    }
  }
  for (const [key, label] of Object.entries(DOCUMENT_LABELS)) {
    if (!data.documents?.[key]) missing.push({ step: 'documents', label })
  }
  return missing
}
