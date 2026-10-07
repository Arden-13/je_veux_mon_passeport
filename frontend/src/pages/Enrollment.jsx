import { Navigate, useParams } from 'react-router-dom'
import Stepper from '../components/Stepper'
import useDemande from '../hooks/useDemande'
import IdentiteStep from './steps/IdentiteStep'
import FamilleStep from './steps/FamilleStep'
import AdresseStep from './steps/AdresseStep'
import ProfessionStep from './steps/ProfessionStep'
import DocumentsStep from './steps/DocumentsStep'
import RecapitulatifStep from './steps/RecapitulatifStep'

// Un composant par étape du formulaire
const COMPONENTS = {
  identite: IdentiteStep,
  famille: FamilleStep,
  adresse: AdresseStep,
  profession: ProfessionStep,
  documents: DocumentsStep,
  recapitulatif: RecapitulatifStep,
}

export default function Enrollment() {
  const { etape } = useParams()
  const { steps, firstPath } = useDemande()
  // Une étape qui n'existe pas pour ce type de demande renvoie à la première étape
  const step = steps.find((s) => s.id === etape)
  if (!step) return <Navigate to={firstPath} replace />
  const StepComponent = COMPONENTS[step.id]
  return (
    <div className="container page">
      <Stepper current={step.id} />
      <h1>{step.label}</h1>
      <StepComponent />
    </div>
  )
}
