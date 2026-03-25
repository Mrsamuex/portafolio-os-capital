import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-grid">

        {/* Atención */}
        <div>
          <h4 className="footer-titulo">Atención</h4>
          <ul className="footer-links">
            <li><Link to="/faq">Preguntas frecuentes</Link></li>
            <li><Link to="/contacto">Contáctanos</Link></li>
          </ul>
        </div>

        {/* Vinculación */}
        <div>
          <h4 className="footer-titulo">Vincúlate</h4>
          <ul className="footer-links">
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/casos">Casos de éxito</Link></li>
            <li><Link to="/contacto">Trabaja con nosotros</Link></li>
          </ul>
        </div>

        {/* Políticas */}
        <div>
          <h4 className="footer-titulo">Políticas</h4>
          <ul className="footer-links">
            <li><Link to="/terminos">Términos y condiciones</Link></li>
            <li><Link to="/privacidad">Política de datos</Link></li>
          </ul>
        </div>

        {/* Portafolio */}
        <div>
          <h4 className="footer-titulo">Portafolio</h4>
          <ul className="footer-links">
            <li><Link to="/proyectos">Proyectos</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

      </div>

      {/* Redes */}
      <div className="footer-social">
        <div className="container social-icons">

          <a href="#" className="social-btn">in</a>
          <a href="#" className="social-btn">f</a>
          <a href="#" className="social-btn">ig</a>
          <a href="#" className="social-btn">yt</a>

        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} OS Capital. Todos los derechos reservados.</p>
      </div>

    </footer>
  )
}