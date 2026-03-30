export default function ServiceCard({ titulo, descripcion }) {
  return (
    <div className="tarjeta">
      <h3 style={{ marginBottom: '10px' }}>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  )
}