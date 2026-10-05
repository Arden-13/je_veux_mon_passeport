// Ce qu'il faut pour qu'un dossier soit complet (utilisé par le récapitulatif).
// Dépend du type de demande : voir utils/demandeConfig.js
import { getFlow } from './demandeConfig'

// Retourne la liste de ce qui manque : [{ step, label }]
export function getMissing(data) {
  const { config, steps, documents } = getFlow(data)
  const inFlow = (id) => steps.some((s) => s.id === id)
  const missing = []
  const need = (step, key, label) => {
    if (!String(data[step]?.[key] ?? '').trim()) missing.push({ step, label })
  }

  need('identite', 'nom', 'Nom')
  need('identite', 'prenoms', 'Prénoms')
  need('identite', 'dateNaissance', 'Date de naissance')
  need('identite', 'lieuNaissance', 'Lieu de naissance')
  need('identite', 'sexe', 'Sexe')
  if (config.identite.cni) need('identite', 'numeroCni', "Numéro de la carte d'identité")
  if (config.identite.passeportActuel) {
    need('identite', 'numeroPasseport', 'Numéro du passeport actuel')
    need('identite', 'dateExpirationPasseport', "Date d'expiration du passeport actuel")
  }

  if (inFlow('famille')) {
    need('famille', 'nomPere', 'Nom du père')
    need('famille', 'nomMere', 'Nom de la mère')
    if (config.famille.situation) need('famille', 'situationMatrimoniale', 'Situation matrimoniale')
    if (config.famille.enfants) {
      need('famille', 'aEnfants', 'Enfants (oui ou non)')
      if (data.famille?.aEnfants === 'Oui') need('famille', 'nombreEnfants', "Nombre d'enfants")
    }
    if (config.famille.consentement) need('famille', 'consentementParents', 'Consentement des deux parents')
  }

  need('adresse', 'rue', 'Adresse de résidence')
  need('adresse', 'ville', 'Ville')
  need('adresse', 'pays', 'Pays')
  need('adresse', 'telephone', 'Téléphone')
  need('adresse', 'email', 'Adresse e-mail')

  documents.forEach((d) => {
    if (!data.documents?.[d.key]) missing.push({ step: 'documents', label: d.title })
  })
  return missing
}
