import { Link } from 'react-router-dom'

export default function EmailConfirmed() {
  return (
    <div className="container page">
      <h1>Confirmation de l’adresse e-mail</h1>
      <p>
        Tu es revenu de la page de confirmation. Essaie de te connecter.
        Si le lien a expiré, demande un nouveau lien de confirmation.
      </p>
      <Link to="/connexion">Aller à la connexion</Link>
    </div>
  )
}