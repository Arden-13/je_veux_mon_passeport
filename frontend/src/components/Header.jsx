import { Link, NavLink } from 'react-router-dom'

const links = [
  ['/', 'Accueil'],
  ['/informations', 'Informations'],
  ['/centres', "Centres d'enrôlement"],
  ['/faq', 'FAQ'],
]

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Passeport Congo, accueil">
          <span className="logo" aria-hidden="true">
            <img src="/assets/logo.jpg" alt="" />
          </span>
          <span>
            <strong>Je veux mon passeport</strong>
            <small>Votre passeport, notre engagement</small>
          </span>
        </Link>
        <nav className="nav" aria-label="Navigation principale">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {label}
            </NavLink>
          ))}
          <span className="lang"><span className="on">FR</span> | EN</span>
        </nav>
      </div>
    </header>
  )
}
