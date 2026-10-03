import { Link } from 'react-router-dom'
import { STEPS } from '../utils/constants'
import './Stepper.css'

// Barre d'étapes du formulaire (écrans 4, 5 et 6 de la maquette)
export default function Stepper({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.id === current)
  return (
    <nav className="stepper" aria-label="Étapes de la demande">
      <ol>
        {STEPS.map((step, i) => {
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
