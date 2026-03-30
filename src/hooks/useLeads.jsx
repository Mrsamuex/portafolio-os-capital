import { useEffect, useState } from 'react'
import { getLeads, updateLeadEstado } from '../services/leadService'

export function useLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    setLoading(true)
    const data = await getLeads()
    setLeads(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const cambiarEstado = async (id, estado) => {
    await updateLeadEstado(id, estado)

    // actualización local (más rápido)
    setLeads(prev =>
      prev.map(l =>
        l.id === id ? { ...l, estado } : l
      )
    )
  }

  return {
    leads,
    loading,
    cambiarEstado
  }
}