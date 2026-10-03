import { Navigate, useParams } from 'react-router-dom'
import { STEPS } from '../utils/constants'
import Stepper from '../components/Stepper'
import IdentiteStep from './steps/IdentiteStep'
import DocumentsStep from './steps/DocumentsStep'

// Un composant par étape. Les autres arrivent au fur et à mesure.
const COMPONENTS = {
  identite: IdentiteStep,
  documents: DocumentsStep,
}

export default function Enrollment() {
  const { etape } = useParams()
  const step = STEPS.find((s) => s.id === etape)
  if (!step) return <Navigate to="/demande/identite" replace />
  const StepComponent = COMPONENTS[step.id]
  return (
    <div className="container page">
      <Stepper current={step.id} />
      <h1>{step.label}</h1>
      {StepComponent ? <StepComponent /> : <p>Étape à construire.</p>}
    </div>
  )
}
