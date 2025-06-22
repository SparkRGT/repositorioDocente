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