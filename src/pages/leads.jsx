import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase' // ajusta la ruta si es diferente

const COLUMNAS = [
  { id: 'nuevo',      label: 'Nuevos',      color: 'var(--amarillo)' },
  { id: 'contactado', label: 'Contactados', color: '#4da6ff' },
  { id: 'cerrado',    label: 'Cerrados',    color: '#00e5a0' },
]

function formatearFecha(fechaStr) {
  return new Date(fechaStr).toLocaleDateString('es-CO', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

// Convierte la fila de Supabase al formato que usa el kanban
function mapearLead(row) {
  return {
    id:       row.id,
    nombre:   row.name,
    email:    row.email,
    telefono: row.phone ?? '—',      // la tabla no tiene phone, queda como fallback
    negocio:  row.business,
    servicio: row.service,
    mensaje:  row.message,
    fuente:   row.source,
    fecha:    row.created_at,
    estado:   row.status ?? 'nuevo', // si llega null, cae en "nuevo"
  }
}

export default function Leads() {
  const [leads, setLeads] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [leadSeleccionado, setLeadSeleccionado] = useState(null)

  // ── Carga los leads desde Supabase al montar el componente ──
  useEffect(() => {
    async function cargarLeads() {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setLeads(data.map(mapearLead))
      }
      setCargando(false)
    }
    cargarLeads()
  }, [])

  // ── Cambia estado local Y en Supabase ──────────────────────
  const cambiarEstado = async (id, nuevoEstado) => {
    // 1. Actualiza local inmediatamente (UX más ágil)
    setLeads(leads.map(lead =>
      lead.id === id ? { ...lead, estado: nuevoEstado } : lead
    ))
    if (leadSeleccionado?.id === id) {
      setLeadSeleccionado(prev => ({ ...prev, estado: nuevoEstado }))
    }

    // 2. Persiste en Supabase
    const { error } = await supabase
      .from('leads')
      .update({ status: nuevoEstado })
      .eq('id', id)

    if (error) console.error('Error actualizando estado:', error.message)
  }

  const leadsPorEstado = (estado) =>
    leads.filter(lead => lead.estado === estado)

  // ── Estados de carga/error ─────────────────────────────────
  if (cargando) return (
    <div className="seccion">
      <div className="container" style={{ color: 'var(--gris)' }}>Cargando leads...</div>
    </div>
  )

  if (error) return (
    <div className="seccion">
      <div className="container" style={{ color: '#ff6b6b' }}>Error: {error}</div>
    </div>
  )

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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}>
            {COLUMNAS.map(col => (
              <div key={col.id}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  marginBottom: '16px', paddingBottom: '12px',
                  borderBottom: `2px solid ${col.color}`,
                }}>
                  <span style={{ fontWeight: '600', color: 'var(--blanco)', fontSize: '15px' }}>
                    {col.label}
                  </span>
                  <span style={{
                    background: col.color, color: 'var(--negro)',
                    borderRadius: '20px', padding: '1px 10px',
                    fontSize: '12px', fontWeight: '700',
                  }}>
                    {leadsPorEstado(col.id).length}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {leadsPorEstado(col.id).length === 0 ? (
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
                        onClick={() => setLeadSeleccionado(lead)}
                      >
                        <div style={{ marginBottom: '10px' }}>
                          <span style={{ fontWeight: '600', color: 'var(--blanco)', fontSize: '15px', display: 'block' }}>
                            {lead.nombre}
                          </span>
                          <span style={{ fontSize: '13px', color: 'var(--gris)' }}>
                            {lead.negocio}
                          </span>
                        </div>

                        <span style={{
                          fontSize: '11px', background: 'var(--negro3)',
                          border: `1px solid ${col.color}33`,
                          color: col.color, borderRadius: '4px',
                          padding: '2px 8px', display: 'inline-block',
                          marginBottom: '12px',
                        }}>
                          {lead.servicio}
                        </span>

                        <div style={{ fontSize: '12px', color: 'var(--gris)' }}>
                          {formatearFecha(lead.fecha)}
                        </div>

                        <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}
                          onClick={e => e.stopPropagation()}
                        >
                          {COLUMNAS
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

      {/* ── MODAL DE DETALLE ──────────────────────────────── */}
      {leadSeleccionado && (
        <div
          onClick={() => setLeadSeleccionado(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', zIndex: 100,
          }}
        >
          <div
            className="tarjeta"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '480px', width: '100%', position: 'relative' }}
          >
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

            {/* Ahora también muestra mensaje y fuente */}
            {[
              { label: 'Email',    valor: leadSeleccionado.email },
              { label: 'Negocio',  valor: leadSeleccionado.negocio },
              { label: 'Servicio', valor: leadSeleccionado.servicio },
              { label: 'Mensaje',  valor: leadSeleccionado.mensaje },
              { label: 'Fuente',   valor: leadSeleccionado.fuente },
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