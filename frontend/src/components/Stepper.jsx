import { Link } from 'react-router-dom'
import useDemande from '../hooks/useDemande'
import './Stepper.css'

// Barre d'étapes du formulaire : les étapes affichées dépendent du type de demande
export default function Stepper({ current }) {
  const { steps } = useDemande()
  const currentIndex = steps.findIndex((s) => s.id === current)
  return (
    <nav className="stepper" aria-label="Étapes de la demande">
      <ol>
        {steps.map((step, i) => {
          const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo'
          const content = (
            <>
              <span className="stepper-circle">{state === 'done' ? '✓' : i + 1}</span>
              <span className="stepper-label">{step.label}</span>
            </>
          )
          return (
            <li
              key={step.id}
              className={`stepper-item stepper-${state}`}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {state === 'done' ? <Link to={`/demande/${step.id}`}>{content}</Link> : content}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
