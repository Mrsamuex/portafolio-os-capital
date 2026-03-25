const POSTS = [
  {
    id: 1,
    titulo: 'Por qué tu negocio no crece aunque vendas',
    resumen: 'El problema no es vender más, es no entender tus números.',
  },
]

export default function Blog() {
  return (
    <div>

      {/* HERO */}
      <section className="seccion seccion-borde">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="etiqueta">Blog</span>
          <h1 className="titulo-hero">Ideas que hacen crecer negocios</h1>
          <p style={{ maxWidth: '500px', margin: '20px auto 0' }}>
            Estrategias reales para organizar y escalar tu empresa.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="seccion">
        <div className="container">
          <div className="grid-3">
            {POSTS.map(post => (
              <div key={post.id} className="tarjeta">
                <h3 style={{ marginBottom: '10px' }}>{post.titulo}</h3>
                <p>{post.resumen}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}