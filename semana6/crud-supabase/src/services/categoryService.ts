import { supabase } from '../config/supabase'
import type { Category, CategoryInput, CategoryUpdate } from '../types/category'

export class CategoryService {
  static async getAll(): Promise<Category[]> {
    try {
      console.log('Intentando obtener categorías...')
      const { data, error, status, statusText } = await supabase
        .from('categories')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error detallado al obtener categorías:', {
          error,
          status,
          statusText,
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw error
      }

      console.log('Categorías obtenidas exitosamente:', data?.length || 0)
      return data || []
    } catch (error) {
      console.error('Error inesperado al obtener categorías:', error)
      throw error
    }
  }

  static async create(Category: CategoryInput): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .insert([Category])

    if (error) {
      console.error('Error creating Category:', error)
      throw error
    }
  }

  static async update(id: number, Category: CategoryUpdate): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .update(Category)
      .eq('id', id)

    if (error) {
      console.error('Error updating Category:', error)
      throw error
    }
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting Category:', error)
      throw error
    }
  }
} 