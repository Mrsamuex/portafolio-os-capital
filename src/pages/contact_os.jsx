import { useState } from 'react'

// ── Opciones del selector de servicio ─────────────────────
// Si agregas un servicio nuevo, solo agregas una línea aquí
const SERVICIOS = [
  'Diagnóstico organizacional',
  'Digitalización de procesos',
  'Control financiero',
  'No estoy seguro — quiero información',
]

// ── Estado inicial del formulario ─────────────────────────
// Cada campo del formulario tiene su valor aquí.
// useState guarda lo que el usuario va escribiendo.
const FORM_INICIAL = {
  nombre:   '',
  email:    '',
  telefono: '',
  negocio:  '',
  servicio: '',
}

export default function Contact() {
  // form → los valores actuales de cada campo
  // setForm → función para actualizarlos
  const [form, setForm]     = useState(FORM_INICIAL)

  // status → null | 'enviando' | 'ok' | 'error'
  // Controla qué se muestra: formulario, spinner, éxito o error
  const [status, setStatus] = useState(null)

  // ── Actualiza un campo cuando el usuario escribe ─────────
  // En lugar de tener un handler por campo, este sirve para todos.
  // e.target.name → nombre del campo (coincide con el name="" del input)
  // e.target.value → lo que escribió el usuario
  const handleChange = (e) => {
    setForm({
      ...form,              // copia todos los campos actuales
      [e.target.name]: e.target.value  // sobreescribe solo el que cambió
    })
  }

  // ── Maneja el envío del formulario ───────────────────────
  // Por ahora solo simula el envío con un setTimeout.
  // Cuando conectes FastAPI, reemplazas el setTimeout por un fetch().
  const handleSubmit = async (e) => {
    e.preventDefault()  // evita que la página se recargue
    setStatus('enviando')

    // TODO: reemplazar esto con fetch() a tu API cuando esté lista
    setTimeout(() => {
      console.log('Datos a enviar:', form)
      setStatus('ok')
      setForm(FORM_INICIAL)  // limpia el formulario
    }, 1000)
  }

  // ── Estilos reutilizables para inputs ────────────────────
  // Los defines una vez acá y los reutilizas en cada input
  const inputStyle = {
    width: '100%',
    background: 'var(--negro2)',
    border: '1px solid var(--gris2)',
    borderRadius: 'var(--radio)',
    padding: '12px 16px',
    color: 'var(--blanco)',
    fontFamily: 'var(--fuente-cuerpo)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div>

      {/* ── ENCABEZADO DE PÁGINA ──────────────────────────── */}
      <section className="seccion seccion-borde">
        <div className="container centrado" style={{ maxWidth: '600px' }}>
          <span className="etiqueta">Contacto</span>
          <h1 className="titulo-hero" style={{ marginBottom: '16px' }}>
            Hablemos de tu negocio
          </h1>
          <p style={{ fontSize: '1rem' }}>
            El diagnóstico inicial es completamente gratis.
            Cuéntanos tu estado inicial y te diremos cómo podemos ayudarte.
          </p>
        </div>
      </section>

      {/* ── FORMULARIO + INFO ────────────────────────────────
          grid-2 pone el formulario y la info lado a lado en desktop,
          y los apila en móvil automáticamente */}
      <section className="seccion">
        <div className="container grid-2" style={{ alignItems: 'start' }}>

          {/* ── COLUMNA IZQUIERDA: info de contacto ───────── */}
          <div>
            <h2 style={{ fontFamily: 'var(--fuente-titulo)', fontSize: '1.6rem', marginBottom: '24px' }}>
              ¿Prefieres escribirnos directo?
            </h2>

            {/* Lista de canales de contacto */}
            {[
              { label: 'WhatsApp', valor: '+57 315 474 7972', link: 'https://wa.me/573154747972' },
              /*{ label: 'Email',    valor: 'hola@oscapital.co', link: 'mailto:hola@oscapital.co' },*/
              { label: 'Ciudad',   valor: 'Bogotá, Colombia',  link: null },
            ].map(c => (
              <div key={c.label} style={{ marginBottom: '20px' }}>
                {/* Etiqueta del canal */}
                <span style={{ fontSize: '11px', color: 'var(--amarillo)', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                  {c.label.toUpperCase()}
                </span>
                {/* Si tiene link lo hace clickeable, si no solo texto */}
                {c.link
                  ? <a href={c.link} style={{ color: 'var(--blanco)', fontSize: '15px' }}>{c.valor}</a>
                  : <span style={{ color: 'var(--gris)', fontSize: '15px' }}>{c.valor}</span>
                }
              </div>
            ))}
          </div>

          {/* ── COLUMNA DERECHA: formulario ───────────────── */}
          <div>
            {/* Si el envío fue exitoso, muestra mensaje en lugar del form */}
            {status === 'ok' ? (
              <div className="tarjeta centrado" style={{ padding: '48px', gap: '12px' }}>
                <span style={{ fontSize: '40px', color: 'var(--amarillo)' }}>✓</span>
                <h3 style={{ fontFamily: 'var(--fuente-titulo)', fontSize: '1.4rem' }}>
                  Mensaje recibido
                </h3>
                <p style={{ textAlign: 'center' }}>
                  Te contactamos en menos de 24 horas hábiles.
                </p>
                {/* Botón para enviar otro mensaje */}
                <button
                  onClick={() => setStatus(null)}
                  className="btn-secundario"
                  style={{ marginTop: '8px' }}
                >
                  Enviar otro mensaje
                </button>
              </div>

            ) : (
              // ── El formulario real ───────────────────────
              // onSubmit llama a handleSubmit cuando el usuario hace click en enviar
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Fila con dos campos lado a lado */}
                <div className="grid-2" style={{ gap: '16px' }}>

                  {/* Cada campo tiene: label → input → están agrupados en un div */}
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--gris)', display: 'block', marginBottom: '6px' }}>
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"        // coincide con la key en FORM_INICIAL
                      required
                      value={form.nombre}  // valor controlado por React
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--amarillo)'}
                      onBlur={e => e.target.style.borderColor = 'var(--gris2)'}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--gris)', display: 'block', marginBottom: '6px' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--amarillo)'}
                      onBlur={e => e.target.style.borderColor = 'var(--gris2)'}
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--gris)', display: 'block', marginBottom: '6px' }}>
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--amarillo)'}
                      onBlur={e => e.target.style.borderColor = 'var(--gris2)'}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--gris)', display: 'block', marginBottom: '6px' }}>
                      Nombre del negocio
                    </label>
                    <input
                      type="text"
                      name="negocio"
                      value={form.negocio}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--amarillo)'}
                      onBlur={e => e.target.style.borderColor = 'var(--gris2)'}
                    />
                  </div>
                </div>

                {/* Selector de servicio */}
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--gris)', display: 'block', marginBottom: '6px' }}>
                    ¿Qué servicio te interesa?
                  </label>
                  <select
                    name="servicio"
                    value={form.servicio}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = 'var(--amarillo)'}
                    onBlur={e => e.target.style.borderColor = 'var(--gris2)'}
                  >
                    <option value="">Seleccionar...</option>
                    {/* Genera una opción por cada item del array SERVICIOS */}
                    {SERVICIOS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Mensaje de error si el envío falla */}
                {status === 'error' && (
                  <p style={{ color: '#ff5f57', fontSize: '13px' }}>
                    Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primario"
                  disabled={status === 'enviando'}
                  style={{ alignSelf: 'flex-start', opacity: status === 'enviando' ? 0.7 : 1 }}
                >
                  {status === 'enviando' ? 'Enviando...' : 'Enviar mensaje →'}
                </button>

              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}