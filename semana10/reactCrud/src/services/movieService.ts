import type { Movie, CreateMovieRequest } from '../types/Movie';

const SUPABASE_URL = 'https://gghknilbnlgxfqvgyqss.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnaGtuaWxibmxneGZxdmd5cXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDAzNjksImV4cCI6MjA2NjExNjM2OX0.vkb9zK2VEk636eQfHL4u4_Gp5YmgpJ09IyJDpea7TY0';
const API_BASE_URL = `${SUPABASE_URL}/rest/v1/movies`;

// Headers comunes para todas las peticiones
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'apikey': SUPABASE_ANON_KEY
});

export const movieService = {
  async getAllMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener las películas');
      }
      
      const movies = await response.json();
      return movies;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async getMovieById(id: string): Promise<Movie> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener la película');
      }
      
      const movies = await response.json();
      if (movies.length === 0) {
        throw new Error('Película no encontrada');
      }
      
      return movies[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async createMovie(movie: CreateMovieRequest): Promise<Movie> {
    try {
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
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async updateMovie(id: string, movie: CreateMovieRequest): Promise<Movie> {
    try {
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
      if (updatedMovies.length === 0) {
        throw new Error('Película no encontrada para actualizar');
      }
      
      return updatedMovies[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async deleteMovie(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar la película');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}; 