import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>Passeport Congo</h4>
          <p>Votre passeport, notre engagement.</p>
        </div>
        <div>
          <h4>Liens utiles</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/informations">Informations</Link></li>
            <li><Link to="/centres">Centres d'enrôlement</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4>Nous contacter</h4>
          <ul>
            <li>+242 XX XXX XX XX</li>
            <li>contact@exemple.cg</li>
            <li>Brazzaville, Congo</li>
          </ul>
        </div>
        <div>
          <h4>Suivez-nous</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">X</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>© 2026 Passeport Congo. Projet pédagogique, non officiel.</span>
          <span>Mentions légales | Politique de confidentialité</span>
        </div>
      </div>
    </footer>
  )
}
