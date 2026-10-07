import { useEnrollment } from '../context/EnrollmentContext'
import { getFlow } from '../utils/demandeConfig'

// Donne le parcours (étapes, documents, règles) du type de demande choisi
export default function useDemande() {
  const { data } = useEnrollment()
  return getFlow(data)
}
