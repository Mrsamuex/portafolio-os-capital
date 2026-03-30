import { supabase } from '../lib/supabase'

// Obtener todos los leads
export const getLeads = async () => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('fecha', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }

  return data
}

// Crear un lead
export const createLead = async (lead) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])

  if (error) {
    console.error('Error creating lead:', error)
    return null
  }

  return data
}

// Actualizar estado
export const updateLeadEstado = async (id, estado) => {
  const { data, error } = await supabase
    .from('leads')
    .update({ estado })
    .eq('id', id)

  if (error) {
    console.error('Error updating lead:', error)
    return null
  }

  return data
}