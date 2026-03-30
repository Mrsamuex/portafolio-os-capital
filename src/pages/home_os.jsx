import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

// ── Placeholder del logo hasta que tengas el archivo ──────
// Cuando tengas el SVG/PNG, reemplaza esto por:
// import Logo from '../assets/logo.svg'
// y usa <img src={Logo} alt="OS Capital" style={{ height: '40px' }} />
function LogoPlaceholder() {
  return (
    <div style={{
      fontFamily: 'var(--fuente-titulo)',
      fontSize: '1.1rem',
      fontWeight: '700',
      color: 'var(--amarillo)',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '12px',
    }}>
      ◈ Onyx Sierra Capital
    </div>
  )
}

export default function HomeOS() {
  // ── Estado servicios ───────────────────────────────────
  const [servicios, setServicios] = useState([])

  // ── Estado carrusel clientes ───────────────────────────
  const [clientes, setClientes] = useState([])
  const [indexActual, setIndexActual] = useState(0)
  const [deslizando, setDeslizando] = useState(false) // bloquea clicks mientras anima
  const [direccion, setDireccion] = useState('derecha') // para saber hacia dónde va el slide
  const [visible, setVisible] = useState(true) // controla la opacidad del slide

  // ── Carga servicios desde Supabase ────────────────────
  useEffect(() => {
    supabase.from('servicios').select('*').then(({ data }) => {
      if (data) setServicios(data)
    })
  }, [])

  // ── Carga clientes desde Supabase ─────────────────────
  useEffect(() => {
    supabase.from('clientes').select('id, client, sector, challenge, solution, results').then(({ data }) => {
      if (data) setClientes(data)
    })
  }, [])

  // ── Avance automático del carrusel cada 6 segundos ────
  useEffect(() => {
    if (clientes.length === 0) return
    const timer = setInterval(() => moverCarrusel('derecha'), 6000)
    return () => clearInterval(timer)
  }, [clientes, indexActual, deslizando])

  // ── Lógica del slide con animación CSS ────────────────
  // 1. Inicia la animación de salida
  // 2. Espera 300ms (duración del fade/slide)
  // 3. Cambia el índice
  // 4. Inicia la animación de entrada
  const moverCarrusel = (dir) => {
    if (deslizando || clientes.length === 0) return
    setDeslizando(true)
    setDireccion(dir)
    setVisible(false) // sale

    setTimeout(() => {
      setIndexActual(prev => {
        if (dir === 'derecha') return (prev + 1) % clientes.length
        return (prev - 1 + clientes.length) % clientes.length
      })
      setVisible(true) // entra
      setTimeout(() => setDeslizando(false), 350)
    }, 300)
  }

  const clienteActual = clientes[indexActual]

  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="seccion seccion-borde" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>

          {/* Logo encima de la etiqueta */}
          <LogoPlaceholder />

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
            <Link to="/contact_os" className="btn-primario">
              Agenda tu diagnóstico gratis →
            </Link>
            <Link to="/servicios" className="btn-secundario">
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUIÉNES SOMOS ─────────────────────────────────── */}
      <section className="seccion seccion-borde">
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <span className="etiqueta">Quiénes somos</span>
          <h2 className="titulo-seccion">Somos Onyx Sierra Capital</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.9' }}>
            Una consultora digital fundada en Bogotá para ayudar a pequeñas
            empresas a organizarse, digitalizarse y crecer con estructura.
            Trabajamos directamente con el dueño del negocio, para saber cómo mejorar tu negocio.
          </p>
        </div>
      </section>

      {/* ── SERVICIOS (desde Supabase) ────────────────────── */}
      <section className="seccion seccion-borde">
        <div className="container">
          <span className="etiqueta" style={{ textAlign: 'center', display: 'block' }}>Servicios</span>
          <h2 className="titulo-seccion">¿Qué hacemos?</h2>

          {servicios.length === 0 ? (
            // Mientras carga, muestra los placeholders para que no haya salto visual
            <div className="grid-3">
              {[1, 2, 3].map(n => (
                <div key={n} className="tarjeta" style={{ opacity: 0.4, minHeight: '120px' }} />
              ))}
            </div>
          ) : (
            <div className="grid-3">
              {servicios.map(s => (
                <div key={s.id} className="tarjeta">
                  {s.icono && (
                    <span style={{ fontSize: '28px', display: 'block', marginBottom: '16px', color: 'var(--amarillo)' }}>
                      {s.icono}
                    </span>
                  )}
                  <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--blanco)' }}>
                    {s.titulo ?? s.title ?? s.nombre}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.7' }}>
                    {s.descripcion ?? s.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CARRUSEL DE CLIENTES ──────────────────────────── */}
      <section className="seccion">
        <div className="container" style={{ maxWidth: '680px' }}>
          <span className="etiqueta" style={{ textAlign: 'center', display: 'block' }}>Clientes</span>
          <h2 className="titulo-seccion" style={{ textAlign: 'center' }}>Casos reales</h2>

          {clientes.length === 0 ? (
            <div className="tarjeta" style={{ opacity: 0.4, minHeight: '200px' }} />
          ) : (
            <div style={{ position: 'relative' }}>

              {/* Card del cliente con transición CSS */}
              <div
                className="tarjeta"
                style={{
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  opacity: visible ? 1 : 0,
                  // Desliza ligeramente en la dirección correcta
                  transform: visible
                    ? 'translateX(0)'
                    : direccion === 'derecha' ? 'translateX(-24px)' : 'translateX(24px)',
                }}
              >
                {/* Encabezado: cliente y sector */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <span style={{ fontWeight: '700', color: 'var(--blanco)', fontSize: '1.1rem', display: 'block' }}>
                      {clienteActual.client}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--amarillo)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {clienteActual.sector}
                    </span>
                  </div>
                  {/* Indicador de posición */}
                  <span style={{ fontSize: '12px', color: 'var(--gris)' }}>
                    {indexActual + 1} / {clientes.length}
                  </span>
                </div>

                {/* Contenido: reto, solución, resultados */}
                {[
                  { label: 'Reto',      valor: clienteActual.challenge },
                  { label: 'Solución',  valor: clienteActual.solution },
                  { label: 'Resultado', valor: clienteActual.results },
                ].map(item => (
                  <div key={item.label} style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--gris)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                      {item.label}
                    </span>
                    <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                      {item.valor}
                    </p>
                  </div>
                ))}
              </div>

              {/* Controles del carrusel */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px', alignItems: 'center' }}>
                <button
                  onClick={() => moverCarrusel('izquierda')}
                  style={{
                    background: 'transparent', border: '1px solid var(--gris2)',
                    color: 'var(--blanco)', borderRadius: '50%',
                    width: '36px', height: '36px', cursor: 'pointer',
                    fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--amarillo)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gris2)'}
                >
                  ←
                </button>

                {/* Dots */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {clientes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDireccion(i > indexActual ? 'derecha' : 'izquierda')
                        setVisible(false)
                        setTimeout(() => { setIndexActual(i); setVisible(true) }, 300)
                      }}
                      style={{
                        width: i === indexActual ? '20px' : '6px',
                        height: '6px',
                        borderRadius: '3px',
                        background: i === indexActual ? 'var(--amarillo)' : 'var(--gris2)',
                        border: 'none', cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => moverCarrusel('derecha')}
                  style={{
                    background: 'transparent', border: '1px solid var(--gris2)',
                    color: 'var(--blanco)', borderRadius: '50%',
                    width: '36px', height: '36px', cursor: 'pointer',
                    fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--amarillo)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gris2)'}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}