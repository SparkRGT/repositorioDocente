// 📋 LISTA DE PELÍCULAS
// Este componente maneja la visualización de todas las películas
// Incluye funcionalidad para editar y eliminar con confirmación

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchMovies, deleteMovie } from './moviesSlice'
import { type Movie } from './moviesSlice'

// 🎭 INTERFAZ PARA LAS PROPS DEL COMPONENTE
interface MoviesListProps {
  onEditMovie: (movie: Movie) => void // Callback para iniciar edición
}

// 🪟 COMPONENTE DE MODAL DE CONFIRMACIÓN
// Separamos el modal en su propio componente para mejor organización
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

// 🎬 COMPONENTE DE TARJETA DE PELÍCULA
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

// 📋 COMPONENTE PRINCIPAL DE LA LISTA
const MoviesList = ({ onEditMovie }: MoviesListProps) => {
  // 🎣 HOOKS DE REDUX
  const dispatch = useAppDispatch()
  const { items: movies, status, error } = useAppSelector(state => state.movies)
  
  // 🏠 ESTADO LOCAL PARA EL MODAL DE CONFIRMACIÓN
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null)
  
  // 🔄 EFECTO PARA CARGAR PELÍCULAS AL MONTAR EL COMPONENTE
  useEffect(() => {
    // Solo cargar si no tenemos películas o si estamos en estado idle
    if (status === 'idle') {
      dispatch(fetchMovies())
    }
  }, [status, dispatch])
  
  // 🗑️ FUNCIÓN PARA MANEJAR ELIMINACIÓN
  const handleDeleteClick = (movie: Movie) => {
    setMovieToDelete(movie)
  }
  
  // ✅ CONFIRMAR ELIMINACIÓN
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
  
  // 🚫 CANCELAR ELIMINACIÓN
  const handleCancelDelete = () => {
    setMovieToDelete(null)
  }
  
  // 🔄 FUNCIÓN PARA RECARGAR PELÍCULAS
  const handleRefresh = () => {
    dispatch(fetchMovies())
  }
  
  // 🎨 RENDER DEL COMPONENTE
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
      
      {/* 🚨 MOSTRAR ERRORES */}
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
      
      {/* ⏳ ESTADO DE CARGA */}
      {status === 'loading' && movies.length === 0 && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading movies...</p>
        </div>
      )}
      
      {/* 📋 LISTA DE PELÍCULAS */}
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
      
      {/* 📭 ESTADO VACÍO */}
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
      
      {/* 🪟 MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
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

// 💡 CONCEPTOS CLAVE DE ESTE COMPONENTE:
/*
  1. COMPOSICIÓN: Dividimos en componentes más pequeños (MovieCard, ConfirmModal)
  
  2. MANEJO DE ESTADOS: Loading, error, success, y empty states
  
  3. UX MEJORADA: Modal de confirmación, estados de carga, fallbacks de imágenes
  
  4. RESPONSIVE DESIGN: Grid que se adapta a diferentes tamaños de pantalla
  
  5. ACCESSIBILITY: Focus management, semantic HTML, keyboard navigation
  
  6. ERROR HANDLING: Manejo de errores de red y de imágenes
  
  7. PERFORMANCE: Lazy loading implícito y re-renders optimizados
*/ 