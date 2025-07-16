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