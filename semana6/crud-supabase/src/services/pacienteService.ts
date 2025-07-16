import { supabase } from '../config/supabase'
import type { Paciente, PacienteInput, PacienteUpdate } from '../types/paciente'

export class PacienteService {
  static async getAll(): Promise<Paciente[]> {
    try {
      console.log('Intentando obtener pacientes...')
      const { data, error, status, statusText } = await supabase
        .from('pacientes')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error detallado al obtener pacientes:', {
          error,
          status,
          statusText,
          message: error.message,
          details: error.details,
          hint: error.hint
        })
        throw error
      }

      console.log('Pacientes obtenidos exitosamente:', data?.length || 0)
      return data || []
    } catch (error) {
      console.error('Error inesperado al obtener pacientes:', error)
      throw error
    }
  }

  static async create(paciente: PacienteInput): Promise<void> {
    const { error } = await supabase
      .from('pacientes')
      .insert([paciente])

    if (error) {
      console.error('Error creating paciente:', error)
      throw error
    }
  }

  static async update(id: number, paciente: PacienteUpdate): Promise<void> {
    const { error } = await supabase
      .from('pacientes')
      .update(paciente)
      .eq('id', id)

    if (error) {
      console.error('Error updating paciente:', error)
      throw error
    }
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('pacientes')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting paciente:', error)
      throw error
    }
  }
} 