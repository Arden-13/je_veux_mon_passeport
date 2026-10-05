import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  ['/', 'Accueil'],
  ['/informations', 'Informations'],
  ['/centres', "Centres d'enrôlement"],
  ['/faq', 'FAQ'],
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Passeport Congo, accueil" onClick={closeMenu}>
          <span className="logo" aria-hidden="true">
            <img src="/assets/logo.jpg" alt="" />
          </span>
          <span>
            <strong>Je veux mon passeport</strong>
            <small>Votre passeport, notre engagement</small>
          </span>
        </Link>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-nav" className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Navigation principale">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          <span className="lang"><span className="on">FR</span> | EN</span>
        </nav>
      </div>
    </header>
  )
}
