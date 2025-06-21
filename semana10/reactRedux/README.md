# 🎬 Movie Manager - Tutorial Paso a Paso

## 📚 Guía Completa para Estudiantes

Esta es una guía paso a paso para crear una aplicación completa de administración de películas usando React, TypeScript, Redux Toolkit y CSS puro. Los estudiantes podrán seguir este tutorial desde cero.

## 🎯 ¿Qué vamos a construir?

Una aplicación web moderna que permite:
- ✅ Ver lista de películas
- ✅ Agregar nuevas películas
- ✅ Editar películas existentes
- ✅ Eliminar películas
- ✅ Validación de formularios
- ✅ Estados de carga y error
- ✅ Diseño responsivo

## 🚀 Tecnologías que aprenderás

- **React 18** - Biblioteca de interfaces de usuario
- **TypeScript** - JavaScript con tipos estáticos
- **Redux Toolkit** - Gestión de estado global
- **Vite** - Herramienta de construcción rápida
- **CSS Puro** - Estilos sin frameworks
- **Supabase REST API** - Base de datos en la nube

---

## 📋 PASO 1: Configuración del Proyecto

### 1.1 Crear el proyecto con Vite
```bash
# Crear proyecto React con TypeScript
npm create vite@latest movie-manager -- --template react-ts

# Entrar al directorio
cd movie-manager

# Instalar dependencias básicas
npm install
```

### 1.2 Instalar Redux Toolkit
```bash
npm install @reduxjs/toolkit react-redux
```

### 1.3 Estructura inicial
Tu proyecto debería verse así:
```
movie-manager/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── index.html
```

---

## 📋 PASO 2: Configurar Redux Store

### 2.1 Crear el store
Crea `src/app/store.ts`:
```typescript
import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from '../features/movies/moviesSlice'

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### 2.2 Crear hooks tipados
Crea `src/app/hooks.ts`:
```typescript
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelector(selector)
```

---

## 📋 PASO 3: Configurar Supabase

### 3.1 Crear cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Espera a que se configure (2-3 minutos)

### 3.2 Crear tabla de películas
En el SQL Editor de Supabase, ejecuta:
```sql
-- Crear tabla movies
CREATE TABLE public.movies (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre text NOT NULL,
    url text NOT NULL,
    sinopsis text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar acceso público para desarrollo
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir todo público" ON public.movies
    FOR ALL USING (true) WITH CHECK (true);
```

### 3.3 Configurar cliente API
Crea `src/config/supabaseClient.ts`:
```typescript
// Interfaz para las películas
export interface Movie {
  id: string
  nombre: string
  url: string
  sinopsis: string
  created_at?: string
}

// Configuración - REEMPLAZA CON TUS CREDENCIALES
const SUPABASE_URL = 'https://TU_PROYECTO.supabase.co'
const SUPABASE_ANON_KEY = 'TU_CLAVE_PUBLICA'

// Clase para manejar la API
export class MoviesAPI {
  private static baseURL = `${SUPABASE_URL}/rest/v1/movies`
  private static headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  }

  static async getAll(): Promise<Movie[]> {
    const response = await fetch(this.baseURL, {
      method: 'GET',
      headers: this.headers
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  }

  static async create(movie: Omit<Movie, 'id' | 'created_at'>): Promise<Movie> {
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(movie)
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const result = await response.json()
    return result[0]
  }

  static async update(id: string, movie: Omit<Movie, 'id' | 'created_at'>): Promise<Movie> {
    const response = await fetch(`${this.baseURL}?id=eq.${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(movie)
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const result = await response.json()
    return result[0]
  }

  static async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseURL}?id=eq.${id}`, {
      method: 'DELETE',
      headers: this.headers
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
  }
}
```

**📝 IMPORTANTE:** 
- Ve a Settings > API en tu proyecto Supabase
- Copia la URL del proyecto y la clave pública
- Reemplaza `TU_PROYECTO` y `TU_CLAVE_PUBLICA` en el código

---

## 📋 PASO 4: Crear el Slice de Redux

Crea `src/features/movies/moviesSlice.ts`:
```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { MoviesAPI, type Movie } from '../../config/supabaseClient'

// Estado inicial tipado
interface MoviesState {
  items: Movie[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: MoviesState = {
  items: [],
  status: 'idle',
  error: null
}

// Thunks asíncronos (acciones que hacen llamadas API)
export const fetchMovies = createAsyncThunk<
  Movie[],
  void,
  { rejectValue: string }
>('movies/fetchMovies', async (_, { rejectWithValue }) => {
  try {
    return await MoviesAPI.getAll()
  } catch (error) {
    return rejectWithValue('Error loading movies')
  }
})

export const addNewMovie = createAsyncThunk<
  Movie,
  Omit<Movie, 'id' | 'created_at'>,
  { rejectValue: string }
>('movies/addNewMovie', async (movieData, { rejectWithValue }) => {
  try {
    return await MoviesAPI.create(movieData)
  } catch (error) {
    return rejectWithValue('Error creating movie')
  }
})

export const updateMovie = createAsyncThunk<
  Movie,
  Movie,
  { rejectValue: string }
>('movies/updateMovie', async (movie, { rejectWithValue }) => {
  try {
    const { id, created_at, ...movieData } = movie
    return await MoviesAPI.update(id, movieData)
  } catch (error) {
    return rejectWithValue('Error updating movie')
  }
})

export const deleteMovie = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('movies/deleteMovie', async (id, { rejectWithValue }) => {
  try {
    await MoviesAPI.delete(id)
    return id
  } catch (error) {
    return rejectWithValue('Error deleting movie')
  }
})

// Slice de Redux
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Unknown error'
      })
      
      // Add movie
      .addCase(addNewMovie.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(addNewMovie.rejected, (state, action) => {
        state.error = action.payload || 'Unknown error'
      })
      
      // Update movie
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.items.findIndex(movie => movie.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.error = action.payload || 'Unknown error'
      })
      
      // Delete movie
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.items = state.items.filter(movie => movie.id !== action.payload)
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.error = action.payload || 'Unknown error'
      })
  }
})

export const { clearError } = moviesSlice.actions
export type { Movie }
export default moviesSlice.reducer
```

---

## 📋 PASO 5: Crear los Estilos CSS

Reemplaza el contenido de `src/index.css`:
```css
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f9fafb;
  color: #374151;
  line-height: 1.5;
}

/* Layout principal */
.app {
  min-height: 100vh;
}

.header {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.header-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.header-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0 0 0;
}

/* Main content */
.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Formulario */
.form-container {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 24px;
}

.form-title {
  font-size: 18px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 16px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.form-input.error, .form-textarea.error {
  border-color: #fca5a5;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-error {
  font-size: 12px;
  color: #dc2626;
  margin-top: 4px;
}

.form-buttons {
  display: flex;
  gap: 12px;
  padding-top: 8px;
}

/* Botones */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.btn-danger {
  background-color: #dc2626;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #b91c1c;
}

.btn-full {
  flex: 1;
}

/* Lista de películas */
.movies-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.movies-title {
  font-size: 18px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.movies-count {
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0 0 0;
}

.movies-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Tarjeta de película */
.movie-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.movie-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.movie-content {
  display: flex;
  padding: 8px;
}

.movie-image-container {
  flex-shrink: 0;
}

.movie-image {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
}

.movie-details {
  flex: 1;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.movie-title {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-description {
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-actions {
  display: flex;
  gap: 4px;
}

.btn-edit {
  background-color: #eff6ff;
  color: #1d4ed8;
  padding: 2px 6px;
  font-size: 12px;
}

.btn-edit:hover {
  background-color: #dbeafe;
}

.btn-delete {
  background-color: #fef2f2;
  color: #dc2626;
  padding: 2px 6px;
  font-size: 12px;
}

.btn-delete:hover {
  background-color: #fee2e2;
}

/* Estados especiales */
.error-message {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #6b7280;
  font-size: 14px;
}

.empty-state {
  text-align: center;
  padding: 48px;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 18px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 8px 0;
}

.empty-message {
  color: #6b7280;
  font-size: 14px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  margin: 16px;
}

.modal-title {
  font-size: 18px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 12px 0;
}

.modal-message {
  color: #6b7280;
  margin-bottom: 24px;
  font-size: 14px;
}

.modal-buttons {
  display: flex;
  gap: 12px;
}
```

---

## 📋 PASO 6: Crear el Formulario de Películas

Crea `src/features/movies/AddMovieForm.tsx`:
```typescript
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewMovie, updateMovie, clearError } from './moviesSlice'
import { type Movie } from './moviesSlice'

interface AddMovieFormProps {
  editingMovie?: Movie | null
  onCancelEdit?: () => void
}

const AddMovieForm = ({ editingMovie, onCancelEdit }: AddMovieFormProps) => {
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector(state => state.movies)
  
  const [formData, setFormData] = useState({
    nombre: '',
    url: '',
    sinopsis: ''
  })
  
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  
  // Efecto para cargar datos cuando editamos
  useEffect(() => {
    if (editingMovie) {
      setFormData({
        nombre: editingMovie.nombre,
        url: editingMovie.url,
        sinopsis: editingMovie.sinopsis
      })
    } else {
      setFormData({
        nombre: '',
        url: '',
        sinopsis: ''
      })
    }
    setErrors({})
  }, [editingMovie])
  
  // Limpiar errores después de 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [error, dispatch])
  
  // Manejar cambios en inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Title is required'
    }
    
    if (!formData.url.trim()) {
      newErrors.url = 'Image URL is required'
    } else {
      try {
        new URL(formData.url)
      } catch {
        newErrors.url = 'Invalid URL format'
      }
    }
    
    if (!formData.sinopsis.trim()) {
      newErrors.sinopsis = 'Description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      if (editingMovie) {
        // Actualizar película existente
        await dispatch(updateMovie({
          id: editingMovie.id,
          ...formData
        })).unwrap()
        
        onCancelEdit?.()
      } else {
        // Crear nueva película
        await dispatch(addNewMovie(formData)).unwrap()
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          url: '',
          sinopsis: ''
        })
      }
    } catch (error) {
      console.error('Error processing movie:', error)
    }
  }
  
  // Cancelar edición
  const handleCancelEdit = () => {
    setFormData({
      nombre: '',
      url: '',
      sinopsis: ''
    })
    setErrors({})
    onCancelEdit?.()
  }
  
  return (
    <div className="form-container">
      <h2 className="form-title">
        {editingMovie ? 'Edit Movie' : 'Add Movie'}
      </h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className={`form-input ${errors.nombre ? 'error' : ''}`}
            placeholder="Movie title"
          />
          {errors.nombre && (
            <p className="form-error">{errors.nombre}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="url" className="form-label">
            Image URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className={`form-input ${errors.url ? 'error' : ''}`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.url && (
            <p className="form-error">{errors.url}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="sinopsis" className="form-label">
            Description
          </label>
          <textarea
            id="sinopsis"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleInputChange}
            rows={3}
            className={`form-textarea ${errors.sinopsis ? 'error' : ''}`}
            placeholder="Brief description..."
          />
          {errors.sinopsis && (
            <p className="form-error">{errors.sinopsis}</p>
          )}
        </div>
        
        <div className="form-buttons">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn btn-primary btn-full"
          >
            {status === 'loading' ? (
              <span>
                <div className="loading-spinner" style={{width: '16px', height: '16px', marginBottom: '0'}}></div>
                Saving...
              </span>
            ) : (
              editingMovie ? 'Update' : 'Add Movie'
            )}
          </button>
          
          {editingMovie && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddMovieForm
```

---

## 📋 PASO 7: Crear la Lista de Películas

Crea `src/features/movies/MoviesList.tsx`:
```typescript
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchMovies, deleteMovie } from './moviesSlice'
import { type Movie } from './moviesSlice'

interface MoviesListProps {
  onEditMovie: (movie: Movie) => void
}

// Modal de confirmación para eliminar
const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  movieName 
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  movieName: string
}) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">
          Delete Movie
        </h3>
        <p className="modal-message">
          Are you sure you want to delete "<strong>{movieName}</strong>"? This action cannot be undone.
        </p>
        <div className="modal-buttons">
          <button
            onClick={onConfirm}
            className="btn btn-danger btn-full"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// Tarjeta individual de película
const MovieCard = ({ 
  movie, 
  onEdit, 
  onDelete 
}: {
  movie: Movie
  onEdit: (movie: Movie) => void
  onDelete: (movie: Movie) => void
}) => {
  return (
    <div className="movie-card">
      <div className="movie-content">
        <div className="movie-image-container">
          <img
            src={movie.url}
            alt={movie.nombre}
            className="movie-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/24x24/E5E7EB/9CA3AF?text=•'
            }}
          />
        </div>
        
        <div className="movie-details">
          <h3 className="movie-title">
            {movie.nombre}
          </h3>
          <p className="movie-description">
            {movie.sinopsis}
          </p>
          
          <div className="movie-actions">
            <button
              onClick={() => onEdit(movie)}
              className="btn btn-edit btn-full"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(movie)}
              className="btn btn-delete btn-full"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente principal de la lista
const MoviesList = ({ onEditMovie }: MoviesListProps) => {
  const dispatch = useAppDispatch()
  const { items: movies, status, error } = useAppSelector(state => state.movies)
  
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null)
  
  // Cargar películas al montar el componente
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies())
    }
  }, [status, dispatch])
  
  // Manejar clic en eliminar
  const handleDeleteClick = (movie: Movie) => {
    setMovieToDelete(movie)
  }
  
  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    if (movieToDelete) {
      try {
        await dispatch(deleteMovie(movieToDelete.id)).unwrap()
        setMovieToDelete(null)
      } catch (error) {
        console.error('Error deleting movie:', error)
      }
    }
  }
  
  // Cancelar eliminación
  const handleCancelDelete = () => {
    setMovieToDelete(null)
  }
  
  // Recargar películas
  const handleRefresh = () => {
    dispatch(fetchMovies())
  }
  
  return (
    <div>
      <div className="movies-header">
        <div>
          <h2 className="movies-title">
            Movie Collection
          </h2>
          <p className="movies-count">
            {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
          </p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={status === 'loading'}
          className="btn btn-secondary"
        >
          {status === 'loading' ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      
      {/* Mostrar errores */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button
            onClick={handleRefresh}
            style={{ marginTop: '8px', textDecoration: 'underline', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '14px' }}
          >
            Try again
          </button>
        </div>
      )}
      
      {/* Estado de carga */}
      {status === 'loading' && movies.length === 0 && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading movies...</p>
        </div>
      )}
      
      {/* Lista de películas */}
      {movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onEdit={onEditMovie}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}
      
      {/* Estado vacío */}
      {status === 'succeeded' && movies.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🎬</div>
          <h3 className="empty-title">
            No movies yet
          </h3>
          <p className="empty-message">
            Add your first movie using the form above.
          </p>
        </div>
      )}
      
      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={movieToDelete !== null}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        movieName={movieToDelete?.nombre || ''}
      />
    </div>
  )
}

export default MoviesList
```

---

## 📋 PASO 8: Crear el Componente Principal

Actualiza `src/App.tsx`:
```typescript
import { useState } from 'react'
import AddMovieForm from './features/movies/AddMovieForm'
import MoviesList from './features/movies/MoviesList'
import { type Movie } from './features/movies/moviesSlice'

function App() {
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingMovie(null)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-container">
          <div>
            <h1 className="header-title">Movies</h1>
            <p className="header-subtitle">Manage your movie collection</p>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="content">
          <AddMovieForm 
            editingMovie={editingMovie}
            onCancelEdit={handleCancelEdit}
          />
          <MoviesList onEditMovie={handleEditMovie} />
        </div>
      </main>
    </div>
  )
}

export default App
```

---

## 📋 PASO 9: Configurar el Punto de Entrada

Actualiza `src/main.tsx`:
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

---

## 📋 PASO 10: Ejecutar la Aplicación

### 10.1 Verificar configuración
Asegúrate de haber configurado correctamente:
- ✅ Credenciales de Supabase en `src/config/supabaseClient.ts`
- ✅ Tabla `movies` creada en Supabase
- ✅ Políticas de seguridad configuradas

### 10.2 Ejecutar en desarrollo
```bash
npm run dev
```

### 10.3 Probar la aplicación
1. **Agregar película**: Llena el formulario y presiona "Add Movie"
2. **Ver lista**: Las películas aparecerán en la lista
3. **Editar**: Haz clic en "Edit" en cualquier película
4. **Eliminar**: Haz clic en "Delete" y confirma

---

## 🎓 Conceptos Clave Aprendidos

### 1. **Redux Toolkit Pattern**
- ✅ Store centralizado con tipado
- ✅ Slices para organizar estado
- ✅ Thunks para operaciones asíncronas
- ✅ Extrareducers para manejar promesas

### 2. **TypeScript en React**
- ✅ Interfaces para props y estado
- ✅ Hooks tipados personalizados
- ✅ Generic types en funciones
- ✅ Type safety completo

### 3. **Patrones de Componentes**
- ✅ Componentes funcionales
- ✅ Hooks de estado y efectos
- ✅ Props tipadas
- ✅ Composición de componentes

### 4. **API REST con Fetch**
- ✅ HTTP methods (GET, POST, PATCH, DELETE)
- ✅ Headers de autenticación
- ✅ Manejo de errores
- ✅ Validación de respuestas

### 5. **CSS Moderno**
- ✅ CSS Grid y Flexbox
- ✅ Variables CSS personalizadas
- ✅ Transitions y animations
- ✅ Responsive design

---

## 🚀 Extensiones Sugeridas

Una vez completado el tutorial básico, los estudiantes pueden:

### Nivel Intermedio
- 🔧 **Agregar paginación** para listas grandes
- 🔍 **Implementar búsqueda** de películas
- 🏷️ **Sistema de categorías** con filtros
- ⭐ **Sistema de rating** con estrellas

### Nivel Avanzado
- 🔐 **Autenticación** con Supabase Auth
- 📱 **Progressive Web App** (PWA)
- 🌙 **Modo oscuro** con context
- 📊 **Dashboard** con gráficos

### Deployment
- 🌐 **Deploy en Vercel/Netlify**
- 🏗️ **CI/CD con GitHub Actions**
- 📈 **Analytics** con Google Analytics
- 🐞 **Error tracking** con Sentry

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Supabase Docs](https://supabase.com/docs)

### Herramientas de Desarrollo
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [VS Code Extensions](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial)

---

## ❓ Solución de Problemas Comunes

### Error: "Failed to fetch"
- ✅ Verifica las credenciales de Supabase
- ✅ Asegúrate de que las políticas RLS estén configuradas
- ✅ Revisa la consola del navegador para más detalles

### Error: "Module not found"
- ✅ Verifica que todas las dependencias estén instaladas: `npm install`
- ✅ Revisa las importaciones en los archivos
- ✅ Reinicia el servidor de desarrollo

### Imágenes no cargan
- ✅ Verifica que las URLs de imágenes sean válidas
- ✅ Prueba con URLs de servicios como Unsplash o Lorem Picsum

### Tipos de TypeScript
- ✅ Asegúrate de exportar/importar correctamente las interfaces
- ✅ Verifica que los tipos coincidan en props y estado

---

## 🎉 ¡Felicitaciones!

Has completado el tutorial completo de Movie Manager. Ahora tienes una aplicación funcional que demuestra conceptos avanzados de desarrollo web moderno.

### Lo que has construido:
- ✅ Aplicación React con TypeScript
- ✅ Gestión de estado con Redux Toolkit
- ✅ CRUD completo con API REST
- ✅ Interfaz responsive con CSS puro
- ✅ Validación de formularios
- ✅ Manejo de estados de error y carga

¡Continúa experimentando y expandiendo la aplicación con nuevas funcionalidades!
