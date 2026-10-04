import { useParams } from 'react-router-dom'
import { STEPS } from '../utils/constants'

export default function Enrollment() {
  const { etape } = useParams()
  const step = STEPS.find((s) => s.id === etape)
  return (
    <div className="container page">
      <h1>{step ? step.label : 'Étape inconnue'}</h1>
      <p>Formulaire à construire.</p>
    </div>
  )
}
