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
