// 🎬 SLICE DE PELÍCULAS - REDUX TOOLKIT CON API REST
// Este archivo contiene toda la lógica de estado para las películas
// Usa la API REST de Supabase directamente con fetch() para operaciones CRUD

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { MoviesAPI } from '../../config/supabaseClient'

// 🎭 DEFINICIÓN DEL MODELO DE DATOS
// Esta interfaz define la estructura exacta de una película en nuestra aplicación
export interface Movie {
  id: string
  nombre: string
  url: string
  sinopsis: string
}

// 📊 INTERFAZ DEL ESTADO DEL SLICE
// Define cómo se ve el estado de películas en el store de Redux
interface MoviesState {
  items: Movie[]                                    // Array de películas
  status: 'idle' | 'loading' | 'succeeded' | 'failed' // Estado de las operaciones asíncronas
  error: string | null                              // Mensaje de error si algo falla
}

// 🏁 ESTADO INICIAL
// Cómo se ve el estado cuando la aplicación se inicia por primera vez
const initialState: MoviesState = {
  items: [],          // Comienza sin películas
  status: 'idle',     // Sin operaciones en curso
  error: null         // Sin errores
}

// 🔄 THUNKS ASÍNCRONOS - OPERACIONES CRUD CON API REST
// Los thunks nos permiten hacer operaciones asíncronas (llamadas HTTP)
// createAsyncThunk maneja automáticamente los estados loading/success/error

// 📖 LEER TODAS LAS PELÍCULAS
export const fetchMovies = createAsyncThunk<
  Movie[],           // Tipo del valor de retorno en caso de éxito
  void,              // Tipo del argumento (void = sin argumentos)
  { rejectValue: string } // Tipo del valor de rechazo en caso de error
>(
  'movies/fetchMovies', // Nombre único de la acción
  async (_, { rejectWithValue }) => {
    try {
      // 🌐 Llamada HTTP GET usando nuestra clase MoviesAPI
      const data = await MoviesAPI.getAll()
      return data
    } catch (error) {
      // 🚨 Manejo de errores personalizado
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido al cargar películas'
      return rejectWithValue(errorMessage)
    }
  }
)

// ➕ CREAR UNA NUEVA PELÍCULA
export const addNewMovie = createAsyncThunk<
  Movie,                    // Retorna la película creada
  Omit<Movie, 'id'>,       // Recibe película sin ID (Supabase lo genera)
  { rejectValue: string }
>(
  'movies/addNewMovie',
  async (newMovie, { rejectWithValue }) => {
    try {
      // 🌐 Llamada HTTP POST para crear película
      const data = await MoviesAPI.create(newMovie)
      return data
    } catch (error) {
      // 🚨 Manejo de errores personalizado
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido al crear película'
      return rejectWithValue(errorMessage)
    }
  }
)

// ✏️ ACTUALIZAR UNA PELÍCULA EXISTENTE
export const updateMovie = createAsyncThunk<
  Movie,                    // Retorna la película actualizada
  Movie,                    // Recibe la película completa con ID
  { rejectValue: string }
>(
  'movies/updateMovie',
  async (updatedMovie, { rejectWithValue }) => {
    try {
      // 🌐 Llamada HTTP PATCH para actualizar película
      const data = await MoviesAPI.update(updatedMovie.id, {
        nombre: updatedMovie.nombre,
        url: updatedMovie.url,
        sinopsis: updatedMovie.sinopsis
      })
      return data
    } catch (error) {
      // 🚨 Manejo de errores personalizado
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido al actualizar película'
      return rejectWithValue(errorMessage)
    }
  }
)

// 🗑️ ELIMINAR UNA PELÍCULA
export const deleteMovie = createAsyncThunk<
  string,                   // Retorna el ID de la película eliminada
  string,                   // Recibe el ID de la película a eliminar
  { rejectValue: string }
>(
  'movies/deleteMovie',
  async (movieId, { rejectWithValue }) => {
    try {
      // 🌐 Llamada HTTP DELETE para eliminar película
      await MoviesAPI.delete(movieId)
      return movieId // Retornamos el ID para actualizar el estado local
    } catch (error) {
      // 🚨 Manejo de errores personalizado
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido al eliminar película'
      return rejectWithValue(errorMessage)
    }
  }
)

// 🏪 CREACIÓN DEL SLICE
// El slice combina el estado inicial, reducers, y maneja las acciones de los thunks
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // 🧹 ACCIÓN PARA LIMPIAR ERRORES
    // Permite limpiar mensajes de error de la UI
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // 🔧 EXTRA REDUCERS - MANEJAN LAS ACCIONES DE LOS THUNKS
    // builder.addCase nos permite responder a las acciones de los thunks
    
    // 📖 CASOS PARA FETCH MOVIES
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = 'succeeded'
        state.items = action.payload // Reemplazar todas las películas
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Error desconocido al cargar películas'
      })
      
      // ➕ CASOS PARA ADD MOVIE
      .addCase(addNewMovie.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(addNewMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.status = 'succeeded'
        state.items.push(action.payload) // Agregar la nueva película al array
      })
      .addCase(addNewMovie.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Error desconocido al crear película'
      })
      
      // ✏️ CASOS PARA UPDATE MOVIE
      .addCase(updateMovie.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.status = 'succeeded'
        // Encontrar y reemplazar la película actualizada
        const index = state.items.findIndex(movie => movie.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Error desconocido al actualizar película'
      })
      
      // 🗑️ CASOS PARA DELETE MOVIE
      .addCase(deleteMovie.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(deleteMovie.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded'
        // Filtrar out la película eliminada
        state.items = state.items.filter(movie => movie.id !== action.payload)
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Error desconocido al eliminar película'
      })
  }
})

// 📤 EXPORTAR ACCIONES Y REDUCER
export const { clearError } = moviesSlice.actions
export default moviesSlice.reducer

// 💡 VENTAJAS DE USAR API REST DIRECTAMENTE EN REDUX:
/*
  1. TRANSPARENCIA: Los estudiantes ven exactamente qué HTTP requests se hacen
  
  2. DEBUGGING: Fácil de debuggear en Network tab del browser
  
  3. CONTROL: Control total sobre headers, métodos HTTP, y manejo de errores
  
  4. EDUCATIVO: Aprenden cómo funcionan las APIs REST reales
  
  5. TRANSFERIBLE: Pueden aplicar este conocimiento a cualquier API REST
  
  6. ESTÁNDAR: Uso de fetch() que es el estándar web moderno
  
  7. SIN DEPENDENCIAS: No dependemos de SDKs específicos
*/

// 🔧 RESUMEN DE LAS OPERACIONES HTTP:
/*
  📖 GET    /rest/v1/movies?order=nombre.asc  → Obtener todas las películas
  ➕ POST   /rest/v1/movies                    → Crear nueva película
  ✏️ PATCH  /rest/v1/movies?id=eq.{id}        → Actualizar película existente
  🗑️ DELETE /rest/v1/movies?id=eq.{id}        → Eliminar película
*/ 