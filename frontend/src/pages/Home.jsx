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

const types = [
  ['Adulte', 'Pour les personnes de 18 ans et plus.', 'Valable 10 ans'],
  ['Mineur', 'Pour les enfants de moins de 18 ans.', 'Valable 5 ans'],
  ['Renouvellement', 'Pour un passeport expiré ou bientôt expiré.', ''],
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
            <Link to="/connexion" className="btn btn-primary">Commencer mon pré-enrôlement →</Link>
            <Link to="/informations" className="more">En savoir plus</Link>
          </div>
          <img
            className="hero-image"
            src="/assets/passeport-hero.png"
            alt="Passeport congolais sur le drapeau national, avec Brazzaville en arrière-plan"
          />
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

      <section className="container home-section" aria-labelledby="home-steps-title">
        <h2 id="home-steps-title" className="home-title">Comment ça marche ?</h2>
        <p className="home-lead">Six étapes, de l'inscription au suivi de votre dossier.</p>
        <ol className="home-steps">
          {steps.map(([title, text], i) => (
            <li key={title}>
              <span className="home-step-num">{i + 1}</span>
              <strong>{title}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ol>
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

      <section className="container home-section" aria-labelledby="home-types-title">
        <h2 id="home-types-title" className="home-title">Quelle demande pour quel besoin ?</h2>
        <div className="home-types">
          {types.map(([title, text, validity]) => (
            <div className="home-type" key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
              {validity && <em>{validity}</em>}
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <h2>Prêt à commencer ?</h2>
          <p>Votre pré-enrôlement ne prend que quelques minutes.</p>
          <Link to="/connexion" className="btn btn-primary">Commencer mon pré-enrôlement →</Link>
          <Link to="/faq" className="more">Une question ? Consultez la FAQ</Link>
        </div>
      </section>
    </>
  )
}