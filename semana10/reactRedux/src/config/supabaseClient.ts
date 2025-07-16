// 📚 CONFIGURACIÓN DE API REST DE SUPABASE
// Este archivo centraliza la configuración para trabajar con Supabase como servicio REST
// Usaremos fetch() nativo en lugar del SDK de supabase-js para mejor comprensión

// 🔐 CREDENCIALES DE SUPABASE
// ⚠️ IMPORTANTE: Reemplaza estos placeholders con tus credenciales reales de Supabase
// 1. Ve a tu dashboard de Supabase (https://supabase.com/dashboard/)
// 2. Selecciona tu proyecto
// 3. Ve a Settings > API
// 4. Copia la URL del proyecto y la clave anónima (anon key)
const SUPABASE_URL = 'https://gghknilbnlgxfqvgyqss.supabase.co' // Ejemplo: https://xyzcompany.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnaGtuaWxibmxneGZxdmd5cXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDAzNjksImV4cCI6MjA2NjExNjM2OX0.vkb9zK2VEk636eQfHL4u4_Gp5YmgpJ09IyJDpea7TY0' // Tu clave anónima pública

// 🌐 CONFIGURACIÓN DE LA API REST
// Supabase expone automáticamente una API REST en /rest/v1/
const API_BASE_URL = `${SUPABASE_URL}/rest/v1`

// 🔧 HEADERS ESTÁNDAR PARA TODAS LAS REQUESTS
// Estos headers son requeridos por la API REST de Supabase
const getHeaders = (method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET') => ({
  'apikey': SUPABASE_ANON_KEY,           // Clave de autenticación
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, // Header de autorización
  'Content-Type': 'application/json',     // Tipo de contenido JSON
  'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal' // Prefer header para POST
})

// 🎬 CLASE PARA MANEJAR OPERACIONES DE PELÍCULAS
// Esta clase encapsula todas las operaciones CRUD para películas
export class MoviesAPI {
  private static tableName = 'movies'
  private static baseUrl = `${API_BASE_URL}/${MoviesAPI.tableName}`

  // 📖 OBTENER TODAS LAS PELÍCULAS
  static async getAll() {
    try {
      const response = await fetch(`${MoviesAPI.baseUrl}?order=nombre.asc`, {
        method: 'GET',
        headers: getHeaders('GET')
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Error ${response.status}: ${error}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching movies:', error)
      throw error
    }
  }

  // ➕ CREAR NUEVA PELÍCULA
  static async create(movie: { nombre: string; url: string; sinopsis: string }) {
    try {
      const response = await fetch(MoviesAPI.baseUrl, {
        method: 'POST',
        headers: getHeaders('POST'),
        body: JSON.stringify(movie)
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Error ${response.status}: ${error}`)
      }

      const data = await response.json()
      return data[0] // Supabase devuelve un array, tomamos el primer elemento
    } catch (error) {
      console.error('Error creating movie:', error)
      throw error
    }
  }

  // ✏️ ACTUALIZAR PELÍCULA EXISTENTE
  static async update(id: string, movie: { nombre: string; url: string; sinopsis: string }) {
    try {
      const response = await fetch(`${MoviesAPI.baseUrl}?id=eq.${id}`, {
        method: 'PATCH',
        headers: getHeaders('PATCH'),
        body: JSON.stringify(movie)
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Error ${response.status}: ${error}`)
      }

      // Para PATCH, necesitamos hacer un GET adicional para obtener el objeto actualizado
      // ya que Supabase no devuelve el objeto por defecto en PATCH
      return await MoviesAPI.getById(id)
    } catch (error) {
      console.error('Error updating movie:', error)
      throw error
    }
  }

  // 🗑️ ELIMINAR PELÍCULA
  static async delete(id: string) {
    try {
      const response = await fetch(`${MoviesAPI.baseUrl}?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders('DELETE')
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Error ${response.status}: ${error}`)
      }

      return { success: true, id }
    } catch (error) {
      console.error('Error deleting movie:', error)
      throw error
    }
  }

  // 🔍 OBTENER PELÍCULA POR ID (método auxiliar)
  private static async getById(id: string) {
    try {
      const response = await fetch(`${MoviesAPI.baseUrl}?id=eq.${id}`, {
        method: 'GET',
        headers: getHeaders('GET')
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Error ${response.status}: ${error}`)
      }

      const data = await response.json()
      return data[0] // Supabase devuelve un array, tomamos el primer elemento
    } catch (error) {
      console.error('Error fetching movie by id:', error)
      throw error
    }
  }
}

// 📋 CONFIGURACIÓN DE LA TABLA EN SUPABASE
/*
  Para que esta aplicación funcione, necesitas crear una tabla llamada 'movies' con:
  
  Columnas:
  - id: uuid (Primary Key, con valor por defecto: gen_random_uuid())
  - nombre: text (Not Null)
  - url: text (Not Null)
  - sinopsis: text (Not Null)
  - created_at: timestamp with time zone (opcional, para auditoría)
  
  Políticas RLS (Row Level Security):
  - Habilita RLS en la tabla
  - Crea políticas para permitir SELECT, INSERT, UPDATE, DELETE públicamente
  - O desactiva RLS si es solo para desarrollo/aprendizaje
  
  SQL para crear la tabla:
  
  CREATE TABLE public.movies (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre text NOT NULL,
    url text NOT NULL,
    sinopsis text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
  );
  
  -- Habilitar RLS
  ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
  
  -- Políticas permisivas para desarrollo
  CREATE POLICY "Enable all operations for public" ON public.movies
    FOR ALL USING (true) WITH CHECK (true);
*/

// 💡 VENTAJAS DE USAR API REST DIRECTAMENTE:
/*
  1. COMPRENSIÓN PROFUNDA: Los estudiantes entienden cómo funcionan las APIs REST
  
  2. CONTROL TOTAL: Manejo completo de headers, métodos HTTP, y respuestas
  
  3. DEBUGGING FÁCIL: Pueden ver exactamente qué se envía y recibe
  
  4. TRANSFERIBLE: Conocimientos aplicables a cualquier API REST
  
  5. MENOS ABSTRACCIÓN: No hay "magia" oculta en SDKs
  
  6. ESTÁNDAR WEB: Uso de fetch() que es estándar en JavaScript moderno
*/ 