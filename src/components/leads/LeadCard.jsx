import Card from '../ui/card'

export default function LeadCard({ lead, column, onClick, onChange }) {
  return (
    <Card onClick={onClick}>
      <div style={{ marginBottom: '10px' }}>
        <span style={{ fontWeight: '600', display: 'block' }}>
          {lead.nombre}
        </span>
        <span style={{ fontSize: '13px', color: 'gray' }}>
          {lead.negocio}
        </span>
      </div>

      <span style={{
        fontSize: '11px',
        border: `1px solid ${column.color}`,
        color: column.color,
        padding: '2px 8px'
      }}>
        {lead.servicio}
      </span>

      <div style={{ marginTop: '10px' }}>
        {column.id}
      </div>

      <div onClick={e => e.stopPropagation()}>
        {['nuevo', 'contactado', 'cerrado']
          .filter(e => e !== column.id)
          .map(e => (
            <button key={e} onClick={() => onChange(e)}>
              → {e}
            </button>
          ))}
      </div>
    </Card>
  )
}