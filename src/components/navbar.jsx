import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-contenido">

        {/* LOGO */}
        <Link to="/" className="logo">
          OS Capital
        </Link>

        {/* LINKS */}
        <nav className="nav-links">
          <Link to="/servicios">Servicios</Link>
          <Link to="/casos">Casos</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact_os" className="btn-primario">
            Contacto
          </Link>
        </nav>

      </div>
    </header>
  )
}