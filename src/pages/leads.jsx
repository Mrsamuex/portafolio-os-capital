import { useState } from 'react'

// ── Datos de prueba ───────────────────────────────────────
// Por ahora los leads están hardcodeados aquí.
// Cuando conectes Supabase, reemplazas LEADS_PRUEBA
// por un fetch() y useState, igual que en contact_os.jsx
const LEADS_PRUEBA = [
  {
    id: 1,
    nombre: 'Ana García',
    email: 'ana@gmail.com',
    telefono: '+57 310 123 4567',
    negocio: 'Cafetería Ana',
    servicio: 'Diagnóstico organizacional',
    fecha: '2025-03-10',
    estado: 'nuevo',
  },
  {
    id: 2,
    nombre: 'Carlos Ruiz',
    email: 'carlos@outlook.com',
    telefono: '+57 320 987 6543',
    negocio: 'Ferretería Ruiz',
    servicio: 'Control financiero',
    fecha: '2025-03-12',
    estado: 'contactado',
  },
  {
    id: 3,
    nombre: 'María Peña',
    email: 'maria@gmail.com',
    telefono: '+57 315 456 7890',
    negocio: 'Flakuz Peluquería',
    servicio: 'Digitalización de procesos',
    fecha: '2025-03-01',
    estado: 'cerrado',
  },
  {
    id: 4,
    nombre: 'Luis Torres',
    email: 'luis@empresa.co',
    telefono: '+57 300 111 2222',
    negocio: 'Distribuidora Torres',
    servicio: 'Diagnóstico organizacional',
    fecha: '2025-03-15',
    estado: 'nuevo',
  },
]

// ── Configuración de columnas del kanban ──────────────────
// Si quieres agregar un estado nuevo (ej: 'en_progreso'),
// solo agregas un objeto aquí — el kanban se actualiza solo
const COLUMNAS = [
  { id: 'nuevo',      label: 'Nuevos',      color: 'var(--amarillo)' },
  { id: 'contactado', label: 'Contactados', color: '#4da6ff' },
  { id: 'cerrado',    label: 'Cerrados',    color: '#00e5a0' },
]

// ── Formatea la fecha de YYYY-MM-DD a "10 mar 2025" ───────
function formatearFecha(fechaStr) {
  return new Date(fechaStr).toLocaleDateString('es-CO', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export default function Leads() {
  // leads → el array completo, con estados actualizables
  // setLeads → función para modificarlos
  const [leads, setLeads] = useState(LEADS_PRUEBA)

  // leadSeleccionado → el lead que se está viendo en detalle
  // null = ninguno seleccionado = modal cerrado
  const [leadSeleccionado, setLeadSeleccionado] = useState(null)

  // ── Cambia el estado de un lead ───────────────────────
  // Cuando haces click en un botón de estado dentro de la tarjeta,
  // este función actualiza solo ese lead en el array
  const cambiarEstado = (id, nuevoEstado) => {
    setLeads(leads.map(lead =>
      // Si el id coincide, crea un objeto nuevo con el estado actualizado
      // Si no coincide, lo deja igual
      lead.id === id ? { ...lead, estado: nuevoEstado } : lead
    ))
    // Si el lead está abierto en el modal, actualiza el modal también
    if (leadSeleccionado?.id === id) {
      setLeadSeleccionado(prev => ({ ...prev, estado: nuevoEstado }))
    }
  }

  // ── Filtra leads por columna ───────────────────────────
  // Para cada columna, devuelve solo los leads de ese estado
  const leadsPorEstado = (estado) =>
    leads.filter(lead => lead.estado === estado)

  return (
    <div>

      {/* ── ENCABEZADO ──────────────────────────────────── */}
      <section className="seccion seccion-borde">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="etiqueta">Panel privado</span>
            <h1 style={{ fontFamily: 'var(--fuente-titulo)', fontSize: '2rem' }}>
              Leads recibidos
            </h1>
          </div>
          {/* Contador total */}
          <div style={{ display: 'flex', gap: '20px' }}>
            {COLUMNAS.map(col => (
              <div key={col.id} style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '700', color: col.color, display: 'block' }}>
                  {leadsPorEstado(col.id).length}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--gris)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {col.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KANBAN ──────────────────────────────────────── */}
      <section className="seccion">
        <div className="container">
          <div style={{
            display: 'grid',
            // 3 columnas iguales en desktop, 1 en móvil
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'start', // las columnas no se estiran para igualar altura
          }}>

            {/* Genera una columna por cada estado */}
            {COLUMNAS.map(col => (
              <div key={col.id}>

                {/* ── Encabezado de columna ─────────────── */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  marginBottom: '16px', paddingBottom: '12px',
                  borderBottom: `2px solid ${col.color}`,
                }}>
                  <span style={{ fontWeight: '600', color: 'var(--blanco)', fontSize: '15px' }}>
                    {col.label}
                  </span>
                  {/* Badge con el número de leads en esa columna */}
                  <span style={{
                    background: col.color, color: 'var(--negro)',
                    borderRadius: '20px', padding: '1px 10px',
                    fontSize: '12px', fontWeight: '700',
                  }}>
                    {leadsPorEstado(col.id).length}
                  </span>
                </div>

                {/* ── Tarjetas de leads ─────────────────── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                  {leadsPorEstado(col.id).length === 0 ? (
                    // Mensaje cuando no hay leads en esa columna
                    <div style={{
                      border: '1px dashed var(--gris2)', borderRadius: 'var(--radio)',
                      padding: '24px', textAlign: 'center',
                      color: 'var(--gris)', fontSize: '13px',
                    }}>
                      Sin leads aquí
                    </div>
                  ) : (
                    leadsPorEstado(col.id).map(lead => (
                      <div
                        key={lead.id}
                        className="tarjeta"
                        style={{ cursor: 'pointer' }}
                        // Click en la tarjeta abre el detalle
                        onClick={() => setLeadSeleccionado(lead)}
                      >
                        {/* Nombre y negocio */}
                        <div style={{ marginBottom: '10px' }}>
                          <span style={{ fontWeight: '600', color: 'var(--blanco)', fontSize: '15px', display: 'block' }}>
                            {lead.nombre}
                          </span>
                          <span style={{ fontSize: '13px', color: 'var(--gris)' }}>
                            {lead.negocio}
                          </span>
                        </div>

                        {/* Servicio */}
                        <span style={{
                          fontSize: '11px', background: 'var(--negro3)',
                          border: `1px solid ${col.color}33`,
                          color: col.color, borderRadius: '4px',
                          padding: '2px 8px', display: 'inline-block',
                          marginBottom: '12px',
                        }}>
                          {lead.servicio}
                        </span>

                        {/* Fecha */}
                        <div style={{ fontSize: '12px', color: 'var(--gris)' }}>
                          {formatearFecha(lead.fecha)}
                        </div>

                        {/* Botones para mover el lead a otro estado */}
                        <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}
                          // Evita que el click en los botones abra el modal
                          onClick={e => e.stopPropagation()}
                        >
                          {COLUMNAS
                            // Solo muestra los botones de los otros estados
                            .filter(c => c.id !== col.id)
                            .map(c => (
                              <button
                                key={c.id}
                                onClick={() => cambiarEstado(lead.id, c.id)}
                                style={{
                                  background: 'transparent',
                                  border: `1px solid ${c.color}`,
                                  color: c.color,
                                  borderRadius: '4px',
                                  padding: '3px 10px',
                                  fontSize: '11px',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => e.target.style.background = c.color + '22'}
                                onMouseLeave={e => e.target.style.background = 'transparent'}
                              >
                                → {c.label}
                              </button>
                            ))
                          }
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL DE DETALLE ────────────────────────────────
          Aparece cuando haces click en una tarjeta.
          leadSeleccionado !== null → modal visible */}
      {leadSeleccionado && (
        // Fondo oscuro detrás del modal — click aquí lo cierra
        <div
          onClick={() => setLeadSeleccionado(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', zIndex: 100,
          }}
        >
          {/* El modal en sí — e.stopPropagation() evita que el click
              dentro del modal lo cierre */}
          <div
            className="tarjeta"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '480px', width: '100%', position: 'relative' }}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setLeadSeleccionado(null)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'none', border: 'none',
                color: 'var(--gris)', fontSize: '20px', cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <h3 style={{ fontFamily: 'var(--fuente-titulo)', fontSize: '1.4rem', marginBottom: '20px' }}>
              {leadSeleccionado.nombre}
            </h3>

            {/* Todos los datos del lead */}
            {[
              { label: 'Email',    valor: leadSeleccionado.email },
              { label: 'Teléfono', valor: leadSeleccionado.telefono },
              { label: 'Negocio',  valor: leadSeleccionado.negocio },
              { label: 'Servicio', valor: leadSeleccionado.servicio },
              { label: 'Fecha',    valor: formatearFecha(leadSeleccionado.fecha) },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid var(--negro3)',
                gap: '16px',
              }}>
                <span style={{ fontSize: '12px', color: 'var(--gris)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {item.label}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--blanco)', textAlign: 'right' }}>
                  {item.valor}
                </span>
              </div>
            ))}

            {/* Cambiar estado desde el modal */}
            <div style={{ marginTop: '20px' }}>
              <span style={{ fontSize: '12px', color: 'var(--gris)', display: 'block', marginBottom: '10px' }}>
                MOVER A
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {COLUMNAS
                  .filter(c => c.id !== leadSeleccionado.estado)
                  .map(c => (
                    <button
                      key={c.id}
                      onClick={() => cambiarEstado(leadSeleccionado.id, c.id)}
                      className="btn-secundario"
                      style={{ padding: '8px 16px', fontSize: '13px', borderColor: c.color, color: c.color }}
                    >
                      {c.label}
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}