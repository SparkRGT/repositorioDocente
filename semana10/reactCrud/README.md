# 🎬 Movies CRUD App - React + Supabase

Una aplicación completa de gestión de películas (CRUD) desarrollada con React, TypeScript, Vite y Supabase. Perfecta para aprender desarrollo web moderno con operaciones de base de datos en tiempo real.

## 📋 Tabla de Contenidos

- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📦 Prerrequisitos](#-prerrequisitos)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [🗄️ Configuración de Supabase](#️-configuración-de-supabase)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [👩‍💻 Implementación Paso a Paso](#-implementación-paso-a-paso)
- [🎯 Funcionalidades](#-funcionalidades)
- [📱 Responsive Design](#-responsive-design)
- [🚀 Ejecutar el Proyecto](#-ejecutar-el-proyecto)
- [📚 Conceptos Aprendidos](#-conceptos-aprendidos)

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Bundler y servidor de desarrollo rápido
- **Supabase** - Backend como servicio (PostgreSQL)
- **CSS Grid** - Sistema de layout moderno
- **Fetch API** - Para comunicación con la API REST

## 📦 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- Una cuenta en **Supabase** (gratuita)
- Editor de código (**VS Code** recomendado)

## 🚀 Instalación y Configuración

### Paso 1: Crear el proyecto React con Vite

```bash
npm create vite@latest reactCrud -- --template react-ts
cd reactCrud
npm install
```

### Paso 2: Limpiar archivos innecesarios

Elimina los siguientes archivos que no necesitaremos:
- `src/index.css` (conflictos de estilos)
- `src/assets/react.svg`

### Paso 3: Actualizar main.tsx

Modifica `src/main.tsx`:

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## 🗄️ Configuración de Supabase

### Paso 1: Crear un proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Anota tu **URL del proyecto** y **API Key (anon key)**

### Paso 2: Crear la tabla de películas

En el SQL Editor de Supabase, ejecuta este script:

```sql
-- Crear la tabla movies
CREATE TABLE IF NOT EXISTS movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  url TEXT NOT NULL,
  sinopsis TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- Políticas para operaciones CRUD públicas
CREATE POLICY "Permitir lectura pública de movies" 
ON movies FOR SELECT USING (true);

CREATE POLICY "Permitir inserción pública de movies" 
ON movies FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización pública de movies" 
ON movies FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Permitir eliminación pública de movies" 
ON movies FOR DELETE USING (true);

-- Datos de ejemplo
INSERT INTO movies (nombre, url, sinopsis) VALUES
  ('El Padrino', 'https://images.unsplash.com/photo-1489599408542-d5b4de04b957?w=500&h=300&fit=crop', 'La historia de una familia de la mafia italiana en Nueva York.'),
  ('Pulp Fiction', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=300&fit=crop', 'Varias historias entrelazadas de crimen en Los Ángeles.'),
  ('El Señor de los Anillos', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=300&fit=crop', 'Un hobbit emprende un viaje épico para destruir un anillo maligno.')
ON CONFLICT DO NOTHING;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_movies_updated_at
    BEFORE UPDATE ON movies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 📁 Estructura del Proyecto

Organiza tu proyecto con la siguiente estructura:

```
src/
├── types/
│   └── Movie.ts              # Interfaces de TypeScript
├── services/
│   └── movieService.ts       # Lógica de comunicación con API
├── components/
│   ├── MovieList.tsx         # Componente para listar películas
│   └── MovieForm.tsx         # Componente para formulario
├── App.tsx                   # Componente principal
├── App.css                   # Estilos principales
└── main.tsx                  # Punto de entrada
```

## 👩‍💻 Implementación Paso a Paso

### Paso 1: Definir tipos (src/types/Movie.ts)

```typescript
export interface Movie {
  id: string;
  nombre: string;
  url: string;
  sinopsis: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateMovieRequest {
  nombre: string;
  url: string;
  sinopsis: string;
}
```

### Paso 2: Crear servicio API (src/services/movieService.ts)

```typescript
import type { Movie, CreateMovieRequest } from '../types/Movie';

const SUPABASE_URL = 'TU_URL_DE_SUPABASE';
const SUPABASE_ANON_KEY = 'TU_API_KEY_DE_SUPABASE';
const API_BASE_URL = `${SUPABASE_URL}/rest/v1/movies`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'apikey': SUPABASE_ANON_KEY
});

export const movieService = {
  // Obtener todas las películas
  async getAllMovies(): Promise<Movie[]> {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener las películas');
    }
    
    return await response.json();
  },

  // Crear nueva película
  async createMovie(movie: CreateMovieRequest): Promise<Movie> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(movie),
    });
    
    if (!response.ok) {
      throw new Error('Error al crear la película');
    }
    
    const createdMovies = await response.json();
    return createdMovies[0];
  },

  // Actualizar película
  async updateMovie(id: string, movie: CreateMovieRequest): Promise<Movie> {
    const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        ...getHeaders(),
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(movie),
    });
    
    if (!response.ok) {
      throw new Error('Error al actualizar la película');
    }
    
    const updatedMovies = await response.json();
    return updatedMovies[0];
  },

  // Eliminar película
  async deleteMovie(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Error al eliminar la película');
    }
  }
};
```

### Paso 3: Componente de Lista (src/components/MovieList.tsx)

```typescript
import type { Movie } from '../types/Movie';

interface MovieListProps {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export const MovieList = ({ movies, onEdit, onDelete, loading }: MovieListProps) => {
  if (loading) {
    return <div className="loading">Cargando películas...</div>;
  }

  if (movies.length === 0) {
    return <div className="empty-state">No hay películas disponibles</div>;
  }

  return (
    <div className="movie-list">
      <h2>Lista de Películas</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-header">
              <h3>{movie.nombre}</h3>
              <div className="movie-actions">
                <button 
                  className="btn btn-edit"
                  onClick={() => onEdit(movie)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-delete"
                  onClick={() => onDelete(movie.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="movie-content">
              <div className="movie-image">
                <img 
                  src={movie.url} 
                  alt={movie.nombre}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x200/cccccc/666666?text=Sin+Imagen';
                  }}
                />
              </div>
              <p><strong>Sinopsis:</strong> {movie.sinopsis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Paso 4: Componente de Formulario (src/components/MovieForm.tsx)

```typescript
import { useState, useEffect } from 'react';
import type { Movie, CreateMovieRequest } from '../types/Movie';

interface MovieFormProps {
  movie?: Movie | null;
  onSubmit: (movie: CreateMovieRequest) => void;
  onCancel: () => void;
  loading: boolean;
}

export const MovieForm = ({ movie, onSubmit, onCancel, loading }: MovieFormProps) => {
  const [formData, setFormData] = useState<CreateMovieRequest>({
    nombre: '',
    url: '',
    sinopsis: ''
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        nombre: movie.nombre,
        url: movie.url,
        sinopsis: movie.sinopsis
      });
    } else {
      setFormData({
        nombre: '',
        url: '',
        sinopsis: ''
      });
    }
  }, [movie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre.trim() && formData.url.trim() && formData.sinopsis.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="movie-form">
      <h2>{movie ? 'Editar Película' : 'Nueva Película'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL de la Imagen:</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sinopsis">Sinopsis:</label>
          <textarea
            id="sinopsis"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleChange}
            rows={4}
            required
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (movie ? 'Actualizar' : 'Crear')}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
```

### Paso 5: Componente Principal (src/App.tsx)

```typescript
import { useState, useEffect } from 'react';
import type { Movie, CreateMovieRequest } from './types/Movie';
import { movieService } from './services/movieService';
import { MovieList } from './components/MovieList';
import { MovieForm } from './components/MovieForm';
import './App.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const moviesData = await movieService.getAllMovies();
      setMovies(moviesData);
    } catch (err) {
      setError('Error al cargar las películas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMovie = async (movieData: CreateMovieRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newMovie = await movieService.createMovie(movieData);
      setMovies(prev => [newMovie, ...prev]);
    } catch (err) {
      setError('Error al crear la película');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMovie = async (movieData: CreateMovieRequest) => {
    if (!editingMovie) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedMovie = await movieService.updateMovie(editingMovie.id, movieData);
      setMovies(prev => 
        prev.map(movie => 
          movie.id === editingMovie.id ? updatedMovie : movie
        )
      );
      setEditingMovie(null);
    } catch (err) {
      setError('Error al actualizar la película');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await movieService.deleteMovie(id);
      setMovies(prev => prev.filter(movie => movie.id !== id));
    } catch (err) {
      setError('Error al eliminar la película');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
  };

  const handleCancelForm = () => {
    setEditingMovie(null);
  };

  const handleSubmitForm = (movieData: CreateMovieRequest) => {
    if (editingMovie) {
      handleUpdateMovie(movieData);
    } else {
      handleCreateMovie(movieData);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestor de Películas</h1>
        <div className="header-info">
          <span className="movies-count">
            {movies.length} película{movies.length !== 1 ? 's' : ''} registrada{movies.length !== 1 ? 's' : ''}
          </span>
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}

        <div className="crud-container">
          <div className="form-section">
            <MovieForm
              movie={editingMovie}
              onSubmit={handleSubmitForm}
              onCancel={handleCancelForm}
              loading={loading}
            />
          </div>
          
          <div className="list-section">
            <MovieList
              movies={movies}
              onEdit={handleEditMovie}
              onDelete={handleDeleteMovie}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
```

### Paso 6: Estilos CSS Completos (src/App.css)

**IMPORTANTE**: Copia todo el contenido CSS del archivo actual `App.css` que incluye:
- Reset CSS
- Estilos del header
- Grid layout para formulario + lista
- Estilos de componentes
- Responsive design

## 🎯 Funcionalidades

### ✅ CRUD Completo
- **Create**: Crear nuevas películas con formulario
- **Read**: Visualizar lista de películas con imágenes
- **Update**: Editar películas existentes
- **Delete**: Eliminar películas con confirmación

### ✅ Características Avanzadas
- **Imágenes**: Las URLs se muestran como imágenes reales
- **Fallback**: Imagen placeholder si la URL falla
- **Loading states**: Indicadores de carga
- **Error handling**: Manejo de errores elegante
- **Confirmaciones**: Diálogo antes de eliminar
- **Contador**: Muestra total de películas

## 📱 Responsive Design

- **Desktop** (>1024px): Formulario y lista lado a lado
- **Tablet** (768-1024px): Layout vertical
- **Mobile** (<768px): Optimizado para pantallas pequeñas

## 🚀 Ejecutar el Proyecto

### Modo Desarrollo
```bash
npm run dev
```

### Compilar para Producción
```bash
npm run build
```

### Vista Previa de Producción
```bash
npm run preview
```

## 📚 Conceptos Aprendidos

### 🔧 Técnicos
- **React Hooks**: useState, useEffect
- **TypeScript**: Interfaces, tipos
- **Async/Await**: Programación asíncrona
- **Fetch API**: Comunicación HTTP
- **CSS Grid**: Layout moderno
- **Responsive Design**: Media queries

### 🗄️ Base de Datos
- **Supabase**: Backend como servicio
- **PostgreSQL**: Base de datos relacional
- **Row Level Security**: Políticas de seguridad
- **REST API**: Operaciones CRUD via HTTP

### 🎨 UI/UX
- **Componentes reutilizables**
- **Estados de carga**
- **Manejo de errores**
- **Confirmaciones de usuario**
- **Diseño responsivo**

## 🎉 ¡Felicitaciones!

Has creado una aplicación CRUD completa y profesional. Este proyecto demuestra:

- Arquitectura de componentes React
- Integración con base de datos en la nube
- Manejo de estado complejo
- Diseño responsive moderno
- Mejores prácticas de desarrollo

¡Continúa experimentando y añadiendo nuevas funcionalidades!

---

**Desarrollado con ❤️ para aprender React + Supabase**
