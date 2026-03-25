import { Link } from 'react-router-dom'

const SERVICIOS = [
  {
    id: 1,
    icono: '◈',
    titulo: 'Diagnóstico organizacional',
    descripcion: 'Identificamos qué está frenando tu negocio y dónde están las oportunidades de mejora.',
  },
  {
    id: 2,
    icono: '◉',
    titulo: 'Digitalización de procesos',
    descripcion: 'Migramos tu operación a herramientas digitales que realmente funcionan.',
  },
  {
    id: 3,
    icono: '◍',
    titulo: 'Control financiero',
    descripcion: 'Registros, plantillas y simuladores para que conozcas tus números.',
  },
]

const TESTIMONIO = {
  texto: 'OS Capital nos ayudó a entender cuánto ganábamos y cuánto perdíamos. Antes operábamos a ciegas.',
  autor: 'Flakuz Peluquería',
  ciudad: 'Bogotá, Colombia',
}

export default function HomeOS() {
  return (
    <div>

      {/* HERO */}
      <section className="seccion seccion-borde" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="etiqueta">Consultoría digital · Bogotá</span>
          <h1 className="titulo-hero" style={{ marginBottom: '20px' }}>
            Tu negocio organizado,{' '}
            <span style={{ color: 'var(--amarillo)' }}>digitalmente</span>
          </h1>
          <p style={{ maxWidth: '500px', margin: '0 auto 36px', fontSize: '1.1rem' }}>
            Ayudamos a pequeñas empresas a dejar de operar en el caos.
            Diagnóstico, digitalización y acompañamiento real.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contacto" className="btn-primario">
              Agenda tu diagnóstico gratis →
            </Link>
            <Link to="/servicios" className="btn-secundario">
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="seccion seccion-borde">
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <span className="etiqueta">Quiénes somos</span>
          <h2 className="titulo-seccion">Somos Onyx Sierra Capital</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.9' }}>
            Una consultora digital fundada en Bogotá para ayudar a pequeñas
            empresas a organizarse, digitalizarse y crecer con estructura.
            Trabajamos directamente con el dueño del negocio, para saber como mejorar tu negocio.
          </p>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="seccion seccion-borde">
        <div className="container">
          <span className="etiqueta" style={{ textAlign: 'center', display: 'block' }}>Servicios</span>
          <h2 className="titulo-seccion">¿Qué hacemos?</h2>
          <div className="grid-3">
            {SERVICIOS.map(s => (
              <div key={s.id} className="tarjeta">
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '16px', color: 'var(--amarillo)' }}>
                  {s.icono}
                </span>
                <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--blanco)' }}>
                  {s.titulo}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: '1.7' }}>
                  {s.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIO */}
      <section className="seccion">
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <span style={{ fontSize: '48px', color: 'var(--amarillo)', lineHeight: '1', display: 'block', marginBottom: '16px' }}>
            "
          </span>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--blanco)', fontStyle: 'italic', marginBottom: '24px' }}>
            {TESTIMONIO.texto}
          </p>
          <span style={{ color: 'var(--amarillo)', fontSize: '14px', fontWeight: '700' }}>
            — {TESTIMONIO.autor}
          </span>
          <span style={{ color: 'var(--gris)', fontSize: '13px', display: 'block', marginTop: '4px' }}>
            {TESTIMONIO.ciudad}
          </span>
        </div>
      </section>

    </div>
  )
}