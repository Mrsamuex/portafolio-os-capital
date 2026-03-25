const CASOS = [
  {
    id: 1,
    negocio: 'Flakuz Peluquería',
    problema: 'No sabían cuánto ganaban realmente',
    solucion: 'Implementamos control financiero y registro diario',
    resultado: 'Aumento del 30% en claridad financiera y decisiones más precisas',
  },
]

export default function Casos() {
  return (
    <div>

      {/* HERO */}
      <section className="seccion seccion-borde">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="etiqueta">Casos de éxito</span>
          <h1 className="titulo-hero">Resultados reales</h1>
          <p style={{ maxWidth: '500px', margin: '20px auto 0' }}>
            Negocios que ya dejaron de operar en el caos.
          </p>
        </div>
      </section>

      {/* LISTADO */}
      <section className="seccion">
        <div className="container">
          <div className="grid-2">
            {CASOS.map(caso => (
              <div key={caso.id} className="tarjeta">
                <h3 style={{ marginBottom: '10px' }}>{caso.negocio}</h3>

                <p><strong>Problema:</strong> {caso.problema}</p>
                <p><strong>Solución:</strong> {caso.solucion}</p>
                <p style={{ color: 'var(--amarillo)', marginTop: '10px' }}>
                  <strong>Resultado:</strong> {caso.resultado}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}