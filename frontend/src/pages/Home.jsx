import { Link } from 'react-router-dom'

const features = [
  ['⏱', 'Rapide', 'Pré-enregistrement en ligne'],
  ['🛡', 'Sécurisé', 'Vos données protégées'],
  ['📱', 'Accessible', 'Depuis tout appareil'],
  ['💬', 'Accompagnement', 'Guide et assistance'],
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1>Demande de passeport en ligne</h1>
            <p>
              Simplifiez vos démarches et gagnez du temps. Pré-enregistrez votre demande
              de passeport depuis chez vous, en toute sécurité.
            </p>
            <Link to="/inscription" className="btn btn-primary">Commencer mon pré-enrôlement →</Link>
            <Link to="/informations" className="more">En savoir plus</Link>
          </div>
          <div className="passport" aria-hidden="true">PASSEPORT</div>
        </div>
      </section>
      <section className="container features" aria-label="Nos atouts">
        {features.map(([icon, title, text]) => (
          <div className="feature" key={title}>
            <div className="icon" aria-hidden="true">{icon}</div>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </section>
    </>
  )
}
