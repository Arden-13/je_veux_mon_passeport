import { Link } from 'react-router-dom'
import './authForms.css'

const features = [
  { icon: '/assets/icone-rap.png', title: 'Rapide', text: 'Pré-enregistrement en ligne' },
  { icon: '/assets/icone-sec.png', title: 'Sécurisé', text: 'Vos données protégées' },
  { icon: '/assets/icone-acces.png', title: 'Accessible', text: 'Depuis tout appareil' },
  { icon: '/assets/icone-acco.png', title: 'Accompagnement', text: 'Guide et assistance' },
]

const steps = [
  ['Créer un compte', 'Inscrivez-vous avec votre email pour suivre votre dossier.'],
  ['Choisir le type de demande', 'Adulte, mineur ou renouvellement.'],
  ['Remplir le formulaire', 'Identité, famille, adresse et profession, en 4 étapes courtes.'],
  ['Joindre vos pièces', 'Téléchargez vos documents au format PDF, JPG ou PNG.'],
  ['Vérifier et valider', 'Relisez le récapitulatif avant de soumettre.'],
  ['Suivre votre dossier', 'Recevez un numéro de réception et suivez chaque étape.'],
]

const documents = [
  ['Acte de naissance', 'Original ou copie légalisée'],
  ["Carte nationale d'identité", 'Recto et verso'],
  ['Justificatif de domicile', 'Facture, quittance ou attestation'],
  ["Photo d'identité", 'Format 4x4, fond blanc'],
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Prélèvement en ligne</p>
            <h1>Votre passeport, sans file d&apos;attente</h1>
            <p>
              Préparez votre dossier depuis chez vous, gagnez du temps et profitez d&apos;un
              parcours simple, sécurisé et transparent.
            </p>
            <div className="hero-actions">
              <Link to="/connexion" className="btn btn-primary">Commencer ma demande</Link>
              <Link to="/informations" className="btn btn-secondary">Voir les pièces</Link>
            </div>
            <div className="hero-stats" aria-label="Indicateurs de service">
              <div className="hero-stat">
                <strong>10 min</strong>
                <span>pour remplir</span>
              </div>
              <div className="hero-stat">
                <strong>6</strong>
                <span>étapes</span>
              </div>
              <div className="hero-stat">
                <strong>100%</strong>
                <span>en ligne</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img
              className="hero-image"
              src="/assets/passeport-hero.png"
              alt="Passeport congolais sur le drapeau national, avec Brazzaville en arrière-plan"
            />
          </div>
        </div>
      </section>

      <section className="container features" aria-label="Nos atouts">
        {features.map(({ icon, title, text }) => (
          <div className="feature" key={title}>
            <div className="icon" aria-hidden="true">
              <img src={icon} alt="" />
            </div>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </section>

      <section className="home-process" aria-labelledby="home-steps-title">
        <div className="container home-process-inner">
          <h2 id="home-steps-title" className="home-title home-process-title">Comment ça marche</h2>
          <p className="home-process-lead">Quatre étapes simples, environ dix minutes.</p>
          <div className="home-process-grid" aria-live="polite">
            {steps.map(([title, text], i) => (
              <article className="home-process-card" key={title}>
                <span className="home-process-number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-band" aria-labelledby="home-docs-title">
        <div className="container home-section">
          <h2 id="home-docs-title" className="home-title">Préparez vos pièces justificatives</h2>
          <p className="home-lead">
            Gardez ces documents à portée de main, numérisés ou photographiés lisiblement
            (PDF, JPG ou PNG, 5 Mo maximum chacun).
          </p>
          <ul className="home-docs">
            {documents.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <h2>Prêt à préparer votre passeport ?</h2>
          <p>Créez votre compte et commencez votre pré-enrôlement en quelques minutes.</p>
          <Link to="/connexion" className="btn btn-secondary">Commencer ma demande</Link>
        </div>
      </section>
    </>
  )
}