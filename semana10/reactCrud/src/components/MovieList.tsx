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