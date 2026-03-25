const SERVICIOS = [
  {
    id: 1,
    titulo: 'Diagnóstico organizacional',
    descripcion: 'Identificamos qué está frenando tu negocio y dónde están las oportunidades.',
  },
  {
    id: 2,
    titulo: 'Digitalización de procesos',
    descripcion: 'Migramos tu operación a herramientas digitales eficientes.',
  },
  {
    id: 3,
    titulo: 'Control financiero',
    descripcion: 'Organizamos tus números con claridad y control.',
  },
]

export default function Servicios() {
  return (
    <div>

      {/* HERO */}
      <section className="seccion seccion-borde">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="etiqueta">Servicios</span>
          <h1 className="titulo-hero">
            Lo que hacemos por tu negocio
          </h1>
          <p style={{ maxWidth: '500px', margin: '20px auto 0' }}>
            Soluciones diseñadas para ordenar, digitalizar y escalar pequeñas empresas.
          </p>
        </div>
      </section>

      {/* LISTADO DE SERVICIOS */}
      <section className="seccion">
        <div className="container">
          <div className="grid-3">
            {SERVICIOS.map(s => (
              <div key={s.id} className="tarjeta">
                <h3 style={{ marginBottom: '10px' }}>{s.titulo}</h3>
                <p>{s.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}